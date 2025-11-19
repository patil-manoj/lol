# ✅ Mobile App Setup Checklist

Use this checklist to get your mobile app running in under 5 minutes!

## Pre-Flight Check

- [ ] I'm in the `lol-1` directory
- [ ] The web app (Next.js) is working
- [ ] I have Node.js 18+ installed
- [ ] I have a smartphone OR simulator installed

## Step 1: Start the Backend (2 minutes)

Open a terminal and run:

```powershell
# Make sure you're in the root directory
cd C:\Users\MPatil\Downloads\lol-1

# Start the Next.js backend
npm run dev
```

**✅ Success Check**: You should see "Ready" and "Local: http://localhost:3000"

Keep this terminal running! Don't close it.

## Step 2: Find Your IP Address (1 minute)

Open a NEW terminal (keep the first one running) and run:

```powershell
ipconfig
```

Look for **IPv4 Address** under your WiFi adapter.

**Example**: `192.168.1.100`

**Write it down**: ********\_\_\_********

## Step 3: Configure Mobile App (1 minute)

```powershell
# Go to mobile-app directory
cd C:\Users\MPatil\Downloads\lol-1\mobile-app

# Copy environment file
Copy-Item .env.example .env

# Open it
notepad .env
```

Replace `localhost` with YOUR IP address:

```
EXPO_PUBLIC_API_URL=http://YOUR_IP_HERE:3000
```

**Example**:

```
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

**Save and close** the file.

## Step 4: Start Mobile App (1 minute)

In the same terminal:

```powershell
npm start
```

**✅ Success Check**:

- Metro bundler starts
- QR code appears
- No red errors

## Step 5: Run on Device (Choose One)

### Option A: Physical Device (Recommended) 📱

1. **Install Expo Go**

   - iOS: App Store → Search "Expo Go"
   - Android: Play Store → Search "Expo Go"

2. **Connect to WiFi**

   - Make sure phone is on SAME WiFi as computer

3. **Scan QR Code**

   - iOS: Open Camera app → Scan QR
   - Android: Open Expo Go → Scan QR

4. **Wait for Build**
   - Takes 30-60 seconds first time
   - App should launch automatically

### Option B: iOS Simulator (Mac Only) 🍎

In the terminal, press:

```
i
```

Simulator opens and app launches.

### Option C: Android Emulator 🤖

1. Make sure Android Studio is installed
2. Start an emulator
3. In terminal, press:

```
a
```

## Step 6: Test It! (2 minutes)

### ✅ App Opened Successfully

- [ ] See "Hi, I am Elena" greeting
- [ ] See suggestion chips below
- [ ] Header shows "Voice AI"
- [ ] Speaker icon in top right

### ✅ Send a Test Message

1. Type in bottom input: `Hello! How are you?`
2. Tap send button (or Enter)
3. Wait 2-3 seconds

Expected results:

- [ ] Your message appears (gray bubble, right side)
- [ ] AI response appears (white bubble, left side)
- [ ] You HEAR the AI response (voice)

### ✅ Test Auto-Speak Toggle

1. Tap speaker icon in header
2. Send another message
3. Should NOT hear voice this time
4. Tap speaker icon again (turn on)
5. Send message
6. Should hear voice again

### ✅ Test Emotion Detection

1. Type: `I'm feeling really happy today!`
2. Send message
3. Look at timestamp under your message
4. Should show: "X time ago • joy"

## 🎉 Success!

If all the above worked, your mobile app is **fully functional**!

## 🐛 Troubleshooting

### ❌ "Network request failed"

**Problem**: App can't reach backend

**Fix**:

```powershell
# 1. Check backend is running (other terminal)
# Should show "Ready" message

# 2. Check .env file
cd mobile-app
notepad .env
# Should show: EXPO_PUBLIC_API_URL=http://YOUR_IP:3000

# 3. Verify IP is correct
ipconfig
# Compare IPv4 Address with .env file

# 4. Restart mobile app
# In expo terminal, press 'r'
```

### ❌ "Can't scan QR code"

**Problem**: Camera not recognizing QR

**Fix**:

1. Make QR code bigger on screen
2. Adjust screen brightness
3. Try tunnel mode: `expo start --tunnel`
4. Or use Expo Go manual entry

### ❌ "Voice not working"

**Problem**: Can't hear AI responses

**Fix**:

1. Check phone volume
2. Turn off silent mode
3. Toggle speaker icon in header
4. Close and reopen app
5. Check device isn't connected to Bluetooth

### ❌ "Module not found" errors

**Problem**: Missing dependencies

**Fix**:

```powershell
cd mobile-app
npm install
expo start -c
```

### ❌ Metro bundler won't start

**Problem**: Port already in use

**Fix**:

```powershell
# Kill any existing metro processes
taskkill /F /IM node.exe

# Clear cache and restart
expo start -c
```

## 📱 Next Steps

Once everything works:

### Immediate

- [ ] Test different types of messages
- [ ] Try the emotion detection with various moods
- [ ] Explore the UI and interactions

### Soon

- [ ] Read full documentation in `mobile-app/README.md`
- [ ] Customize colors and voice settings
- [ ] Show it to friends/testers

### Later

- [ ] Add speech-to-text integration
- [ ] Build production version
- [ ] Deploy to app stores

## 📚 Documentation

All the details are here:

1. **Quick Start**: `mobile-app/SETUP.md`
2. **Full Guide**: `mobile-app/README.md`
3. **Testing**: `mobile-app/TESTING.md`
4. **Overview**: `MOBILE_APP_SUMMARY.md`

## 🆘 Still Having Issues?

1. Make sure both terminals are running:

   - Terminal 1: `npm run dev` (backend)
   - Terminal 2: `npm start` (mobile app)

2. Check the basics:

   - Same WiFi network
   - IP address is correct
   - No firewall blocking
   - Backend shows "Ready"

3. Try the nuclear option:

```powershell
# Stop everything
Ctrl+C in both terminals

# Restart backend
cd C:\Users\MPatil\Downloads\lol-1
npm run dev

# Restart mobile (new terminal)
cd C:\Users\MPatil\Downloads\lol-1\mobile-app
expo start -c
```

## ✨ You're Done!

The mobile app should now be working perfectly. Enjoy your Voice AI companion on mobile! 📱🎉

---

**Time to Complete**: 5-10 minutes
**Difficulty**: Easy
**Success Rate**: 95%+ (if you follow the steps)
