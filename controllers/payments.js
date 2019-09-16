const stripe = require('stripe')(process.env.STRIPE_KEY),
  { StripeCustomer, CustomerSubscription } = require('../models');

// Need stripe customer_id to create invoices and verify that I can add school
exports.addPaymentMethod = (request, response) => {
  const { source, description, email } = request.body // GET Token

  stripe.customers.create({
    source,
    email,
    description,
    metadata: {
      accountId: request.user.id
    }
  })
  .then(stripeCustomer => {
    let customer = new StripeCustomer({
      account: request.user.id,
      customer_id: stripeCustomer.id
    });

    return customer.save()
  })
  .then(customer => {
    return this.addSubscription(customer, request, response);
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.addSubscription = (customer, request, response) => {
  stripe.subscriptions.create({
    customer: customer.customer_id,
    items: [
      {
        plan: process.env.STRIPE_PIPPIN_MONTHLY_PLAN_ID,
        quantity: 0
      }
    ],
  })
  .then(stripeSubscription => {
    let subscription = new CustomerSubscription({
      account: request.user.id,
      subscription_id: stripeSubscription.id
    })

    console.log(subscription);
    
    return subscription.save()
  })
  .then(subscription => {
    console.log(subscription);
    
    return response.status(201).json({customer, subscription}); 
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}


exports.stripeUserUpdated = (request, response) => {
  stripe.subscriptions.create({
    customer: customer.customer_id,
    items: [
      {
        plan: process.env.STRIPE_PIPPIN_MONTHLY_PLAN_ID,
        quantity: 0
      }
    ],
  })
  .then(newSubscription => {    
    console.log(newSubscription);
    
    let subscription = new CustomerSubscription({ ...newSubscription, subscription_id: newSubscription.id});
    return subscription.save()
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

module.exports = exports