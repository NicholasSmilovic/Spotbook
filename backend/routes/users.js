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

    res.send('Hello from /users/getUserByID in /backend/routes/users.js');
  });



  return router;
};