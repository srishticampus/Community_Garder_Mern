const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "managers", required: true },
  eventName: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  // organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  endDate: { type: Date, required: true },
  eventType: {type: String, required: true},
  image: { type: Object, required: true },
  venue:{type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model("events", EventSchema);
module.exports = Event