# Authentication Setup Guide

## Current Status

✅ **Frontend Authentication**: Fully implemented with localStorage-based auth
✅ **Google OAuth**: Configured and working
✅ **Backend Auth Support**: Added but optional
⚠️ **Database Storage**: Optional - requires Supabase setup

## How It Works

### Frontend (Currently Active)

- **Local Authentication**: Users sign up/in with email and password stored in `localStorage`
- **Google OAuth**: Users can sign in with Google using OAuth 2.0
- **User Context**: Available throughout the app via `AuthContext`
- **Privacy Controls**: Users can opt-in to chat history storage and personalization

### Backend (Optional Enhancement)

The backend now accepts user information but doesn't require it:

- `userId`: User's unique identifier
- `userName`: For personalized responses
- `conversationId`: For tracking conversation threads

## Quick Start

### 1. Frontend is Ready

The frontend authentication is fully functional. Users can:

- Sign up with email/password
- Sign in with email/password
- Sign in with Google OAuth
- Manage privacy preferences
- Store chat history locally (if consented)

### 2. Backend Setup (Optional)

To enable database storage and conversation persistence:

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Supabase (Optional)

If you want to store conversations in a database:

1. Create a Supabase project at https://supabase.com
2. Run the schema from `backend/supabase/schema.sql` in your Supabase SQL editor
3. Update `backend/.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Features

### ✅ Working Now

- User registration and login
- Google OAuth integration
- Protected routes
- User preferences (chat storage, personalization)
- Local chat history (if opted in)
- Privacy controls
- Personalized AI responses (uses user name if provided)

### 🔄 Enhanced with Supabase (Optional)

- Persistent conversation storage across devices
- Conversation history in the cloud
- Analytics on user sentiment over time
- Conversation summaries and mood tracking

## Privacy & Data

### Local Storage (Default)

- User credentials stored in browser `localStorage`
- Chat history stored locally (only if user consents)
- Data never leaves the user's device
- User can delete chat history anytime

### With Supabase (Optional)

- Conversations stored securely in Supabase
- Row Level Security (RLS) ensures users only see their data
- User can still control what gets stored via preferences
- Compliant with privacy regulations

## Testing Authentication

### Test User Login

1. Go to `/signup` and create an account
2. Or use Google Sign-In (if configured)
3. Navigate to `/chat` - you'll be automatically authenticated
4. Check settings to manage privacy preferences

### Test Without Authentication

The chat still works without authentication, but:

- No chat history persistence (unless Supabase is set up)
- No personalization with user name
- No cross-device sync

## Environment Variables

### Frontend (.env.local)

```env
# Required for Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Optional - for API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3001/api/chat
```

### Backend (.env)

```env
# Required
GROQ_API_KEY=your_groq_api_key

# Optional - for database storage
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Security Considerations

✅ **Implemented**:

- Cross-Origin-Opener-Policy headers for OAuth
- Row Level Security in database schema
- Input validation on backend
- Error handling without exposing sensitive data
- JWT parsing with validation

⚠️ **Production Recommendations**:

- Use proper backend authentication (JWT tokens, sessions)
- Implement rate limiting
- Add CSRF protection
- Use HTTPS only
- Store sensitive tokens in httpOnly cookies
- Implement proper password hashing on a real backend
- Add email verification
- Implement password reset flow

## Next Steps

1. **Current Setup Works**: You can use the app now with local authentication
2. **Optional**: Set up Supabase for persistent storage
3. **Production**: Implement proper backend authentication with sessions/JWT

## Troubleshooting

### "JWT parsing error"

✅ Fixed - The parseJwt function now handles both real JWT tokens and mock credentials

### "COOP policy warnings"

✅ Fixed - Added proper headers in next.config.mjs

### "Google Sign-In not working"

- Ensure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in frontend/.env.local
- Restart the dev server after adding the environment variable
- Check that authorized redirect URIs are configured in Google Console

### "Backend not saving conversations"

- Install dependencies: `cd backend && npm install`
- Check that Supabase credentials are in backend/.env
- Verify the schema.sql has been run in Supabase
