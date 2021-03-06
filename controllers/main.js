var User = require('../models/user');
var Posts = require('../models/posts');
var Comment = require('../models/comment');

function index(req, res) {
    Posts.find({}, function (err, allPosts) {
        if (err) console.log(err);
        res.render('post/index', {
            posts: allPosts,
            success: req.flash('success'),
            User
        });
    });
}
//Show form for new post
function showNew(req, res) {
    res.render('post/new', {
        errors: req.flash('errors')
    });
}

//Create new post
function newPost(req, res) {
    //validate info
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('image', 'Come on, no image?').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        res.redirect('/main/new');
    }
    var newPost = new Posts(req.body);
    newPost.author = {
        id: req.user._id,
        username: req.user.name
    };

    console.log("-----------", newPost.author);
    newPost.save(function (err) {
        if (err) return res.redirect('/main/new');
        //req.flash('success', 'Successfully created event!');
        res.redirect('/main');
    });
}

//show the detail page
function show(req, res) {
    Posts.findById(req.params.id)
        .populate('comments').exec((err, post) => {
            Comment.find({}, (err, comment) => {
                console.log("++++++++++--------this is from main controller--------+++++++++++", comment);
                res.render('post/show', {
                    comment,
                    post,
                    success: req.flash('success')
                })
            })
        })
}
//delete a post
async function deletePost(req, res) {
    await Posts.deleteOne(
        { _id: req.params.id }
    );
    req.flash('success', 'Successfully delete posting!');
    res.redirect('/main');
}
//go to editing page
function getPost(req, res) {
    Posts.findOne({ _id: req.params.id }, (err, post) => {
        res.render('post/edit', {
            post: post,
            errors: req.flash('errors')
        });
    })
}
//edit the post
function getPostEdit(req, res) {

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('image', 'Come on, no image?').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        { req.flash('errors', errors.map(err => err.msg)); }
        return res.redirect(`/main/${req.params.id}/edit`);
    }
    console.log("~~~~~~~~~~~~~~~~", req.body)

    //update the post
    Posts.findOne({ _id: req.params.id }, (err, post) => {
        post.name = req.body.name;
        post.image = req.body.image;
        post.description = req.body.description;
        post.save((err) => {
            if (err) throw err;
            req.flash('success', 'Successfully updated post');
            res.redirect('/main/' + req.params.id);
        })
    }
    )
}

module.exports = {
    index,
    newPost,
    showNew,
    show,
    delete: deletePost,
    getPost,
    getPostEdit
}