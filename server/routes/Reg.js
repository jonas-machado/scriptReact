const express = require("express");
const router = express.Router();
const { Reg } = require("../models");

router.post("/", async (req, res) => {
  const user = req.body;
  await Reg.create(user);
  res.json(user);
});

db.query(
  "SELECT * FROM banco.usuarios WHERE email = ?",
  [email],
  (err, response) => {
    if (err) {
      res.send(err);
    }
    if (response.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }
        db.query(
          "INSERT INTO banco.usuarios (email, password, nome) VALUES (?, ?, ?)",
          [email, hash, nome],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            res.send({ msg: "Cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Usuário já cadastrado" });
    }
  }
);
module.exports = router;
