"use strict";


const express = require('express');
const router = express.Router();


module.exports = (DataHelpers) => {

  router.get('/getAbsArtistByID/:id', (req, res) => {

    let artist_id = req.params.id;

    DataHelpers.absArtistHelpers.getAbsArtistByID(artist_id)
    .then((track) => {
      res.send(track)
    })
    .catch((e) => {
      console.error(e);
    });

  });



  return router;
};