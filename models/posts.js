const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment').schema;

const postsSchema = new Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
// const postsSchema = new Schema({
//     image: {
//         type: String
//     }
// })
module.exports = mongoose.model("Posts", postsSchema);