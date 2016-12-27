/**
 * Created by jahansj on 13/11/2016.
 */
const app = require('express').Router();
const auth = require('./auth');

app.get('/', (req, res) => {
  
  res.render('index', { loggedIn: false, forename: null, surename:  null, email: null });
});

auth(app);

module.exports = app;