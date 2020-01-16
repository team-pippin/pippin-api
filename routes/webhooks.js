const express = require("express"),
  payment = require("../controllers/payments"),
  router = express.Router();

router.post("/stripe/update-customer", payment.stripeUserUpdated);

module.exports = router;
