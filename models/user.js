const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// The factSchema is used to embedded docs in as student doc.
// There is no model and no 'facts' collection
var factSchema = new Schema({
    text: String
}, {
    timestamps: true
});

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    date: { type: Date, default: Date.now },
    cohort: String,
    avatar: String,
    facts: [factSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);