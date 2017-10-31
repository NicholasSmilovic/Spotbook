"use strict";

const express = require('express');
const router  = express.Router();
const fetch = require('fetch');
let request = require('request') // "Request" library
let rp = require('request-promise') // "Request" library
let querystring = require('querystring')
let cookieParser = require('cookie-parser')
require('dotenv')
let Promise = require("bluebird");


let client_id = process.env.clientID // Your client id
let client_secret = process.env.clientSecret; // Your secret
let redirect_uri = `http://localhost:3000/spotify/callback` // Your redirect uri
let app_uri = `http://localhost:3000`

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


    let scope = 'user-modify-playback-state user-top-read user-read-private user-read-email user-read-currently-playing user-read-playback-state playlist-read-private playlist-modify-private playlist-modify-public';
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
            let again = 1
            dataStash(options.headers, body, 0, again)

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


  function dataStash(spotifyReqHeader, userInfo, trackOffset, again) {

    // establish user that signed in, add to DB if necessary
    establishUser(userInfo)
      .then((response) => {
        console.log(response)
      })

    topTrackStash(spotifyReqHeader, userInfo, trackOffset, again)
    absArtistStash(spotifyReqHeader, userInfo)

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



  function parseForTracks(tracks) {
    let cleanTracks = tracks.map(track => {
      let cleanTrack = {
         associated_artist: track.artists[0].id,
         track_name: track.name,
         spotify_id: track.id,
         image_urls: track.album.images.length ? [
            {url: track.album.images[0].url},
            {url: track.album.images[1] ? track.album.images[1].url : 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
            {url: track.album.images[2] ? track.album.images[2].url : 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'}
         ] : [
            {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
            {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
            {url: 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'}
            ]
      }
      return cleanTrack
    })

    return cleanTracks
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



  function parseForAbsArtists(artists) {
    let absArtists = artists.map(artist => {
      let cleanArtist = {
        artist_name: artist.name,
        spotify_id: artist.id,
        genres: artist.genres
      }
      return cleanArtist
    })

    return absArtists
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

    function prepSpotifyRequest(elements, spotifyReqHeader) {
      let ids = ''
      elements.forEach(element => {
        ids += element.spotify_id
        ids += ','
      })
      ids = ids.slice(0, -1) // take off last comma


      let url = ''
      if (elements[0].track_name) {
        url = "https://api.spotify.com/v1/audio-features?ids="
      } else {
        url = "https://api.spotify.com/v1/artists?ids="
      }

      let APIReq = {
        url: url + ids,
        headers: spotifyReqHeader,
        json: true
      }
      return APIReq
    }


    function insertReadyTracks(tracksToAdd, features) {
      features.forEach((track, index) => {
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

      return tracksToAdd
    }

    function insertReadyArtists(artists) {
      let insertReady = artists.map(artist => {
        return {
          name: artist.name ? artist.name : 'John Wasson',
          spotifyID: artist.id ? artist.id : 'noFollowerz',
          imageURLs: artist.images.length ? [
            {url: artist.images[0].url},
            {url: artist.images[1] ? artist.images[1].url : 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'},
            {url: artist.images[2] ? artist.images[2].url : 'https://media.giphy.com/media/euetPxpu9d0o8/giphy.gif'}
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


    function insertReadyAbsArtists(artists) {
      let insertReady = artists.map(artist => {
        return {
          name: artist.artist_name ? artist.artist_name : 'John Wasson',
          spotifyID: artist.spotify_id ? artist.spotify_id : 'noFollowerz',
          genresArray: artist.genres.length ? artist.genres : ['Set Phasers to Stun']
        }

      })

      return insertReady
    }

  function topTrackStash(spotifyReqHeader, userInfo, trackOffset, again) {

    // set up API request for top tracks
    let limit = 50

    let trackOffsetURL = trackOffset ? `&offset=${trackOffset}` : ''
    let trackReq = {
      url: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}${trackOffsetURL}`,
      headers: spotifyReqHeader,
      json: true
    };


    let topTracks = []
    let tracksToAdd = []

    rp(trackReq)
      .then((response) => {
        topTracks = response.items
        let dirtyArtists = parseForArtists(response.items)
        return dirtyArtists
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
              let artistReq = prepSpotifyRequest(response, spotifyReqHeader)
              return rp(artistReq)
            } else {
              console.log('No artists to add!')
              return 0
            }
        })
        .then((response) => {
          // if there are artists to add, do it, otherwise, skip this step
          if (response) {
            let artistDBInserts = insertReadyArtists(response.artists)
            return Promise.all(artistDBInserts.map(artist => {
              return DataHelpers.artistHelpers.addArtist(
                artist.name,
                artist.spotifyID,
                artist.imageURLs,
                artist.genresArray
              )
            }))
          } else {
            return 0
          }
        })
        .then((response) => {
          // clean up tracks
          let dirtyTracks = parseForTracks(topTracks)
          return dirtyTracks
        })
        .then((response) => {
          // check if tracks in database already
          Promise.all(response.map(track => {
            return DataHelpers.trackHelpers.getTrackBySpotifyID(track.spotify_id, track)
          }))
            .then((response) => {
              // remove all the ones we found
              for (let i = 0; i < response.length; i++) {
                if (response[i].energy) {
                  response.splice(i, 1)
                  i--
                }
              }

              // if there are remaining artists, go get them!
              if (response.length) {
                tracksToAdd = response
                let trackReq = prepSpotifyRequest(response, spotifyReqHeader)
                return rp(trackReq)
              } else {
                console.log('No tracks to add!')
                return 0
              }
            })
            .then((response) => {
              if (response) {
                let trackDBInserts = insertReadyTracks(tracksToAdd, response.audio_features)
                return Promise.all(trackDBInserts.map(track => {
                  return DataHelpers.trackHelpers.addTrack(
                    track.track_name,
                    track.spotify_id,
                    track.image_urls,
                    track.features
                  )
                }))
              } else {
                console.log('no tracks or artists to add')
                return 0
              }
            })
            .then(() => {
              if (response) {
                let promises = [];

                tracksToAdd.forEach(track => {
                  let trackID = 0
                  let artistID = 0
                  return DataHelpers.trackHelpers.getTrackBySpotifyID(track.spotify_id)
                    .then((response) => {
                      trackID = response.id
                      return DataHelpers.artistHelpers.getArtistBySpotifyID(track.associated_artist)
                    })
                    .then((response) => {
                      artistID = response.id
                      promises.push(DataHelpers.artistTrackHelpers.joinArtistToTrack(artistID, trackID))
                    })

                })
                return Promise.all(promises)
              } else {
                return 0
              }
            })
            .then((response) => {
                console.log('joining user to tracks...')
                connectUserToTracks(userInfo, topTracks, spotifyReqHeader, again)
            })

        })
      })
      .catch((e) => {
        console.log('there was an error!', e)
      })
  }

  function connectUserToTracks(userInfo, topTracks, spotifyReqHeader, again) {
    console.log('called this function')
    DataHelpers.userHelpers.getUserBySpotifyID(userInfo.id)
    .then((response) => {
      let userID = response.id
      topTracks.forEach(track => {
        let trackID = 0
        return DataHelpers.trackHelpers.getTrackBySpotifyID(track.id)
          .then((response) => {
            trackID = response.id
            return DataHelpers.userTrackHelpers.joinUserToTrack(userID, trackID)
          })
      })
    })
    .then(() => {
      if (again === 1) {
        topTrackStash(spotifyReqHeader, userInfo, 50, 0)
      }
    })
  }



  function absArtistStash(spotifyReqHeader, userInfo) {
    let limit = 50
    let absArtistReq = {
      url: `https://api.spotify.com/v1/me/top/artists?limit=${limit}`,
      headers: spotifyReqHeader,
      json: true
    };

    let artistsToAdd = []
    let topArtists = []

    rp(absArtistReq)
      .then((response) => {
        topArtists = response.items
        let dirtyArtists = parseForAbsArtists(response.items)
        return dirtyArtists
      })
      .then((response) => {
        Promise.all(response.map(artist => {
          return DataHelpers.absArtistHelpers.getAbsArtistBySpotifyID(artist.spotify_id, artist)
        }))
          .then((response) => {
            //remove all the ones we found
            for (let i = 0; i < response.length; i++) {
              if (response[i].id) {
                response.splice(i, 1)
                i--
              }
            }
            artistsToAdd = response
            return response
          })
          .then((response) => {
            // add them to the db
            if (response.length) {
              let insertReady = insertReadyAbsArtists(response)
              return insertReady
            } else {
              connectUserToArtists(userInfo, topArtists)
              return 0
            }
          })
          .then((response) => {
            if (response) {
              return Promise.all(response.map(artist => {
                return DataHelpers.absArtistHelpers.addAbsArtist(
                  artist.name,
                  artist.spotifyID,
                  artist.genresArray
                )
              }))
            }
          })
          .then(() => {
            connectUserToArtists(userInfo, topArtists)
          })
      })
      .catch(() => {
        console.log('there was an error in absolute artists!')
      })



  }

  function connectUserToArtists(userInfo, topArtists) {
      DataHelpers.userHelpers.getUserBySpotifyID(userInfo.id)
      .then((response) => {
        let userID = response.id
        topArtists.forEach(artist => {
          let artistID = 0
          return DataHelpers.absArtistHelpers.getAbsArtistBySpotifyID(artist.id)
            .then((response) => {
              artistID = response.id
              return DataHelpers.userAbsArtistHelpers.joinUserToAbsArtist(userID, artistID)
            })
        })
      })


  }





}





