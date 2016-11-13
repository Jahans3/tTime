/**
 * Created by jahansj on 05/11/2016.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../../database/schema/user');

module.exports = {
  signup: (req, email, password, done) => {
    console.log('signup yo');
    console.log(req.body);
    process.nextTick(() => {
      User.findOne({ 'auth.local.email': email }, (err, user) => {
        if (err) {
          console.log('err here');
          return done(err);
        }

        const date = new Date();

        if (user) {
          console.log('found user');
          console.log(user);
          user.lastUpdated = date;

          if (!user.created) {
            user.created = date;
          }

          return done(null, user, req.flash('That email is already in use.'));
        }
        else {
          console.log('ind: ' + req.body.industry);
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
            if (err) {
              console.log('err on save');
              return done(err);
            }

            return done(null, newUser);
          });
        }
      });
    });
  },
  login: (email, password, done) => {
    console.log('login ya kent');
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

          console.log('found user');
          return done(null, user);
        }
      });
    });
  },
  twitter: (req, key, keySecret, profile, done) => {
    console.log('we are twittering');
    if (!req.user) {
      console.log('twitter user not found');
      process.nextTick(() => {
        User.findOne({ 'auth.twitter.id': profile.id }, (err, user) => {
          if (err) {
            console.log('err at twitter start');
            return done(err);
          }

          // If user already exists but may have unlinked their account
          if (user) {
            console.log('found a twitter user');
            if (!user.auth.twitter.consumerKey) {
              user.auth.twitter.id = profile.id;
              user.auth.twitter.consumerKey = key;
              user.auth.twitter.consumerSecret = keySecret;
              user.auth.twitter.displayName = profile.displayName;

              user.save((err) => {
                if (err) return done(err);

                return done(null, user);
              });
            }

            return done(null, user);
          }
          else {
            console.log('create new twitter user');
            const newUser = new User();

            newUser.auth.twitter.id = profile.id;
            newUser.auth.twitter.consumerKey = key;
            newUser.auth.twitter.consumerSecret = keySecret;
            newUser.auth.twitter.displayName = profile.displayName;

            newUser.save((err) => {
              if (err) return done(err);

              return done(null, newUser);
            })
          }
        });
      });
    }
    else {
      const newUser = req.user;
      
      newUser.auth.twitter.id = profile.id;
      newUser.auth.twitter.consuerKey = key;
      newUser.auth.twitter.consumerSecret = keySecret;
      newUser.auth.twitter.displayName = profile.displayName;
      
      newUser.save((err) => {
        if (err) return done(err);
        
        return done(null, newUser);
      });
    }
  },
  facebook: (req, accessToken, refreshToken, profile, done) => {
    if (!req.user) {
      process.nextTick(() => {
        User.findOne({ 'auth.facebook.clientID': accessToken }, (err, user) => {
          if (err) return done(err);

          if (user) {

          }
        });
      });
    }
  }
};