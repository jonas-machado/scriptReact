const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Reg } = require("../models");

router.post("/", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, saltRounds, async (err, hash) => {
      const [register, created] = await Reg.findOrCreate({
        where: { email: email },
        defaults: { email: email, name: name, password: hash },
      });
      if (created) {
        res.status(201).json({ msg: "Cadastrado com sucesso", data: created });
      } else {
        res.json({ msg: "Usuário já cadastrado", data: register });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
