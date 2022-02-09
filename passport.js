require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  


passport.use(new GitHubStrategy({
    
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:80/auth/github/callback"
  },
  
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
  ));
  