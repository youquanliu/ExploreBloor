var router = require('express').Router();
var userCtrl = require('../controllers/user');

router.get('/user', userCtrl.index);

router.get('/user/login', userCtrl.login);   //go to login
router.post('/user/login', userCtrl.postLogin);   //post login 

router.get('/user/register', userCtrl.register); //go to register
router.post('/user/register', userCtrl.postRegister); //post register

router.get('/user/logout', userCtrl.logout); //log out the user


module.exports = router;


