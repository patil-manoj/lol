# 🏗️ Mobile App Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     USER'S MOBILE DEVICE                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Native App (Expo)                   │ │
│  │                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │ │
│  │  │ ChatScreen   │  │ MessageList  │  │  Settings  │  │ │
│  │  │              │  │              │  │            │  │ │
│  │  │ - Input      │  │ - Messages   │  │ - Voice    │  │ │
│  │  │ - Voice Btn  │  │ - Scroll     │  │ - Prefs    │  │ │
│  │  └──────┬───────┘  └──────┬───────┘  └─────────┬──┘  │ │
│  │         │                 │                     │     │ │
│  │         └─────────────────┴─────────────────────┘     │ │
│  │                           │                           │ │
│  │                  ┌────────▼─────────┐                 │ │
│  │                  │   Hooks Layer    │                 │ │
│  │                  │                  │                 │ │
│  │                  │ - useTextToSpeech│                 │ │
│  │                  │ - useVoice       │                 │ │
│  │                  └────────┬─────────┘                 │ │
│  │                           │                           │ │
│  │         ┌─────────────────┼─────────────────┐         │ │
│  │         │                 │                 │         │ │
│  │   ┌─────▼──────┐   ┌──────▼──────┐   ┌─────▼─────┐  │ │
│  │   │  Emotion   │   │   Chat      │   │   Expo    │  │ │
│  │   │  Analysis  │   │   Service   │   │   Speech  │  │ │
│  │   └────────────┘   └──────┬──────┘   └───────────┘  │ │
│  │                            │                         │ │
│  └────────────────────────────┼──────────────────────────┘ │
│                               │                            │
└───────────────────────────────┼────────────────────────────┘
                                │
                        HTTP/HTTPS (Axios)
                                │
┌───────────────────────────────▼────────────────────────────┐
│                     BACKEND SERVER                          │
│                  (Your Computer / Cloud)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js Application                     │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │         API Route: /api/chat                   │ │  │
│  │  │                                                │ │  │
│  │  │  1. Receive message from mobile app           │ │  │
│  │  │  2. Check for crisis keywords                 │ │  │
│  │  │  3. Format request for Groq                   │ │  │
│  │  │  4. Call Groq API                             │ │  │
│  │  │  5. Return AI response                        │ │  │
│  │  └────────────────┬───────────────────────────────┘ │  │
│  │                   │                                 │  │
│  └───────────────────┼─────────────────────────────────┘  │
└───────────────────────┼────────────────────────────────────┘
                        │
                    HTTPS API
                        │
┌───────────────────────▼────────────────────────────────────┐
│                      Groq API                               │
│                 (Llama 3.3 70B Model)                       │
│                                                             │
│  - Receives conversation history                           │
│  - Generates empathetic response                           │
│  - Returns message to backend                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Sending a Message

```
User Types → ChatScreen → analyzeEmotion() → Create Message Object
                                                      │
                                                      ▼
                                           Add to messages array
                                                      │
                                                      ▼
                                           chatService.sendMessage()
                                                      │
                                                      ▼
                                            HTTP POST /api/chat
                                                      │
                                                      ▼
                              Backend receives → Calls Groq API
                                                      │
                                                      ▼
                                           Groq returns response
                                                      │
                                                      ▼
                              Backend sends back → Mobile receives
                                                      │
                                                      ▼
                                           Add AI message to array
                                                      │
                                                      ▼
                                      Auto-speak? → Yes → speak(message)
                                                      │
                                                      ▼
                                      Crisis? → Yes → Show alert
```

### Text-to-Speech Flow

```
AI Response Received → autoSpeak enabled?
                              │
                              ▼ YES
                       useTextToSpeech.speak()
                              │
                              ▼
                       Expo.Speech.speak()
                              │
                              ▼
                   Native Platform Speech Engine
                              │
                    ┌─────────┴─────────┐
                    │                   │
              iOS (AVSpeech)      Android (TTS)
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                        Audio Output 🔊
```

## Component Hierarchy

```
App.tsx
  │
  └─ SafeAreaProvider
       │
       └─ ChatScreen
            │
            ├─ Header
            │   ├─ Logo
            │   ├─ Title
            │   └─ Auto-speak Toggle
            │
            ├─ MessageList
            │   ├─ Welcome Screen (if empty)
            │   │   ├─ Avatar
            │   │   ├─ Greeting
            │   │   └─ Suggestion Chips
            │   │
            │   └─ Messages (if not empty)
            │       └─ Message Item (repeated)
            │           ├─ Avatar Icon
            │           ├─ Message Bubble
            │           └─ Timestamp + Emotion
            │
            └─ Input Area
                ├─ Voice Button (large, centered)
                └─ Input Row
                    ├─ Gallery Icon
                    ├─ Text Input
                    └─ Send Button
```

