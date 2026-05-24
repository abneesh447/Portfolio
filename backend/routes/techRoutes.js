const express = require('express');
const router = express.Router();
const Tech = require('../models/Tech');
const auth = require('../middleware/auth');

// @route   GET api/tech
router.get('/', async (req, res) => {
  try {
    const tech = await Tech.find().sort({ createdAt: 1 });
    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tech
router.post('/', auth, async (req, res) => {
  const { name, iconName, color } = req.body;
  try {
    const newTech = new Tech({ name, iconName, color });
    const tech = await newTech.save();
    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tech/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Tech.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Tech removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
