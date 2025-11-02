const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config();

// Verify API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('⚠️  WARNING: OPENAI_API_KEY is not set in .env file!');
} else {
  console.log('✅ OpenAI API key loaded successfully');
}

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use('/downloads', express.static(path.join(__dirname, '../generated-resumes')));

// Routes
const resumeRoutes = require('./routes/resumeRoutes');
const atsRoutes = require('./routes/atsRoutes');

app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ResumeCraft API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResumeCraft Server running on port ${PORT}`);
  console.log(`📝 Ready to generate ATS-perfect resumes!`);
});

module.exports = app;
