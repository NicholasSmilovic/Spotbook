"use strict";


const express = require('express');
const router = express.Router();


module.exports = (DataHelpers) => {

  router.get('/getTrackByID/:id', (req, res) => {

    let track_id = req.params.id;

    DataHelpers.trackHelpers.getTrackByID(track_id)
    .then((track) => {
      res.send(track)
    })
    .catch((e) => {
      console.error(e);
    });

  });

  router.get('/getArtistFromTrack/:id', (req, res) => {
// console.log('***** INSIDE ROUTE *****')
    let track_id = req.params.id;

    DataHelpers.trackHelpers.getArtistFromTrack(track_id)
    .then((artist) => {
      res.send(artist)
    })
    .catch((e) => {
      console.error(e);
    });

  });



  return router;
};