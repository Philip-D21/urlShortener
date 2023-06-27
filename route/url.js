const express = require("express");
const router = express.Router();
const { authenticate} = require("../middleware/authentication")

const {
    createShortenUrl,
    getQRImage,
    analytics
}= require("../controller/urlController")

router.get("/shorten", async(req,res)=>{
    res.render('main')
})

router.post("/shorten", authenticate, createShortenUrl);


router.get("/image/:shortId",authenticate, getQRImage);


router.get("/analytics/:shortId", authenticate, analytics);





module.exports = router;