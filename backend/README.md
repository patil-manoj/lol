# Backend API

This is the standalone backend API for the Talk to Me application.

## Structure

```
backend/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts      # Groq LLM API integration
├── supabase/
│   └── schema.sql           # Database schema
├── .env.example             # Environment template
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

3. **Add your API keys to `.env`:**
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

## Running Locally

```bash
npm run dev
```

The API will be available at `http://localhost:3001/api`

## API Endpoints

### POST /api/chat

Chat with the AI assistant using Groq's Llama 3.3 70B model.

**Request:**

```json
{
  "messages": [{ "role": "user", "content": "Hello!" }]
}
```

**Response:**

```json
{
  "message": "Hi there! How can I help you today?",
  "isCrisis": false,
  "model": "llama-3.3-70b-versatile"
}
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Deploy to Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy!

### Deploy to Render

1. Create new Web Service
2. Connect repository
3. Add environment variables
4. Deploy!

## Environment Variables

| Variable                        | Required | Description                    |
| ------------------------------- | -------- | ------------------------------ |
| `GROQ_API_KEY`                  | Yes      | API key from console.groq.com  |
| `NEXT_PUBLIC_SUPABASE_URL`      | No       | Supabase project URL           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No       | Supabase anonymous key         |
| `PORT`                          | No       | Port to run on (default: 3001) |

## CORS Configuration

If deploying separately from frontend, you may need to configure CORS in `app/api/chat/route.ts`.
