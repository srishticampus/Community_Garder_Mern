var mongoose = require("mongoose");

var ManagerSchema = mongoose.Schema({
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
  // confirmPass: {
  //   type: String,
  //   required: true,
  // },
  yearofexperience: {
    type: Number,
    required: true,
  },
 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const managers = mongoose.model("managers", ManagerSchema);

module.exports = managers;
