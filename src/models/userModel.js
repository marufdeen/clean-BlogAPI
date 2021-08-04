const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: Number,
  enabled: { type: Boolean, default: true }, 
  profilePicture: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
