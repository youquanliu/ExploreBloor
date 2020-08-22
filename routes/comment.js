var express = require('express');
var router = express.Router();
var middleware = require("../middleware");

const commentCtrl = require('../controllers/comment');

router.get('/main/:id/comment', commentCtrl.index);
router.post('/main/:id/comment', middleware.isLoggedIn, commentCtrl.createComment);
router.delete('/main/:id/comment/:comment_id', middleware.checkCommentOwnership, commentCtrl.delete);

module.exports = router;


