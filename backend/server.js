require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cpRoutes = require('./routes/cpRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const educationRoutes = require('./routes/educationRoutes');
const techRoutes = require('./routes/techRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

const app = express();

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ].filter(Boolean), // Allow localhost variants and your production URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/cp', cpRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/tech', techRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/experience', experienceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
