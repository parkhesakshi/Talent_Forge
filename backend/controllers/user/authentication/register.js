const { generateToken } = require("../../../utils/generatetoken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user/user");

exports.register = async (req, res) => {
  try {
    const { email, username, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 12);

    // Check if the email already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address is already in use. Please try a different email address.",
      });
    }

    // Create a new user with hashed password
    const user = await new User({
      email,
      username,
      password: encryptedPassword,
    }).save();

    // Generate JWT token for user authentication
    const token = generateToken({ id: user._id.toString() }, "7d");

    // Respond with success message and token
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
      verified: user.verified,
      success: true,
      message:
        "Registration completed successfully! Please check your email for verification.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};


