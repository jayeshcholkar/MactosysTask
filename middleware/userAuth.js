const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: `Error occur ${err.message}`,
        });
      } else {
        req.user = decoded.userData;
        console.log(decoded);
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }
};

module.exports = validateToken;
