var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PicSpot' });
});

router.get('/upload', function(req, res, next) {
  res.render('index', { title: 'PicSpot' });
});

module.exports = router;
