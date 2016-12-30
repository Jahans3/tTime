"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionSecret = require('./auth/secrets').session;
const mongoURL = require('../database/dbconfig');
const passport = require('passport');
const passportConfig = require('./auth/config');
const headers = require('./headers');
const routes = require('./routes/routes');

// Initialise mongoose
require('../database/mongoose-init')(mongoURL);

// Set Hogan as view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, '/app')));

// Apply headers
app.use(headers);

// Set static assets location
app.use('/static', express.static(`${__dirname}/static`));

app.use(cookieParser());
app.use(bodyParser());

// Init passport
passportConfig(passport);

// Enable sessions
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);

http.listen(3030);

// Add socket events
require('./events')(io);
