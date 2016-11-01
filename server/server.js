"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoURL = require('../database/dbconfig');
const mongoose = require('../database/mongoose-init')(mongoURL);
const passport = require('passport');
const passportLocal = require('passport-local');
const passportFacebook = require('passport-facebook');
const passportTwitter = require('passport-twitter');
const headers = require('./headers');

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Apply headers
app.use(headers);

app.get('/', (req, res) => {
  res.send('Hello');
});

http.listen(3030);

// Add socket events
require('./events')(io);
