# 📱 Visual Quick Reference Guide

## 🎯 What Is This?

A **React Native mobile app** for your "Talk to Me" Voice AI platform.

```
┌─────────────────────────────────┐
│  📱 MOBILE APP                  │
│  ┌───────────────────────────┐  │
│  │ 🎨 Beautiful Chat UI       │  │
│  │ 🔊 Text-to-Speech          │  │
│  │ 😊 Emotion Detection       │  │
│  │ 🤖 AI Conversations        │  │
│  └───────────────────────────┘  │
│                                 │
│  Connects to ↓                  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💻 YOUR BACKEND                │
│  (Next.js on port 3000)         │
│                                 │
│  Connects to ↓                  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  ☁️ GROQ API                    │
│  (Llama 3.3 70B - Free)         │
└─────────────────────────────────┘
```

---

## 🚦 Quick Start (5 Minutes)

### Step 1️⃣: Start Backend

```powershell
npm run dev
```

✅ Should see: "Ready" at http://localhost:3000

### Step 2️⃣: Get Your IP

```powershell
ipconfig
```

✅ Find IPv4 Address (e.g., 192.168.1.100)

### Step 3️⃣: Configure App

```powershell
cd mobile-app
Copy-Item .env.example .env
notepad .env
```

✅ Set: `EXPO_PUBLIC_API_URL=http://YOUR_IP:3000`

### Step 4️⃣: Launch App

```powershell
npm start
```

✅ QR code appears, no errors

### Step 5️⃣: Open on Device

- 📱 **Phone**: Scan QR with Expo Go app
- 💻 **iOS Sim**: Press `i`
- 🤖 **Android**: Press `a`

---

## 📱 App Screenshots (Text Description)

### Welcome Screen

```
┌─────────────────────────────────┐
│  Voice AI              🔊 ⚙️    │
├─────────────────────────────────┤
│                                 │
│         ┌─────────┐             │
│         │   🌍   │             │
│         └─────────┘             │
│                                 │
│    Hi, I am Elena.              │
│    How can I help you today?    │
│                                 │
│  ┌─────────┐  ┌─────────┐      │
│  │ Sing me │  │Restaurants│     │
│  │ a song  │  │  nearby  │      │
│  └─────────┘  └─────────┘      │
│  ┌─────────┐  ┌─────────┐      │
│  │ Play a  │  │ Sports   │      │
│  │  game   │  │  news    │      │
│  └─────────┘  └─────────┘      │
│                                 │
├─────────────────────────────────┤
│                                 │
│         ┌───────────┐           │
│         │    🎤     │  ← Voice  │
│         └───────────┘           │
│                                 │
│  🖼️  ┌──────────────┐  📤      │
│      │ Type here... │           │
│      └──────────────┘           │
└─────────────────────────────────┘
```

### Chat Screen

```
┌─────────────────────────────────┐
│  Voice AI              🔊 ⚙️    │
├─────────────────────────────────┤
│                                 │
│  🤖  Hello! How are you?        │
│      Just now                   │
│                                 │
│                Hello! I'm great │
│                   2 min ago • joy│
│                               👤│
│                                 │
│  🤖  That's wonderful to hear!  │
│      Just now                   │
│                                 │
├─────────────────────────────────┤
│         ┌───────────┐           │
│         │    🎤     │           │
│         └───────────┘           │
│                                 │
│  🖼️  ┌──────────────┐  📤      │
│      │ Type here... │           │
│      └──────────────┘           │
└─────────────────────────────────┘
```

---

## 🎨 Color Guide

```
┌─ Primary Colors ──────────────────┐
│                                   │
│  Purple: #8B5CF6  ████████        │
│  Blue:   #3B82F6  ████████        │
│  Cyan:   #06B6D4  ████████        │
│                                   │
└───────────────────────────────────┘

┌─ UI Colors ───────────────────────┐
│                                   │
│  User Msg:  #F3F4F6  ████████     │
│  AI Msg:    #FFFFFF  ████████     │
│  Text:      #111827  ████████     │
│  Border:    #E5E7EB  ████████     │
│                                   │
└───────────────────────────────────┘
```

---

## 📂 File Locations

