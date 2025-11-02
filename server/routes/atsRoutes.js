const express = require('express');
const router = express.Router();
const atsController = require('../controllers/atsController');

// Calculate ATS score
router.post('/score', atsController.calculateATSScore);

// Keyword analysis against job description
router.post('/keyword-analysis', atsController.keywordAnalysis);

// Generate professional summary
router.post('/generate-summary', atsController.generateSummary);

module.exports = router;
