const axios = require('axios');

class MockAIService {
  async parsePrompt(prompt) {
    try {
      console.log('🤖 Using Mock AI Service (No API required)...');
      
      // Extract basic information from the prompt using regex
      const nameMatch = prompt.match(/my name is ([A-Z][a-z]+ [A-Z][a-z]+)/i);
      const emailMatch = prompt.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      const phoneMatch = prompt.match(/(\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/);
      const linkedinMatch = prompt.match(/(linkedin\.com\/[^\s]+)/i);
      const cgpaMatch = prompt.match(/CGPA.*?(\d+\.\d+)/i);
      const degreeMatch = prompt.match(/(B\.Tech|M\.Tech|B\.E\.|M\.E\.|Bachelor|Master)[^.]*?(Computer Science|Engineering|CS|IT|Information Technology)/i);
      const instituteMatch = prompt.match(/from ([A-Z][A-Za-z\s]+Institute|[A-Z][A-Za-z\s]+University)/i);
      
      // Extract target role
      const roleMatch = prompt.match(/looking for (?:a |an )?([A-Z][A-Za-z\s]+(?:Intern|Developer|Engineer|Analyst))/i);
      
      // Extract skills
      const skillsText = prompt.toLowerCase();
      const techSkills = [];
      const commonSkills = ['python', 'java', 'c++', 'javascript', 'react', 'node.js', 'express', 'mongodb', 'mysql', 'git', 'docker', 'aws', 'html', 'css', 'typescript', 'angular', 'vue', 'django', 'flask', 'postgresql', 'redis', 'kubernetes'];
      commonSkills.forEach(skill => {
        if (skillsText.includes(skill.toLowerCase())) {
          techSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
        }
      });
      
      // Parse experience
      const experience = [];
      const expMatch = prompt.match(/internship at ([A-Z][A-Za-z\s]+).*?from ([A-Z][a-z]+ to [A-Z][a-z]+ \d{4})/i);
      if (expMatch) {
        experience.push({
          title: "Software Engineering Intern",
          company: expMatch[1],
          duration: expMatch[2],
          bullets: [
            "Built REST APIs supporting over 10,000 daily active users",
            "Optimized backend to reduce API response time by 25%",
            "Worked in agile environment with team of five engineers",
            "Wrote unit tests achieving 90% code coverage"
          ]
        });
      }
      
      // Parse projects
      const projects = [];
      const projectMatches = prompt.matchAll(/(?:called|named) "([^"]+)"/g);
      for (const match of projectMatches) {
        projects.push({
          name: match[1],
          description: "Full-stack web application",
          technologies: ["React.js", "Node.js", "MongoDB"],
          bullets: [
            "Built full-stack application with modern technologies",
            "Implemented secure authentication and authorization",
            "Achieved sub-second load times and high performance"
          ]
        });
      }
      
      // Parse achievements
      const achievements = [];
      if (prompt.includes('1st place') || prompt.includes('first place')) {
        achievements.push("Won 1st place at MIT Hackathon 2024 among 250+ participants");
      }
      if (prompt.includes('LeetCode')) {
        achievements.push("Ranked in top 5% of LeetCode contests with max rating of 1840");
      }
      if (prompt.includes('Google STEP')) {
        achievements.push("Cleared Google STEP Coding Challenge");
      }
      if (prompt.includes('Coding Club') || prompt.includes('mentor')) {
        achievements.push("Core Member of Coding Club, leading weekly DSA sessions for 100+ students");
      }
      
      const parsedData = {
        name: nameMatch ? nameMatch[1] : "John Doe",
        email: emailMatch ? emailMatch[1] : "john.doe@email.com",
        phone: phoneMatch ? phoneMatch[1] : "+1-234-567-8900",
        linkedin: linkedinMatch ? linkedinMatch[1] : "linkedin.com/in/johndoe",
        targetRole: roleMatch ? roleMatch[1] : "Software Engineer",
        education: [{
          degree: degreeMatch ? `${degreeMatch[1]} in ${degreeMatch[2]}` : "B.Tech in Computer Science",
          institution: instituteMatch ? instituteMatch[1] : "University Name",
          duration: "2021 - 2025",
          gpa: cgpaMatch ? cgpaMatch[1] : "8.5"
        }],
        skills: {
          technical: techSkills.length > 0 ? techSkills : ["Python", "Java", "JavaScript", "React", "Node.js"],
          functional: ["Problem Solving", "Team Collaboration", "Agile Development", "Code Review"]
        },
        experience: experience,
        projects: projects.length > 0 ? projects : [{
          name: "Personal Project",
          description: "Web application",
          technologies: ["React", "Node.js"],
          bullets: ["Developed full-stack application", "Implemented modern best practices"]
        }],
        achievements: achievements.length > 0 ? achievements : ["Active contributor to open source projects", "Participated in multiple hackathons"]
      };
      
      console.log('✅ Successfully parsed resume data (Mock)');
      return parsedData;
      
    } catch (error) {
      console.error('❌ Error parsing prompt:', error.message);
      throw new Error(`Failed to parse prompt: ${error.message}`);
    }
  }

  async generateProfessionalSummary(resumeData) {
    console.log('✍️ Generating professional summary (Mock)...');
    const summary = `${resumeData.education?.[0]?.degree || 'Computer Science'} student with expertise in ${resumeData.skills?.technical?.slice(0, 3).join(', ')}. Seeking ${resumeData.targetRole} role to leverage technical skills and deliver impactful solutions.`;
    console.log('✅ Summary generated');
    return summary;
  }

  async enhanceBulletPoints(items) {
    console.log('✨ Enhancing bullet points (Mock)...');
    return items; // Return as-is for mock
  }

  async calculateATSScore(resumeData) {
    console.log('📊 Calculating ATS score (Mock)...');
    return {
      score: 85,
      feedback: "Your resume has excellent structure and formatting. Strong use of action verbs and quantifiable achievements.",
      suggestions: [
        "Consider adding more industry-specific keywords",
        "Include metrics in all project descriptions",
        "Add a skills section with technical proficiencies"
      ]
    };
  }

  async analyzeKeywords(resumeData, jobDescription) {
    console.log('🔍 Analyzing keywords (Mock)...');
    return {
      matchPercentage: 78,
      missingKeywords: ["Docker", "Kubernetes", "AWS"],
      presentKeywords: resumeData.skills?.technical || [],
      suggestions: ["Add cloud computing skills if you have them", "Include DevOps tools in your skills section"]
    };
  }
}

module.exports = new MockAIService();
