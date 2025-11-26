# 🚀 Quick Google OAuth Setup - 5 Minutes

## ⚡ Fast Track (Recommended)

### Step 1: Go to Google Cloud Console

**Click this link:** https://console.cloud.google.com/apis/credentials

### Step 2: Create New Project (if you don't have one)

1. Click the project dropdown (top left)
2. Click "NEW PROJECT"
3. Name: `Elena-App` or any name
4. Click "CREATE"
5. Wait for project to be created (notification will appear)

### Step 3: Configure OAuth Consent Screen

1. Click "OAuth consent screen" (left sidebar)
2. Select **External**
3. Click "CREATE"
4. Fill in:
   - **App name:** Elena Voice Companion
   - **User support email:** Your email (select from dropdown)
   - **Developer contact:** Your email
5. Click "SAVE AND CONTINUE" (3 times - skip scopes and test users)
6. Click "BACK TO DASHBOARD"

### Step 4: Create OAuth Client ID

1. Click "Credentials" (left sidebar)
2. Click "+ CREATE CREDENTIALS" (top)
3. Select "OAuth client ID"
4. **Application type:** Web application
5. **Name:** Elena Web Client
6. Under "Authorized JavaScript origins":
   - Click "+ ADD URI"
   - Enter: `http://localhost:3000`
7. Under "Authorized redirect URIs":
   - Click "+ ADD URI"
   - Enter: `http://localhost:3000`
8. Click "CREATE"

### Step 5: Copy Your Client ID

1. A popup appears with your credentials
2. **Copy the Client ID** (looks like: `123456789-xxxxx.apps.googleusercontent.com`)
3. Click "OK"

### Step 6: Add to Your App

1. Open: `frontend/.env.local`
2. Paste your Client ID after the `=` sign:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
   ```
3. Save the file

### Step 7: Restart Dev Server

```bash
# Press Ctrl+C to stop current server
# Then run:
npm run dev
```

### Step 8: Test It!

1. Go to http://localhost:3000/signin
2. Click "Sign in with Google"
3. Select your Google account
4. ✅ You should be logged in!

---

## 🔍 Troubleshooting

### Error: "OAuth client was not found"

- **Cause:** Client ID is missing or incorrect in `.env.local`
- **Fix:** Make sure you copied the ENTIRE Client ID including `.apps.googleusercontent.com`

### Error: "redirect_uri_mismatch"

- **Cause:** Redirect URI not configured correctly
- **Fix:** Add `http://localhost:3000` to both:
  - Authorized JavaScript origins
  - Authorized redirect URIs

### Error: "Access blocked: This app hasn't been verified"

- **Cause:** Normal for development, app not published
- **Fix:** Click "Advanced" → "Go to Elena (unsafe)" - it's safe, it's YOUR app!

### Google button doesn't appear

- **Cause:** Client ID not loaded or dev server not restarted
- **Fix:**
  1. Check `.env.local` has your Client ID
  2. Restart dev server (Ctrl+C, then `npm run dev`)
  3. Hard refresh browser (Ctrl+Shift+R)

---

## 📸 Visual Guide

### Finding the Client ID in Google Console:

```
Google Cloud Console
└── APIs & Services
    └── Credentials
        └── OAuth 2.0 Client IDs
            └── [Your Client Name]
                └── Client ID: [COPY THIS]
```

### What the Client ID looks like:

```
✅ Correct format:
123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com

❌ Wrong (incomplete):
123456789012
abc123def456ghi789jkl012mno345pq
your-google-client-id-here
```

---

## 🎯 Quick Check

Before testing, verify:

- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth Client ID created (Web application type)
- [ ] `http://localhost:3000` added to JavaScript origins
- [ ] `http://localhost:3000` added to redirect URIs
- [ ] Client ID copied to `.env.local`
- [ ] Dev server restarted

---

## 💡 Pro Tips

1. **Keep the Credentials page open** - you might need to view/copy the Client ID again
2. **Don't share your Client ID publicly** - though it's less sensitive than Client Secret
3. **For production** - add your production domain to the authorized origins/redirects
4. **Testing with multiple accounts** - works! Just sign out and sign in with different Google account

---

## 🆘 Still Having Issues?

1. **Check Browser Console** (F12 → Console tab)

   - Look for specific error messages
   - Share them for targeted help

2. **Verify Environment Variable Loaded:**

   - Add this to any page temporarily:

   ```tsx
   console.log("Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
   ```

   - Check if it shows your actual ID or undefined

3. **Clear Browser Data:**

   - Sometimes cached data interferes
   - Clear cookies and cache for localhost

4. **Double-check the Client ID:**
   - It should be VERY long (60+ characters)
   - Must end with `.apps.googleusercontent.com`
   - No quotes, no spaces

---

Need help? The error message in your browser console will tell you exactly what's wrong! 🔍
