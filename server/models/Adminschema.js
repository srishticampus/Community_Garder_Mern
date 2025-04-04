const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    role: { type: String, enum: ["superadmin", "moderator"], required: true },
    permissions: { type: [String] },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Admin = mongoose.model("admin", AdminSchema);
  module.exports=Admin