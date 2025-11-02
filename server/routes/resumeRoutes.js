const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Generate resume from prompt
router.post('/generate', resumeController.generateResume);

// Download resume
router.get('/download/:filename', resumeController.downloadResume);

// Get resume templates
router.get('/templates', resumeController.getTemplates);

module.exports = router;
