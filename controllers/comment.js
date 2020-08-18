const Post = require('../models/posts');
const Comment = require('../models/comment');

function createComment(req, res) {
    Post.findById(req.params.id, (err, post) => {
        post.comments.push(req.body);
        post.save((error) => {
            res.redirect(`/main/${post._id}`);
        })
    })
}

function deleteComment(req, res) {
    // console.log("~~~~~~~~~~~~~~~~~~" + req.params.comment_id)
    // Comment.deleteOne(req.params.comment_id);
    // res.redirect(`/main/${post._id}`);


    
    const comment = Post.comments.find(c => c.id === parseInt(req.params.id));
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~" + comment)
    if (!comment) return res.status(404).send("the course with given id is not exist");

    const index = comments.indexOf(comment);
    comment.splice(index, 1);

    res.redirect(`/main/${post._id}`);
}

module.exports = {
    createComment,
    delete: deleteComment

};