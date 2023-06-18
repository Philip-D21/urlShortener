const express = require("express");
const router = express.Router();

const {
    createShortUrl,
    getAllUrl,
    redirectToFullUrl
}= require("../controller/urlController")

router.post("/short", createShortUrl);
router.get("/:id", redirectToFullUrl);
router.get("/all", getAllUrl);




module.exports = router;