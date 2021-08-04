const userEntity = require("../entities/userEntity");
const User = require("../data-access/userDao");
const { comparePassword } = require("../helpers/password");
const createToken = require("../helpers/createToken");

class userService {
  static async register(userData) {
    try {
      // make a new user object with inputed data
      const user = await new userEntity(userData).execute();
      if (user.details) throw new Error(user.details[0].message);

      // check if the user already exists
      const emailAlreadyExist = await User.findByEmail(userData.email);
      if (emailAlreadyExist) throw new Error("Email already exist");

      // if user does not exist, create the user
      const createUser = await User.create({
        firstName: user.getfirstName(),
        lastName: user.getlastName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: 0,
      });

      // if user failed to create, throw error
      if (!createUser) throw new Error("User not Created");

      const token = await createToken(createUser);
      return { createUser, token };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async login(userData) {
    try {
      // make a new user entity and validate the inputed details
      const user = await new userEntity(userData).validateLogin();

      if (user.details) return { error: user.details[0].message };

      // check if the user is registered
      const userFound = await User.findByEmail(userData.email);
      if (!userFound) throw new Error("user does not exist");
      await comparePassword(user.getPassword(), userFound.password);

      // generate token for the logged user
      const token = await createToken(userFound);
      return { sucess: "Login Successful",  token };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async getAllUsers(adminId) {
    try {
        const Admin = await User.findAdmin(adminId)
        if (Admin) {
         const users = await User.findAllUsers();
         return { message: 'success', users }
        } else {
            return 'Sorry, only admins can access this page';
        }
    } catch (error) {
        throw new Error(err.message);
    }
  } 

  static async getSingleUser(adminId,userId) {
    try {
        const Admin = await User.findAdmin(adminId)
        if (Admin) {
         const userFound = await User.findSingleUser(userId);
         if (userFound) {
         return { message: 'success', userFound }
             
         } else {
            return 'Sorry, user not found!';
         }
        } else {
            return 'Sorry, only admins can access this page';
        }
    } catch (error) {
        throw new Error(err.message);
    }
  }
}

module.exports = userService;