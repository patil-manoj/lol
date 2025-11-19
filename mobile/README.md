# Talk to Me - Mobile App 📱

A React Native mobile application for the Talk to Me Voice AI Companion. This app provides empathetic AI conversations with voice support on iOS and Android devices.

## ✨ Features

- 🎤 **Text-to-Speech**: AI responses are spoken aloud with natural voice
- 💬 **Real-time Chat**: Instant messaging with AI companion
- 😊 **Emotion Tracking**: Sentiment analysis of user messages
- 🎨 **Beautiful UI**: Modern, clean interface inspired by messaging apps
- 📱 **Cross-Platform**: Works on iOS and Android

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio (for Android development)
- Expo Go app on your physical device (optional)

### Installation

1. **Navigate to the mobile-app directory**

   ```bash
   cd mobile-app
   ```

2. **Install dependencies** (if not already done)

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Update the API URL in `.env`**

   For local development, you need to use your computer's IP address (not localhost):

   ```env
   # Find your IP address:
   # Windows: ipconfig
   # Mac/Linux: ifconfig

   EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:3000
   # Example: EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
   ```

   **Important**: Make sure your Next.js backend is running on port 3000!

5. **Start the Expo development server**

   ```bash
   npm start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS Simulator (Mac only)
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── components/
│   │   └── MessageList.tsx       # Message display component
│   ├── hooks/
│   │   ├── useTextToSpeech.ts    # Text-to-speech hook
│   │   └── useVoiceRecording.ts  # Voice recording hook
│   ├── screens/
│   │   ├── ChatScreen.tsx        # Main chat interface
│   │   └── SettingsScreen.tsx    # Settings page
│   ├── services/
│   │   └── chatService.ts        # API communication
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── utils/
│       └── emotionAnalysis.ts    # Emotion detection
├── App.tsx                       # App entry point
├── package.json
├── .env.example
└── README.md
```

## 🔧 Configuration

### Backend Connection

The app connects to your Next.js backend API. You have two options:

**Option 1: Local Development**

1. Run the Next.js backend: `cd .. && npm run dev`
2. Find your computer's IP address
3. Update `.env`: `EXPO_PUBLIC_API_URL=http://YOUR_IP:3000`

**Option 2: Production Backend**

1. Deploy the Next.js app to Vercel
2. Update `.env`: `EXPO_PUBLIC_API_URL=https://your-app.vercel.app`

### Text-to-Speech

The app uses Expo's built-in Speech API. No additional configuration needed!

### Voice Recording (Coming Soon)

Speech-to-text requires additional service integration:

- Google Cloud Speech-to-Text
- Assembly.ai
- OpenAI Whisper API

Currently, users can type messages. Voice input shows a placeholder alert.

## 🎨 Customization

### Change Voice Settings

Edit `src/screens/ChatScreen.tsx`:

```typescript
const voiceSettings: VoiceSettings = {
  pitch: 1.0, // 0.5 to 2.0
  rate: 0.9, // 0.1 to 2.0
  volume: 1.0, // 0.0 to 1.0
  language: "en-US",
};
```

### Modify UI Colors

Update the gradient colors in `ChatScreen.tsx`:

```typescript
<LinearGradient
  colors={["#8B5CF6", "#3B82F6"]} // Purple to Blue
  // Change to your preferred colors
/>
```

## 📱 Building for Production

### iOS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android Build

```bash
# Build APK for Android
eas build --platform android --profile preview

# Build AAB for Google Play Store
eas build --platform android
```

## 🐛 Troubleshooting

### "Network request failed"

**Problem**: Can't connect to backend API

**Solutions**:

1. Make sure Next.js backend is running (`npm run dev` in parent directory)
2. Use your computer's IP address, not `localhost`
3. Ensure phone and computer are on the same WiFi network
4. Check firewall settings

### "Speech synthesis not working"

**Problem**: Text-to-speech not playing

**Solutions**:

1. Check device volume
2. Ensure app has audio permissions
3. Try restarting the app
4. Test with Expo Go app vs standalone build

### "Cannot find module './src/...'"

**Problem**: Import errors

**Solutions**:

1. Run `npm install` again
2. Clear Metro bundler cache: `expo start -c`
3. Delete `node_modules` and reinstall

## 🔐 Privacy

- **No data collection** by default
- **Voice processing** happens on-device (text-to-speech)
- **API calls** are sent to your backend only
- **No analytics** or tracking in MVP

## 🚧 Roadmap

### Phase 1: Current MVP

- ✅ Text chat with AI
- ✅ Text-to-speech responses
- ✅ Emotion detection
- ✅ Clean UI

### Phase 2: Next Steps

- [ ] Speech-to-text input
- [ ] Conversation history persistence
- [ ] User authentication
- [ ] Push notifications for check-ins
- [ ] Offline mode support

### Phase 3: Advanced Features

- [ ] Multi-language support
- [ ] Voice customization
- [ ] Mood tracking charts
- [ ] Share conversations

## 💡 Tips

1. **Testing on Physical Device**: Use Expo Go app for quick testing
2. **Debugging**: Shake device to open developer menu
3. **Hot Reload**: Changes auto-reload in development
4. **Network Issues**: Always use IP address for local backend, not localhost

## 📞 Support

- **Issues**: Check the parent project's GitHub Issues
- **Documentation**: See main README.md in parent directory
- **Expo Docs**: https://docs.expo.dev

## 🙏 Acknowledgments

- **Expo** for the amazing React Native framework
- **Groq** for free LLM API access
- **Parent Web App** for the core functionality

## 📄 License

MIT License - Same as parent project

---

**Made with ❤️ to help people feel less alone**

_Remember: This is a companion app, not a replacement for professional mental health care._
