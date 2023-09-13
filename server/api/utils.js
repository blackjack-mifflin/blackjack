const requireUser = (req, res, next) => {
    req.userId ? next() : res.status(401).send({ message: "User unauthorized" });
};

module.exports = {
    requireUser,
}