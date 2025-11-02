const axios = require('axios');

class GeminiAIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = 'gemini-pro';
  }

  getApiUrl() {
    return `https://generativelanguage.googleapis.com/v1/models/${this.model}:generateContent?key=${this.apiKey}`;
  }

  async parsePrompt(prompt) {
    try {
      console.log('🤖 Calling Gemini API to parse prompt...');
      console.log('API URL:', `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`);
      
      const systemPrompt = `You are an expert HR resume parser. Extract structured information from the user's prompt and return ONLY valid JSON, no markdown or additional text.

Return this exact JSON structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "linkedin": "LinkedIn URL or empty string",
  "targetRole": "desired position",
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "duration": "Start - End",
      "gpa": "X.X/10 or percentage"
    }
  ],
  "skills": {
    "technical": ["skill1", "skill2"],
    "functional": ["skill1", "skill2"]
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Month Year - Month Year",
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description",
      "technologies": ["tech1", "tech2"],
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "achievements": ["Achievement 1", "Achievement 2"]
}

Extract ALL information from the prompt. Use empty strings or arrays for missing data.

User prompt: ${prompt}`;

      const response = await axios.post(
        this.getApiUrl(),
        {
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Gemini API response received');
      
      const content = response.data.candidates[0].content.parts[0].text.trim();
      console.log('📝 Parsing JSON response...');
      
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      const parsedData = JSON.parse(cleanContent);
      console.log('✅ Successfully parsed resume data');
      
      return parsedData;

    } catch (error) {
      console.error('❌ Error parsing prompt:', error.message);
      if (error.response) {
        console.error('API Response Error:', error.response.status, error.response.data);
      }
      throw new Error(`Failed to parse prompt with AI: ${error.message}`);
    }
  }

  async generateProfessionalSummary(resumeData) {
    try {
      console.log('✍️ Generating professional summary...');
      
      const prompt = `You are an expert resume writer trained by ex-Amazon HR. Write a powerful, ATS-friendly professional summary in EXACTLY 2 lines (maximum 150 characters).

Create a 2-line professional summary for:
Name: ${resumeData.name}
Target Role: ${resumeData.targetRole}
Education: ${resumeData.education?.map(e => e.degree).join(', ')}
Skills: ${resumeData.skills?.technical?.slice(0, 5).join(', ')}
Experience: ${resumeData.experience?.length || 0} positions
Key Achievements: ${resumeData.achievements?.slice(0, 2).join('; ')}

Return ONLY the 2-line summary, nothing else.`;

      const response = await axios.post(
        this.getApiUrl(),
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const summary = response.data.candidates[0].content.parts[0].text.trim();
      console.log('✅ Summary generated successfully');
      
      return summary;

    } catch (error) {
      console.error('⚠️ Error generating summary, using fallback:', error.message);
      return `${resumeData.education?.[0]?.degree || 'Professional'} with expertise in ${resumeData.skills?.technical?.slice(0, 3).join(', ')}. Seeking ${resumeData.targetRole} role to leverage technical skills and deliver impactful solutions.`;
    }
  }

  async enhanceBulletPoints(items) {
    if (!items || items.length === 0) return items;

    try {
      const enhancedItems = [];

      for (const item of items) {
        if (item.bullets && item.bullets.length > 0) {
          const prompt = `You are an expert resume writer. Enhance these bullet points to be ATS-friendly:
- Start with strong action verbs
- Include quantifiable metrics
- Be specific and concise
- Use past tense for completed work
- Maximum 150 characters per bullet

Bullet points to enhance:
${item.bullets.join('\n')}

Return ONLY the enhanced bullet points, one per line, no numbering or additional text.`;

          const response = await axios.post(
            this.getApiUrl(),
            {
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          const enhanced = response.data.candidates[0].content.parts[0].text
            .trim()
            .split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => line.replace(/^[-•*]\s*/, ''));

          enhancedItems.push({
            ...item,
            bullets: enhanced.length > 0 ? enhanced : item.bullets
          });
        } else {
          enhancedItems.push(item);
        }
      }

      return enhancedItems;

    } catch (error) {
      console.error('⚠️ Error enhancing bullets, using original:', error.message);
      return items;
    }
  }

  async calculateATSScore(resumeData) {
    try {
      const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume and provide:
1. ATS Score (0-100)
2. Brief feedback on strengths
3. 3-5 specific improvement suggestions

Resume data:
${JSON.stringify(resumeData, null, 2)}

Return ONLY valid JSON in this format:
{
  "score": 85,
  "feedback": "Your resume has strong structure...",
  "suggestions": ["Add more action verbs", "Include measurable results"]
}`;

      const response = await axios.post(
        this.getApiUrl(),
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.candidates[0].content.parts[0].text.trim();
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      return JSON.parse(cleanContent);

    } catch (error) {
      console.error('⚠️ Error calculating ATS score:', error.message);
      return {
        score: 75,
        feedback: "Your resume has good structure. Consider adding more quantifiable achievements.",
        suggestions: [
          "Add more action verbs to bullet points",
          "Include measurable results where possible",
          "Ensure consistent formatting throughout"
        ]
      };
    }
  }

  async analyzeKeywords(resumeData, jobDescription) {
    try {
      const prompt = `Compare the resume against the job description and provide keyword analysis.

Job Description:
${jobDescription}

Resume Skills: ${resumeData.skills?.technical?.join(', ')}
Resume Experience: ${resumeData.experience?.map(e => e.bullets?.join(' ')).join(' ')}

Return ONLY valid JSON in this format:
{
  "matchPercentage": 75,
  "missingKeywords": ["keyword1", "keyword2"],
  "presentKeywords": ["keyword1", "keyword2"],
  "suggestions": ["Add X to skills section"]
}`;

      const response = await axios.post(
        this.getApiUrl(),
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.candidates[0].content.parts[0].text.trim();
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      return JSON.parse(cleanContent);

    } catch (error) {
      console.error('⚠️ Error analyzing keywords:', error.message);
      return {
        matchPercentage: 70,
        missingKeywords: [],
        presentKeywords: resumeData.skills?.technical || [],
        suggestions: ["Add more relevant keywords from the job description"]
      };
    }
  }
}

module.exports = new GeminiAIService();
