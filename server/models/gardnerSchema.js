var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  profilePic: {
    type: Object,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPass: {
    type: String,
    required: true,
  },
  yearofexperience: {
    type: Number,
    required: true,
  },
  availabletime: {
    type: String,
    required: true,
  },

  preferedcrops: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
