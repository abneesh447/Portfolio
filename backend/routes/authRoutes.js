const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const payload = { user: { id: admin.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret_123', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
