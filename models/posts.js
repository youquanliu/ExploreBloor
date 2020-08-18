const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment').schema;

const postsSchema = new Schema({
    name: String,
    image: String,
    description: String,
    comments: [Comment]
});

module.exports = mongoose.model("Posts", postsSchema);