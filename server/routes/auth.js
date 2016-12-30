/**
 * Created by jahansj on 13/11/2016.
 */
"use strict";
const app = require('express').Router();
const passport = require('passport');
const io = require('../server');
const deAuthFacebook = require('../auth/callbacks').deAuthFacebook;
const hasProperty = require('../helpers/data-helpers').hasProperty;

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
    failureRedirect: 'http://localhost:8000/fbno',
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name', 'work']
  }), (req, res) => {
    // D
    
    const id = decodeURIComponent;

    // Redirect with facebook profile id query parameter
    res.redirect(`/#?facebookId=${ req.user.auth.facebook.id }`);
  });

  /**
   * Deauthorise a Facebook account
   */
  app.post('/auth/deauth/facebook', deAuthFacebook);
};