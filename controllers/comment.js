const Post = require('../models/posts');
const Comment = require('../models/comment');
const Posts = require('../models/posts');

function createComment(req, res) {
    Posts.findById(req.params.id, (err, post) => {
        post.comments.push(req.body);
        post.save((error) => {
            res.redirect(`/main/${post._id}`);
        })
    })
}

async function deleteComment(req, res) {
    console.log("~~~~~~~~~~~~~~~~~~" + req.params.id);
    await Comment.deleteOne({
        _id: req.params.id
    })

    res.redirect(`/main`);
}


// const comment = Post.comments.map(c => c.id === parseInt(req.params.id));
// console.log("~~~~~~~~~~~~~~~~~~~~~~~~" + comment)
// if (!comment) return res.status(404).send("the course with given id is not exist");

// const index = comments.indexOf(comment);
// comment.splice(index, 1);

// res.redirect(`/main/${post._id}`);


module.exports = {
    createComment,
    delete: deleteComment

};