"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionSecret = require('./auth/secrets').session;
const mongoURL = require('../database/dbconfig');
const mongoose = require('../database/mongoose-init')(mongoURL);
const passport = require('passport');
const passportConfig = require('./auth/config');
//const LocalStrategy = require('passport-local');
//const localSignup = require('./auth/localStrategy').signup;
const headers = require('./headers');

// Apply headers
app.use(headers);

// Set static assets location
app.use('/static', express.static(`${__dirname}/static`));

app.use(cookieParser());
app.use(bodyParser());

// Enable sessions
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passportConfig(passport);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/signup', passport.authenticate('local-signup', {
  passReqToCallback: true
}), (req, res) => {
  res.send(req.user.auth.local.email);
});

app.post('/login', passport.authenticate('local-login', {
  passReqToCallback: true
}), (req,res) => {
  console.log(req.body);
  res.send('fuck')
});

// Pinged when Facebook user unlinks their account
app.all('/deauth/facebook', (req, res) => {
  console.log(req.body);
  console.log('A Facebook user has de-authorised their account');
  // set user status to inactive
  // User.findOne({req.body.user}(user)=>{user.accountActive = false; user.save()});
  res.send('');
});

http.listen(3030);

// Add socket events
require('./events')(io);
