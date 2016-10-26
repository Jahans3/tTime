"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const headers = require('./headers');

app.use(headers);

app.get('/', (req, res) => {
  res.send('Hello');
});

http.listen(3030);

require('./events')(io);
