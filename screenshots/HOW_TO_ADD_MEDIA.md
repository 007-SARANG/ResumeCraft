ren# 📸 How to Add Screenshots and Video

## Required Screenshots

Add these 3 screenshots to the `screenshots/` folder:

### 1. `landing-page.png`
**What to capture:**
- Full page view showing the header
- Prompt input area with example text
- Template selector
- Generate button

**How to capture:**
1. Open http://localhost:3000
2. Load the example prompt
3. Take screenshot (Win + Shift + S on Windows)
4. Save as `screenshots/landing-page.png`

### 2. `resume-preview.png`
**What to capture:**
- Generated resume in the preview panel
- Show one of the templates (Modern recommended)
- Template badges visible
- All resume sections visible

**How to capture:**
1. Generate a resume
2. Scroll to show the preview
3. Take screenshot
4. Save as `screenshots/resume-preview.png`

### 3. `ats-score.png`
**What to capture:**
- ATS Score meter showing the circular score
- Feedback section
- Suggestions list
- Full ATS analyzer panel

**How to capture:**
1. After generating resume, click "Show ATS Analysis"
2. Take screenshot of the ATS panel
3. Save as `screenshots/ats-score.png`

---

## Adding Demo Video

### Option 1: GitHub (Recommended)

1. **Record your video**
   - Use OBS Studio, Loom, or Windows Game Bar
   - Keep it 2-5 minutes
   - Show all key features

2. **Upload to your GitHub repository**
   ```bash
   git add demo-video.mp4
   git commit -m "Add demo video"
   git push
   ```

3. **Get the video URL**
   - Go to your GitHub repo
   - Click on the video file
   - Right-click the video → Copy video address
   - Paste in README: 
   ```markdown
   https://github.com/yourusername/ResumeCraft/assets/your-video-url.mp4
   ```

### Option 2: YouTube

1. Upload video to YouTube
2. Get the shareable link
3. Update README with YouTube embed:
```markdown
[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
```

---

## What to Show in Demo Video

### Script (2-5 minutes):

**00:00 - 00:30** - Introduction
- "Hi, this is ResumeCraft..."
- Show landing page
- Explain the problem it solves

**00:30 - 01:30** - Main Features
- Click "Load Example" button
- Show prompt input
- Select different templates (click each one)
- Choose PDF format
- Click "Generate ATS-Perfect Resume"

**01:30 - 02:30** - Results
- Show live preview
- Switch between templates
- Show differences (Classic, Modern, Minimal)
- Click "Show ATS Analysis"
- Explain the ATS score

**02:30 - 03:00** - Download
- Click "Download Resume"
- Open the downloaded PDF
- Show the final result

**03:00 - 03:30** - Quick Code Tour (Optional)
- Show project structure
- Mention tech stack
- Highlight key features

**03:30 - 04:00** - Closing
- Summarize benefits
- Thank viewers

---

## Finalizing README

After adding screenshots and video:

1. **Replace the old README:**
   ```bash
   del README.md
   ren README_NEW.md README.md
   ```

2. **Update these sections in README.md:**
   - Line 12: Add your video URL
   - Line 28-38: Verify screenshot paths
   - Line 422: Add your GitHub username
   - Line 423: Add your LinkedIn URL
   - Line 424: Add your email

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update README with screenshots and video"
   git push
   ```

---

## Screenshot Tips

✅ **Use high resolution** (1920x1080 or higher)  
✅ **Crop unnecessary parts** (browser bars, taskbar)  
✅ **Show the full interface** clearly  
✅ **Use clean data** (professional example)  
✅ **Good lighting** if recording screen  
✅ **Compress images** to reduce file size  

---

## Tools You Can Use

### Screenshot Tools:
- Windows: **Win + Shift + S** (Snipping Tool)
- Mac: **Cmd + Shift + 4**
- **ShareX** (Windows - Advanced)
- **Lightshot**

### Video Recording:
- **OBS Studio** (Free, professional)
- **Loom** (Free tier available)
- **Windows Game Bar** (Win + G)
- **Bandicam**
- **Camtasia** (Paid)

### Video Editing:
- **DaVinci Resolve** (Free)
- **Shotcut** (Free)
- **Windows Photos** (Basic editing)

---

## Final Checklist

- [ ] 3 screenshots added to `screenshots/` folder
- [ ] Demo video recorded (2-5 minutes)
- [ ] Video uploaded to GitHub or YouTube
- [ ] README.md updated with correct URLs
- [ ] README.md updated with your info (name, GitHub, email)
- [ ] All paths verified
- [ ] README looks good on GitHub preview
- [ ] Committed and pushed to GitHub

---

🎉 **You're ready to submit!** Your README will look professional and complete!
