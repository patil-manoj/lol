# Frontend - Talk to Me Web App

This is the Next.js web application frontend that connects to the backend API.

## Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx    # Main chat UI
│   │   ├── MessageList.tsx      # Message display
│   │   ├── VoiceRecorder.tsx    # Speech recognition
│   │   └── TextToSpeech.tsx     # Voice synthesis
│   ├── lib/
│   │   ├── emotionAnalysis.ts   # Sentiment detection
│   │   └── supabase.ts          # Database client
│   └── types/
│       └── index.ts             # TypeScript types
├── .env.example             # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create `.env.local` file:**

   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables in `.env.local`:**

   ```env
   # Point to your deployed backend or local backend
   NEXT_PUBLIC_API_URL=http://localhost:3001/api

   # Optional: Supabase for direct database access
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

## Running Locally

**With local backend:**

```bash
# Terminal 1: Start backend
cd ../backend
npm run dev

# Terminal 2: Start frontend
cd ../frontend
npm run dev
```

**With deployed backend:**

```bash
# Update .env.local with your backend URL
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api

# Start frontend
npm run dev
```

The app will be available at `http://localhost:3000`

## Features

- 🎤 Voice input with Web Speech API
- 🔊 Text-to-speech responses
- 😊 Real-time emotion analysis
- 💬 Chat interface with conversation history
- 🎨 Modern, responsive UI with Tailwind CSS

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```
5. Deploy!

### Deploy to Netlify

1. Connect GitHub repository
2. Set base directory to `frontend`
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

## Environment Variables

| Variable                        | Required | Description             |
| ------------------------------- | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL`           | Yes      | URL of your backend API |
| `NEXT_PUBLIC_SUPABASE_URL`      | No       | Supabase project URL    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No       | Supabase anonymous key  |

## Browser Requirements

- Chrome or Edge (for Web Speech API)
- Modern browser with JavaScript enabled
- Microphone access for voice input
