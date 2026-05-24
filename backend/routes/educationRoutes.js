const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const auth = require('../middleware/auth');

// @route   GET api/education
router.get('/', async (req, res) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });
    res.json(educations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/education
router.post('/', auth, async (req, res) => {
  const { degree, institution, year, details } = req.body;
  try {
    const newEducation = new Education({ degree, institution, year, details });
    const education = await newEducation.save();
    res.json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/education/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Education removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
