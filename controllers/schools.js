const { School, Account, CustomerSubscription, StripeCustomer } = require('../models'),
  { stripe } = require('../util/stripe');

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

  const { name, city, state, postalCode } = request.body;
  let school = new School({
    name,
    city,
    state,
    postalCode,
    owner
  })

  school.save()
  .then(school => {
    newSchool = school
    return setUserRole(owner, school.id);
  })
  .then(account => {
    return setUserUsage(account.id);
  })
  .then(subscription => {
    return setStripeUsage(subscription);
  })
  .then(() => {
    return getStripeCustomer(owner);
  })
  .then(customer => {
    return createInvoice(customer.customer_id);
  })
  .then(invoice => {
    return finalizeInvoice(invoice);
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
  return Account.findByIdAndUpdate(userId, { $push: { roles: role } })
}

const setUserUsage = (userId) => {
  return CustomerSubscription.findOneAndUpdate(
    { account: userId }, 
    { $inc: { usage: 1 } },
    { new: true }
  ) // increments usage by 1
}

const setStripeUsage = (subscription) => {
  let quantity = subscription.usage
  console.log(subscription.usage);
  
  return stripe.subscriptions.update(subscription.subscription_id, { quantity })  // update stripe account
}

const getStripeCustomer = (userId) => {
  return StripeCustomer.findOne({ account: userId })
}

const createInvoice = (customer) => {
  return stripe.invoices.create({ customer })
}

const finalizeInvoice = (invoice) => {
  return stripe.invoices.finalizeInvoice(invoice.id, { auto_advance: true })
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