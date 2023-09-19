const jwt = require("jsonwebtoken");

const requireUser = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;
  console.log("this is token from requireuser", token)
  const userId = jwt.verify(token, process.env.JWT).id;
  if (userId) {
    next();
  } else {
    res.status(401).send({ message: "User unauthorized" });
  }
};

module.exports = {
  requireUser,
};
