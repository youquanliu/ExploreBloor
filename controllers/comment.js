const Comment = require('../models/comment');
const Posts = require('../models/posts');

function index(req, res) {
    res.render('post/show', {
        errors: req.flash('errors'),
        success: req.flash('success')
    });
}
//comments create
function createComment(req, res) {
    Posts.findById(req.params.id, function (err, post) {
        if (err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("/main");
        } else {
            Comment.create(req.body, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.name;
                    console.log("~~~~~~~~~~~~~Comment author is ", comment.author)
                    //save comment
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    req.flash("success", "Successfully created comment");
                    res.redirect(`/main/${post.id}`);
                }
            });
        }
    });
};
//comments destroy route
function deleteComment(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("/main");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect(`/main/${req.params.id}`);
        }
    });
};

module.exports = {
    index,
    createComment,
    delete: deleteComment
};