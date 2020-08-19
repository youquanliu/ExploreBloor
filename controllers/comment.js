const Post = require('../models/posts');
const Comment = require('../models/comment');
const Posts = require('../models/posts');

function createComment(req, res) {
    Posts.findById(req.params.id, (err, post) => {
        post.comments.push(req.body);
        post.save((error) => {
            if (error) throw error;
            res.redirect(`/main/${post._id}`);
        })
    })
}

async function deleteComment(req, res) {
    console.log("~~~~~~~~~~~~~~~~~~" + req.params.id);
    await Comment.deleteOne({ _id: req.params.id });
    res.redirect(`/main`);
}

module.exports = {
    createComment,
    delete: deleteComment
};