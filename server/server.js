"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');
const sessionSecret = require('./auth/secrets').session;
const cookieParser = require('cookie-parser');
const mongoURL = require('../database/dbconfig');
const mongoose = require('../database/mongoose-init')(mongoURL);
const passport = require('passport');
const headers = require('./headers');

// Apply headers
app.use(headers);

// Enable cookie reading
app.use(cookieParser());

// Enable sessions
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

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
