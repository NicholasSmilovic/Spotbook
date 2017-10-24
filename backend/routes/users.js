"use strict";


const express = require('express');
const router = express.Router();


// router.get('/getUserByID', function(req, res) {
//   console.log('GET USER BY ID!!!');
//   res.send();
// });

// module.exports = router;

module.exports = (DataHelpers) => {

  router.get('/getUserByID/:id', (req, res) => {
    let user_id = req.params.id;

    DataHelpers.userHelpers.getUserByID(user_id)
    .then((user) => {
      res.send(user)
    })
    .catch((e) => {
      console.error(e);
    });

  });

  router.get('/getUserBySpotifyID/:id', (req, res) => {
    let spotify_id = req.params.id;

    DataHelpers.userHelpers.getUserBySpotifyID(spotify_id)
    .then((user) => {
      res.send(user)
    })
    .catch((e) => {
      console.error(e);
    });
  });

  // router.get('/getUserBySpotifyID/:id', (req, res) => {
  //   let spotify_id = req.params.id;

  //   DataHelpers.userHelpers.getUserBySpotifyID(spotify_id)
  //   .then((user) => {
  //     res.send(user)
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });
  // });


  return router;
};