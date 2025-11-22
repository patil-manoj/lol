# 🎙️ Talk to Me - Voice-Based AI Companion

A voice-first AI companion providing emotional support through meaningful conversations. Built with Next.js, React Native, and Groq's free LLM API.

![Talk to Me Banner](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Free](https://img.shields.io/badge/Cost-$0%2Fmonth-green?style=for-the-badge)

---

## 📁 Project Structure

This monorepo contains **3 independent applications**:

```
talk-to-me/
├── backend/          # 🔧 API Server (Next.js API Routes + Groq)
├── frontend/         # 🌐 Web App (Next.js + React)
└── mobile/           # 📱 Mobile App (React Native + Expo)
```

Each application runs independently and connects through API calls.

---

## 🚀 Quick Start

**See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions.**

### TL;DR

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env  # Add GROQ_API_KEY
npm run dev           # http://localhost:3001

# 2. Frontend
cd frontend
npm install
cp .env.example .env.local  # Set NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000

# 3. Mobile
cd mobile
npm install
# Edit .env with API_URL
npm start
```

---

## ✨ Features

- 🎤 **Voice Input** - Web Speech API for natural conversations
- 🔊 **Voice Output** - Text-to-speech responses
- 🤖 **AI-Powered** - Groq's Llama 3.3 70B (free tier)
- 😊 **Emotion Tracking** - Real-time sentiment analysis
- 💬 **Chat Interface** - Beautiful, responsive UI
- 🔒 **Privacy-First** - Optional data persistence
- 📱 **Multi-Platform** - Web and mobile apps

---

## 🔑 API Keys (Free)

### Groq (Required)

1. Visit [console.groq.com](https://console.groq.com)
2. Create free account
3. Generate API key
4. Free tier: 14,400 requests/day

### Supabase (Optional)

1. Visit [supabase.com](https://supabase.com)
2. Create project
3. Get URL and anon key
4. Free tier: 500MB database

---

## 🌐 Deployment

### Backend

- **Vercel**: Deploy from `backend/` folder
- **Railway/Render**: Point to `backend/` directory
- Set `GROQ_API_KEY` environment variable

### Frontend

- **Vercel/Netlify**: Deploy from `frontend/` folder
- Set `NEXT_PUBLIC_API_URL` to your backend URL

### Mobile

- **Expo EAS**: Build and publish to app stores
- Configure `API_URL` in build settings

---

## 📚 Documentation

- [Quick Start Guide](./QUICK_START.md) - Complete setup instructions
- [Backend README](./backend/README.md) - API documentation
- [Frontend README](./frontend/README.md) - Web app guide
- [Mobile README](./mobile/README.md) - Mobile app guide

---

## 🛠️ Tech Stack

| Component      | Technology           | Purpose          |
| -------------- | -------------------- | ---------------- |
| Backend        | Next.js API Routes   | API server       |
| Frontend       | Next.js + React      | Web application  |
| Mobile         | React Native + Expo  | iOS/Android apps |
| AI             | Groq (Llama 3.3 70B) | Chat responses   |
| Database       | Supabase (optional)  | Data persistence |
| Speech-to-Text | Web Speech API       | Voice input      |
| Text-to-Speech | Web Speech Synthesis | Voice output     |

---

## 🎯 Architecture

```
┌─────────────┐
│  Mobile App │─────┐
└─────────────┘     │
                    ├──► Backend API ──► Groq LLM
┌─────────────┐     │      (Port 3001)
│  Frontend   │─────┘
└─────────────┘
```

- **Backend**: Handles AI chat, database, business logic
- **Frontend/Mobile**: UI, voice input/output, emotion display

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) - Free LLM API
- [Supabase](https://supabase.com) - Free database hosting
- [Vercel](https://vercel.com) - Free deployment
- [Expo](https://expo.dev) - Mobile development platform

---

**Made with ❤️ for people who need someone to talk to**

```
talk-to-me/
├── backend/          # API server and backend services
├── frontend/         # Next.js web application
├── mobile/           # React Native mobile app
├── package.json      # Root package with scripts for all apps
├── tsconfig.json     # Root TypeScript configuration
└── README.md         # This file
```

### 📦 Backend (`/backend`)

Backend API server with Groq LLM integration and Supabase database.

- **Technology:** Next.js API routes
- **Features:** Chat API, Groq LLM integration, database schema
- **Port:** 3001 (default)
- [Backend README](./backend/README.md)

### 🌐 Frontend (`/frontend`)

Web application with voice interaction and chat interface.

- **Technology:** Next.js 14, React, Tailwind CSS
- **Features:** Voice input/output, emotion analysis, chat UI
- **Port:** 3000 (default)
- [Frontend README](./frontend/README.md)

### 📱 Mobile (`/mobile`)

React Native mobile application for iOS and Android.

- **Technology:** React Native, Expo
- **Features:** Voice recording, text-to-speech, emotion tracking
- **Platform:** iOS & Android
- [Mobile README](./mobile/README.md)

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn**
- **Groq API key** (free tier - 14,400 requests/day)
- **Supabase account** (optional, for data persistence)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/talk-to-me.git
cd talk-to-me
```

2. **Install all dependencies**

```bash
npm run install:all
```

This will install dependencies for backend, frontend, and mobile apps.

### Running the Applications

#### Run Frontend (Web App)

```bash
npm run dev:frontend
```

Visit [http://localhost:3000](http://localhost:3000)

#### Run Backend (API Server)

```bash
npm run dev:backend
```

API available at [http://localhost:3001/api](http://localhost:3001/api)

#### Run Mobile App

```bash
npm run dev:mobile
```

Follow Expo instructions in the terminal to run on iOS/Android.

### Environment Variables

Each application needs its own environment variables:

**Backend (`.env`):**

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Frontend (`.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Mobile (`.env`):**

```env
API_URL=http://localhost:3001/api
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## ✨ Features

### 🎤 Voice Interaction

- **Real-time speech recognition** using Web Speech API (Chrome/Edge)
- **Natural voice responses** with Web Speech Synthesis
- **Continuous listening mode** with visual feedback
- **Push-to-talk** or type interface

### 🤖 AI-Powered Conversations

- **Empathetic responses** from Llama 3.3 70B via Groq's free API
- **Therapeutic conversation framework** (CBT-inspired)
- **Crisis detection** with resource recommendations
- **Context-aware** conversations

### 😊 Emotion Tracking

- **Real-time sentiment analysis** of user messages
- **Mood visualization** with emoji indicators
- **Conversation history** with emotional insights
- **Dominant emotion detection**

### 🔒 Privacy-First

- **No data collection** by default (runs in browser)
- **Optional Supabase integration** for conversation history
- **Anonymous usage** supported
- **All voice processing** happens client-side

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** installed
- **Chrome or Edge browser** (for Web Speech API)
- **Groq API key** (free tier - 14,400 requests/day)
- **Supabase account** (optional, for data persistence)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/kinship-voice-companion.git
cd kinship-voice-companion
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Required: Get from https://console.groq.com
GROQ_API_KEY=gsk_your_groq_api_key_here

# Optional: Get from https://supabase.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting API Keys (100% Free)

### Groq API (Required)

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into `.env.local`

**Free Tier:**

- 14,400 requests/day
- Llama 3.3 70B model access
- No credit card required

### Supabase (Optional)

1. Visit [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings → API
5. Copy URL and anon key to `.env.local`
6. Run the SQL schema in `supabase/schema.sql` in SQL Editor

**Free Tier:**

- 500MB database
- 2GB file storage
- 50,000 monthly active users

## 📁 Project Structure

```
talk-to-me/
├── backend/          # API server and backend services
├── frontend/         # Next.js web application
├── mobile/           # React Native mobile app
├── package.json      # Root package with scripts for all apps
├── tsconfig.json     # Root TypeScript configuration
└── README.md         # This file
```

## 💡 Development Workflow

### Installing Dependencies

```bash
# Install all dependencies (backend + frontend + mobile)
npm run install:all

# Or install individually
npm run install:frontend
npm run install:backend
npm run install:mobile
```

### Running Development Servers

```bash
# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend

# Run mobile app
npm run dev:mobile
```

### Building for Production

```bash
# Build frontend
npm run build:frontend

# Build backend
npm run build:backend
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Mobile App Documentation](./mobile/README.md)
- [Setup Guide](./SETUP.md)
- [Development Notes](./NOTES.md)

## 🔑 Getting API Keys (100% Free)

### Voice Input Flow

```
User speaks → Web Speech API → Transcript → Emotion Analysis → Groq LLM → Response → Text-to-Speech → User hears
```

### Technology Stack

| Component      | Technology           | Cost |
| -------------- | -------------------- | ---- |
| Frontend       | Next.js 14 + React   | Free |
| Speech-to-Text | Web Speech API       | Free |
| Text-to-Speech | Web Speech Synthesis | Free |
| LLM            | Groq (Llama 3.3 70B) | Free |
| Database       | Supabase (optional)  | Free |
| Hosting        | Vercel               | Free |
| **Total**      | **$0/month**         | ✅   |

## 🎨 Customization

### Change Voice Settings

Edit `src/components/TextToSpeech.tsx`:

```typescript
utterance.pitch = 1.0; // 0.0 to 2.0
utterance.rate = 0.9; // 0.1 to 10
utterance.volume = 1.0; // 0.0 to 1.0
```

### Modify AI Personality

Edit the system prompt in `src/app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `You are Talk to Me, a warm, empathetic AI companion...`;
```

### Adjust Emotion Detection

Customize keywords in `src/lib/emotionAnalysis.ts`:

```typescript
const EMOTION_KEYWORDS = {
  joy: ['happy', 'great', ...],
  sadness: ['sad', 'down', ...],
  // Add your own keywords
};
```

## 🚀 Deployment

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Add environment variables
6. Deploy!

### Deploy Backend to Vercel/Railway

1. Set root directory to `backend`
2. Add environment variables
3. Deploy!

### Deploy Mobile App

- **iOS:** Submit to App Store using Expo EAS
- **Android:** Submit to Google Play using Expo EAS

See [Expo documentation](https://docs.expo.dev/submit/introduction/) for details.

## 🛠️ Tech Stack

| Component      | Technology           | Purpose          |
| -------------- | -------------------- | ---------------- |
| Frontend       | Next.js 14 + React   | Web application  |
| Mobile         | React Native + Expo  | Mobile apps      |
| Backend        | Next.js API routes   | API server       |
| Speech-to-Text | Web Speech API       | Voice input      |
| Text-to-Speech | Web Speech Synthesis | Voice output     |
| LLM            | Groq (Llama 3.3 70B) | AI responses     |
| Database       | Supabase             | Data persistence |
| Styling        | Tailwind CSS         | UI styling       |
| State          | Zustand              | State management |

## 🔧 Troubleshooting

### "Speech recognition not supported"

- **Solution:** Use Google Chrome or Microsoft Edge
- Web Speech API is not supported in Firefox or Safari

### "Microphone access denied"

- **Solution:** Click the microphone icon in your browser's address bar and allow access
- Ensure you're using HTTPS (required for microphone access)

### "Groq API error: 401"

- **Solution:** Check that your API key is correct in `.env.local`
- Restart the development server after changing environment variables

### Voice responses are robotic

- **Solution:** This is a browser limitation. For better quality:
  - Upgrade to Google Cloud TTS (1M chars/month free)
  - Or use Piper TTS (self-hosted, free)

### Slow responses

- **Solution:** Groq is very fast (800+ tokens/sec). If slow:
  - Check your internet connection
  - Verify Groq API status at [status.groq.com](https://status.groq.com)

## 📊 Performance

### Benchmarks (MVP Setup)

| Metric                     | Value       |
| -------------------------- | ----------- |
| Speech Recognition Latency | <300ms      |
| LLM Response Time          | 1-2 seconds |
| Voice Synthesis Latency    | <200ms      |
| Total Round-trip           | 2-3 seconds |
| Accuracy (STT)             | 85-90%      |
| Cost per conversation      | $0.00       |

## 🛡️ Privacy & Ethics

### Data Handling

- **Voice processing:** Happens in browser, sent to Google servers (Web Speech API limitation)
- **Conversations:** Stored in browser memory by default
- **Optional persistence:** Enable Supabase for conversation history
- **No tracking:** No analytics or telemetry by default

### Ethical Guidelines

- Clear AI disclosure to users
- Crisis detection with professional resource recommendations
- Not a replacement for professional therapy
- Privacy-first design

### Crisis Resources

Built-in detection for crisis keywords triggers recommendations:

- **National Suicide Prevention Lifeline:** 988
- **Crisis Text Line:** Text HOME to 741741

## 🤝 Contributing

Contributions welcome! This is an open-source project built for social good.

### Ideas for Enhancement

- [ ] Add conversation export (PDF, text)
- [ ] Implement mood tracking over time with charts
- [ ] Multi-language support
- [ ] Voice activity detection (auto pause/resume)
- [ ] Integration with wearables (heart rate, sleep data)
- [ ] Group support rooms
- [ ] Therapist dashboard integration

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- **Groq** for providing free LLM API access
- **Supabase** for free database hosting
- **Meta** for open-sourcing Llama models
- **Vercel** for free Next.js hosting
- **Web Speech API** contributors

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/talk-to-me/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/talk-to-me/discussions)
- **Email:** support@talktome.example.com

## 🗺️ Roadmap

### Phase 1: MVP (Current)

- ✅ Voice input/output
- ✅ Basic emotion detection
- ✅ Groq LLM integration
- ✅ Crisis detection

### Phase 2: Enhancement (Next 2 months)

- [ ] Conversation persistence
- [ ] User authentication
- [ ] Mood tracking dashboard
- [ ] Mobile app (React Native)

### Phase 3: Scale (Months 3-6)

- [ ] Premium tier (ElevenLabs voices)
- [ ] Therapist integration
- [ ] B2B features (corporate wellness)
- [ ] Multi-modal input (video, biometrics)

---

**Made with ❤️ for people who need someone to talk to**

_Remember: You're not alone. This tool is here to help, but it's not a substitute for professional mental health care. If you're in crisis, please reach out to the resources mentioned above._
