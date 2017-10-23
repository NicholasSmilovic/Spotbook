var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  DataHelpers.userHelpers.getUserTopTracks();
  // res.send();

});

module.exports = router;
