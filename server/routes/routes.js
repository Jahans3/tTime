/**
 * Created by jahansj on 13/11/2016.
 */
const app = require('express').Router();

app.get('/', (req, res) => {
  res.send('Hello');
});

require('./auth')(app);

module.exports = app;