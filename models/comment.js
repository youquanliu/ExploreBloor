const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema)