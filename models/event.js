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
  body: {
    type: String,
    required: 'Description cannot be blank'
  },
  title: {
    type: String,
    required: 'Event needs title'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

module.exports = mongoose.model('Event', event);
