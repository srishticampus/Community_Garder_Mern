const mongoose = require("mongoose");

const GardenPlotSchema = new mongoose.Schema({
  gardenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garden",
    required: true,
  },
  plotNumber: { type: String, required: true },
  gardenerId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  plantingSchedule: {
    cropType: String,
    plantingDate: Date,
    estimatedHarvest: Date,
  },
  maintenanceTasks: { type: [String] },
  harvestRecords: [{ crop: String, quantity: Number, harvestDate: Date }],
  status: {
    type: String,
    enum: ["available", "assigned", "inactive"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const GardenPlot = mongoose.model("GardenPlot", GardenPlotSchema);
module.exports = GardenPlot;
