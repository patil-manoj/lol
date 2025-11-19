# 🚨 IMPORTANT: Complete Setup Instructions

## ✅ What's Working

- ✅ Mobile app is installed
- ✅ Dependencies are installed
- ✅ Expo Metro bundler is running
- ✅ QR code is displayed
- ✅ `.env` file is created with correct IP (10.217.101.221)

## ❌ What's Missing

- ❌ **Backend is NOT running** on port 3000
- The mobile app **needs the backend** to work!

---

## 🔧 Complete Setup (2 Terminals)

You need **TWO terminal windows** running at the same time:

### Terminal 1: Backend (Next.js)

```powershell
# Open a NEW terminal (keep current one open!)
# Navigate to root directory
cd C:\Users\MPatil\Downloads\lol-1

# Start the Next.js backend
npm run dev
```

**✅ Success check:**

```
Ready in XXms
Local: http://localhost:3000
```

**Keep this terminal running!** Don't close it.

---

### Terminal 2: Mobile App (Expo) - ALREADY RUNNING

You already have this running! Just keep it open.

If you stopped it, restart with:

```powershell
cd C:\Users\MPatil\Downloads\lol-1\mobile-app
npm start
```

---

## 📱 Now Test the App

Once **BOTH terminals are running**:

### Step 1: Verify Backend

Open browser: http://localhost:3000

- Should see your web app

### Step 2: Open Mobile App

**Option A: Physical Phone** 📱

1. Open Expo Go app
2. Scan the QR code from Terminal 2
3. Wait 30-60 seconds for build
4. App opens!

**Option B: Emulator**

- Press `a` for Android
- Press `i` for iOS (Mac only)

### Step 3: Send a Test Message

In the app:

1. Type: "Hello!"
2. Tap send button
3. Wait 2-3 seconds
4. Should see AI response
5. Should HEAR the voice! 🔊

---

## 🎯 Visual Guide

```
┌────────────────────────────────────────┐
│  TERMINAL 1: Backend                   │
│  C:\Users\MPatil\Downloads\lol-1       │
│                                        │
│  > npm run dev                         │
│  Ready on http://localhost:3000 ✅     │
│                                        │
│  (Keep this running!)                  │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  TERMINAL 2: Mobile App                │
│  C:\...\lol-1\mobile-app               │
│                                        │
│  > npm start                           │
│  [QR CODE DISPLAYED] ✅                │
│                                        │
│  (Keep this running!)                  │
└────────────────────────────────────────┘

         ↓ Both running ↓

┌────────────────────────────────────────┐
│  📱 PHONE: Scan QR Code                │
│                                        │
│  1. Open Expo Go                       │
│  2. Scan QR code                       │
│  3. App loads                          │
│  4. Start chatting! ✅                 │
└────────────────────────────────────────┘
```

---

## ⚠️ Current Status

Right now:

- ✅ Mobile app (Expo) is running
- ❌ Backend (Next.js) is **NOT** running

**What to do:**

1. **Open a NEW terminal** (don't close current one)
2. Run: `cd C:\Users\MPatil\Downloads\lol-1`
3. Run: `npm run dev`
4. Keep both terminals open
5. Now scan the QR code!

---

## 🐛 Troubleshooting

### "Network request failed" in app

**Cause:** Backend not running

**Fix:**

```powershell
# In a new terminal
cd C:\Users\MPatil\Downloads\lol-1
npm run dev
```

### "Cannot connect to Metro"

**Cause:** Expo not running

**Fix:**

```powershell
cd C:\Users\MPatil\Downloads\lol-1\mobile-app
npm start
```

### "Unable to resolve host"

**Cause:** Wrong IP in .env

**Fix:**

```powershell
# Check current IP from QR code (should be 10.217.101.221)
notepad .env
# Should have: EXPO_PUBLIC_API_URL=http://10.217.101.221:3000
```

---

## ✅ Success Checklist

App is working when:

- [ ] Terminal 1 shows "Ready" (backend)
- [ ] Terminal 2 shows QR code (mobile)
- [ ] Can open http://localhost:3000 in browser
- [ ] Mobile app loads on phone/emulator
- [ ] Can send messages
- [ ] AI responds
- [ ] Voice speaks responses

---

## 🎉 Quick Commands

**Start Backend:**

```powershell
cd C:\Users\MPatil\Downloads\lol-1
npm run dev
```

**Start Mobile App:**

```powershell
cd C:\Users\MPatil\Downloads\lol-1\mobile-app
npm start
```

**Stop Everything:**
Press `Ctrl+C` in each terminal

---

## 📞 Need Help?

1. Make sure **BOTH** terminals are running
2. Check backend: http://localhost:3000
3. Check mobile: QR code visible
4. Both on same WiFi network
5. No firewall blocking

---

**Next Step:** Open a NEW terminal and start the backend!

```powershell
cd C:\Users\MPatil\Downloads\lol-1
npm run dev
```

Then scan the QR code with your phone!
