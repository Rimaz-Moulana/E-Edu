const User = require('../models/user');

// Get all users
exports.getAllUsers = async () => {
  return await User.find();
};

// Get single user
exports.getUserById = async (userId) => {
  return await User.findById(userId);
};

exports.getUserEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  
  } catch (error) {
    throw error;
  }
};
// Add user
exports.addUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Update user
exports.updateUser = async (userId, updatedUserData) => {
  console.log(userId, updatedUserData)
  return await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
};

// Delete user
exports.deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};
