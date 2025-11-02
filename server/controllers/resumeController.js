const pdfGenerator = require('../services/pdfGenerator');
const docxGenerator = require('../services/docxGenerator');
const path = require('path');
const fs = require('fs');

// Select AI service based on environment variable (lazy load to avoid initialization errors)
const serviceType = process.env.AI_SERVICE || 'mock';
console.log(`🤖 Using AI Service: ${serviceType}`);

let aiService;
if (serviceType === 'gemini') {
  aiService = require('../services/geminiService');
} else if (serviceType === 'openai') {
  aiService = require('../services/aiService');
} else if (serviceType === 'groq') {
  aiService = require('../services/groqService');
} else {
  aiService = require('../services/mockAIService');
}

// Ensure generated-resumes directory exists (skip in serverless)
const outputDir = process.env.VERCEL ? '/tmp/generated-resumes' : path.join(__dirname, '../../generated-resumes');
if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (err) {
    console.log('Note: Running in serverless environment, using /tmp for file storage');
  }
}

exports.generateResume = async (req, res) => {
  try {
    const { prompt, template = 'modern', format = 'pdf' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('📝 Processing resume generation request...');

    // Step 1: Parse prompt using AI to extract structured data
    const parsedData = await aiService.parsePrompt(prompt);

    // Step 2: Generate professional summary
    const professionalSummary = await aiService.generateProfessionalSummary(parsedData);
    parsedData.summary = professionalSummary;

    // Step 3: Enhance bullet points with action verbs
    parsedData.experience = await aiService.enhanceBulletPoints(parsedData.experience);
    parsedData.projects = await aiService.enhanceBulletPoints(parsedData.projects);

    // Step 4: Generate resume file (use /tmp in serverless)
    const storageDir = process.env.VERCEL ? '/tmp' : outputDir;
    let filename;
    let filePath;

    if (format === 'pdf') {
      filename = `${parsedData.name.replace(/\s+/g, '_')}_Resume.pdf`;
      filePath = path.join(storageDir, filename);
      await pdfGenerator.generatePDF(parsedData, template, filePath);
    } else if (format === 'docx') {
      filename = `${parsedData.name.replace(/\s+/g, '_')}_Resume.docx`;
      filePath = path.join(storageDir, filename);
      await docxGenerator.generateDOCX(parsedData, template, filePath);
    } else {
      return res.status(400).json({ error: 'Invalid format. Use pdf or docx' });
    }

    console.log('✅ Resume generated successfully!');

    res.json({
      success: true,
      message: 'Resume generated successfully',
      filename: filename,
      downloadUrl: `/api/resume/download/${filename}`,
      parsedData: parsedData
    });

  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ 
      error: 'Failed to generate resume', 
      details: error.message 
    });
  }
};

exports.downloadResume = async (req, res) => {
  try {
    const { filename } = req.params;
    const storageDir = process.env.VERCEL ? '/tmp' : outputDir;
    const filePath = path.join(storageDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ error: 'Failed to download file' });
      }
    });

  } catch (error) {
    console.error('Error downloading resume:', error);
    res.status(500).json({ error: 'Failed to download resume' });
  }
};

exports.getTemplates = (req, res) => {
  res.json({
    templates: [
      {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional, professional layout ideal for corporate roles'
      },
      {
        id: 'modern',
        name: 'Modern',
        description: 'Clean, contemporary design with subtle styling'
      },
      {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, text-focused layout for maximum ATS compatibility'
      }
    ]
  });
};
