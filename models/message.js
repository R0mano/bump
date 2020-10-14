const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

  from: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  body: {
    type: String,
    minlength: 1,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);