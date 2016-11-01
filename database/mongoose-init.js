/**
 * Created by jahansj on 31/10/2016.
 */
const mongoose = require('mongoose');

module.exports = function(URL) {
  mongoose.connect(URL);

  const db = mongoose.connection;

  db.once('open', function() {
    console.log('Mongoose connection to MongoDB established.');
  });
  
  return mongoose;
};