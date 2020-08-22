const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    googleId: String,
    date: {
        type: Date,
        default: Date.now
    },
    avatar: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);