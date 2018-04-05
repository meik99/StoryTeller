var passport = require("passport");
var User = require("../db/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function(){
  passport.use(new GoogleStrategy({
  },
  function(accessToken, refreshToken, profile, cb){
    User.findOrCreate(profile.id, function(result){
      if(result.profileId == "102815722004622822395")
        return cb(null, result);
      else {
        return cb(null, false);
      }
    });
  }));

  passport.serializeUser(function(user, done){
    // console.log(user);
    done(null, user.profileId);
  });

  passport.deserializeUser(function(id, done){
    User.findOrCreate(id, function(result){
      // console.log(id);
      // console.log(result);
      done(null, result);
    });
  });
}
