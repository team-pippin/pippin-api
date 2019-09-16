const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var school = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be blank'
  },
  city: {
    type: String,
    required: 'City cannot be blank'
  },
  state: {
    type: String,
    required: 'State cannot be blank'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  }
});

var School = mongoose.model('School', school);

module.exports = School;
