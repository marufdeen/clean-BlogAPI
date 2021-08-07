const password = require("../helpers/password");
const userModel = require("../models/userModel");

const userDao = {

  async findAll() {
    const result = await userModel.find({}, { password: 0 })
    return result;
  },
   
  async findByEmail(email) {
    const result = await userModel.findOne({ email });
    return result;
  },

  async findById(userId) {
    const result = await userModel.findById(userId);
    return result;
  }, 
  async create(userData) {
    const createUser = await userModel(userData);
    const newUser = await createUser.save();
    if (newUser) return newUser;
    return false;
  },

  async update(userId, userData) {
    const edit = await userModel.findOneAndUpdate(userId, userData, { useFindAndModify: false , new: true });
    if (edit) return edit; 
    return false;
  },

  async remove(userId) {
    await userModel.deleteOne({ _id: userId });
    return "User Deleted";
  },
};

module.exports = userDao;
