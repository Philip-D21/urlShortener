const User = require("../models/user");
const Url = require("../models/url")



  

  const getAllUrlsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const urls = await Url.find({ userId });
  
      if (urls.length > 0) {
        return res.json(urls);
      } else {
        return res.status(404).json({ message: 'No URLs found for the user' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  



module.exports = {
    userProfileAndHistory
}
