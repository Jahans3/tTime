/**
 * Created by jahansj on 13/11/2016.
 */
const app = require('express').Router();
const passport = require('passport');

const buildUser = (user) => {
  return {
    forename: user.details.forename,
    surname: user.details.surname,
    email: user.auth.local.email,
    age: user.details.age,
    country: user.details.country,
    city: user.details.city,
    jobTitle: user.job.title,
    company: user.job.company,
    department: user.job.department,
    industry: user.job.industry
  }
};

module.exports = (app) => {

  /**
   * Local signup
   */
  app.post('/auth/signup', passport.authenticate('local-signup', {
    passReqToCallback: true
  }), (req, res) => {
    const user = buildUser(req.user);

    res.send(user);
  });

  /**
   * Local login
   */
  app.post('/auth/login', passport.authenticate('local-login', {
    passReqToCallback: true
  }), (req, res) => {
    const user = buildUser(req.user);

    res.send(user);
  });

  /**
   * Facebook login request
   */
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  /**
   * Facebook login response
   */
  app.get('/auth/facebook/response', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:8000/fbyes',
    failureRedirect: 'http://localhost:8000/fbno',
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name', 'work']
  }), (req, res) => {
    res.send(req.user);
  });

  /**
   * Deauthorise a Facebook account
   */
  app.all('/auth/deauth/facebook', (req, res) => {
    console.log(req.body);
    console.log('A Facebook user has de-authorised their account');
    // set user status to inactive
    // User.findOne({req.body.user}(user)=>{user.accountActive = false; user.save()});
    res.send('');
  });
};