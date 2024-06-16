const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function registerUser(username, email, password, role) {
  try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log(username, email, hashedPassword, role);

      // Create user
      const user = new User({ username, email, password: hashedPassword, role });
      await user.save();
  } catch (error) {
      // Handle error appropriately
      console.error("Error registering user:", error);
      throw new Error("Failed to register user");
  }
}

async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        'secret_key',
        { expiresIn: 7200 } // 7200 seconds = 2 hours
      );
      
    return token;
}

async function getUserByEmail(email){
    const user = await User.findOne({email});
    if(user){
       return user;
    }
    else{
        throw new Error('User not found');
    }
}

module.exports = { registerUser, loginUser, getUserByEmail };
