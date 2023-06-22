const express = require("express");
const router = express.Router();
const flash = require("express-flash")

const { register, login } = require("../controller/auth");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", register);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", login);

module.exports = router;
