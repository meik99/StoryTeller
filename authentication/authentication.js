var passport = require("passport");
var User = require("../db/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var credentials = require("./credentials.js");

module.exports = function(){
  passport.use(new GoogleStrategy(
    credentials.googleOAuth,
  function(accessToken, refreshToken, profile, cb){
    User.findOrCreate(profile.id, function(result){
      if(credentials.profileIds.indexOf(result.profileId) > -1)
        return cb(null, result);
      else {
        return cb(null, false);
      }
    });
  }));

  passport.serializeUser(function(user, done){
    done(null, user.profileId);
  });

  passport.deserializeUser(function(id, done){
    User.findOrCreate(id, function(result){
      done(null, result);
    });
  });
}
