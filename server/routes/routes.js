/**
 * Created by jahansj on 13/11/2016.
 */
const app = require('express').Router();
const auth = require('./auth');

app.get('/', (req, res) => {
  res.send('Hello');
});

auth(app);

module.exports = app;