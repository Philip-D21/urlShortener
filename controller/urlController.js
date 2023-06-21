const Url = require("../models/url");
const validUrl = require('valid-url');
const shortid = require('shortid');
const QRCode = require("qrcode")
const path = require("path");
require("dotenv").config();



const generateQRCode = (shortId, res) => {
  return new Promise((resolve, reject) => {
    if (!shortId) {
      return reject(new BadRequestError('Please provide the shortId!'));
    }

    QRCode.toFile(`./QRCodes/${shortId}.png`, `${process.env.Base_URL}/${shortId}`, {
      errorCorrectionLevel: 'H'
    }, (error) => {
      if (error) {
        return reject(error);
      }

      // Send the response indicating successful QR code generation
      return resolve(res.status(200).json({ message: 'QR code generated successfully' }));
    });
  });
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
      // Generate a QR code for the existing shortId
      generateQRCode(url.shortId, res);

      // Send the existing URL as the response
      return res.status(201).json(url);
    }

    // Generate a new shortId and shortUrl
    const shortId = shortid.generate();
    const shortUrl = `${process.env.Base_URL}/${shortId}`;

    // Create a new URL entry in the database
    url = await Url.create({ longUrl, shortUrl, shortId });

    // Generate a QR code for the new shortId
    generateQRCode(shortId, res);

    // Send the newly created URL as the response
    return res.status(201).json({ url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const visitUrl = async (req, res) => {
  try {
    // Extract the shortId from the request parameters
    const { shortId } = req.params;

    // Find the URL entry in the database based on the shortId
    const url = await Url.findOne({ shortId });

    // Check if the URL exists
    if (!url) {
      throw new NotFoundError("URL doesn't exist");
    }

    // Redirect the user to the original longUrl
    return res.redirect(url.longUrl);
  } catch (error) {
    console.log(error);
    // Handle the error and send an appropriate response
    return res.status(404).json({ error: error.message });
  }
};


module.exports = {
  createShortenUrl,
  visitUrl,
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
