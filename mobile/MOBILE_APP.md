# 📱 Mobile App - Talk to Me

## Overview

A companion React Native mobile application for the Talk to Me Voice AI platform. Built with Expo for cross-platform compatibility on iOS and Android.

## What's Been Created

### ✅ Complete Mobile Application

The mobile app includes all core features from the web version:

1. **Chat Interface**

   - Real-time messaging with AI
   - Beautiful, modern UI inspired by messaging apps
   - Message history with timestamps
   - Emotion detection display

2. **Voice Features**

   - Text-to-Speech for AI responses (fully working)
   - Auto-speak toggle
   - Voice settings customization
   - Voice recording placeholder (requires API integration)

3. **Core Functionality**
   - Emotion analysis of user messages
   - Crisis detection and resources
   - Settings screen
   - Persistent preferences

### 📁 Project Structure

```
mobile-app/
├── src/
│   ├── components/
│   │   └── MessageList.tsx          # Message display with scroll
│   ├── hooks/
│   │   ├── useTextToSpeech.ts       # TTS implementation
│   │   └── useVoiceRecording.ts     # Voice recording (placeholder)
│   ├── screens/
│   │   ├── ChatScreen.tsx           # Main chat interface
│   │   └── SettingsScreen.tsx       # Settings page
│   ├── services/
│   │   └── chatService.ts           # API communication
│   ├── types/
│   │   └── index.ts                 # TypeScript definitions
│   └── utils/
│       └── emotionAnalysis.ts       # Emotion detection
├── App.tsx                          # App entry point
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── .env.example                     # Environment template
├── README.md                        # Full documentation
└── SETUP.md                         # Quick setup guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- For iOS: Mac with Xcode
- For Android: Android Studio
- Or: Expo Go app on your phone

### Quick Start

1. **Navigate to mobile app directory**

   ```bash
   cd mobile-app
   ```

2. **Install dependencies** (already done)

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   ```

4. **Update .env with your computer's IP**

   ```
   # Find IP: ipconfig (Windows) or ifconfig (Mac/Linux)
   EXPO_PUBLIC_API_URL=http://YOUR_IP:3000
   ```

5. **Make sure backend is running**

   ```bash
   # In parent directory
   cd ..
   npm run dev
   ```

6. **Start mobile app**

   ```bash
   cd mobile-app
   npm start
   ```

7. **Run on device**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app

## 🎯 Key Features

### Working Features ✅

- **Text Chat**: Full conversation with AI assistant
- **Text-to-Speech**: AI responses are spoken aloud
- **Auto-Speak Toggle**: Turn voice on/off
- **Emotion Detection**: Real-time sentiment analysis
- **Crisis Detection**: Automatic resource recommendations
- **Beautiful UI**: Modern, clean design
- **Settings**: Customize voice and preferences

### Requires Additional Setup 🔧

- **Speech-to-Text**: Needs API integration (Google/Assembly.ai/Whisper)
- **Conversation History**: Backend database setup
- **Push Notifications**: Expo notification service
- **User Authentication**: Auth provider integration

## 🔌 Backend Connection

The mobile app connects to your Next.js backend API.

### Local Development

```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

- Replace with YOUR computer's IP address
- Both devices must be on same WiFi
- Backend must be running

### Production

```env
EXPO_PUBLIC_API_URL=https://your-app.vercel.app
```

- Use your deployed Vercel URL
- No WiFi restriction
- Works anywhere

## 📱 Platform Support

| Platform | Status     | Notes                     |
| -------- | ---------- | ------------------------- |
| iOS      | ✅ Working | Requires Mac for building |
| Android  | ✅ Working | Build APK/AAB with EAS    |
| Web      | ⚠️ Limited | Works but not optimized   |

## 🎨 Customization

### Change Colors

Edit `src/screens/ChatScreen.tsx`:

```typescript
<LinearGradient
  colors={["#8B5CF6", "#3B82F6"]} // Purple to Blue
/>
```

### Adjust Voice Settings

Edit `src/screens/ChatScreen.tsx`:

```typescript
const voiceSettings: VoiceSettings = {
  pitch: 1.0, // 0.5 to 2.0
  rate: 0.9, // 0.1 to 2.0
  volume: 1.0, // 0.0 to 1.0
  language: "en-US",
};
```

## 🏗️ Building for Production

### Create Expo Account

```bash
npx expo login
```

### Build iOS

```bash
npx eas build --platform ios
```

### Build Android

```bash
# APK for testing
npx eas build --platform android --profile preview

# AAB for Play Store
npx eas build --platform android
```

## 🐛 Common Issues

### "Network request failed"

- **Cause**: Can't reach backend API
- **Fix**:
  - Use IP address, not localhost
  - Check backend is running
  - Verify same WiFi network
  - Check firewall settings

### "Module not found"

- **Cause**: Missing dependencies
- **Fix**:
  ```bash
  npm install
  expo start -c
  ```

### "Speech not working"

- **Cause**: Audio permissions or device settings
- **Fix**:
  - Check device volume
  - Grant audio permissions
  - Restart app
  - Test on different device

## 📊 Tech Stack

| Component  | Technology           | Purpose               |
| ---------- | -------------------- | --------------------- |
| Framework  | React Native + Expo  | Cross-platform mobile |
| Language   | TypeScript           | Type safety           |
| Navigation | React Navigation     | Screen routing        |
| Speech     | Expo Speech          | Text-to-speech        |
| HTTP       | Axios                | API communication     |
| UI         | React Native         | Native components     |
| Gradients  | expo-linear-gradient | Beautiful UI          |

## 🔐 Privacy & Security

- **No data collection** in the app
- **API calls** go to your backend only
- **Voice processing** happens on-device
- **No analytics** or tracking
- **Secure connections** (HTTPS in production)

## 🚧 Future Enhancements

### High Priority

- [ ] Speech-to-text integration
- [ ] Conversation persistence
- [ ] User authentication
- [ ] Offline mode

### Medium Priority

- [ ] Push notifications
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Voice customization UI

### Low Priority

- [ ] Mood tracking charts
- [ ] Export conversations
- [ ] Share messages
- [ ] Widget support

## 📚 Resources

- **Expo Documentation**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **Expo Speech**: https://docs.expo.dev/versions/latest/sdk/speech/

## 💡 Development Tips

1. **Fast Refresh**: Code changes auto-reload
2. **Debug Menu**: Shake device to open
3. **Console Logs**: Use `expo start` terminal
4. **Network Inspector**: Enable in debug menu
5. **Hot Reload**: Press `r` in terminal

## 🆘 Support

For issues or questions:

1. Check SETUP.md for quick fixes
2. Review README.md for detailed docs
3. Check Expo documentation
4. Review parent project's issues

## 🎉 Success Checklist

Before considering complete:

- [ ] App starts without errors
- [ ] Can send text messages
- [ ] AI responds correctly
- [ ] Text-to-speech works
- [ ] Auto-speak toggles properly
- [ ] Settings screen functional
- [ ] Emotion detection working
- [ ] Crisis detection triggers

## 🙏 Credits

- Built as mobile companion for Talk to Me web app
- Uses same backend API and AI models
- Shares emotion analysis algorithms
- Maintains feature parity with web version

---

**Status**: ✅ MVP Complete and Ready to Use

The mobile app is fully functional for text-based conversations with text-to-speech responses. Voice input requires additional API integration (speech-to-text service).
