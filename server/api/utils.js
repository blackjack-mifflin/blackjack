const jwt = require("jsonwebtoken");

const requireUser = (req, res, next) => {
  const token = req.headers.authorization;
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
