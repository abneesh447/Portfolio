const express = require('express');
const router = express.Router();
const Config = require('../models/Config');
const auth = require('../middleware/auth');

// @route   GET api/resume
router.get('/', async (req, res) => {
  try {
    const resume = await Config.findOne({ key: 'resume' });
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json({ data: resume.value });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/resume
router.post('/', auth, async (req, res) => {
  const { data } = req.body;
  
  try {
    let resume = await Config.findOne({ key: 'resume' });
    if (resume) {
      resume.value = data;
      await resume.save();
    } else {
      resume = new Config({ key: 'resume', value: data });
      await resume.save();
    }
    res.json({ msg: 'Resume updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
