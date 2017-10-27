"use strict";

const express = require('express');
const router  = express.Router();
let request = require('request') // "Request" library
let rp = require('request-promise') // "Request" library
let querystring = require('querystring')
let cookieParser = require('cookie-parser')
require('dotenv')
let Promise = require("bluebird");


let client_id = process.env.clientID // Your client id
let client_secret = process.env.clientSecret; // Your secret
let redirect_uri = `http://localhost:3000/spotify/callback` // Your redirect uri
let app_uri = `http://localhost:3001`

let generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let stateKey = 'spotify_auth_state';
module.exports = (DataHelpers) => {

  router.get('/login', function(req, res) {
    console.log("got to login")
    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    let scope = 'user-library-read user-top-read user-read-private user-read-email user-read-currently-playing user-read-playback-state playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  router.get('/callback', function(req, res) {

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect('' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true

      };


      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          let access_token = body.access_token,
          refresh_token = body.refresh_token;

          let options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          request.get(options, function(error, response, body) {
            console.log(body);
            dataStash(options.headers, body, 0)
            // absoluteArtistStash(options.headers, body.id)

          });

          console.log('redirecting...', app_uri +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
          res.redirect(app_uri + "?" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));



        } else {
          res.redirect(app_uri +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

  router.get('/refresh_token', function(req, res) {
    console.log("refersh_token: ", req.query.refresh_token)
    let refresh_token = req.query.refresh_token;
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

  return router





  function dataStash(spotifyReqHeader, userInfo, trackOffset) {

    // establish user that signed in, add to DB if necessary
    establishUser(userInfo)
      .then((response) => {
        console.log(response)
      })

    // set up API request for top tracks
    let trackOffsetURL = trackOffset ? `&offset=${trackOffset}` : ''
    let trackReq = {
      url: `https://api.spotify.com/v1/me/top/tracks?limit=100${trackOffsetURL}`,
      headers: spotifyReqHeader,
      json: true
    };

    rp(trackReq)
      .then((response) => {
        let artistsToAdd = parseForArtists(response.items)
        return artistsToAdd
      })
      .then((response) => {
        Promise.all(response.map(artist => {
          return DataHelpers.artistHelpers.getArtistBySpotifyID(artist.spotify_id, artist)
        }))
          .then((response) => {
              // remove all the ones we found
              for (let i = 0; i < response.length; i++) {
                if (response[i].genres) {
                  response.splice(i, 1)
                  i--
                }
              }
              // if there are remaining artists, go get them!
              if (response.length) {
                let artistReq = prepArtistsForSpotify(response, spotifyReqHeader)
                rp(artistReq)
                  .then((response) => {
                    let artistDBInserts = insertArtists(response.artists)
                    Promise.all(artistDBInserts.map(artist => {
                      return DataHelpers.artistHelpers.addArtist(
                        artist.name,
                        artist.spotifyID,
                        artist.imageURLs,
                        artist.genresArray
                      )
                    }))
                  })
              } else {
                console.log('No artists to add!')
              }
          })
      })
      .catch((e) => {
        console.log('there was an error!', e)
      })

  }




  function establishUser(userInfo) {
    return new Promise((resolve, reject) => {
      DataHelpers.userHelpers.getUserBySpotifyID(userInfo.id)
        .then((response) => {
          resolve(`Welcome, ${response.display_name}`)
        })
        .catch((e) => {
          if (e === 'user not found') {
            let name = userInfo.display_name ? userInfo.display_name : 'Mystery Name'
            let id = userInfo.id
            let image = userInfo.images.length ? userInfo.images[0].url : 'https://media.tenor.com/images/fc63d5c22822973d74335e16a5401fd0/tenor.gif'
            return DataHelpers.userHelpers.addUser(name, id, image)
          }
          reject(e)
        })
      })

  }



  function parseForArtists(tracks) {
    let artists = tracks.map(track => {
      let cleanArtist = {
        artist_name: track.artists[0].name,
        spotify_id: track.artists[0].id
      }
      return cleanArtist
    })

    return removeDuplicates(artists)
  }


    function removeDuplicates(artistsToAdd) {
      artistsToAdd.forEach((artist, index) => {
        for (let j = index + 1; j < artistsToAdd.length; j++) {
          if (artistsToAdd[j].spotify_id === artist.spotify_id) {
            artistsToAdd.splice(j,1)
            j -= 1
          }
        }
      })
      return artistsToAdd
    }

    function prepArtistsForSpotify(artists, spotifyReqHeader) {
      let ids = ''
      artists.forEach(artist => {
        ids += artist.spotify_id
        ids += ','
      })
      ids = ids.slice(0, -1) // take off last comma

      let artistReq = {
        url: "https://api.spotify.com/v1/artists?ids=" + ids,
        headers: spotifyReqHeader,
        json: true
      }

      return artistReq
    }

    function insertArtists(artists) {
      let insertReady = artists.map(artist => {
        return {
          name: artist.name ? artist.name : 'John Wasson',
          spotifyID: artist.name ? artist.id : 'noFollowerz',
          imageURLs: artist.images.length ? [
            {url: artist.images[0].url},
            {url: artist.images[1].url},
            {url: artist.images[2].url}
            ] : [
            {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
            {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
            {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'}
            ],
          genresArray: artist.genres.length ? artist.genres : ['Set Phasers to Stun']
        }

      })

      return insertReady
    }


}





