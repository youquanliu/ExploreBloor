var User = require('../models/user');
var Posts = require('../models/posts');

function index(req, res) {
    Posts.find({}, function (err, allPosts) {
        if (err) console.log(err);

        else {
            res.render('post/index', {
                indes: 'main page',
                posts: allPosts
            });
        }
    });
}

module.exports = {
    index
}