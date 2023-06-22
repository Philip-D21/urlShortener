const express = require("express");
const router = express.Router();

const {
    createShortenUrl,
    getQRImage,
    analytics
   
}= require("../controller/urlController")

router.get("/shorten", async(req,res)=>{
    res.render('main')
})
router.post("/shorten", createShortenUrl);
router.get("/image/:shortId", getQRImage);
router.get("/analytics/:shortId", analytics);





module.exports = router;