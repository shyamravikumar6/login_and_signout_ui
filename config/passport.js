const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'useremail' }, (useremail, password, done) => {
      console.log(password,useremail);
      // Match user
      User.findOne({
        useremail
      }).then(user => {
        if (!user) {
          console.log(user);
          return done(null, false, { message: 'That email is not registered' });
        }
          console.log(user);
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log(passport);
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      }).catch(err=>console.log(err));
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
