/**
 * Created by jahansj on 05/11/2016.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../../database/schema/user');

module.exports = {
  signup: (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'auth.local.email': email }, (err, user) => {
        if (err) return done(err);

        const date = new Date();

        if (user) {
          user.lastUpdated = date;

          if (!user.created) {
            user.created = date;
          }

          return done(null, user, req.flash('That email is already in use.'));
        }
        else {
          const newUser = new User();

          // Credentials
          newUser.auth.local.email = email;
          newUser.auth.local.password = newUser.generateHash(password);
          newUser.contact.email = email;
          
          // Details
          newUser.details.forename = req.body.forename || null;
          newUser.details.surname = req.body.surname || null;
          newUser.details.age = req.body.age || null;
          newUser.details.country = req.body.country || null;
          newUser.details.city = req.body.city || null;
          
          // Job
          newUser.job.title = req.body.jobTitle || null;
          newUser.job.department = req.body.department || null;
          newUser.job.industry = req.body.industry || null;
          newUser.job.company = req.body.company || null;

          newUser.lastUpdated = date;
          newUser.created = date;

          newUser.save((err) => {
            if (err) return done(err);

            return done(null, newUser);
          });
        }
      });
    });
  },
  login: (email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'auth.local.email': email }, (err, user) => {
        if (err) return done(err);
        
        if (!user) {
          return done(null, false, 'Email not recognised');
        }
        else if (!user.validPassword(password, user.auth.local.password)) {
          return done(null, false, 'Incorrect password');
        }
        else {
          user.lastUpdated = new Date();

          return done(null, user);
        }
      });
    });
  },
  facebook: (req, accessToken, refreshToken, profile, done) => {
    // If a user is already logged in return that user
    if (req.user) return done(null, req.user);

    process.nextTick(() => {
      User.findOne({ 'auth.facebook.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        
        if (!user) {
          // Create new User table with the credentials passed from Facebook
          const newUser = new User();
          const date = new Date();

          newUser.auth.facebook.id = profile.id;
          newUser.auth.facebook.clientID = profile.clientID;
          newUser.auth.facebook.clientSecret = profile.clientSecret;
          newUser.auth.facebook.forename = profile.name.givenName;
          newUser.auth.facebook.surname = profile.name.familyName;
          newUser.auth.local.email = profile.emails[0].value;
          newUser.contact.email = profile.emails[0].value;

          newUser.lastUpdated = date;
          newUser.created = date;

          newUser.save((err) => {
            if (err) return done(err);

            return done(null, newUser);
          });
        } else {
          
          return done(null, user);
        }
      });
    });
  },
  deAuthFacebook: (req, res) => {
    return new Promise((resolve, reject) => {
      User.findOne({ 'auth.facebook.id': req.user.auth.facebook.id }, (err, user) => {
            if (!user) {
              return reject(err);
            }

            user.save((err) => {
              if (err) {
                return reject(err);
              }

              resolve();
            });
          });

    }).then(() => {
      res.send({ success: true });

    }).catch((error) => {
      res.send({ success: false, error });
    });
  }
};