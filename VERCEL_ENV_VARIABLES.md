# Environment Variables for Vercel

## Add these in Vercel Dashboard → Settings → Environment Variables

### Required Variables:

**AI_SERVICE**
```
groq
```
Description: Which AI service to use (groq is free and fast)

**GROQ_API_KEY**
```
your_groq_api_key_here
```
Description: Your Groq API key from console.groq.com (starts with gsk_)

**PORT**
```
5000
```
Description: Server port number

### Optional Variables (if you want to use other AI services):

**OPENAI_API_KEY**
```
your_openai_key_here
```

**GEMINI_API_KEY**
```
your_gemini_key_here
```

---

## How to Add in Vercel:

1. Go to: https://vercel.com/007-sarang/resumecraft/settings/environment-variables
2. Click "Add New"
3. Add each variable one by one
4. Select "Production", "Preview", and "Development" for each
5. Click "Save"
6. Redeploy your project (Vercel → Deployments → ... → Redeploy)

---

## Note:
After adding environment variables, you MUST redeploy for changes to take effect!
