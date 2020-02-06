const express = require("express"),
  router = express.Router(),
  accounts = require("../controllers/accounts"),
  auth = require("../middleware/auth"),
  payments = require("../controllers/payments");

router.post("/sign-up", accounts.signUp);
router.post("/sign-in", accounts.signIn);

router.get(
  "/:userId",
  auth.isAuthenticated,
  auth.isAuthorized,
  accounts.getUser
);

router.get(
  "/:userId/school-subscriptions",
  auth.isAuthenticated,
  auth.isAuthorized,
  accounts.getUserSubscribedSchools
);

router.get(
  "/:userId/managed-schools",
  auth.isAuthenticated,
  auth.isAuthorized,
  accounts.getManagedSchools
);

router.delete(
  "/:userId",
  auth.isAuthenticated,
  auth.isAuthorized,
  accounts.deleteUserAccount
);

router.put(
  "/:userId/school-subscriptions",
  auth.isAuthenticated,
  auth.isAuthorized,
  accounts.subscribe
);
router.delete(
  "/:userId/school-subscriptions/:schoolId",
  auth.isAuthenticated,
  auth.isAuthorized,
  accounts.unSubscribe
);

router.post(
  "/:userId/payment-methods",
  auth.isAuthenticated,
  auth.isAuthorized,
  payments.addPaymentMethod
);

module.exports = router;
