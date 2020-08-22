var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');
var middleware = require("../middleware");


router.get('/', mainCtrl.index); //go to main
router.get('/new', middleware.isLoggedIn, mainCtrl.showNew);   //go to new
router.post('/new', middleware.isLoggedIn, mainCtrl.newPost);  //post new
router.get('/:id', mainCtrl.show); //get detail page
router.get('/:id/edit', mainCtrl.getPost); // got to edit
router.post('/:id', middleware.isLoggedIn, mainCtrl.getPostEdit); // edit the post
router.delete('/:id', middleware.checkPostOwnership, mainCtrl.delete); //delete a post


module.exports = router;
