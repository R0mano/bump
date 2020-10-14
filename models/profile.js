const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;


// const pictureSchema = new Schema({
//   type: String,

// }, {
//   timestamps: true,
// });



const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  username: {
    type: String,
    required: true,
    maxlength: 50,
    unique:true
    // get name from user.name?
  },
  dob: {
    type: Date,
    max: function() {
      return new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toDateString();
    },
    required: true
  },
  bio: {
    type: String,
    maxlength: 300
  },
  status: {
    type: String,
    maxlength: 100
  },
  avatar: String,
  contacts: {
    type: [Schema.Types.ObjectId],
    ref: 'Profile'
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);