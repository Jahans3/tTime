"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoURL = require('../database/dbconfig');
const mongoose = require('../database/mongoose-init')(mongoURL);
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const twitterStrategy = require('passport-twitter').Strategy;
const headers = require('./headers');

// Apply headers
app.use(headers);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/login', /*passport.authenticate('local'),*/ (req, res) => {
  console.log('got a post');
  //res.redirect('http://localhost:8000/login');
  // if auth is bad send 401
  res.send('Your mum');
});

app.get('/login', (req, res) => {
  res.send('ello');
});

http.listen(3030);

// Add socket events
require('./events')(io);
