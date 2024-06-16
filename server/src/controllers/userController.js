const User = require('../models/user');
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    // console.log(email);
    const user = await userService.getUserEmail(email);
    // console.log(user);
    res.json(user);
    // res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add user
exports.addUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    userRole: req.body.userRole
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extracting user ID from route parameters
    // console.log(req.body)
    const { username, password, email, role } = req.body; // Destructuring request body
    console.log(role)
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields if provided in the request body
    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (email) user.email = email;
    if (role) user.role = role;

    // Save updated user
    const updatedUser = await user.save();
    res.json(updatedUser); // Respond with updated user object
  } catch (error) {
    // Handle errors
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
