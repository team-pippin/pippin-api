const { School, Account, CustomerSubscription, StripeCustomer } = require('../models'),
  stripe = require('../util/stripe');

exports.getAllSchools = (request, response) => {

  School.find()
  .then(schools => {
    response.status(200).json(schools)
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.postNewSchool = (request, response) => {
  let owner = request.user.id
  let newSchool;

  const { name, city, state } = request.body;
  let school = new School({
    name,
    city,
    state,
    owner
  })

  school.save()
  .then(school => {
    newSchool = school
    return setUserRole(owner, school.id)
  })
  .then(() => {
    return chargeCustomer(owner)
  })
  .then(() => {
    return response.status(201).json(newSchool);
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

const setUserRole = (userId, school) => {
  const role = { school, role: 'ADMIN' }
  Account.findByIdAndUpdate(userId, { $push: role })
  .then(account => {
    return setUserUsage(account.id)
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

const setUserUsage = (userId) => {
  return CustomerSubscription.findOneAndUpdate({ account: userId }, { $inc: { usage: 1 } }) // increments usage by 1
}

const setStripeUsage = (subscription) => {
  let quantity = subscription.usage
  return stripe.subscriptions.update(subscription.subscription_id, { quantity })  // update stripe account
}

const chargeCustomer = (userId) => {
  StripeCustomer.findOne({ account: userId })
  .then(stripeCustomer => {
    let customer = stripeCustomer.customer_id;
    return stripe.invoices.create({ customer })
  })
  .then(invoice => {
    return stripe.invoices.finalizeInvoice(invoice.id, { auto_advance: true })
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.getSchoolById = (request, response) => {
  School.findById(request.params.schoolId)
  .then(school => {
    response.status(200).json(school)
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.putSchoolById = (request, response) => {
  
}

module.exports = exports