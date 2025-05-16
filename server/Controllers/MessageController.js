const Chat = require("../models/MessageSchema");
const GardenPlot = require("../models/Gardenploatschema");

exports.sendMessage = async (req, res) => {
  try {
    const { plotId, senderId, senderModel, message } = req.body;

    if (!["users", "managers"].includes(senderModel)) {
      return res.status(400).json({ message: "Invalid sender type." });
    }

    const plot = await GardenPlot.findById(plotId);
    if (!plot) {
      return res.status(404).json({ message: "Plot not found." });
    }

    const isGardenerAssigned = plot.assignedGardeners.some(
      (gardenerId) => gardenerId.toString() === senderId
    );

    const isManagerAssigned = plot.managerId?.toString() === senderId;

    if (
      (senderModel === "users" && !isGardenerAssigned) ||
      (senderModel === "managers" && !isManagerAssigned)
    ) {
      return res.status(403).json({ message: "You are not authorized to chat for this plot." });
    }

    let chat = await Chat.findOne({ plotId });

    if (!chat) {
      chat = new Chat({
        plotId,
        managerId: plot.managerId,
        gardenerId: plot.assignedGardeners[0], // optional, or remove if not needed
        messages: [],
      });
    }

    chat.messages.push({ senderId, senderModel, message });
    await chat.save();

    res.status(200).json({ message: "Message sent.", chat });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getPlotChat = async (req, res) => {
  try {
    const { plotId } = req.params;
    const chat = await Chat.findOne({ plotId })
      .populate("gardenerId", "fullName profilePic")
      .populate("managerId", "fullName profilePic")
      .populate("messages.senderId", "fullName profilePic");

    if (!chat) return res.status(404).json({ message: "No chat found for this plot." });

    res.status(200).json(chat);
  } catch (err) {
    console.error("Fetch chat error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getPlotChat = async (req, res) => {
    try {
        const { plotId } = req.params;
        const chat = await Chat.findOne({ plotId })
            .populate("gardenerId", "fullName profilePic")
            .populate("managerId", "fullName profilePic")
            .populate("messages.senderId", "fullName profilePic");

        if (!chat) return res.status(404).json({ message: "No chat found for this plot." });

        res.status(200).json(chat);
    } catch (err) {
        console.error("Fetch chat error:", err);
        res.status(500).json({ message: "Server error." });
    }
};
