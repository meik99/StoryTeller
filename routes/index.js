var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("here");
  // if(req.user){
  //   res.render('index', {id: req.user.profileId});
  // }
  // else
    res.render('index', {id: -1});
});

module.exports = router;
