const express = require("express");
const router = express.Router();
const {redirectToLongUrl }= require("../controller/urlController")

router.route("/").get((req,res) => {
    res.render("main");
});
router.get("/:shortId", redirectToLongUrl);

module.exports = router