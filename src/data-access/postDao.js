const postModel = require("../models/postModel");

const postDao = {
  async findAll() {
    const result = await postModel.find({}, { password: 0 });
    return result;
  },

  async findById(postId) {
    const result = await postModel.findById(postId);
    return result;
  },

  async findByUserId(userId) {
    const result = await postModel.find(userId);
    return result;
  },
  async create(postData) {
    const createPost = await postModel(postData);
    const newPost = await createPost.save();
    if (newPost) return newPost;
    return false;
  },

  async update(postId, postData) {
    const edit = await postModel.findOneAndUpdate(postId, postData, {
      useFindAndModify: false,
      new: true,
    });
    if (edit) return edit;
    return false;
  },

  async remove(postId) {
    await postModel.deleteOne({ _id: postId });
    return "Post Deleted";
  },
};

module.exports = postDao;
