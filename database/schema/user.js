/**
 * Created by jahansj on 31/10/2016.
 */
const mongoose = require('mongoose');
const userSchema = require('./user-schema');

userSchema.pre('save', (next) => {
  const date = new Date();
  
  this.lastUpdated = date;
  
  if (!this.created) {
    this.created = date;
  }
  
  next();
});

module.exports = mongoose.model('User', userSchema);