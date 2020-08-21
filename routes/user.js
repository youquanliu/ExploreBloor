var router = require('express').Router();
var userCtrl = require('../controllers/user');
var passport = require("passport");
// GET /students
router.get('/user', userCtrl.index);
router.get('/user/login', userCtrl.login);   //go to login
router.post('/user/login', userCtrl.postLogin);   //post login 

router.get('/user/register', userCtrl.register); //go to register
router.post('/user/register', userCtrl.postRegister); //post register

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
//router.post('/facts', isLoggedIn, userCtrl.addFact);

// DELETE /facts/:id
//router.delete('/facts/:id', isLoggedIn, userCtrl.delFact);


module.exports = router;


