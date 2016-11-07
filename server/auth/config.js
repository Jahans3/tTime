/**
 * Created by jahansj on 07/11/2016.
 */
const LocalStrategy = require('passport-local');
const User = require('../../database/schema/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    // Use 'email' instead of 'username'
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Allows passing the request object to the callback
  }, (req, email, password, done) => {
    process.nextTick(() => {

      // Attempt to find a user whose email matches the input email
      User.findOne({ 'auth.local.email': email }, (err, user) => {
        if (err) return done(err);

        if (user) {
          return done(null, false,  req.flash('That email is already in use.'));
        } else {
          const newUser = new User();

          newUser.auth.local.email = email;
          newUser.auth.local.password = newUser.generateHash(password);

          newUser.save((err) => {
            if (err) throw err;

            return done(null, newUser);
          });
        }
      });
    });
  }));
};