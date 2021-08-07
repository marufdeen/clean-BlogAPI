const { count } = require("../models/userModel");
const userService = require("../services/userServices");

class userController {

  static async register(req, res) {
    try {
      const user = await userService.register(req.body); // call user service to register user
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const user = await userService.login(req.body); // call user service to log user in
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async editProfile(req, res) {
    try { 
      const userId = req.decoded.userId;
      const edited = await userService.editUser(userId, req.body)
      return res.status(200).json(edited);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  }

  static async getAllUsers(req, res) {
      try {
          const adminId = req.decoded.userId;
          const users = await userService.getAllUsers(adminId); // call user service to get all users
          return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
  }

  static async getSingleUser(req, res) {
      try {
          const userId = req.params.userId; 
          const adminId = req.decoded.userId;
          const users = await userService.getSingleUser(adminId, userId); // call user service to register user
          return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
  }
}

module.exports = userController;


/* 


*/