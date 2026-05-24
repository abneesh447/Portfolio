const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  leetcodeHandle: { type: String, default: '' },
  codeforcesHandle: { type: String, default: '' },
  codechefHandle: { type: String, default: '' }
});

module.exports = mongoose.model('Settings', SettingsSchema);