```
mobile-app/
├── 📄 App.tsx              ← App entry point
├── 📄 app.json             ← Expo config
├── 📄 package.json         ← Dependencies
├── 📄 .env.example         ← Copy this to .env
│
├── 📁 src/
│   ├── 📁 components/
│   │   └── MessageList.tsx         ← Messages UI
│   ├── 📁 hooks/
│   │   ├── useTextToSpeech.ts      ← Voice output
│   │   └── useVoiceRecording.ts    ← Voice input*
│   ├── 📁 screens/
│   │   ├── ChatScreen.tsx          ← Main screen
│   │   └── SettingsScreen.tsx      ← Settings
│   ├── 📁 services/
│   │   └── chatService.ts          ← API calls
│   ├── 📁 types/
│   │   └── index.ts                ← TypeScript
│   └── 📁 utils/
│       └── emotionAnalysis.ts      ← Emotions
│
└── 📚 Documentation/
    ├── README.md                   ← Full guide
    ├── SETUP.md                    ← Quick start
    ├── TESTING.md                  ← Testing
    ├── ARCHITECTURE.md             ← Diagrams
    └── QUICK_START_CHECKLIST.md    ← Checklist
```

\*Voice input requires API integration

---

## ⚡ Key Commands

```bash
# Navigate to app
cd mobile-app

# Install dependencies
npm install

# Start development server
npm start

# Clear cache and start
expo start -c

# Run on iOS Simulator
Press 'i' in terminal

# Run on Android Emulator
Press 'a' in terminal

# Reload app
Press 'r' in terminal

# Open debug menu
Shake device
```

---

## 🔧 Environment Setup

### .env File

```env
# Local Development (use your IP!)
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000

# Production (use your deployed URL)
EXPO_PUBLIC_API_URL=https://your-app.vercel.app
```

### Find Your IP

```powershell
# Windows
ipconfig

# Mac/Linux
ifconfig

# Look for: IPv4 Address
```

---

## ✅ Feature Status

| Feature            | Status   | Notes                 |
| ------------------ | -------- | --------------------- |
| Text Chat          | ✅ 100%  | Working               |
| AI Responses       | ✅ 100%  | Groq Llama 3.3        |
| Text-to-Speech     | ✅ 100%  | Native TTS            |
| Auto-speak Toggle  | ✅ 100%  | Header button         |
| Emotion Detection  | ✅ 100%  | Keyword analysis      |
| Crisis Detection   | ✅ 100%  | Alert with resources  |
| Beautiful UI       | ✅ 100%  | Modern design         |
| Speech-to-Text     | ⏳ Later | Needs API integration |
| Save Conversations | ⏳ Later | Needs storage setup   |
| Dark Mode          | ⏳ Later | Future feature        |

---

## 🐛 Common Issues & Fixes

### ❌ "Network request failed"

```
Problem: Can't reach backend
Fix:     1. Check backend is running
         2. Verify IP in .env
         3. Same WiFi network
         4. Restart app (press 'r')
```

### ❌ "Module not found"

```
Problem: Missing dependencies
Fix:     npm install
         expo start -c
```

### ❌ "Voice not working"

```
Problem: Can't hear TTS
Fix:     1. Check volume
         2. Toggle speaker icon
         3. Not in silent mode
         4. Restart app
```

### ❌ "QR code won't scan"

```
Problem: Camera not reading
Fix:     1. Increase brightness
         2. Make QR bigger
         3. Use tunnel mode:
            expo start --tunnel
```

---

## 📊 Tech Stack

```
┌─ Frontend ────────────────────┐
│ React Native (Expo)           │
│ TypeScript                    │
│ React Hooks                   │
└───────────────────────────────┘

┌─ UI/UX ──────────────────────┐
│ React Native Core             │
│ Expo Linear Gradient          │
│ Expo Vector Icons             │
│ Safe Area Context             │
└───────────────────────────────┘

┌─ Voice ──────────────────────┐
│ Expo Speech (TTS)             │
│ Expo AV (Audio)               │
└───────────────────────────────┘

┌─ Backend ────────────────────┐
│ Axios (HTTP)                  │
│ Your Next.js API              │
│ Groq API (LLM)                │
└───────────────────────────────┘

┌─ Utils ──────────────────────┐
│ date-fns (Dates)              │
│ Custom emotion analysis       │
└───────────────────────────────┘
```

---

## 🎯 Success Checklist

Ready to use when:

- [x] App opens without errors
- [x] See welcome screen
- [x] Can type messages
- [x] AI responds
- [x] Hear voice response
- [x] Auto-speak toggles
- [x] Emotions detected
- [x] Crisis detection works

---

## 📞 Need Help?

1. **Quick Start**: `QUICK_START_CHECKLIST.md`
2. **Full Guide**: `README.md`
3. **Testing**: `TESTING.md`
4. **Architecture**: `ARCHITECTURE.md`

---

## 🎉 You're Ready!

The mobile app is **complete and ready to use**.

Follow the **Quick Start** section above to get it running in 5 minutes!

---

**Version**: 1.0.0
**Status**: ✅ Production Ready
**Platform**: iOS, Android, Web
**Last Updated**: November 19, 2025
