# 🚀 Quick Setup Guide - Mobile App

## Step 1: Make sure the backend is running

```powershell
# In the parent directory (lol-1), run:
cd ..
npm run dev
```

The backend should be running on http://localhost:3000

## Step 2: Find your computer's IP address

```powershell
# Windows: Run this command
ipconfig
```

Look for "IPv4 Address" under your WiFi or Ethernet adapter.
Example: `192.168.1.100`

## Step 3: Create .env file

```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit the .env file
notepad .env
```

Replace with your IP address:

```
EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:3000
```

Example:

```
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

**Important**: Do NOT use `localhost` - it won't work on mobile devices!

## Step 4: Start the app

```powershell
npm start
```

## Step 5: Run on your device

**Option A: Physical Device (Recommended)**

1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in your terminal
3. Make sure your phone is on the same WiFi network as your computer

**Option B: iOS Simulator (Mac only)**

- Press `i` in the terminal

**Option C: Android Emulator**

- Press `a` in the terminal
- Make sure Android Studio is installed

## Troubleshooting

### "Network request failed"

- Check that your computer's IP address is correct in `.env`
- Make sure the Next.js backend is running
- Verify both devices are on the same WiFi network
- Check your firewall isn't blocking port 3000

### App crashes on startup

- Run `npm install` again
- Clear cache: `expo start -c`
- Restart Expo Go app on your device

### "Cannot connect to Metro"

- Make sure nothing else is using port 19000-19001
- Restart with: `expo start -c --tunnel`

## Features Available

✅ Text chat with AI
✅ Text-to-speech responses (auto-speak)
✅ Emotion detection
✅ Beautiful mobile UI
⏳ Voice input (requires speech-to-text API setup)

## Next Steps

After the app is running:

1. Type a message and see the AI respond
2. Toggle auto-speak on/off in the header
3. The AI will read responses aloud with natural voice
4. Try sharing your feelings - the emotion will be detected!

## Production Deployment

To use a deployed backend instead of local:

1. Deploy your Next.js app to Vercel
2. Update `.env`:
   ```
   EXPO_PUBLIC_API_URL=https://your-app.vercel.app
   ```
3. Restart the app

---

Need help? Check the full README.md for detailed documentation.
