const express = require("express");
const router = express.Router();

const {
    createUrl,
    getAllUrl,
    getSingleUrl
}= require("../controller/urlController")

router.post("/", createUrl);
router.get("/:id", getSingleUrl);
router.get("/", getAllUrl);




module.exports = router;