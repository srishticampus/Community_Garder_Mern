const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["gardener", "manager", "admin", "organization"],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  contactNumber: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const users = mongoose.model("users", UserSchema);
module.exports=users