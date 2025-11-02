# 🚀 ResumeCraft - Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm
- OpenAI API key (Get it from https://platform.openai.com/api-keys)

## Installation Steps

### Option 1: Automated Setup (Windows)
1. Run the setup script:
   ```cmd
   setup.bat
   ```

2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. Start the application:
   ```cmd
   npm run dev
   ```

### Option 2: Manual Setup

1. **Install Backend Dependencies**
   ```cmd
   npm install
   ```

2. **Install Frontend Dependencies**
   ```cmd
   cd client
   npm install
   cd ..
   ```

3. **Configure Environment Variables**
   ```cmd
   copy .env.example .env
   ```
   
   Edit `.env` and add your API key:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start Development Server**
   ```cmd
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend React app on http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Click "💡 Load Example" to see a sample prompt
3. Or write your own prompt with your details
4. Choose a template (Classic, Modern, or Minimal)
5. Select format (PDF or DOCX)
6. Click "✨ Generate ATS-Perfect Resume"
7. Review your resume and ATS score
8. Download your resume!

## Features Included

✅ AI-Powered prompt parsing
✅ Professional summary generation
✅ Action verb enhancement
✅ ATS score calculation
✅ 3 professional templates
✅ PDF and DOCX export
✅ Real-time preview
✅ Keyword analysis
✅ One-page layout optimization

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use, you can change them:
- Backend: Edit `PORT` in `.env`
- Frontend: Create `.env` in `client` folder with `PORT=3001`

### API Key Issues
Make sure your OpenAI API key is:
- Valid and active
- Has sufficient credits
- Properly set in the `.env` file

### Module Not Found
Run `npm run install-all` to reinstall all dependencies

## Project Structure

```
ResumeCraft/
├── server/                 # Backend
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   └── services/          # AI & PDF generation
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app
│   │   └── index.js       # Entry point
│   └── public/
├── generated-resumes/     # Output folder (auto-created)
├── package.json           # Backend dependencies
└── README.md              # Documentation
```

## API Endpoints

- `POST /api/resume/generate` - Generate resume from prompt
- `GET /api/resume/download/:filename` - Download resume
- `GET /api/resume/templates` - Get available templates
- `POST /api/ats/score` - Calculate ATS score
- `POST /api/ats/keyword-analysis` - Analyze keywords
- `POST /api/ats/generate-summary` - Generate summary

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the console logs for errors
3. Ensure all dependencies are installed
4. Verify your API key is correct

## Submission Checklist

- [ ] Code is complete and tested
- [ ] README is comprehensive
- [ ] `.env.example` is included (NOT `.env`)
- [ ] Screen recording video is prepared
- [ ] GitHub repository is ready
- [ ] Manual submission details prepared for Unstop

---

**Your Prompt. Your Resume. Recruiter Ready.** 🚀
