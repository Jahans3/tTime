"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoURL = require('../database/dbconfig');
const mongoose = require('../database/mongoose-init')(mongoURL);
const passport = require('passport');
const headers = require('./headers');


// Apply headers
app.use(headers);

app.get('/', (req, res) => {
  res.send('Hello');
});

http.listen(3030);

// Add socket events
require('./events')(io);
