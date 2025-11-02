import React from 'react';
import './ATSAnalyzer.css';

const ATSAnalyzer = ({ score, show }) => {
  if (!score || !show) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return '#11998e';
    if (score >= 60) return '#f5af19';
    return '#f5576c';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="ats-analyzer">
      <div className="analyzer-header">
        <h2>📊 ATS Score Analysis</h2>
      </div>

      <div className="score-display">
        <div 
          className="score-circle"
          style={{ 
            background: `conic-gradient(${getScoreColor(score.score)} ${score.score * 3.6}deg, #f0f0f0 0deg)`
          }}
        >
          <div className="score-inner">
            <span className="score-number">{score.score}</span>
            <span className="score-label">{getScoreLabel(score.score)}</span>
          </div>
        </div>
      </div>

      <div className="feedback-section">
        <h3>💡 Feedback</h3>
        <p>{score.feedback}</p>
      </div>

      {score.suggestions && score.suggestions.length > 0 && (
        <div className="suggestions-section">
          <h3>🎯 Suggestions for Improvement</h3>
          <ul>
            {score.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="ats-info">
        <p className="info-text">
          <strong>What is ATS?</strong> Applicant Tracking Systems scan resumes
          for keywords, formatting, and structure before reaching human recruiters.
        </p>
      </div>
    </div>
  );
};

export default ATSAnalyzer;