## File Dependencies

```
App.tsx
  └─ screens/ChatScreen.tsx
       ├─ components/MessageList.tsx
       ├─ hooks/useTextToSpeech.ts
       │    └─ expo-speech
       ├─ services/chatService.ts
       │    └─ axios
       └─ utils/emotionAnalysis.ts
            └─ types/index.ts
```

## State Management

```
ChatScreen Component State:
├─ messages: Message[]              ← Conversation history
├─ inputText: string                ← Current user input
├─ isLoading: boolean               ← API call in progress
├─ autoSpeak: boolean               ← TTS enabled/disabled
└─ voiceSettings: VoiceSettings     ← TTS configuration

MessageList Component:
└─ scrollViewRef                    ← Auto-scroll control

useTextToSpeech Hook:
├─ isSpeaking: boolean              ← Currently speaking
└─ availableVoices: Voice[]         ← Device voices
```

## API Communication

```
Mobile App (chatService.ts)
    │
    │ POST Request
    │ {
    │   messages: [
    │     { role: "user", content: "Hello!" },
    │     { role: "assistant", content: "Hi there!" },
    │     { role: "user", content: "How are you?" }
    │   ]
    │ }
    │
    ▼
Next.js (/api/chat/route.ts)
    │
    │ 1. Validate request
    │ 2. Check crisis keywords
    │ 3. Add system prompt
    │ 4. Call Groq API
    │
    ▼
Groq API (Llama 3.3 70B)
    │
    │ Generate response
    │
    ▼
Next.js
    │
    │ JSON Response
    │ {
    │   message: "I'm doing well, thanks for asking!",
    │   isCrisis: false,
    │   model: "llama-3.3-70b-versatile"
    │ }
    │
    ▼
Mobile App
    │
    └─ Display message + Speak if enabled
```

## Network Configuration

### Development Mode

```
Mobile Device (192.168.1.50)
         │
         │ Same WiFi Network
         │
Computer (192.168.1.100:3000)
         │
         │ HTTPS
         │
Groq API (cloud)
```

### Production Mode

```
Mobile Device (anywhere)
         │
         │ HTTPS
         │
Vercel/Production Server
         │
         │ HTTPS
         │
Groq API (cloud)
```

## Platform-Specific Features

```
┌─────────────────────────────────────────────────────┐
│                  React Native Core                   │
│                 (Cross-Platform Code)                │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼─────┐           ┌────▼──────┐
    │   iOS    │           │  Android  │
    │          │           │           │
    │ • AVKit  │           │ • TTS     │
    │ • Speech │           │ • Speech  │
    │ • SafeAr.│           │ • Material│
    └──────────┘           └───────────┘
```

## Performance Characteristics

```
Metric                  Value          Bottleneck
─────────────────────────────────────────────────────
App Startup             < 3s           Asset loading
Message Send            < 100ms        Network latency
AI Response Wait        1-3s           Groq API processing
TTS Initiation          < 200ms        Platform TTS engine
Memory Usage            < 150MB        Message history
Bundle Size             ~45MB          React Native + deps
```

## Error Handling Flow

```
User Action
    │
    ▼
Try Operation
    │
    ├─ Success → Update UI → Done
    │
    └─ Error
        │
        ├─ Network Error → Alert "Check connection"
        ├─ API Error → Alert "Try again"
        ├─ Timeout → Alert "Request timeout"
        └─ Unknown → Alert "Something went wrong"
```

## Future Architecture Additions

```
Current:
  Mobile App → Backend → Groq

Future Phase 1 (Persistence):
  Mobile App → Backend → Groq
       │           │
       └──────────→ Supabase (save conversations)

Future Phase 2 (Full Features):
  Mobile App → Backend → Groq
       │           │
       ├──────────→ Supabase (storage)
       ├──────────→ Google Speech-to-Text
       └──────────→ Push Notification Service
```

---

This architecture provides:
✅ Clean separation of concerns
✅ Easy to test and maintain
✅ Scalable for future features
✅ Platform-agnostic core logic
