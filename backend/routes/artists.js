"use strict";


const express = require('express');
const router = express.Router();


module.exports = (DataHelpers) => {

  router.get('/getArtistByID/:id', (req, res) => {

    // console.log('***** inside getArtistByID route *****')
    let artistID = req.params.id;

    DataHelpers.artistHelpers.getArtistByID(artistID)
    .then((artist) => {
      res.send(artist)
    })
    .catch((e) => {
      console.error(e);
    });

  });



  return router;
};