const Url = require("../models/url");

const createShortUrl = async (req, res) => {
  try {
    const fullUrl = req.body.fullUrl;
    const record = new Url({ 
      full: fullUrl 
    });
    await record.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send({
      message: err.message,
      info:"Internal Server Error"
    });
  }
};

const redirectToFullUrl = async (req, res) => {
  try {
    const shortid = req.params.shortid;
    const rec = await Url.findOne({ short: shortid });

    if (!rec) {
      res.sendStatus(404);
    } else {
      rec.clicks++;
      await rec.save();
      res.redirect(rec.full);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllUrl = async (req, res) => {
  try {
    const allUrl = await Url.find();
    res.render("index", { shortUrls: allUrl });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createShortUrl,
  redirectToFullUrl,
  getAllUrl,
};
