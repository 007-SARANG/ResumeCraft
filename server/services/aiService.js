const OpenAI = require('openai');

// Only initialize if API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('⚠️  OpenAI API key not found. This service will not work.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-not-used',
});

class AIService {
  async parsePrompt(prompt) {
    try {
      console.log('🤖 Calling OpenAI API to parse prompt...');
      
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

Extract ALL information from the prompt. Use empty strings or arrays for missing data. Return ONLY the JSON object.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      console.log('✅ OpenAI API response received');
      
      const content = response.choices[0].message.content.trim();
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
      
      const systemPrompt = `You are an expert resume writer trained by ex-Amazon HR. Write a powerful, ATS-friendly professional summary in EXACTLY 2 lines (maximum 150 characters).

Requirements:
- Start with years of experience or current status
- Highlight 2-3 key strengths or skills
- Mention target role or career focus
- Use action-oriented language
- Be concise and impactful
- NO generic phrases`;

      const userPrompt = `Create a 2-line professional summary for:
Name: ${resumeData.name}
Target Role: ${resumeData.targetRole}
Education: ${resumeData.education?.map(e => e.degree).join(', ')}
Skills: ${resumeData.skills?.technical?.slice(0, 5).join(', ')}
Experience: ${resumeData.experience?.length || 0} positions
Key Achievements: ${resumeData.achievements?.slice(0, 2).join('; ')}`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      console.log('✅ Summary generated successfully');
      return response.choices[0].message.content.trim();

    } catch (error) {
      console.error('⚠️ Error generating summary, using fallback:', error.message);
      // Fallback summary
      return `${resumeData.education?.[0]?.degree || 'Professional'} with expertise in ${resumeData.skills?.technical?.slice(0, 3).join(', ')}. Seeking ${resumeData.targetRole} role to leverage technical skills and deliver impactful solutions.`;
    }
  }

  async enhanceBulletPoints(items) {
    if (!items || items.length === 0) return items;

    try {
      const systemPrompt = `You are an expert resume writer. Enhance bullet points to be ATS-friendly:
- Start with strong action verbs
- Include quantifiable metrics
- Be specific and concise
- Use past tense for completed work
- Maximum 150 characters per bullet
Return ONLY the enhanced bullets, one per line.`;

      const enhancedItems = [];

      for (const item of items) {
        if (item.bullets && item.bullets.length > 0) {
          const userPrompt = `Enhance these bullet points:\n${item.bullets.join('\n')}`;

          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            temperature: 0.5,
            max_tokens: 300,
          });

          const enhanced = response.choices[0].message.content
            .trim()
            .split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => line.replace(/^[-•]\s*/, ''));

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
      console.error('Error enhancing bullets:', error);
      return items; // Return original if enhancement fails
    }
  }

  async calculateATSScore(resumeData) {
    try {
      const systemPrompt = `You are an ATS (Applicant Tracking System) expert. Analyze the resume and provide:
1. ATS Score (0-100)
2. Brief feedback on strengths
3. 3-5 specific improvement suggestions

Consider:
- Formatting simplicity
- Keyword usage
- Quantifiable achievements
- Structure and sections
- Grammar and clarity

Return JSON: {"score": number, "feedback": "text", "suggestions": ["suggestion1", "suggestion2"]}`;

      const userPrompt = `Analyze this resume data:
${JSON.stringify(resumeData, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return JSON.parse(content);

    } catch (error) {
      console.error('Error calculating ATS score:', error);
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
      const systemPrompt = `You are a keyword analysis expert. Compare the resume against the job description and provide:
1. Match percentage
2. Missing keywords (skills/technologies mentioned in JD but not in resume)
3. Present keywords (skills that match)
4. Suggestions for improvement

Return JSON: {
  "matchPercentage": number,
  "missingKeywords": ["keyword1"],
  "presentKeywords": ["keyword1"],
  "suggestions": ["suggestion1"]
}`;

      const userPrompt = `Job Description:
${jobDescription}

Resume Skills: ${resumeData.skills?.technical?.join(', ')}
Resume Experience: ${resumeData.experience?.map(e => e.bullets?.join(' ')).join(' ')}`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return JSON.parse(content);

    } catch (error) {
      console.error('Error analyzing keywords:', error);
      return {
        matchPercentage: 70,
        missingKeywords: [],
        presentKeywords: resumeData.skills?.technical || [],
        suggestions: ["Add more relevant keywords from the job description"]
      };
    }
  }
}

module.exports = new AIService();
