const mongoose = require('mongoose'); 

const commentSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    content: String,
    createdAt: String,
    updatedAt: String,
});

module.exports = mongoose.model('Comment', commentSchema);
