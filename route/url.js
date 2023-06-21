const express = require("express");
const router = express.Router();

const {
    createShortenUrl,
    redirectToLongUrl
}= require("../controller/urlController")

router.post("/shorten", createShortenUrl);
router.get("/:shortId", redirectToLongUrl);




module.exports = router;