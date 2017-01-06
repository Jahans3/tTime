/**
 * Created by jahansj on 07/11/2016.
 */
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Auth = require('./secrets');
const Callbacks = require('./callbacks');
const User = require('../../database/schema/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true,
    session: true
  }, Callbacks.login));

  passport.use('local-signup', new LocalStrategy({
    // Use 'email' instead of 'username'
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
  }, Callbacks.signup));

  passport.use(new FacebookStrategy({
    clientID: Auth.facebook.clientID,
    clientSecret: Auth.facebook.clientSecret,
    callbackURL: '/auth/facebook/response',
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name', 'work'],
    session: true
  }, Callbacks.facebook));
};