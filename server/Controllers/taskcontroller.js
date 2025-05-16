const Task = require("../models/TaskSchema");

// Create and assign task to a gardener
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
        tasktype:req.body.taskType,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status || "Pending",
      plotId: req.body.plotId,
      gardenerId: req.body.gardenerId,
      createdBy: req.body.createdBy, // managerId
    });

    const savedTask = await newTask.save();

    res.status(201).json({ success: true, data: savedTask });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// View tasks by assigned gardener
exports.getTasksByGardener = async (req, res) => {
  try {
    const tasks = await Task.find({ gardenerId: req.params.gardenerId }).populate("plotId");
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Gardener updates task status (e.g., "Completed", "In Progress")
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Edit task (manager can update title, description, due date, status)
exports.editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.getSingleTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Manager view all tasks they created (including updates)
exports.getTasksByManager = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.managerId })
      .populate("plotId")
      .populate("gardenerId");

    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
