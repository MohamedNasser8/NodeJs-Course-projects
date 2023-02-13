const notFound = (req, res, next) => {
  return res.status(404).send("Route not found");
};

module.exports = notFound;
