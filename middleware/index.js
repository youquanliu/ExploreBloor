// all the middleware goes here
var middlewareObj = {};
var Posts = require("../models/posts");
var Comment = require("../models/comment");


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "you need to be logged in to do that");
    res.redirect("/user/login");
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkPostOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Posts.findById(req.params.id, function (err, foundPost) {
            if (err || !foundPost) {
                console.log(err);
                req.flash("error", "that campground does not exist!");
                res.redirect("/main");
            } else if (foundPost.author.id.equals(req.user._id) || req.user.isAdmin) {
                req.campground = foundPost;
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("/main/" + req.params.id);
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}




module.exports = middlewareObj;