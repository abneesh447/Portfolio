const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// @route   GET api/settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/settings
router.post('/', auth, async (req, res) => {
  const { leetcodeHandle, codeforcesHandle, codechefHandle } = req.body;
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();
    
    settings.leetcodeHandle = leetcodeHandle || '';
    settings.codeforcesHandle = codeforcesHandle || '';
    settings.codechefHandle = codechefHandle || '';
    
    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
