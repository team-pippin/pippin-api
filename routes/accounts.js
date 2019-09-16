const express = require('express'),
  router = express.Router(),
  accounts = require('../controllers/accounts'),
  auth = require('../middleware/auth'),
  payments = require('../controllers/payments');
  
router.get('/:userId', auth.isAuthorized, accounts.getUser);
router.delete('/:userId', auth.isAuthorized, accounts.deleteUserAccount);

router.post('/sign-up', accounts.signUp);
router.post('/sign-in', accounts.signIn);

router.put('/:userId/school-subscriptions', auth.isAuthorized, accounts.subscribe);
router.delete('/:userId/school-subscriptions/:schoolId', auth.isAuthorized, accounts.unSubscribe);

router.post('/:userId/payment-methods', auth.isAuthorized, payments.addPaymentMethod);

module.exports = router;