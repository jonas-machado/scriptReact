require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Reg } = require("../models");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await Reg.findOne({ where: { email: email } });
  if (user === null) {
    console.log("Not found!");
    return res.status(400).json({ msg: "Usuário não existe" });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(400).json({ msg: "Invalid" });
  const token = jwt.sign({ id: user.iduser }, process.env.JWT_SECRET);
  delete user.password;
  res.status(200).json({ token, user });
});

module.exports = router;
