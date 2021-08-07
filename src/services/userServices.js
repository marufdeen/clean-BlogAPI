const userEntity = require("../entities/userEntity");
const User = require("../data-access/userDao");
const { comparePassword } = require("../helpers/password");
const createToken = require("../helpers/createToken");
const userModel = require("../models/userModel");

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
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login(userData) {
    try {
      // make a new user entity and validate the inputed details
      const user = await new userEntity(userData).validateLogin();
      if (user.details) return { error: user.details[0].message };

      const userExist = await User.findByEmail(userData.email); // check if the user is registered
      if (!userExist) throw new Error("user does not exist");
      await comparePassword(user.getPassword(), userExist.password);

      // generate token for the logged user
      const token = await createToken(userExist);
      return { sucess: "Login Successful",  token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async editUser(userId, userData) {
    try {
      const user = await new userEntity(userData).validateEdit();
      if(user.details) return { error: user.details[0].message };

      const emailAlreadyExist = await User.findByEmail(userData.email); // check if the email exist
      
    if (emailAlreadyExist !== null && emailAlreadyExist.email.length > 0 && emailAlreadyExist.id !== userId
      ) throw new Error("user with this email already exist");

    const updatedUser = await User.update(userId, userData);
    return { message: 'Profile updated successfully', updatedUser }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllUsers(adminId) {
    try {
        const user = await User.findById(adminId)
        if (user.role == 1) {
         const usersFound = await User.findAll();
         return { message: 'success', usersFound }
        } else {
            return 'Sorry, only admins can access this page';
        }
    } catch (error) {
        throw new Error(error.message);
    }
  } 

  static async getSingleUser(adminId, userId) {
    try {
        const user = await User.findById(adminId)
        if (user.role == 1) {
         const userFound = await User.findById(userId);
         if (userFound) {
         return { message: 'success', userFound }
             
         } else {
            return 'Sorry, user not found!';
         }
        } else {
            return 'Sorry, only admins can access this page';
        }
    } catch (error) {
        throw new Error(error.message);
    }
  }
}

module.exports = userService;