var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET landing page. */
router.get('/', function (req, res, next) {
  res.render('landing');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/user',
    failureRedirect: '/user'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/user');
});

module.exports = router;
