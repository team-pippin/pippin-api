const express = require("express"),
  router = express.Router(),
  health = require("../controllers/health");

router.get("/", health.getHealth);

module.exports = router;
