# 🧪 Testing the Mobile App

## Quick Test Checklist

Follow these steps to verify the mobile app is working correctly.

### 1. Initial Setup ✓

- [ ] Backend is running at http://localhost:3000
- [ ] `.env` file created in mobile-app directory
- [ ] IP address correctly set in `.env`
- [ ] Dependencies installed (`npm install` in mobile-app)

### 2. Start the App ✓

```bash
cd mobile-app
npm start
```

Expected output:

- Metro bundler starts
- QR code appears
- No red errors in terminal

### 3. Launch on Device/Simulator ✓

**iOS Simulator (Mac only)**

```bash
Press 'i' in terminal
```

**Android Emulator**

```bash
Press 'a' in terminal
```

**Physical Device**

- Open Expo Go app
- Scan QR code
- Wait for app to load

### 4. Test Basic Functionality ✓

#### Welcome Screen

- [ ] See "Hi, I am Elena" greeting
- [ ] See suggestion chips
- [ ] Voice AI header visible
- [ ] Speaker icon in header

#### Send a Message

- [ ] Type "Hello, how are you?" in text input
- [ ] Tap send button (or press Enter)
- [ ] Message appears in chat
- [ ] AI response appears within 2-3 seconds

#### Text-to-Speech

- [ ] AI response is spoken aloud (if auto-speak on)
- [ ] Voice sounds natural
- [ ] Can toggle speaker icon in header
- [ ] When off, no voice playback

#### Emotion Detection

- [ ] Type "I'm feeling really happy today!"
- [ ] Send message
- [ ] Check timestamp shows emotion (e.g., "joy")

#### Voice Button

- [ ] Large blue gradient button visible above input
- [ ] Tap it (shows placeholder alert)
- [ ] Alert explains voice input needs API setup

### 5. Test Settings ✓

- [ ] Not implemented in current version (future feature)
- [ ] Auto-speak toggle in header works

### 6. Test Error Handling ✓

#### Stop Backend

```bash
# Stop the Next.js backend
Ctrl+C in backend terminal
```

Then in app:

- [ ] Send a message
- [ ] Error alert appears
- [ ] Clear error message about connection

#### Restart Backend

```bash
npm run dev
```

- [ ] Send message again
- [ ] Works normally

### 7. Test UI Elements ✓

#### Message Bubbles

- [ ] User messages on right (gray)
- [ ] AI messages on left (white with border)
- [ ] Avatars show correctly
- [ ] Timestamps display

#### Input Area

- [ ] Text input expands for long messages
- [ ] Gallery icon visible (placeholder)
- [ ] Send button changes color when text present
- [ ] Loading spinner shows when waiting

#### Scrolling

- [ ] Messages auto-scroll to bottom
- [ ] Can scroll up to see history
- [ ] Smooth scrolling animation

### 8. Test Edge Cases ✓

#### Long Message

- [ ] Type 200+ character message
- [ ] Sends successfully
- [ ] Displays properly in bubble
- [ ] TTS reads entire message

#### Quick Messages

- [ ] Send 3-4 messages rapidly
- [ ] All get responses
- [ ] No crashes or hangs

#### Empty Message

- [ ] Try to send empty text
- [ ] Send button disabled
- [ ] Nothing happens

#### Crisis Keywords

- [ ] Type "I'm feeling suicidal"
- [ ] Send message
- [ ] AI responds empathetically
- [ ] Alert shows crisis resources

### 9. Performance Tests ✓

#### App Startup

- [ ] Opens in < 3 seconds
- [ ] No white screen flash
- [ ] Smooth animations

#### Response Time

- [ ] Messages send instantly
- [ ] AI responds in 1-3 seconds
- [ ] TTS starts immediately after response

#### Memory

- [ ] Send 20+ messages
- [ ] App remains responsive
- [ ] No slowdown or lag

### 10. Platform-Specific Tests ✓

#### iOS

- [ ] Safe area respected (notch)
- [ ] Keyboard pushes content up
- [ ] Voice sounds natural
- [ ] Back swipe works (if navigation added)

#### Android

- [ ] Back button works
- [ ] Keyboard overlay correct
- [ ] Voice synthesizer works
- [ ] Material Design elements

## Common Test Failures & Fixes

### ❌ "Can't connect to backend"

**Fix**:

```bash
# Check backend is running
cd ..
npm run dev

# Verify IP in .env
cat .env
# Should show: EXPO_PUBLIC_API_URL=http://YOUR_IP:3000
```

### ❌ "Module not found"

**Fix**:

```bash
npm install
expo start -c
```

### ❌ "Voice not working"

**Fix**:

- Check device volume
- Ensure not in silent mode
- Toggle auto-speak off and on
- Restart app

### ❌ "App crashes on startup"

**Fix**:

```bash
# Clear cache
expo start -c

# Reinstall
rm -rf node_modules
npm install
```

## Automated Testing (Future)

For CI/CD, add these tests:

```bash
# Unit tests
npm test

# E2E tests (Detox)
npm run test:e2e

# Type checking
npm run type-check
```

## Manual Testing Script

Use this for QA:

```typescript
// Test scenarios
const scenarios = [
  { input: "Hello!", expected: "greeting response" },
  { input: "I'm sad", expected: "empathetic response + emotion: sadness" },
  { input: "Tell me a joke", expected: "humorous response" },
  { input: "I feel hopeless", expected: "crisis resources" },
];

// Test each scenario and verify
```

## Performance Benchmarks

Target metrics:

- **App startup**: < 3 seconds
- **Message send**: < 100ms
- **AI response**: 1-3 seconds
- **TTS start**: < 200ms
- **Memory usage**: < 150MB
- **Bundle size**: < 50MB

## Sign-Off Checklist

Before marking as complete:

- [ ] All basic functionality tests pass
- [ ] No console errors or warnings
- [ ] Smooth, responsive UI
- [ ] Voice works reliably
- [ ] Error handling works
- [ ] Documentation is clear
- [ ] .env.example provided
- [ ] README is comprehensive

## Bug Reporting Template

If you find issues:

```
**Bug**: [Brief description]
**Steps to reproduce**:
1.
2.
3.

**Expected**: [What should happen]
**Actual**: [What actually happens]
**Device**: [iOS/Android version]
**Logs**: [Console errors]
```

---

**Testing Status**: Ready for manual testing
**Last Updated**: November 19, 2025
**Version**: 1.0.0
