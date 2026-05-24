const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
