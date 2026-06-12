const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  bullets: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
