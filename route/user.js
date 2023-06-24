const express = require("express");
const router = express.Router();
const { authenticate} = require("../middleware/authentication")

const { register, login } = require("../controller/auth");
const { userProfileAndHistory } = require("../controller/userController");

router.get("/signup", (req, res) => {
  res.render("signup");

  
});

router.post("/signup", register);


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",  login);

router.get("/history/:userId", (req, res) => {
    res.render("link history");
  });

router.get("/history/:userId", userProfileAndHistory);



module.exports = router;
