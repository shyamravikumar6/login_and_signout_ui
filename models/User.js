const mongoose = require('mongoose');
const { text } = require('express');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userAdd:{
 type:String,
  default:null
  },
  useremail:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userNum:{
   type:Number,
    required:true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
