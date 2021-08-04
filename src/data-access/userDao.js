const password = require("../helpers/password");
const userModel = require("../models/userModel");

const userDao = {

  async findAllUsers() {
    const result = await userModel.find()
    return result;
  },
  
  async findSingleUser(userId) {
    const result = await userModel.findById(userId)
    return result;
  },

  async findByEmail(email) {
    const result = await userModel.findOne({ email });
    return result;
  },

  async findById(userId) {
    const result = await userModel.findOne({ _id: userId });
    return result;
  },

  async findAdmin(userId) {
    const result = await userModel.findOne({ _id: userId, role: 1 });
    return result;
  },

  async create(userData) {
    const createUser = await userModel(userData);
    const newUser = await createUser.save();
    if (newUser) return newUser;
    return false;
  },

  async update(userData) {
    const edit = await userModel.set(userData);
    if (edit) {
      edit.save();
      return edit;
    }
    return false;
  },

  async remove(userId) {
    await userModel.deleteOne({ _id: userId });
    return "Not implemented";
  },
};
module.exports = userDao;
