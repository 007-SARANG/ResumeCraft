# 🆓 Get FREE Google Gemini API Key

## Why Gemini?
- **Completely FREE** (no credit card required)
- Generous free tier
- Fast and reliable
- Perfect for testing and development

## Steps to Get Your API Key:

### 1. Visit Google AI Studio
Go to: **https://makersuite.google.com/app/apikey**

Or alternatively: **https://aistudio.google.com/app/apikey**

### 2. Sign In
- Use your Google account
- Accept the terms of service

### 3. Create API Key
- Click "Create API Key"
- Select "Create API key in new project" (or use existing project)
- Copy the generated API key

### 4. Add to Your Project
Open your `.env` file and add:
```
GEMINI_API_KEY=YOUR_KEY_HERE
AI_SERVICE=gemini
```

### 5. Restart Server
```cmd
npm run dev
```

## ✅ You're Done!

Your ResumeCraft app will now use Google Gemini (FREE) instead of OpenAI (paid).

## Free Tier Limits:
- 60 requests per minute
- 1,500 requests per day
- More than enough for testing and demos!

## Switching Back to OpenAI:
If you later want to use OpenAI, just change in `.env`:
```
AI_SERVICE=openai
```

---

**Note:** Both OpenAI and Gemini services are fully implemented in your project. You can switch between them anytime by changing the `AI_SERVICE` variable!
