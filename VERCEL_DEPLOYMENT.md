# Vercel Deployment Guide for ResumeCraft

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel](https://vercel.com/)**
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `007-SARANG/ResumeCraft`

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   AI_SERVICE=groq
   GROQ_API_KEY=your_groq_api_key_here
   PORT=5000
   ```

   Optional (if using other AI services):
   ```
   OPENAI_API_KEY=your_openai_key
   GEMINI_API_KEY=your_gemini_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)
   - Copy your deployment URL: `https://your-app.vercel.app`

### 3. Deploy via CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your account
# ? Link to existing project? No
# ? What's your project's name? resumecraft
# ? In which directory is your code located? ./

# Add environment variables
vercel env add AI_SERVICE
vercel env add GROQ_API_KEY

# Deploy to production
vercel --prod
```

## 📝 Important Notes

### API Configuration
The backend API runs serverless on Vercel. Make sure to:

1. **Update API Base URL in Client**
   - File: `client/src/App.js`
   - Change from `http://localhost:5000` to your Vercel URL

### Environment Variables
All environment variables from `.env` need to be added in Vercel dashboard:
- AI_SERVICE (set to `groq` for free tier)
- GROQ_API_KEY (get from https://console.groq.com/)

### File Size Limits
- Vercel has a 100MB limit for deployments
- Video file (26.5MB) is included but won't affect deployment
- Generated PDFs are created dynamically

### Serverless Functions
- Each API route becomes a serverless function
- Cold start may take 1-2 seconds on first request
- Functions timeout after 10 seconds (Hobby plan)

## 🔧 Troubleshooting

### Issue: API not working after deployment
**Solution**: Check environment variables are set correctly in Vercel dashboard

### Issue: CORS errors
**Solution**: Update CORS origin in `server/server.js` to include Vercel domain

### Issue: Build fails
**Solution**: Ensure all dependencies are in package.json, not just devDependencies

## ✅ Post-Deployment Checklist

- [ ] Test all three templates (Classic, Modern, Minimal)
- [ ] Test PDF download
- [ ] Test DOCX download
- [ ] Test ATS score analysis
- [ ] Verify example prompt loads correctly
- [ ] Check mobile responsiveness

## 🎉 Your App is Live!

Once deployed, update your README.md with:
```markdown
🔗 **Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app)
```

Share your deployed link with the hackathon judges! 🏆
