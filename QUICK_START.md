# 🎯 Quick Start Guide - 3 Separate Apps

This project consists of **3 independent applications** that work together:

1. **Backend** - API server (deploy separately)
2. **Frontend** - Web application (connects to backend)
3. **Mobile** - Mobile app (connects to backend)

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

### 4. Edit `.env` and add your API keys
```env
GROQ_API_KEY=your_groq_api_key_from_console.groq.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

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
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# For production (after deploying backend)
# NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
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
# API_URL=https://your-backend.vercel.app/api
```

### 5. Run mobile app
```bash
npm start
```

✅ Scan QR code with Expo Go app

---

## 🚀 Deployment Guide

### Deploy Backend

**Vercel:**
1. Push backend folder to GitHub
2. Import in Vercel
3. Add environment variables (GROQ_API_KEY, etc.)
4. Deploy!
5. Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

**Railway/Render:**
1. Connect repository
2. Set root directory to `backend`
3. Add environment variables
4. Deploy!

### Deploy Frontend

**Vercel:**
1. Push frontend folder to GitHub
2. Import in Vercel
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
   ```
4. Deploy!

### Deploy Mobile

**Expo EAS:**
```bash
cd mobile
npm install -g eas-cli
eas build
eas submit
```

---

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
```env
API_URL=http://192.168.1.XXX:3001/api
SUPABASE_URL=optional
SUPABASE_ANON_KEY=optional
```

---

## 🎯 Development Workflow

### Option 1: All Local
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Mobile
cd mobile && npm start
```

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
- [ ] Mobile `.env` points to backend
- [ ] Got Groq API key from console.groq.com
- [ ] (Optional) Got Supabase credentials

---

## 🔗 Architecture

```
Mobile App  ──┐
              ├──> Backend API (Port 3001)
Frontend    ──┘

Backend handles:
- AI chat via Groq
- Database via Supabase
- Business logic

Frontend/Mobile handle:
- User interface
- Voice input/output
- Emotion display
```

---

**Need help?** See individual README files:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Mobile README](./mobile/README.md)
