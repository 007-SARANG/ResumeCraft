import React from 'react';
import './ResumePreview.css';

const ResumePreview = ({ resumeData, template }) => {
  if (!resumeData) return null;

  return (
    <div className={`resume-preview ${template}`}>
      <div className="preview-header">
        <h2>👁️ Live Preview</h2>
        <span className="preview-badge">{template.toUpperCase()}</span>
      </div>

      <div className="resume-content">
        {/* Header */}
        <div className="resume-header">
          <h1>{resumeData.name}</h1>
          <div className="contact-info">
            {resumeData.email && <span>{resumeData.email}</span>}
            {resumeData.phone && <span>{resumeData.phone}</span>}
            {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="resume-section">
            <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
            <p className="summary-text">{resumeData.summary}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">EDUCATION</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="duration">
                  {edu.duration}
                  {edu.gpa && ` | CGPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills && (
          <div className="resume-section">
            <h2 className="section-title">TECHNICAL SKILLS</h2>
            {resumeData.skills.technical && (
              <p><strong>Technical:</strong> {resumeData.skills.technical.join(', ')}</p>
            )}
            {resumeData.skills.functional && (
              <p><strong>Functional:</strong> {resumeData.skills.functional.join(', ')}</p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">EXPERIENCE</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.title} | {exp.company}</h3>
                <p className="duration">{exp.duration}</p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul>
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">PROJECTS</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.name}</h3>
                {project.technologies && (
                  <p className="technologies">
                    <em>Technologies: {project.technologies.join(', ')}</em>
                  </p>
                )}
                {project.bullets && project.bullets.length > 0 && (
                  <ul>
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements && resumeData.achievements.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">ACHIEVEMENTS & LEADERSHIP</h2>
            <ul>
              {resumeData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
