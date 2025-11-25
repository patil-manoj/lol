# Build iOS App for Distribution

## ⚠️ **Important iOS Distribution Differences**

Unlike Android (which can distribute APK files freely), iOS has **strict distribution requirements**:

### **Distribution Options for iOS:**

1. **App Store** (Recommended)

   - ✅ Official Apple distribution
   - ✅ Automatic updates
   - ✅ User trust and discoverability
   - ❌ Requires $99/year Apple Developer account
   - ❌ App review process (1-7 days)

2. **TestFlight** (Beta Testing)

   - ✅ Free with Apple Developer account
   - ✅ Up to 10,000 testers
   - ✅ Easy installation via TestFlight app
   - ❌ Still requires $99/year account
   - ⏱️ 90-day expiry on builds

3. **Ad Hoc Distribution** (Limited)

   - ✅ Direct installation without App Store
   - ❌ Requires registering EACH device UDID
   - ❌ Limited to 100 devices per year
   - ❌ Complex for end users
   - ❌ Requires $99/year account

4. **Enterprise Distribution**
   - Only for companies distributing internally
   - Requires $299/year Enterprise account

---

## 📱 **Recommended Approach: TestFlight + App Store**

### **For GitHub Distribution:**

**Android:** ✅ Easy - Just upload APK to GitHub Releases
**iOS:** ❌ Cannot distribute .ipa files via GitHub

- iOS apps must be signed with Apple certificates
- Users cannot install .ipa files directly like APKs
- **Use TestFlight instead for beta testing**

---

## 🚀 **How to Build iOS App**

### **Prerequisites**

1. **Apple Developer Account** ($99/year)

   - Sign up at: https://developer.apple.com/programs/

2. **EAS CLI** (if not installed)

   ```bash
   npm install -g eas-cli
   ```

3. **Your App Must Be Production-Ready**
   - Icons and splash screens configured
   - App name and bundle ID set
   - Privacy descriptions added

---

## Method 1: TestFlight Distribution (Recommended)

### **Step 1: Build iOS App**

```bash
cd mobile

# Login to Expo
eas login

# Build for iOS
npm run build:ios

# EAS will prompt for Apple credentials and handle certificates
```

**What happens:**

- EAS will ask for your Apple ID
- It will create/manage certificates automatically
- Build takes 20-30 minutes
- You get an .ipa file

### **Step 2: Submit to TestFlight**

```bash
# After build completes, submit to TestFlight
eas submit --platform ios --latest
```

**Or submit via App Store Connect:**

1. Download the .ipa from EAS
2. Go to https://appstoreconnect.apple.com
3. Upload the build
4. Add to TestFlight

### **Step 3: Invite Testers**

1. Go to App Store Connect → TestFlight
2. Add internal testers (email addresses)
3. Share the public TestFlight link
4. Users install via TestFlight app

**TestFlight Public Link Example:**

```
https://testflight.apple.com/join/YOUR_CODE
```

Share this link on GitHub, social media, etc.

---

## Method 2: App Store Release

### **Step 1: Build Production App**

```bash
cd mobile
npm run build:ios
```

### **Step 2: Submit to App Store**

```bash
eas submit --platform ios --latest
```

### **Step 3: App Store Setup**

1. Go to https://appstoreconnect.apple.com
2. Create new app listing
3. Add screenshots, description, etc.
4. Submit for review
5. Wait 1-7 days for approval
6. Once approved, users can download from App Store

---

## 🔧 **Configuration Already Done**

Your `app.json` is configured with:

- ✅ Bundle Identifier: `com.talktome.mobile`
- ✅ iOS settings (tablet support)
- ✅ App icons and splash screens

Your `eas.json` includes:

- ✅ iOS production build profile
- ✅ iOS simulator build for testing

---

## 📋 **Required iOS Privacy Permissions**

Add these to `app.json` (already configured):

```json
{
  "ios": {
    "infoPlist": {
      "NSMicrophoneUsageDescription": "This app needs microphone access for voice input to communicate with the AI companion.",
      "NSCameraUsageDescription": "This app may use camera for future features.",
      "NSPhotoLibraryUsageDescription": "This app may access photos for future features."
    }
  }
}
```

---

## 🆚 **iOS vs Android Distribution**

| Feature               | Android (APK)                    | iOS (.ipa)                      |
| --------------------- | -------------------------------- | ------------------------------- |
| **GitHub Releases**   | ✅ Yes, direct download          | ❌ No, won't install            |
| **Free Distribution** | ✅ Yes, completely free          | ❌ Requires $99/year            |
| **Installation**      | ✅ Easy (enable unknown sources) | ❌ Complex (needs provisioning) |
| **Beta Testing**      | ✅ Just share APK                | ✅ Use TestFlight               |
| **Updates**           | Manual download                  | Automatic via store             |
| **Developer Account** | Not required                     | Required ($99/year)             |

---

## 💡 **Best Strategy for Both Platforms**

### **For Public Distribution:**

**Android:**

- Build APK with EAS
- Upload to GitHub Releases
- Users download and install directly

**iOS:**

- Build with EAS
- Submit to TestFlight for beta
- Later submit to App Store
- Share TestFlight link on GitHub

### **Your GitHub README Can Say:**

```markdown
## Download

### Android

Download the latest APK from [Releases](https://github.com/your-repo/releases)

### iOS

Join our TestFlight beta: [TestFlight Link](https://testflight.apple.com/join/YOUR_CODE)

Or download from the App Store (coming soon)
```

---

## 🛠️ **Build Commands**

```bash
# Build Android APK
npm run build:android

# Build iOS for TestFlight/App Store
npm run build:ios

# Build iOS Simulator (for Mac testing)
npm run build:ios-simulator

# Build both platforms
eas build --platform all --profile production
```

---

## 📱 **Simulator Build (For Mac Developers)**

If you have a Mac and want to test in iOS Simulator:

```bash
npm run build:ios-simulator
```

This creates a build for iOS Simulator only (not real devices).

---

## ❓ **Common Questions**

### **Can I distribute iOS apps via GitHub like Android?**

No. iOS requires apps to be signed and distributed through Apple's infrastructure (App Store, TestFlight, or Ad Hoc with device registration).

### **Do I need a Mac to build iOS apps?**

No! EAS Build handles everything in the cloud. You can build iOS apps from Windows/Linux.

### **Can I test iOS without Apple Developer account?**

Yes, but only on iOS Simulator (requires Mac). For real devices, you need the account.

### **Is TestFlight free?**

TestFlight is free to use, but you need the $99/year Apple Developer account.

### **How many TestFlight testers can I have?**

Up to 10,000 external testers, unlimited internal testers (your team).

---

## 🎯 **Recommended Path**

1. **Start with Android** (easier, free)

   - Build APK and share on GitHub
   - Get user feedback

2. **Add iOS via TestFlight** (when ready)

   - Get Apple Developer account
   - Build and submit to TestFlight
   - Share TestFlight link

3. **Submit to App Stores** (later)
   - Polish based on feedback
   - Submit to Google Play Store
   - Submit to Apple App Store

---

## 📚 **Resources**

- [EAS Build for iOS](https://docs.expo.dev/build/setup/)
- [TestFlight Distribution](https://docs.expo.dev/build/internal-distribution/)
- [App Store Submission](https://docs.expo.dev/submit/ios/)
- [Apple Developer Program](https://developer.apple.com/programs/)
