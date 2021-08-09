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
      const edited = await userService.editUser(userId, req.body);
      return res.status(200).json(edited);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async disableUser(req, res) {
    try {
      const signInId = req.decoded.userId;
      const userId = req.params.userId;
      const disabledUser = await userService.setUserStatus(signInId, userId, {
        enabled: false,
      });
      return res.status(200).json(disabledUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async enableUser(req, res) {
    try {
      const signInId = req.decoded.userId;
      const userId = req.params.userId;
      const enabledUser = await userService.setUserStatus(signInId, userId, {
        enabled: true,
      });
      return res.status(200).json(enabledUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  static async getAllUsers(req, res) {
    try {
      const signInId = req.decoded.userId;
      const users = await userService.getAllUsers(signInId); // call user service to get all users
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getSingleUser(req, res) {
    try {
      const userId = req.params.userId;
      const signInId = req.decoded.userId;
      const users = await userService.getSingleUser(signInId, userId); // call user service to register user
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  
}

module.exports = userController;

/* 


*/
