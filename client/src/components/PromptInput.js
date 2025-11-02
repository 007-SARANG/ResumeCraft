import React from 'react';
import './PromptInput.css';

const PromptInput = ({ prompt, setPrompt, loading, onLoadExample }) => {
  return (
    <div className="prompt-input-container">
      <div className="input-header">
        <h2>📝 Tell Us About Yourself</h2>
        <button 
          className="example-btn"
          onClick={onLoadExample}
          disabled={loading}
        >
          💡 Load Example
        </button>
      </div>
      
      <textarea
        className="prompt-textarea"
        placeholder="Start typing here... Include your:
• Name, contact details, and LinkedIn
• Education (degree, institution, CGPA)
• Technical & functional skills
• Work experience or internships
• Projects you've built
• Achievements and leadership roles
• Target role you're applying for

Example:
'Hi, my name is John Doe and I'm pursuing B.Tech in Computer Science from MIT. I have a CGPA of 8.5. I'm passionate about web development and looking for a Full Stack Developer internship...'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        rows={15}
      />
      
      <div className="char-count">
        {prompt.length} characters
      </div>
    </div>
  );
};

export default PromptInput;
