const mongoose = require("mongoose");

const GardenPlotSchema = new mongoose.Schema({
   plotName: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: String, required: true },
  managerId: { type: String, required: true },
  assignedGardeners: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  image: { type: Object,required:true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("gardenplots", GardenPlotSchema);