const Url = require('../models/url');

const getAllUrl =  async(req, res) => {
  const urls = await Url.find();
  res.json(urls);
};

const createUrl = async (req, res) => {
  const url = req.body.url;
  const shortUrl = await Url.create({ url });
  res.json(shortUrl);
};

const getSingleUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });
  if (!url) {
    res.status(404).send('Not found');
  } else {
    res.redirect(url.url);
  }
};

module.exports ={
    createUrl,
    getAllUrl,
    getSingleUrl,

}
