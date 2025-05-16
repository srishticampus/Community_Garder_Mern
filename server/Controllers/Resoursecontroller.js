const Resource = require('../models/ResourseSChema');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

exports.uploadimg = multer({ storage: storage }).single("photo");

// Add new resource
exports.addResource = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    const { resourceName, resourceType, quantity } = req.body;
    const photo = req.file;

    const newResource = new Resource({
      resourceName,
      resourceType,
      quantity,
      photo,
    });
console.log(newResource,"newResource");

    await newResource.save();
    res.status(201).json({ message: 'Resource added successfully', data: newResource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add resource' });
  }
};

// View all resources
exports.viewAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({ data: resources });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

// View one resource
exports.viewOneResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.status(200).json({ data: resource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
};

// Delete resource
exports.deleteResource = async (req, res) => {
  try {
    const result = await Resource.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Resource not found' });
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};

// Update resource
exports.updateResource = async (req, res) => {
  try {
    const { resourceName, resourceType, quantity } = req.body;
    const updateData = { resourceName, resourceType, quantity };

    if (req.file) {
      updateData.photo = req.file;
    }

    const updated = await Resource.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Resource not found' });

    res.status(200).json({ message: 'Resource updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource' });
  }
};
