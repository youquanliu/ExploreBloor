var express = require('express');
var router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/main/:id/comment', commentCtrl.createComment);  //Match from Form in view file
router.delete('/main/:id/comment/:comment_id', commentCtrl.delete);//
//router.get('/:id/delete', commentCtrl.delete) //delete a post
//router.post('/:id/comment/:comment_id/edit', commentCtrl.getPostEdit); // edit the review

module.exports = router;


