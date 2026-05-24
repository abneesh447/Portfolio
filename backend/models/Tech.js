const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iconName: { type: String, required: true },
  color: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tech', TechSchema);
