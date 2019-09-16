const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let event = new Schema({
  location: {
    type: String,
    required: 'Event needs a location'
  },
  startDate: {
    type: Date,
    required: 'Event needs start date'
  },
  endDate: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: 'Description cannot be blank'
  },
  title: {
    type: String,
    required: 'Event needs title'
  }
});

module.exports = mongoose.model('Event', event);
