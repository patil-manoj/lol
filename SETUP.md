# 🚀 Quick Setup Guide

## Step 1: Install Dependencies (2 minutes)

```powershell
npm install
```

## Step 2: Get Your Free Groq API Key (3 minutes)

1. Go to https://console.groq.com
2. Click "Sign Up" (free, no credit card needed)
3. Once logged in, click "API Keys" in the left sidebar
4. Click "Create API Key"
5. Copy the key (starts with `gsk_...`)

## Step 3: Create Environment File (1 minute)

```powershell
# Copy the example file
Copy-Item .env.local.example .env.local

# Open in notepad
notepad .env.local
```

Paste your Groq API key:

```
GROQ_API_KEY=gsk_your_actual_key_here
```

Save and close.

## Step 4: Run the App (1 minute)

```powershell
npm run dev
```

Open Chrome/Edge and go to: **http://localhost:3000**

## Step 5: Try It Out! 🎤

1. Click the microphone button
2. Allow microphone access when prompted
3. Start talking!
4. The AI will respond with voice and text

---

## Optional: Add Database (Supabase)

**Skip this if you just want to test the app**

### Why add a database?

- Save conversation history
- Track mood over time
- Access conversations across devices

### Setup (5 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Create a new project (name it anything)
4. Wait 2 minutes for project to initialize
5. Go to Settings → API
6. Copy **URL** and **anon public** key
7. Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

8. Go to SQL Editor in Supabase
9. Copy everything from `supabase/schema.sql`
10. Paste and click "Run"

Done! Restart your app:

```powershell
# Press Ctrl+C to stop the server
npm run dev
```

---

## Troubleshooting

### ❌ "Cannot find module 'next'"

```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### ❌ "Groq API error"

- Check your API key in `.env.local`
- Make sure there are no spaces or quotes around it
- Restart the dev server

### ❌ "Microphone not working"

- Use Chrome or Edge (not Firefox/Safari)
- Click the microphone icon in address bar
- Select "Always allow" for localhost
- Must use HTTPS in production (Vercel handles this automatically)

### ❌ Port 3000 already in use

```powershell
# Use a different port
npm run dev -- -p 3001
```

Then open http://localhost:3001

---

## What's Next?

- **Deploy to Vercel:** Push to GitHub, import to Vercel, add env vars, deploy
- **Customize the AI:** Edit `src/app/api/chat/route.ts`
- **Change voice:** Edit `src/components/TextToSpeech.tsx`
- **Add features:** Check README.md for enhancement ideas

---

## Cost Breakdown

| Service        | Usage               | Cost         |
| -------------- | ------------------- | ------------ |
| Groq API       | 14,400 requests/day | $0           |
| Supabase       | 500MB database      | $0           |
| Vercel hosting | Unlimited bandwidth | $0           |
| **Total**      |                     | **$0/month** |

You can run this completely free for hundreds of users! 🎉
