"use strict";

const express = require('express');
const router  = express.Router();
const fetch = require('fetch');
let request = require('request') // "Request" library
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
            dataStash(options.headers, body, access_token)
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

  function dataStash(spotifyReqHeader, userInfo) {

    // add user to database, if not already there
    DataHelpers.userHelpers.getUserBySpotifyID(userInfo.id)
      .then((response) => {
        console.log(`Welcome, ${response.display_name}`)
      })
      .catch((e) => {
        if (e === 'user not found') {

          let name = userInfo.display_name ? userInfo.display_name : 'Mystery Name'
          let id = userInfo.id
          let image = userInfo.images.length ? userInfo.images[0].url : 'https://media.tenor.com/images/fc63d5c22822973d74335e16a5401fd0/tenor.gif'

          DataHelpers.userHelpers.addUser(name, id, image)
            .then((response) => {
              console.log(response)
            })
            .catch((e) => {
              console.log(e)
            })
        }
      })

      // make API request for user's top tracks
      let trackReq = {
        url: "https://api.spotify.com/v1/me/top/tracks?limit=20",
        headers: spotifyReqHeader,
        json: true
      };

      request.get(trackReq, function(error, response, body) {
        //find out which tracks need to be added to the database
        let tracksToAdd = []
        let artistsToAdd = []


        let artistPromises = body.items.map(track => {
          let cleanArtist = {
             artist_name: track.artists[0].name,
             spotify_id: track.artists[0].id
          }

          return new Promise(function (resolve, reject) {
            DataHelpers.artistHelpers.getArtistBySpotifyID(cleanArtist.spotify_id, cleanArtist)
              .then((response) => {
                console.log(`${cleanArtist.artist_name} is already in the database`)
                resolve(response)
              })
              .catch((responseArtist) => {
                artistsToAdd.push(responseArtist)
                resolve(responseArtist)
              })
            })
        })


        let trackPromises = body.items.map(track => {
          let cleanTrack = {
             associated_artist: track.artists[0].id,
             track_name: track.name,
             spotify_id: track.id,
             image_urls: [
                {url: track.album.images[0].url},
                {url: track.album.images[1].url},
                {url: track.album.images[2].url}
             ]
          }

          return new Promise(function(resolve, reject) {
            DataHelpers.trackHelpers.getTrackBySpotifyID(cleanTrack.spotify_id, cleanTrack)
              .then((response) => {
                console.log(`${cleanTrack.track_name} is already in database`)
                resolve(response)
              })
              .catch((responseTrack) => {
                tracksToAdd.push(responseTrack)
                resolve(responseTrack)
              })
          })

        })


        return Promise.all(artistPromises)
          .then(() => {
            stashArtists(artistsToAdd, spotifyReqHeader)
          })
          .then(() => {
            return Promise.all(trackPromises)
              .then((response) => {
                stashTracks(tracksToAdd, spotifyReqHeader, userInfo.id)
              })
              .catch(() => {
                console.log('error in track promise')
              })
          })
          .catch(() => {
            console.log('error in artist promise')
          })


        });

    }

    function removeDuplicates(artistsToAdd) {
      artistsToAdd.forEach((artist, index) => {
        for (let j = index + 1; j < artistsToAdd.length; j++) {
          if (artistsToAdd[j].spotify_id === artist.spotify_id) {
            artistsToAdd.splice(j,1)
          }
        }
      })
      return artistsToAdd
    }


    function stashTracks(tracksToAdd, spotifyReqHeader, userSpotifyID) {
      if (tracksToAdd.length === 0) {
        return
      }

      // make my API call with array items

        let ids = ''
        for (let index in tracksToAdd) {
          ids += tracksToAdd[index].spotify_id
          ids += ','
        }
        ids = ids.slice(0, -1) // take off last comma

        let audioFeaturesReq = {
          url: "https://api.spotify.com/v1/audio-features?ids=" + ids,
          headers: spotifyReqHeader,
          json: true
        };

        request.get(audioFeaturesReq, function(error, response, body) {
          // inside here, clean artists and add to DB

          body.audio_features.forEach((track, index) => {
            tracksToAdd[index].features = {
              danceability: track ? track.danceability : 0,
              energy: track ? track.energy : 0,
              key: track ? track.key : 0,
              loudness: track ? track.loudness : 0,
              mode: track ? track.mode : 0,
              speechiness: track ? track.speechiness : 0,
              acousticness: track ? track.acousticness : 0,
              instrumentalness: track ? track.instrumentalness : 0,
              liveness: track ? track.liveness : 0,
              valence: track ? track.valence : 0,
              tempo: track ? track.tempo : 0
            }

          })

          tracksToAdd.forEach(track => {
            DataHelpers.trackHelpers.addTrack(
              track.track_name,
              track.spotify_id,
              track.image_urls,
              track.features
              )
              .then(() => {
                DataHelpers.artistHelpers.getArtistBySpotifyID(track.associated_artist)
                  .then((responseArtist) => {
                    DataHelpers.trackHelpers.getTrackBySpotifyID(track.spotify_id)
                      .then((responseTrack) => {
                        DataHelpers.artistTrackHelpers.joinArtistToTrack(responseArtist.id, responseTrack.id)
                          .then((response) => {
                            console.log('we did it!')
                          })
                          .catch((e) => {
                            console.log('Join artist error', e)
                          })

                      })
                      .catch((e) => {
                        console.log('Track find error', e)
                      })
                  })
                  .catch((e) => {
                    console.log('Artist find error', e)

                  })
              })
              .then(() => {
                DataHelpers.userHelpers.getUserBySpotifyID(userSpotifyID)
                  .then((responseUser) => {
                    DataHelpers.trackHelpers.getTrackBySpotifyID(track.spotify_id)
                      .then((responseTrack) => {
                        DataHelpers.userTrackHelpers.joinUserToTrack(responseUser.id, responseTrack.id)
                          .then((response) => {
                            console.log('we did it!')
                          })
                          .catch((e) => {
                            console.log('Join user error', e)
                          })
                      })
                      .catch((e) => {
                        console.log('Track find error', e)
                      })
                  })
                  .catch((e) => {
                    console.log('User find error', e)
                  })
              })
              .catch((e) => {
                console.log('error adding track ', e)
              })

          })
        })

    }


    function stashArtists(artistsToAdd, spotifyReqHeader) {
      return new Promise(function(resolve, reject) {
        artistsToAdd = removeDuplicates(artistsToAdd)
        if (artistsToAdd.length === 0) {
          return
        }

        // make my API call with array items
        let ids = ''
        for (let index in artistsToAdd) {
          ids += artistsToAdd[index].spotify_id
          ids += ','
        }
        ids = ids.slice(0, -1) // take off last comma

        let artistReq = {
          url: "https://api.spotify.com/v1/artists?ids=" + ids,
          headers: spotifyReqHeader,
          json: true
        };

        request.get(artistReq, function(error, response, body) {

          // inside here, clean artists and add to DB
          body.artists.forEach(artist => {

              let name = artist.name ? artist.name : 'John Wasson'
              let spotifyID = artist.name ? artist.id : 'noFollowerz'

              let imageURLs = artist.images.length ? [
              {url: artist.images[0].url},
              {url: artist.images[1].url},
              {url: artist.images[2].url}
              ] : [
              {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
              {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
              {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'}
              ]
              let genresArray = artist.genres.length ? artist.genres : ['Set Phasers to Stun']

            DataHelpers.artistHelpers.addArtist(name, spotifyID, imageURLs, genresArray)
              .then((response) => {
                console.log(response)
              })
              .catch((e) => {
                console.log(`Error: ${e}`)
              })
          })
        })

      })
    }




}





