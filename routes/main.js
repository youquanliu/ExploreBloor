var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');


router.get('/', mainCtrl.index); //go to main
router.get('/new', mainCtrl.showNew);   //go to new
router.post('/new', mainCtrl.newPost);  //post new
router.get('/:id', mainCtrl.show); //get detail page
router.delete('/:id', mainCtrl.delete); //delete a post
router.get('/:id/edit', mainCtrl.getPost); // got to edit
router.post('/:id', mainCtrl.getPostEdit); // edit the post



module.exports = router;
