const Url = require("../models/url");
const validUrl = require("valid-url");
const shortid = require("shortid");
const QRCode = require("qrcode");

const path = require("path");
require("dotenv").config();




// function to generate QR code 
const generateQRCode = async (shortId) => {
  if (!shortId) {
    return res.status(409).json({ message: "Please provide the shortId!" });
  }
  try {
    await QRCode.toFile(
      `./QRCodes/${shortId}.png`,
      `${process.env.Base_URL}/${shortId}`,
      {
        errorCorrectionLevel: "H",
      }
    );
  } catch (error) {
    console.log(error);
  }
};


// function to shorten long URL 
const createShortenUrl = async (req, res) => {
  try {
    const { longUrl, customUrl } = req.body;

    // Validate URL
    if (!longUrl || !validUrl.isUri(longUrl)) {
      return res.status(409).json({ message: "Wrong URL format!" });
    }

    // Check if custom URL is already taken
    if (customUrl) {
      const existingUrl = await Url.findOne({ customUrl });
      if (existingUrl) {
        return res.status(409).json({ message: "Custom URL is already taken!" });
      }
    }

    let url = await Url.findOne({ longUrl });
       if (url) {
          return res.status(200).json(url);
       } else {
     
      const shortId = customUrl || shortid.generate();
      const shortUrl = process.env.Base_URL + "/" + shortId;

      url = await Url.create({
        longUrl,
        shortUrl,
        shortId,
        userId: req.user.id,
        customUrl: customUrl || null,
      });

      generateQRCode(shortId);

      return res.status(201).json({
        url,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// //get all urls
// const getAllUrl = async(req,res) => {
//   try {
//     const urls = await Url.find({});
//     return res.status(200).json({
//       urls
//     });
//   } catch (error) {
//      return res.status(500).json({
//        message: error.message,
//        status: "failed"
//     })
//   };
// }

// const redirectToLongUrl = async (req, res) => {
//   try {
//     const { shortId } = req.params;
//     const url = await Url.findOne({ shortId });

//     if (url) {
//       return url.clicks++;
//     }
//     await url.save();
//     return res.redirect(url.longUrl);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const analytics = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find the URL entry in the database based on the shortId
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.status(200).json({
      clicks: url.clicks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


// const getQRImage = async (req, res) => {
//   try {
//     const { shortId } = req.params;

//     if (!shortId) {
//       return res.status(400).json({ message: "Please provide the shortId!" });
//     }
//     const url = await Url.findOne({ shortId });
//     if (!url) {
//       return res
//         .status(400)
//         .json({
//           message: "QR code image does not exist for the provided shortId!",
//         });
//     }

//     const qrCodeImagePath = path.join(
//       __dirname,
//       "..",
//       "QRCodes",
//       `${shortId}.png`
//     );

//     return res.sendFile(qrCodeImagePath, (err) => {
//       if (err) {
//         console.error("Error sending QR code image:", err);
//         return res
//           .status(500)
//           .json({ message: "Failed to send QR code image!" });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };



// const getClickCount = async (req, res) => {
//   const { shortUrl } = req.body;

//   try {
//     const url = await Url.findOne({ shortUrl }).populate('clicks');
//     const clickCount = url.clicks.length;
//     res.status(200).json({ clickCount });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to get click count' });
//   }
// };



module.exports = {
  createShortenUrl,
  getAllUrl,
  analytics,
};
