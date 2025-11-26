# Google OAuth Setup Guide

## 🔐 Setting up Google Authentication for Elena

Follow these steps to enable Google Sign-In for your application.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Enter project name (e.g., "Elena Voice Companion")
4. Click **Create**

### Step 2: Enable Google+ API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and press **Enable**

### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Click **Create**
4. Fill in the required fields:
   - **App name**: Elena Voice Companion
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **Save and Continue**
6. Skip **Scopes** (click Save and Continue)
7. Add test users if needed (for development)
8. Click **Save and Continue**

### Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Application type**: Web application
4. **Name**: Elena Web Client
5. **Authorized JavaScript origins**:
   - `http://localhost:3000` (for development)
   - Your production domain (e.g., `https://elena-app.com`)
6. **Authorized redirect URIs**:
   - `http://localhost:3000` (for development)
   - Your production domain
7. Click **Create**
8. Copy the **Client ID** (it looks like: `xxxxx.apps.googleusercontent.com`)

### Step 5: Configure Your Application

1. Open `frontend/.env.local` file
2. Replace the placeholder with your actual Client ID:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   ```
3. Save the file

### Step 6: Restart Development Server

```bash
cd frontend
npm run dev
```

## ✅ Testing Google Sign-In

1. Navigate to sign-in or sign-up page
2. Click "Sign in with Google" button
3. Select your Google account
4. Grant permissions
5. You should be redirected to the onboarding page

## 🔒 Security Notes

- **Never commit** `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production, set environment variables in your hosting platform (Vercel, Netlify, etc.)
- Client ID can be public (it's meant to be exposed in frontend)
- Keep Client Secret private (not needed for frontend-only OAuth)

## 🚀 Production Deployment

When deploying to production:

1. Add your production domain to **Authorized JavaScript origins**
2. Add your production domain to **Authorized redirect URIs**
3. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` environment variable in your hosting platform
4. Test OAuth flow on production URL

## 📝 What's Been Implemented

✅ Google OAuth package installed (`@react-oauth/google`)
✅ GoogleOAuthProvider wrapper in root layout
✅ `signInWithGoogle` method in AuthContext
✅ JWT token decoding for Google credentials
✅ Google Sign-In buttons on both sign-in and sign-up pages
✅ Automatic account creation for new Google users
✅ Existing account detection for returning Google users
✅ Beautiful Google button with official branding
✅ Loading states and error handling

## 🎨 Features

- **One-Click Authentication**: Users can sign in/up with just their Google account
- **Seamless Integration**: Google users go straight to onboarding after first sign-in
- **Account Merging**: If a user exists with the same email, they're signed in
- **Secure**: Uses official Google OAuth 2.0 flow
- **Beautiful UI**: Google button matches your app's organic design aesthetic

## 🛠️ How It Works

1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. User selects account and grants permission
4. Google returns access token
5. App fetches user info (email, name, picture)
6. App checks if user exists in local storage
7. Either signs in existing user or creates new account
8. Redirects to appropriate page (chat or onboarding)

## 💡 Tips

- Test with multiple Google accounts
- Clear localStorage to test new user flow
- Check browser console for detailed error messages
- Ensure popup blockers aren't interfering
