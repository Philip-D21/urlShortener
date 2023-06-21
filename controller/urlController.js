const Url = require("../models/url");
const validUrl = require('valid-url');
const shortid = require('shortid');
const QRCode = require("qrcode")
const path = require("path");
require("dotenv").config();



const generateQRCode = async (shortId) => {
  try {
    // Generate the QR code
    const qrCodeData = await QRCode.toDataURL(shortId);

    // Save the QR code image to a file
    const qrCodeImagePath = path.join(__dirname,'..','QRCodes','qrcode.png');
    await QRCode.toFile(qrCodeImagePath, shortId);

    return qrCodeImagePath;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};




const createShortenUrl = async (req, res) => {
  try {
    // Extract the long URL from the request body
    const { longUrl } = req.body;

    // Check if the long URL is provided and valid
    if (!longUrl || !validUrl.isUri(longUrl)) {
      return res.status(409).json({ message: 'Wrong URL format!' });
    }

    // Check if the URL already exists in the database
    let url = await Url.findOne({ longUrl });
    if (url) {
      // Send the existing URL as the response
      return res.status(200).json(url);
    }

    // Generate a new shortId and shortUrl
    const shortId = shortid.generate();
    const shortUrl = `${process.env.Base_URL}/${shortId}`;

    // Generate the QR code
    const qrCodeImagePath = await generateQRCode(shortId);

    // Create a new URL entry in the database
    url = await Url.create({ longUrl, shortUrl, shortId });

    // Send the newly created URL as the response
    return res.status(201).json({ 
      url,
      qrCodeImagePath,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const redirectToLongUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find the URL entry in the database based on the shortId
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Increment the click count
    url.clicks++;
    await url.save();

    // Redirect to the long URL
    return res.redirect(url.longUrl);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const analytics = async(req, res) => {
  try {
    const { shortId } = req.params;

    // Find the URL entry in the database based on the shortId
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Return the analytics data
    return res.status(200).json({
      clicks: url.clicks,
      // other analytics data you want to provide
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




const getQRImage = async (req, res) => {
  try {
    const { shortId } = req.params;

    if (!shortId) {
      return res.status(400).json({ message: "Please provide the shortId!" });
    }

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(400).json({ message: "QR code image does not exist for the provided shortId!" });
    }

    const qrCodeImagePath = path.join(__dirname, '..','QRCodes', `${shortId}.png`);

    return res.sendFile(qrCodeImagePath, (err) => {
      if (err) {
        console.error('Error sending QR code image:', err);
        return res.status(500).json({ message: "Failed to send QR code image!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createShortenUrl,
  redirectToLongUrl,
  analytics,
  getQRImage,
};













































// const createShortUrl = async (req, res) => {
//   try {
//     const fullUrl = req.body.fullUrl;
//     const record = new Url({ 
//       full: fullUrl 
//     });
//     await record.save();
//     res.redirect("/");
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//       info:"Internal Server Error"
//     });
//   }
// };

// const redirectToFullUrl = async (req, res) => {
//   try {
//     const shortid = req.params.shortid;
//     const rec = await Url.findOne({ short: shortid });

//     if (!rec) {
//       res.sendStatus(404);
//     } else {
//       rec.clicks++;
//       await rec.save();
//       res.redirect(rec.full);
//     }
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// };

// const getAllUrl = async (req, res) => {
//   try {
//     const allUrl = await Url.find();
//     res.render("index", { shortUrls: allUrl });
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   createShortUrl,
//   redirectToFullUrl,
//   getAllUrl,
// };
