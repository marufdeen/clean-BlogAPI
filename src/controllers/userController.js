const userService = require("../services/userServices");

class userController {
  static async register(req, res) {
    try {
      // call user service to register user
      const user = await userService.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      // call user service to log user in
      const user = await userService.login(req.body);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  static async getAllUsers(req, res) {
      try {
          const adminId = req.decoded.userId;
          const users = await userService.getAllUsers(adminId)
          return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ message: err.message });
      }
  }
  static async getSingleUser(req, res) {
      try {
          const userId = req.params.userId; 
          const adminId = req.decoded.userId;
          const users = await userService.getSingleUser(adminId, userId)
          return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ message: err.message });
      }
  }
}

module.exports = userController;


/* 


*/