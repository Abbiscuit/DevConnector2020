const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // headerからtokenを取得
  const token = req.header("x-auth-token");

  // tokenが存在するかチェック
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied"
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
