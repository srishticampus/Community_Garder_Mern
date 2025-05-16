const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  tasktype:{ type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  plotId: { type: mongoose.Schema.Types.ObjectId, ref: "gardenplots", required: true },
  gardenerId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "managers", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("tasks", TaskSchema);