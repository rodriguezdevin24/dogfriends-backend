const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  socialLink: String,
  dogs: [{
    ref: 'DogModel',
    type: mongoose.Schema.Types.ObjectId,
  }]
});

module.exports = mongoose.model('OwnerModel', OwnerSchema);