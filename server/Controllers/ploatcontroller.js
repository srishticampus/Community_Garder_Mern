const GardenPlot = require("../models/Gardenploatschema");
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

exports.createGardenPlot = async (req, res) => {
    try {
        const newPlot = new GardenPlot({
            plotName: req.body.plotName,
            location: req.body.location,
            size: req.body.size,
            managerId: req.body.managerId,
            assignedGardeners: req.body.assignedGardeners || [],
            image: req.file
        });

        const savedPlot = await newPlot.save();

        res.status(201).json({ success: true, data: savedPlot });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


exports.assignGardenersToPlot = async (req, res) => {
    try {
        const { plotId } = req.params;
        const { gardenerId } = req.body;
        const updatedPlot = await GardenPlot.findByIdAndUpdate(
            plotId,
            { $addToSet: { assignedGardeners: { $each: [gardenerId] } } }, // wrap in array
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedPlot });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.ViewassignGardenersToPlot = async (req, res) => {
    try {
        const { plotId } = req.params;
        const plot = await GardenPlot.findById(plotId).populate("assignedGardeners");

        if (!plot) {
            return res.status(404).json({ success: false, message: "Plot not found" });
        }

        res.status(200).json({ success: true, data: plot.assignedGardeners });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.ViewallGardenPlot = async (req, res) => {
  try {
    const plots = await GardenPlot.find({}).populate("assignedGardeners managerId");

    if (!plots || plots.length === 0) {
      return res.status(404).json({ success: false, message: "No garden plots found" });
    }

    console.log(plots, "plots");

    res.status(200).json({ success: true, data: plots });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};



exports.getGardenPlotsByGardener = async (req, res) => {
    try {
        const { gardenerId } = req.params;
        const plots = await GardenPlot.find({ assignedGardeners: gardenerId }).populate("managerId");
        res.status(200).json({ success: true, data: plots });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
exports.getAllGardenPlotsByManager = async (req, res) => {
    try {
        const plots = await GardenPlot.find({ managerId: req.params.managerId }).populate("assignedGardeners");
        res.status(200).json({ success: true, data: plots });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updateGardenPlot = async (req, res) => {
    try {
        const { plotId } = req.params;
        const updateData = {
            plotName: req.body.plotName,
            location: req.body.location,
            size: req.body.size,
            assignedGardeners: req.body.assignedGardeners
        };

        // If image is uploaded, update it too
        if (req.file) {
            updateData.image = req.file;
        }

        const updatedPlot = await GardenPlot.findByIdAndUpdate(
            plotId,
            updateData,
            { new: true }
        );

        if (!updatedPlot) {
            return res.status(404).json({ success: false, message: "Plot not found" });
        }

        res.status(200).json({ success: true, data: updatedPlot });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
exports.deleteGardenPlot = async (req, res) => {
    try {
        const { plotId } = req.params;

        const deletedPlot = await GardenPlot.findByIdAndDelete(plotId);

        if (!deletedPlot) {
            return res.status(404).json({ success: false, message: "Plot not found" });
        }

        res.status(200).json({ success: true, message: "Plot deleted successfully" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
