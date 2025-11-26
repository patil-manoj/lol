# Fix: Error 400 redirect_uri_mismatch

## The Problem

Google OAuth is rejecting the sign-in because the redirect URI doesn't match what's configured in Google Cloud Console.

## The Solution

### Step 1: Go to Google Cloud Console

Visit: https://console.cloud.google.com/apis/credentials

### Step 2: Edit Your OAuth Client

1. Find your OAuth 2.0 Client ID in the list
2. Click the ✏️ edit icon

### Step 3: Add Authorized JavaScript Origins

Under **Authorized JavaScript origins**, add:

```
http://localhost:3000
```

### Step 4: Add Authorized Redirect URIs

Under **Authorized redirect URIs**, add ALL of these:

```
http://localhost:3000
http://localhost:3000/signin
http://localhost:3000/signup
```

### Step 5: Save and Wait

1. Click **SAVE** at the bottom
2. Wait **5 minutes** for Google to propagate the changes
3. Restart your dev server:
   ```powershell
   # Press Ctrl+C to stop the server
   npm run dev
   ```

### Step 6: Test Again

Try signing in with Google again after the waiting period.

## Important Notes

### If You're Using a Different Port

If your dev server runs on a different port (check your terminal), replace `3000` with your actual port:

- Port 3001: `http://localhost:3001`
- Port 3002: `http://localhost:3002`
- etc.

### Common Mistakes

❌ **DON'T** add trailing slashes: `http://localhost:3000/`  
✅ **DO** use exact URLs: `http://localhost:3000`

❌ **DON'T** use HTTPS for localhost: `https://localhost:3000`  
✅ **DO** use HTTP: `http://localhost:3000`

### Production Deployment

When you deploy to production, you'll need to:

1. Add your production domain to both sections
2. Examples:
   - Origin: `https://yourdomain.com`
   - Redirect URIs:
     - `https://yourdomain.com`
     - `https://yourdomain.com/signin`
     - `https://yourdomain.com/signup`

## Still Having Issues?

### Check Your Current Port

In your terminal where the dev server is running, look for:

```
- Local:   http://localhost:XXXX
```

Use that port number (XXXX) in your redirect URIs.

### Verify Configuration

In Google Cloud Console, your config should look like:

**Authorized JavaScript origins:**

```
http://localhost:3000
```

**Authorized redirect URIs:**

```
http://localhost:3000
http://localhost:3000/signin
http://localhost:3000/signup
```

### Clear Browser Cache

Sometimes browsers cache OAuth errors:

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

## Questions?

If you're still stuck, check:

- ✅ Did you save the changes in Google Cloud Console?
- ✅ Did you wait 5 minutes?
- ✅ Did you restart the dev server?
- ✅ Are you using the correct port number?
