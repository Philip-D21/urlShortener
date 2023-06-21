const express = require("express");
const router = express.Router();

const {
    createShortenUrl,
    visitUrl
}= require("../controller/urlController")

router.post("/shorten", createShortenUrl);
router.get("/:shortId", visitUrl);

// router.get("/all", getAllUrl);




module.exports = router;