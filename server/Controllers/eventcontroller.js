const Event = require("../models/EventSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

exports.uploadimg = multer({ storage: storage }).single("image");

exports.addEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      venue,
      description,
      startDate,
      endDate,
      managerId,
    } = req.body;

    const image = req.file

    if (!image) {
      return res.status(400).json({ error: "Image is required." });
    }

    const newEvent = new Event({
      eventName,
      eventType,
      venue,
      description,
      startDate,
      endDate,
      managerId,
      image, // assuming your schema has an `image` field
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("Event creation failed:", err);
    res.status(400).json({ error: err.message });
  }
};


// View all upcoming events (events where startDate is in the future)
exports.viewUpcomingEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const events = await Event.find({ startDate: { $gte: currentDate-1} }).populate("managerId participants");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View events by manager ID
exports.viewEventsByManager = async (req, res) => {
  try {
    const { managerId } = req.params;
    const events = await Event.find({ managerId }).populate("managerId participants");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register event by gardener (adding user to participants array)
exports.registerEventByGardener = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: "User already registered" });
    }

    event.participants.push(userId);
    await event.save();

    res.status(200).json({ message: "Registered successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit event
exports.editEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deleted = await Event.findByIdAndDelete(eventId);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
