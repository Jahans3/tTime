/**
 * Created by jahansj on 31/10/2016.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = require('./user-schema');

// Do something pre-save..
userSchema.pre('save', (next) => {
  next();
});

// Generate password hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password against hash
userSchema.methods.validPassword = (password, sync) => {
  return bcrypt.compareSync(password, sync);
};

module.exports = mongoose.model('User', userSchema);