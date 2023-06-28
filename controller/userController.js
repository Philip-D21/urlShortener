const User = require("../models/user");
const Url = require("../models/url")


// get all url by use
const getLinkHistory = async (req, res) => {
    try {
      
      const userId = req.user.id;
      
      const linkHistory = await Url.find({ userId });
  
      if ( linkHistory.length > 0) {
        return res.Status(200).json({ 
          status: "link history retrieved",
          data: linkHistory,
        });
      } else {
        return res.status(404).json({ message: 'No URLs found for the user' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};
  

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



// get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = {
    getLinkHistory,
    getUserById,
    getAllUsers,
}
