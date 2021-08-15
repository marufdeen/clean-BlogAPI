const userService = require("../services/userServices");

class userController {
  /**
   * @author Maruf
   * @method  POST - register
   * @desc Feature: signs up the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async register(req, res) {
    try {
      const user = await userService.register(req.body); // call user service to register user
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * @author Maruf
   * @method  POST - login
   * @desc Feature: signs in the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async login(req, res) {
    try {
      const user = await userService.login(req.body); // call user service to log user in
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  /**
   * @author Maruf
   * @method  PATCH - editProfile
   * @desc Feature: update the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async editProfile(req, res) {
    try {
      const userId = req.decoded.userId;
      const edited = await userService.editUser(userId, req.body);
      return res.status(200).json(edited);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * @author Maruf
   * @method  PATCH - uploadProfilePicture
   * @desc Feature:  upload the user profile picture
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async uploadProfilePicture(req, res) {
    try {
      const signInId = req.decoded.userId;
      const uploadImage = await userService.profilePicture(signInId, {
        profilePicture: req.fileURL,
      });
      return res.status(200).json(uploadImage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  /**
   * @author Maruf
   * @method  GET - getAllUsers
   * @desc Feature: Get All Users
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async getAllUsers(req, res) {
    try {
      const signInId = req.decoded.userId;
      const users = await userService.getAllUsers(signInId); // call user service to get all users
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * @author Maruf
   * @method  GET - getSingleUser
   * @desc Feature: Get A specific user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async getSingleUser(req, res) {
    try {
      const signInId = req.decoded.userId;
      const userId = req.params.userId;
      const users = await userService.getSingleUser(signInId, userId); // call user service to register user
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * @author Maruf
   * @method  PATCH - enableUser
   * @desc Feature:  update user enabled: true
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
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
  /**
   * @author Maruf
   * @method  PATCH - disableUser
   * @desc Feature: update user enabled: false
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
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

   /**
   * @author Maruf
   * @method  DELETE - deleteUser
   * @desc Feature: Delete A specific user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns empty data
   */
    static async deleteUser(req, res) {
      try {
        const signInId = req.decoded.userId;
        const userId = req.params.userId;
        const deleted = await userService.deleteUser(signInId, userId); // call user service to register user
        return res.status(200).json(deleted);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

}

module.exports = userController;

/* 


*/
