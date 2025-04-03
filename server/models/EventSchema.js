const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: "Garden", required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now }
  });

  const Event = mongoose.model("events", EventSchema);
  module.exports=Event