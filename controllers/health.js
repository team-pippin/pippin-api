exports.getHealth = (request, response) => {
  response.status(200).json({ message: "Okay" });
};

module.exports = exports;
