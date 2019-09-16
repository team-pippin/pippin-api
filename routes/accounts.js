const express = require('express'),
  router = express.Router(),
  accounts = require('../controllers/accounts'),
  payments = require('../controllers/payments');
  
router.get('/:userId', accounts.getUser);
router.delete('/:userId', accounts.deleteUserAccount);

router.post('/sign-up', accounts.signUp);
router.post('/sign-in', accounts.signIn);

router.put('/:userId/school-subscriptions', accounts.subscribe);
router.delete('/:userId/school-subscriptions/:schoolId', accounts.unSubscribe);

router.post('/:userId/payment-methods', payments.addPaymentMethod);

module.exports = router;