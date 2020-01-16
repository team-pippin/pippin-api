const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var customerSubscription = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  },
  subscription_id: {
    type: String,
    required: true
  },
  usage: {
    type: Number,
    required: true,
    default: 0
  }
});

var CustomerSubscription = mongoose.model(
  "CustomerSubscription",
  customerSubscription
);

module.exports = CustomerSubscription;
