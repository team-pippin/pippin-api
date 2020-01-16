const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var stripeCustomer = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  },
  customer_id: {
    type: String,
    required: true
  }
});

var StripeCustomer = mongoose.model("StripeCustomer", stripeCustomer);

module.exports = StripeCustomer;
