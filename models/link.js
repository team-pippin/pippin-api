const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let link = new Schema({
  linkUrl: {
    type: String,
    required: 'Link needs a url'
  },
  title: {
    type: String,
    required: 'Link needs a title'
  }
});

module.exports = mongoose.model('Link', link);
