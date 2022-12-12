const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Reg } = require("../models");

router.post("/", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    const [register, created] = await Reg.findOrCreate({
      where: { email: email },
      defaults: { email: email, name: name, password: hash },
    });
    if (created) {
      res.json("new");
    } else {
      res.json({ msg: "Already on DB", data: register });
    }
  });
});

module.exports = router;
