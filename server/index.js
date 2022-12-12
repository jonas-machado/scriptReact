require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const verifyJWT = (req, res, next) => {
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
