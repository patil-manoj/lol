# Build Android APK for GitHub Distribution

This guide will help you build an APK file that users can download from your GitHub releases.

## Prerequisites

1. **Expo Account** (Free)

   - Sign up at https://expo.dev/signup
   - You'll need this for building the app

2. **EAS CLI** (Expo Application Services)

   ```bash
   npm install -g eas-cli
   ```

3. **GitHub Repository**
   - Your code should be in a GitHub repository

---

## Method 1: Build APK Locally (Recommended for First Time)

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
cd mobile
eas login
```

### Step 3: Configure EAS Build

```bash
eas build:configure
```

### Step 4: Build the APK

```bash
# Build production APK
npm run build:android

# Or use EAS directly
eas build --platform android --profile production
```

### Step 5: Download the APK

- Once the build completes (takes 10-20 minutes), you'll get a download link
- Download the APK file
- Upload it to GitHub Releases

---

## Method 2: GitHub Actions (Automated)

### Step 1: Get Expo Token

```bash
eas whoami
eas build:configure
```

Then get your token:

```bash
# On Expo website, go to:
# https://expo.dev/accounts/[your-username]/settings/access-tokens
# Create a new token
```

### Step 2: Add GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:

- `EXPO_TOKEN`: Your Expo access token
- `EXPO_PUBLIC_API_URL`: Your backend URL (https://talktome-3jna.onrender.com)

### Step 3: Trigger Build

The workflow will automatically trigger when you:

- Push to main branch (if mobile folder changes)
- Create a GitHub release
- Manually run it from Actions tab

### Step 4: Download from Expo

After the GitHub Action runs:

1. Go to https://expo.dev/accounts/[your-username]/projects/talk-to-me-mobile/builds
2. Download the completed APK
3. Upload to GitHub Releases

---

## Method 3: EAS Build + GitHub Release (Manual)

### Quick Build Process

```bash
cd mobile

# 1. Login to Expo
eas login

# 2. Build APK
eas build --platform android --profile production

# 3. Wait for build (or use --non-interactive)
# You'll get a URL to monitor progress

# 4. Once complete, download APK from the link provided
```

### Create GitHub Release

1. Go to your GitHub repo
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `Talk to Me Mobile v1.0.0`
5. Upload the downloaded APK
6. Publish release

---

## Configuration Files

### ✅ `eas.json` (Already created)

- Configures build profiles
- Production builds APK (not AAB)

### ✅ `app.json` (Already configured)

- App name, bundle ID, permissions
- Icon and splash screen settings

### ✅ `.env` (Already set)

- Backend API URL configured

---

## Build Profiles

We have 3 build profiles:

1. **Development**

   ```bash
   eas build --profile development --platform android
   ```

   - For development/testing
   - Includes dev tools

2. **Preview**

   ```bash
   npm run build:preview
   ```

   - Quick APK for testing
   - Internal distribution

3. **Production** (Use this for GitHub releases)
   ```bash
   npm run build:android
   ```
   - Optimized, production-ready APK
   - Ready for distribution

---

## APK Installation Instructions (for Users)

Add this to your GitHub Release description:

```markdown
## Installation Instructions

### Android APK

1. **Download** the APK file below
2. **Enable** installation from unknown sources:
   - Settings → Security → Install unknown apps
   - Allow your browser/file manager
3. **Open** the downloaded APK file
4. **Install** the app
5. **Permissions**: The app will request microphone permission for voice input

### Requirements

- Android 5.0 (Lollipop) or higher
- Internet connection
- Microphone access for voice features

### First Launch

The app connects to our backend server at:
`https://talktome-3jna.onrender.com`

If you experience connection issues, ensure you have a stable internet connection.
```

---

## Troubleshooting

### Build Fails

- Check `eas build` logs
- Verify all dependencies are installed
- Ensure app.json is valid

### APK Won't Install

- Enable "Install unknown apps" on Android
- Check Android version (needs 5.0+)
- Verify APK is not corrupted

### App Crashes on Launch

- Check if backend is running
- Verify API URL in .env is correct
- Check Android logs: `adb logcat`

---

## Quick Start Commands

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Go to mobile directory
cd mobile

# Login to Expo
eas login

# Build production APK
npm run build:android

# Check build status
eas build:list
```

---

## File Sizes

Expected APK size: **30-50 MB**

---

## Update Process

To release a new version:

1. Update version in `app.json`:

   ```json
   {
     "expo": {
       "version": "1.0.1"
     }
   }
   ```

2. Build new APK:

   ```bash
   npm run build:android
   ```

3. Create new GitHub release with the APK

---

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Application Services](https://expo.dev/eas)
- [APK vs AAB](https://docs.expo.dev/build-reference/apk/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
