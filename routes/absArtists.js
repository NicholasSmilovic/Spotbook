"use strict";


const express = require('express');
const router = express.Router();


module.exports = (DataHelpers) => {

  router.get('/getAbsArtistByID/:id', (req, res) => {


    let artistID = req.params.id;

    DataHelpers.absArtistHelpers.getAbsArtistByID(artistID)
    .then((artist) => {
      res.send(artist)
    })
    .catch((e) => {
      console.error(e);
    });

  });



  return router;
};