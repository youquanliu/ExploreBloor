var express = require('express');
var router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/main/:id/comment', commentCtrl.createComment);  
router.delete('/main/:id/comment/:comment_id', commentCtrl.delete);

module.exports = router;


