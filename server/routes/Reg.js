const express = require("express");
const router = express.Router();
const { Reg } = require("../models");

router.post("/", async (req, res) => {
  const user = req.body;
  await Reg.create(user);
  res.json(user);
});

module.exports = router;
