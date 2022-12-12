require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

const orion = require("solar-orionjs")({
  server: "172.16.40.9",
  port: 17778,
  auth: {
    username: "redes2020",
    password: "OT#internet2018",
  },
});

const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
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

const regRouter = require("./routes/Reg");
app.use("/register", regRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
