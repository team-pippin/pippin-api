const Account = require("./account"),
  Link = require("./link"),
  Article = require("./article"),
  Event = require("./event"),
  School = require("./school"),
  AppConfig = require("./appConfig"),
  StripeCustomer = require("./stripe-customer"),
  CustomerSubscription = require("./customer-subscription"),
  mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dbName: "test"
});
mongoose.Promise = Promise;

module.exports = {
  Account,
  Link,
  Article,
  Event,
  School,
  AppConfig,
  StripeCustomer,
  CustomerSubscription
};
