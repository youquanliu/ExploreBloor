const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match user
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

passport.use(new GoogleStrategy({
    clientID: "227754701922-lbdu9ag9mr3mkogovoemf35ctptg57b7.apps.googleusercontent.com",
    clientSecret: "puaeIqJ0DmIUdtEhzh4oOJ3Z",
    callbackURL: "http://localhost:8080/oauth2callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }, function (err, user) {
            if (err) return cb(err);
            if (user) {
                // returning user
                if (!user.avatar) {
                    user.avatar = profile.photos[0].value;
                    user.save(function (err) {
                        return cb(null, user);
                    });
                } else {
                    return cb(null, user);
                }
            } else {
                // we have a new user via OAuth!
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                newUser.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));
//done is a common name for parameters that accept a callback function.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});