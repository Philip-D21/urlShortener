const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/auth");

router.get("/signup", (req, res) => {
  res.render("signup", { message: "" });
});

router.post("/signup", register);

router.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

router.post("/login", login);

module.exports = router;
