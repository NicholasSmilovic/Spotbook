"use strict";


const express = require('express');
const router = express.Router();


module.exports = (DataHelpers) => {

  router.get('/getTrackByID/:id', (req, res) => {

    let track_id = req.params.id;

    DataHelpers.trackHelpers.getTrackByID(track_id)
    .then((user) => {
      res.send(user)
    })
    .catch((e) => {
      console.error(e);
    });

  });



  return router;
};