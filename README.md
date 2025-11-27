# Talk to Me - AI Companion App

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
</div>

## 🌟 Overview

**Talk to Me** is a privacy-focused AI companion application available on both web and mobile platforms. Built with a warm, organic design inspired by earth tones, it provides a safe space for emotional support, mental wellness, and meaningful conversation with an empathetic AI assistant.

---

## ✨ Features

### 🎨 **Beautiful Design**
- **Organic UI**: Warm terra, olive, and sand color palette
- **Responsive**: Seamless experience across web and mobile
- **Accessibility**: High contrast ratios and screen reader support

### 🤖 **AI-Powered Conversations**
- Natural language understanding with GPT-powered responses
- Emotion analysis and empathetic replies
- Context-aware conversation history

### 🔒 **Privacy First**
- **Optional Chat Storage**: Control whether conversations are saved
- **Data Transparency**: Clear opt-in for personalization
- **Secure Authentication**: Email/password + Google OAuth
- **Local Data**: Mobile app uses AsyncStorage for offline privacy

### 🎤 **Voice Interaction**
- Voice recording for hands-free input
- Text-to-speech for AI responses (mobile)
- Real-time audio processing

### 📱 **Cross-Platform**
- **Web App**: Progressive Web App with Next.js
- **Mobile App**: Native iOS & Android with React Native/Expo
- **Unified Design**: Pixel-perfect consistency across platforms

---

## 📥 Download Mobile App

### Android
[Download Latest APK from Releases](https://github.com/patil-manoj/lol/releases)

### iOS
Coming soon to the App Store

---

## 🛠 Tech Stack

### Frontend (Web)
- **Framework**: Next.js 15.1 with React 19
- **Styling**: Tailwind CSS with custom theme
- **Authentication**: Google OAuth 2.0
- **State Management**: React Context API
- **API Client**: Fetch with streaming support

### Mobile (iOS/Android)
- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation 7
- **UI Library**: Expo Linear Gradient, Ionicons
- **Authentication**: Expo Auth Session + Google Sign-In
- **Storage**: AsyncStorage for persistence
- **Audio**: Expo AV for voice recording

### Backend
- **Runtime**: Next.js API Routes
- **AI Integration**: OpenAI GPT-4 / Groq Llama 3.3
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Google Cloud Console project for OAuth (optional)
- Groq or OpenAI API key

### Installation

#### Web App
```bash
cd frontend
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

#### Mobile App
```bash
cd mobile
npm install
npx expo start
```
Scan QR code with Expo Go app (iOS/Android)

#### Backend
```bash
cd backend
npm install
npm run dev
```
API running at [http://localhost:3001](http://localhost:3001)

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Mobile
Update OAuth credentials in [AuthContext.tsx](mobile/src/context/AuthContext.tsx):
```tsx
expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com'
iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com'
androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com'
```

#### Backend (.env)
```env
GROQ_API_KEY=your_groq_api_key
# OR
OPENAI_API_KEY=your_openai_api_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📂 Project Structure

```
talk-to-me/
├── frontend/          # Next.js web application
│   ├── src/
│   │   ├── app/       # Pages (home, chat, auth)
│   │   ├── components/# React components
│   │   ├── context/   # Auth & state management
│   │   └── lib/       # Utilities (emotion analysis)
│   └── public/        # Static assets
│
├── mobile/            # React Native Expo app
│   ├── src/
│   │   ├── screens/   # App screens (Home, Chat, Auth)
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # Auth with AsyncStorage
│   │   ├── theme/     # Design system (colors, gradients)
│   │   └── services/  # API client
│   ├── assets/        # Images & icons
│   └── app.json       # Expo configuration
│
└── backend/           # Next.js API routes
    ├── app/api/       # REST endpoints
    └── supabase/      # Database schema
```

---

## 🎨 Design System

### Color Palette
- **Terra**: `#D97642` - Primary accent, warm and inviting
- **Olive**: `#56624A` - Secondary text, grounded
- **Sand**: `#FFF8F0` - Background, soft and calming

### Typography
- **Headings**: Geist Sans (bold, 24-48px)
- **Body**: Geist Sans (regular, 16px)
- **Mono**: Geist Mono (code snippets)

### Components
- Organic blob shapes with asymmetric borders
- Soft shadows for depth
- Smooth gradients (terra → olive)

---

## 🔐 Authentication

### Web
1. Email/password with JWT storage in localStorage
2. Google OAuth via `@react-oauth/google`
3. Protected routes with `ProtectedRoute` component

### Mobile
1. Email/password with AsyncStorage persistence
2. Native Google Sign-In via `expo-auth-session`
3. Auth-aware navigation stack

---

## 📖 API Documentation

### POST /api/chat
**Request**
```json
{
  "message": "Hello, how are you?",
  "history": [],
  "userId": "user123"
}
```

**Response** (Streaming)
```
data: {"role":"assistant","content":"Hello! I'm doing well..."}
```

---

## 🧪 Testing

```bash
# Web
cd frontend
npm run test

# Mobile
cd mobile
npm run test

# Type checking
npx tsc --noEmit
```

---

## 📦 Building for Production

### Web Deployment
```bash
cd frontend
npm run build
npm start
```
Deploy to Vercel/Netlify

### Mobile Build

#### Android APK
```bash
cd mobile
eas build --platform android --profile preview
```

#### iOS IPA
```bash
cd mobile
eas build --platform ios --profile preview
```

See [BUILD_APK.md](mobile/BUILD_APK.md) and [BUILD_IOS.md](mobile/BUILD_IOS.md) for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style (Prettier + ESLint)
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** / **Groq** for LLM APIs
- **Expo** for React Native tooling
- **Supabase** for backend infrastructure
- **Vercel** for Next.js framework

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/patil-manoj/lol/issues)
- **Discussions**: [GitHub Discussions](https://github.com/patil-manoj/lol/discussions)

---

<div align="center">
  Made with ❤️ for mental wellness
</div>
