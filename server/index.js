require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("./models");

const orion = require("solar-orionjs")({
  server: "172.16.40.9",
  port: 17778,
  auth: {
    username: "redes2020",
    password: "OT#internet2018",
  },
});

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const axios = require("axios");

const jwt = require("jsonwebtoken");

const { Client, GatewayIntentBits } = require("discord.js");

app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const verifyJWT = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.send("Precisa do token");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.json({ auth: false, msg: "falhou" });
      }
      req.userId = data.id;
      req.userEmail = data.email;
      next();
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Autenticado");
});

// const loginRouter = require("./routes/Login");
// app.use("/post", loginRouter);

app.post("/register2", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const nome = req.body.nome;
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
});

const regRouter = require("./routes/Reg");
app.use("/register", regRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
