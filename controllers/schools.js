const {
    School,
    Account,
    CustomerSubscription,
    StripeCustomer
  } = require("../models"),
  { stripe } = require("../util/stripe");

exports.postNewSchool = async (request, response) => {
  let owner = request.user.id;

  const { name, city, state, postalCode } = request.body;
  let school = new School({
    name,
    city,
    state,
    postalCode,
    owner
  });

  try {
    const savedSchool = await school.save();
    const account = await setUserRole(owner, school.id);
    const subscription = await setUserUsage(account.id);
    await setStripeUsage(subscription);
    const customer = await getStripeCustomer(owner);
    const invoice = await createInvoice(customer.customer_id);
    await finalizeInvoice(invoice);
    return response.status(201).json(savedSchool);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

const setUserRole = (userId, school) => {
  const role = { school, role: "ADMIN" };
  return Account.findByIdAndUpdate(userId, { $push: { roles: role } }).exec();
};

const setUserUsage = userId => {
  return CustomerSubscription.findOneAndUpdate(
    { account: userId },
    { $inc: { usage: 1 } },
    { new: true }
  ); // increments usage by 1
};

const setStripeUsage = subscription => {
  let quantity = subscription.usage;
  console.log(subscription.usage);

  return stripe.subscriptions.update(subscription.subscription_id, {
    quantity
  }); // update stripe account
};

const getStripeCustomer = userId => {
  return StripeCustomer.findOne({ account: userId });
};

const createInvoice = customer => {
  return stripe.invoices.create({ customer });
};

const finalizeInvoice = invoice => {
  return stripe.invoices.finalizeInvoice(invoice.id, { auto_advance: true });
};

exports.getSchoolById = async (request, response) => {
  try {
    const school = await School.findById(request.params.schoolId);
    response.status(200).json(school);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.querySchoolList = async (request, response) => {
  const query = request.query["name"];

  if (!query || (query === "" && query.length < 3)) {
    response.status(500).json({ error: "Invalid search query" });
    return;
  }

  const searchKey = new RegExp(escapeRegex(query), "gi");
  try {
    const schools = await School.find({ name: searchKey }).exec();
    response.status(200).json(schools);
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.putSchoolById = (request, response) => {};

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = exports;
