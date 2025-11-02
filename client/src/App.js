import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import TemplateSelector from './components/TemplateSelector';
import ResumePreview from './components/ResumePreview';
import ATSAnalyzer from './components/ATSAnalyzer';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [template, setTemplate] = useState('modern');
  const [format, setFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const handleGenerateResume = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter your details in the prompt!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/resume/generate', {
        prompt,
        template,
        format
      });

      setGeneratedResume(response.data);
      toast.success('Resume generated successfully! 🎉');

      // Calculate ATS score automatically
      const atsResponse = await axios.post('/api/ats/score', {
        resumeData: response.data.parsedData
      });
      setAtsScore(atsResponse.data);

    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedResume) return;

    try {
      const downloadUrl = `http://localhost:5000${generatedResume.downloadUrl}`;
      window.open(downloadUrl, '_blank');
      toast.success('Downloading your resume...');
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error('Failed to download resume.');
    }
  };

  const loadExamplePrompt = () => {
    const examplePrompt = `Hi, my name is Riya Sharma and I'm currently pursuing a B.Tech in Computer Science and Engineering from Manipal Institute of Technology. I'm in my pre-final year and have maintained a CGPA of 8.7 so far. I'm really passionate about software development and I'm looking for a Software Engineering Internship — ideally something in backend or full-stack development.

Over the past year, I've worked with technologies like Python, Java, and C++. I enjoy building products using Node.js, Express.js, React.js, and have good experience with databases like MySQL and MongoDB. I'm also comfortable with Git, Postman, and Figma, and I have a strong foundation in Data Structures and Algorithms.

I completed a summer internship at InnovateTech Solutions from May to July 2024. During my internship, I worked on building REST APIs that supported over 10,000 daily active users. I also helped optimize the backend to reduce API response time by 25%. I was part of a team of five engineers, and we worked in an agile environment with multiple sprints. I also wrote unit tests with Jest and achieved 90% code coverage.

In addition to my internship, I've built a couple of projects I'm really proud of. One of them is called "SkillTrack," a full-stack web app that helps students track their learning progress. I built it using React.js and Node.js and also implemented secure authentication with JWT. The app loads in less than a second and is deployed on Vercel. Another project I worked on is "Smart Resume Parser," which uses Python and NLP (Spacy) to extract structured data like skills, education, and contact info from resumes. It achieved around 92% parsing accuracy on a dataset of 500 resumes.

Some of my notable achievements include winning 1st place at the MIT Hackathon 2024 among 250+ participants. I also rank in the top 5% of LeetCode contests with a max rating of 1840, and I cleared the Google STEP Coding Challenge earlier this year. I'm also actively involved on campus as a Core Member of the Coding Club, where I lead weekly DSA sessions for 100+ students, and I've mentored juniors during hackathons as well.

Overall, I'm a detail-oriented developer who loves building scalable systems, solving real-world problems through code, and working in collaborative environments. I'm eager to learn from experienced engineers and contribute meaningfully to the team I work with.`;

    setPrompt(examplePrompt);
    toast.info('Example prompt loaded! Click Generate to see magic ✨');
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Header />

      <div className="container">
        <div className="main-content">
          <div className="left-panel">
            <PromptInput 
              prompt={prompt}
              setPrompt={setPrompt}
              loading={loading}
              onLoadExample={loadExamplePrompt}
            />
            
            <TemplateSelector 
              template={template}
              setTemplate={setTemplate}
              format={format}
              setFormat={setFormat}
            />

            <button 
              className="generate-btn"
              onClick={handleGenerateResume}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Your Resume...
                </>
              ) : (
                <>
                  ✨ Generate ATS-Perfect Resume
                </>
              )}
            </button>

            {generatedResume && (
              <div className="action-buttons">
                <button className="download-btn" onClick={handleDownload}>
                  📥 Download Resume
                </button>
                <button 
                  className="analyze-btn"
                  onClick={() => setShowAnalyzer(!showAnalyzer)}
                >
                  📊 {showAnalyzer ? 'Hide' : 'Show'} ATS Analysis
                </button>
              </div>
            )}
          </div>

          <div className="right-panel">
            {atsScore && (
              <ATSAnalyzer 
                score={atsScore}
                show={showAnalyzer}
              />
            )}
            
            {generatedResume && (
              <ResumePreview 
                resumeData={generatedResume.parsedData}
                template={template}
              />
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>
          <strong>"Your Prompt. Your Resume. Recruiter Ready."</strong>
        </p>
        <p>
          Led by <strong>Ms. Gifty Mehra</strong> - Ex-Amazon HR Expert
        </p>
        <p className="quote">
          "Most resumes don't fail because of skills - they fail because they're not structured the way recruiters or ATS read them."
        </p>
      </footer>
    </div>
  );
}

export default App;
