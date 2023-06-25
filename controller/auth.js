const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async (req, res,next) => {
    try {
      const { username, email, password } = req.body;
  
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).json({
          status: 'failed',
          message: 'Email already exists in the database',
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.redirect("/api/auth/login");
    //   res.status(201).json({
    //     status: 'success',
    //     data: newUser,
    //   });


    } catch (err) {
    // return res.status(500).json({
    // message: err.message,
    // });
        next(err)
    }
  }

const login = async (req, res) => {
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
   // res.redirect("/api/url/shorten")
    return res.status(200).json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  register,
  login,
};
