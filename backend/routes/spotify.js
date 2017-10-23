"use strict";

const express = require('express');
const router  = express.Router();
let request = require('request') // "Request" library
let querystring = require('querystring')
let cookieParser = require('cookie-parser')
require('dotenv')


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

    let scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state playlist-read-private';
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
            dataStash(options.headers, body)
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

  function dataStash(spotifyReqHeader, myAccount) {

    DataHelpers.userHelpers.getUserBySpotifyID(myAccount.id, function(found, response) {
      if (!found) {
        DataHelpers.userHelpers.addUser(myAccount.display_name, myAccount.id, myAccount.images[0].url)
      } else {
        console.log(`Welcome back, ${myAccount.display_name}`)
      }
    })



  }
}



