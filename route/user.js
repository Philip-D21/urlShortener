const express = require("express");
const router = express.Router();


const { register, login } = require("../controller/auth");
const { getAllUrlsByUser } = require("../controller/userController");

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

  router.get('/user/:userId/urls', getAllUrlsByUser);



module.exports = router;
