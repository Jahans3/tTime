/**
 * Created by jahansj on 31/10/2016.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = require('./user-schema');

userSchema.pre('save', (next) => {
  const date = new Date();
  
  this.lastUpdated = date;
  
  if (!this.created) {
    this.created = date;
  }
  
  next();
});

// Generate password hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password against hash
userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.auth.local.password);
};

module.exports = mongoose.model('User', userSchema);