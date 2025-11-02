import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          <span className="icon">📄</span>
          ResumeCraft
        </h1>
        <p className="subtitle">
          Build ATS-Perfect Resumes with AI
        </p>
        <p className="tagline">
          Led by <strong>Ex-Amazon HR Gifty Mehra</strong>
        </p>
      </div>
    </header>
  );
};

export default Header;
