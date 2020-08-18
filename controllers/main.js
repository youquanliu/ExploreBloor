var User = require('../models/user');
var Posts = require('../models/posts');
var Comment = require('../models/comment');

function index(req, res) {
    Posts.find({}, function (err, allPosts) {
        if (err) console.log(err);
        res.render('post/index', {
            title: 'main page',
            posts: allPosts,
            success: req.flash('success')
        });
    });
}
function showNew(req, res) {
    res.render('post/new');
}

function newPost(req, res) {
    const post = new Posts(req.body);
    post.save(function (err) {
        if (err) return res.redirect('/main/new');
        req.flash('success', 'Successfully created event!');
        res.redirect('/main');
    });
}

//show the detail page
function show(req, res) {
    Posts.findById(req.params.id)
        .populate('comments').exec((err, post) => {
            Comment.find({}, (err, comment) => {
                console.log(comment);
                res.render('post/show', {
                    comment,
                    post
                })
            })
        })
}

async function deletePost(req, res) {
    await Posts.deleteOne(
        { _id: req.params.id }
    );
    res.redirect('/main');
}

module.exports = {
    index,
    newPost,
    showNew,
    show,
    delete: deletePost
}