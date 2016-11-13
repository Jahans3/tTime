/**
 * Created by jahansj on 13/11/2016.
 */
const app = require('express').Router();
const passport = require('passport');

module.exports = (app) => {
  app.post('/auth/signup', passport.authenticate('local-signup', {
    passReqToCallback: true
  }), (req, res) => {
    console.log(req.user.auth.local);
    res.send(req.user.auth.local.email);
  });

  app.post('/auth/login', passport.authenticate('local-login', {
    passReqToCallback: true
  }), (req, res) => {
    console.log(req.user.auth.local);
    res.send('fuck')
  });

  app.post('/auth/twitter', passport.authenticate('twitter'), (res) => {
    res.send('Received');
  });

  app.get('/auth/twitter/response', passport.authenticate('twitter', {
    successRedirect: 'http://localhost:8000/twitteryes',
    failureRedirect: 'http://localhost:8000/twitterno',
    passReqToCallback: true
  }));

  // Pinged when Facebook user unlinks their account
  app.all('/auth/deauth/facebook', (req, res) => {
    console.log(req.body);
    console.log('A Facebook user has de-authorised their account');
    // set user status to inactive
    // User.findOne({req.body.user}(user)=>{user.accountActive = false; user.save()});
    res.send('');
  });

  app.all('/auth/deauth/twitter', (req, res) => {
    console.log(req.body);
    console.log('A twitter user has de-authorised their account');
    // Set account to inactive
    res.send('');
  });
};