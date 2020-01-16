const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let appConfig = new Schema({
  defaultImageUrl: {
    type: String,
    required: "Default Image URL cannot be null"
  },
  primaryColor: {
    type: String,
    required: "primaryColor cannot be null"
  },
  secondaryColor: {
    type: String,
    required: "secondaryColor cannot be null"
  },
  features: {
    type: [Number],
    required: "Feature cannot be null"
  }
});

module.exports = mongoose.model("AppConfig", appConfig);
