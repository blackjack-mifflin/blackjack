const requireUser = (req, res, next) => {
  console.log(`this is require user`, req.userId);
  if (req.userId) {
    next();
  } else {
    res.status(401).send({ message: "User unauthorized" });
  }
};

module.exports = {
  requireUser,
};
