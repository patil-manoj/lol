# 🎯 Talk to Me - Voice AI Companion

## 📥 Download

### Android APK

**[Download Latest Version](https://github.com/patil-manoj/lol/releases/latest/download/talk-to-me.apk)**

Or browse all releases: [Releases Page](https://github.com/patil-manoj/lol/releases)

### iOS

Coming soon via TestFlight

---

## 🚀 What is this?

**3 separate apps working together:**

1. **Backend** - API server (Port 3001)
2. **Frontend** - Web app (Port 3000)
3. **Mobile** - Android/iOS app

---

## 🔧 Backend Setup

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env
```

### 4. Edit `.env` and add your API key

```env
GROQ_API_KEY=your_groq_api_key_from_console.groq.com
```

Get free API key: https://console.groq.com

### 5. Run backend

```bash
npm run dev
```

✅ Backend runs on: `http://localhost:3001`

---

## 🌐 Frontend Setup

### 1. Navigate to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env.local
```

### 4. Edit `.env.local` and point to backend

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/chat
```

### 5. Run frontend

```bash
npm run dev
```

✅ Frontend runs on: `http://localhost:3000`

---

## 📱 Mobile Setup

### 1. Navigate to mobile folder

```bash
cd mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env
```

### 4. Edit `.env` and point to backend

```env
# For local development (use your computer's IP, not localhost)
API_URL=http://192.168.1.XXX:3001/api

# For production (after deploying backend)
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:3001
```

Replace `192.168.1.XXX` with your computer's IP address start

````

✅ Scan QR code with Expo Go app

---

## 🚀 Deployment Guide

### Deploy B

### Backend → Render/Railway
1. Connect GitHub repo
2. Set base directory: `backend`
3. Add env: `GROQ_API_KEY`
4. Deploy → Copy URL

### Frontend → Netlify
Already configured! Just:
1. Connect GitHub repo
2. Set base directory: `frontend`
3. Add env: `NEXT_PUBLIC_API_URL=your-backend-url/api/chat`
4. Deploy

### Mobile → Build APK
```bash
cd mobile
eas build --platform android
````

Download APK from build page, upload to GitHub Releases

## 📝 Environment Variables Summary

### Backend `.env`

```env
GROQ_API_KEY=required_get_from_groq
NEXT_PUBLIC_SUPABASE_URL=optional
NEXT_PUBLIC_SUPABASE_ANON_KEY=optional
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUPABASE_URL=optional
NEXT_PUBLIC_SUPABASE_ANON_KEY=optional
```

### Mobile `.env`

| App      | Variable              | Value                     |
| -------- | --------------------- | ------------------------- |
| Backend  | `GROQ_API_KEY`        | Get from console.groq.com |
| Frontend | `NEXT_PUBLIC_API_URL` | Backend URL + `/api/chat` |
| Mobile   | `EXPO_PUBLIC_API_URL` | Backend URL               |

### Option 2: Deploy Backend, Local Frontend/Mobile

1. Deploy backend to Vercel/Railway
2. Update frontend `.env.local` with backend URL
3. Update mobile `.env` with backend URL
4. Run frontend and mobile locally

### Option 3: Deploy Everything

1. Deploy backend
2. Deploy frontend (with backend URL)
3. Build mobile app (with backend URL)

---

## ✅ Quick Checklist

- [ ] Backend deployed or running locally
- [ ] Frontend `.env.local` points to backend
- [💻 Run All Apps Locally

````bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Terminal 3
cd mobile && npm start
```📦 How GitHub Actions Works

**Workflow:** `.github/workflows/build-apk.yml`

**What it does (FULLY AUTOMATED):**
1. Triggers when you push to `main` branch
2. Builds APK on Expo's cloud servers
3. Waits for build to complete (up to 30 minutes)
4. **Automatically downloads the APK**
5. **Automatically creates a GitHub Release**
6. **Users can download directly from Releases page!**

**Setup (One-time):**
1. Go to GitHub: `Settings → Secrets and variables → Actions`
2. Add these secrets:
   - `EXPO_TOKEN` - Get from https://expo.dev/settings/access-tokens
   - `EXPO_PUBLIC_API_URL` - Your backend URL (e.g., `https://your-backend.onrender.com`)
3. Push to main → APK automatically appears in Releases! 🎉

**That's it!** Every push to main = new APK release automatically.

---

## ✅ Checklist

- [ ] Backend running (Port 3001)
- [ ] Groq API key added
- [ ] Frontend/Mobile pointing to backend
- [ ] For APK: Expo account created

---

**Docs:** [Backend](./backend/README.md) • [Frontend](./frontend/DEPLOY.md) • [Mobile](./mobile/BUILD_APK
````
