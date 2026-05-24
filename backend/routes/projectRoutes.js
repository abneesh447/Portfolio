const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route   GET api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
router.post('/', auth, async (req, res) => {
  const { title, description, imageUrl, link, technologies } = req.body;
  try {
    const newProject = new Project({ title, description, imageUrl, link, technologies });
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
