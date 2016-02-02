var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var db = require('../bin/db');

/* GET home page. */
router.get('/:img', function(req, res, next) {
    var path = require('path'); 
    console.log(path.basename());
    path.exists('./public/images/' + req.params.img, function(exists) { 
      if (exists) { 
        db.query('SELECT name, comment FROM picspot_comments WHERE url="' + req.params.img + '";', function(err, result) {
            if (err) throw err;
            res.render('image', { img: req.params.img, imgUrl: '../images/' + req.params.img, comments: result });
        });
      }else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      }
    }); 
    
});

router.post('/:img', function(req, res, next) {
    console.log(req.body);
    if(req.body.name != '' && req.body.comment != ''){
        db.query('INSERT INTO picspot_comments SET ?', req.body, function(err, result) {
            if (err) throw err;
        });
    }
    db.query('SELECT name, comment FROM picspot_comments WHERE url="' + req.params.img + '";', function(err, result) {
        if (err) throw err;
        console.log(result);
        res.render('image', { img: req.params.img, imgUrl: '../images/' + req.params.img, comments: result });
    });
});

module.exports = router;