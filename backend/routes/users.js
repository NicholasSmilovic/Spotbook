"use strict";


const express = require('express');
const router = express.Router();


// router.get('/getUserByID', function(req, res) {
//   console.log('GET USER BY ID!!!');
//   res.send();
// });

// module.exports = router;

module.exports = (DataHelpers) => {

  router.get('/getUserByID', (req, res) => {
    console.log('Hello from /users/getUserByID in /backend/routes/users.js');

    DataHelpers.userHelpers.getUserByID(1)
    .then((user) => {
      res.send(user)
    })
    .catch((e) => {
      console.error(e);
    });
  });

  router.get('/getUserTopTracks', (req, res) => {
    // DataHelpers.userHelpers.getUserTopTracks()

    // res.send();
  });



  return router;
};