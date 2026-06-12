const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const authMiddleware = require('../middleware/auth');

// Get all experience
router.get('/', async (req, res) => {
  try {
    const exps = await Experience.find().sort({ createdAt: -1 });
    res.json(exps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new experience (Protected)
router.post('/', authMiddleware, async (req, res) => {
  const { role, company, duration, bullets } = req.body;
  const exp = new Experience({ role, company, duration, bullets });
  try {
    const newExp = await exp.save();
    res.status(201).json(newExp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update experience (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete experience (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
