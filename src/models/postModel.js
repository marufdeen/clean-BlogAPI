const mongoose = require('mongoose'); 

const postSchema = new mongoose.Schema({
    userId: String,
    title: String,
    content: String,
    contentImage: String,
    createdAt: String,
    updatedAt: String,
});

module.exports = mongoose.model('Post', postSchema);
