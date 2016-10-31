"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const mongoURL = require('./dbconfig');
const queries = require('./queries');
const passport = require('passport');
const headers = require('./headers');

// Connect mongoose to mongodb
mongoose.connect(mongoURL);

// Apply headers
app.use(headers);

app.get('/', (req, res) => {
  res.send('Hello');
});

http.listen(3030);

// Add socket events
require('./events')(io);
