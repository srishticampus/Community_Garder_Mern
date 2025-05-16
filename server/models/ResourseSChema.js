const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  photo: {
    type: Object, // Store image filename or URL
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('resources', resourceSchema);
