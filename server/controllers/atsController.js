const openAIService = require('../services/aiService');
const geminiService = require('../services/geminiService');
const groqService = require('../services/groqService');
const mockAIService = require('../services/mockAIService');

// Select AI service based on environment variable
let aiService;
const serviceType = process.env.AI_SERVICE || 'mock';
if (serviceType === 'gemini') {
  aiService = geminiService;
} else if (serviceType === 'openai') {
  aiService = openAIService;
} else if (serviceType === 'groq') {
  aiService = groqService;
} else {
  aiService = mockAIService;
}

exports.calculateATSScore = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const score = await aiService.calculateATSScore(resumeData);

    res.json({
      success: true,
      score: score.score,
      feedback: score.feedback,
      suggestions: score.suggestions
    });

  } catch (error) {
    console.error('Error calculating ATS score:', error);
    res.status(500).json({ 
      error: 'Failed to calculate ATS score', 
      details: error.message 
    });
  }
};

exports.keywordAnalysis = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({ 
        error: 'Resume data and job description are required' 
      });
    }

    const analysis = await aiService.analyzeKeywords(resumeData, jobDescription);

    res.json({
      success: true,
      analysis: analysis
    });

  } catch (error) {
    console.error('Error analyzing keywords:', error);
    res.status(500).json({ 
      error: 'Failed to analyze keywords', 
      details: error.message 
    });
  }
};

exports.generateSummary = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const summary = await aiService.generateProfessionalSummary(resumeData);

    res.json({
      success: true,
      summary: summary
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary', 
      details: error.message 
    });
  }
};
