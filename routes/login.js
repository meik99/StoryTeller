var express = require("express");
var passport = require("passport");
var router = express.Router();
var credentials = require("../authentication/credentials.js");

router.get("/", (res, req, next) => {
      if(!req.user){
          return next();
      }
      else
        res.redirect("/");
    },
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function(req, res) {
    if(req.isAuthenticated())
      res.redirect("/");
    else
      res.redirect("/failure");
});

router.get("/failure", function(req, res){
  res.send("Not a valid user");
});

module.exports = router;
