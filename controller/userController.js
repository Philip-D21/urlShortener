const User = require("../models/user");
const Url = require("../models/url")



const userProfileAndHistory = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const urls = await Url.find({ userId });
  
      res.status(200).json({
        status: 'OK',
        data: urls
     });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  



module.exports = {
    userProfileAndHistory
}
