const { stripe } = require("../util/stripe"),
  { StripeCustomer, CustomerSubscription } = require("../models");

exports.addPaymentMethod = async (request, response) => {
  const { source } = request.body; // GET Token

  // TODO: - Check to see if the customer has already been created
  try {
    const stripeCustomer = await stripe.customers.create({
      source: source,
      email: request.user.email,
      description: request.user.name,
      metadata: {
        accountId: request.user.id
      }
    });

    const customer = await new StripeCustomer({
      account: request.user.id,
      customer_id: stripeCustomer.id
    }).save();

    return await this.addSubscription(customer, request, response);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.addSubscription = async (customer, request, response) => {
  try {
    const stripeSubscription = await stripe.subscriptions.create({
      customer: customer.customer_id,
      items: [
        {
          plan: process.env.STRIPE_PIPPIN_MONTHLY_PLAN_ID,
          quantity: 0
        }
      ]
    });

    const subscription = await new CustomerSubscription({
      account: request.user.id,
      subscription_id: stripeSubscription.id
    }).save();

    return response.status(201).json({ customer, subscription });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.stripeUserUpdated = async (request, response) => {
  try {
    const newSubscription = await stripe.subscriptions.create({
      customer: customer.customer_id,
      items: [
        {
          plan: process.env.STRIPE_PIPPIN_MONTHLY_PLAN_ID,
          quantity: 0
        }
      ]
    });

    return await new CustomerSubscription({
      ...newSubscription,
      subscription_id: newSubscription.id
    }).save();
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = exports;
