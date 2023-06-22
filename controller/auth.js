const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async (req, res,next) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user with the same email already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).json({
          status: 'failed',
          message: 'Email already exists in the database',
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        status: 'success',
        data: newUser,
      });


    // Redirect to login page after successful signup
    res.redirect("/api/auth/login");


    } catch (err) {
    // return res.status(500).json({
    // message: err.message,
    // });
        next(err)
    }
  }

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password',
      });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.status(200).json({
      message: 'Login successful',
      token,
    });

res.redirect("/landing")
  } catch (err) {
    // return res.status(500).json({
    //   message: err.message,
    // });
    next(err);
  }
};

module.exports = {
  register,
  login,
};
