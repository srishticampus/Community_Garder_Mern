const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true, unique: true },
  resourcesProvided: { type: [String] },
  gardensSupported: [{ type: mongoose.Schema.Types.ObjectId, ref: "Garden" }],
  createdAt: { type: Date, default: Date.now },
});

const Organization = mongoose.model("Organization", OrganizationSchema);
