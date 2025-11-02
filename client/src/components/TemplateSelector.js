import React from 'react';
import './TemplateSelector.css';

const TemplateSelector = ({ template, setTemplate, format, setFormat }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout',
      icon: '📋'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean contemporary design',
      icon: '✨'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple ATS-optimized',
      icon: '📄'
    }
  ];

  return (
    <div className="template-selector-container">
      <h2>🎨 Choose Your Style</h2>
      
      <div className="templates-grid">
        {templates.map((temp) => (
          <div
            key={temp.id}
            className={`template-card ${template === temp.id ? 'active' : ''}`}
            onClick={() => setTemplate(temp.id)}
          >
            <div className="template-icon">{temp.icon}</div>
            <h3>{temp.name}</h3>
            <p>{temp.description}</p>
          </div>
        ))}
      </div>

      <div className="format-selector">
        <h3>📥 Export Format</h3>
        <div className="format-options">
          <label className={`format-option ${format === 'pdf' ? 'active' : ''}`}>
            <input
              type="radio"
              value="pdf"
              checked={format === 'pdf'}
              onChange={(e) => setFormat(e.target.value)}
            />
            <span>PDF</span>
          </label>
          <label className={`format-option ${format === 'docx' ? 'active' : ''}`}>
            <input
              type="radio"
              value="docx"
              checked={format === 'docx'}
              onChange={(e) => setFormat(e.target.value)}
            />
            <span>DOCX</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
