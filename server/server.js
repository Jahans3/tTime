"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./dbconfig');
const queries = require('./queries');
const passport = require('passport');
const headers = require('./headers');

// Initialise database
require('./dbinit')(MongoClient, mongoURL);

// Add a record
queries.insertMany();

// Apply headers
app.use(headers);

app.get('/', (req, res) => {
  res.send('Hello');
});

http.listen(3030);

// Add socket events
require('./events')(io);
