
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: "Garden", required: true },
    taskType: { type: String, enum: ["weeding", "watering", "composting"], required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    dueDate: { type: Date },
    status: { type: String, enum: ["pending", "completed"], required: true },
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    createdAt: { type: Date, default: Date.now }
  });


  const Task = mongoose.model("tasks", TaskSchema);
  module.exports=Task