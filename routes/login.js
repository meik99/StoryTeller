var express = require("express");
var passport = require("passport");
var router = express.Router();




router.get("/", (res, req, next) => {
  if(!req.user){
      return next();
  }
  else
    res.redirect("/story");
},
passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/failure' }),
  function(req, res) {
    if(req.user.profileId != "102815722004622822395")
      res.redirect("/");
    else
      res.redirect("/story");
});

router.get("/failure", function(req, res){
  res.redirect("/");
});

module.exports = router;
