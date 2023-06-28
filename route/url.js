const express = require("express");
const router = express.Router();
const { authenticate} = require("../middleware/authentication")

const {
    createShortenUrl,
    handleUrlAnalytics,
}= require("../controller/urlController")

router.get("/shorten", async(req,res)=>{
    res.render('main')
})

router.post("/shorten", authenticate, createShortenUrl);


router.get("/analytics/:shortId", authenticate, handleUrlAnalytics);





module.exports = router;