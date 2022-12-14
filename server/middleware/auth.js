const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(403).json("Access denied");
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.json({ auth: false, msg: "Not authorizated" });
    }
    req.user = verified;
    next();
  });
};

module.exports = verifyJWT;
