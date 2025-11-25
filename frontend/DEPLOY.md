# Netlify Deployment Guide

## Quick Deploy Steps

### 1. Prerequisites

- GitHub/GitLab/Bitbucket account
- Netlify account (free tier available)
- Backend API deployed and URL ready

### 2. Push to Git Repository

```bash
cd frontend
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 3. Deploy to Netlify

#### Option A: Netlify Dashboard (Recommended for first deploy)

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:

   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

6. Add environment variables:

   - Click "Advanced" → "New variable"
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.com/api/chat`

7. Click "Deploy site"

#### Option B: Netlify CLI (For quick deployments)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from frontend directory
cd frontend
netlify deploy --prod
```

### 4. Environment Variables

Set these in Netlify Dashboard → Site settings → Environment variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/chat
```

### 5. Custom Domain (Optional)

1. Go to Netlify Dashboard → Domain settings
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

### 6. Post-Deployment

✅ Test the deployed site
✅ Verify API connection to backend
✅ Test voice input/output features
✅ Check browser console for errors
✅ Test on mobile devices

## Build Configuration

The project is configured with:

- ✅ `netlify.toml` - Build and deploy settings
- ✅ `.nvmrc` - Node version specification
- ✅ `.node-version` - Alternative Node version file
- ✅ `next.config.mjs` - Next.js optimization for Netlify
- ✅ Security headers
- ✅ Image optimization
- ✅ Compression enabled

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Verify all dependencies in package.json
- Check build logs in Netlify dashboard

### API Connection Issues

- Verify NEXT_PUBLIC_API_URL is set correctly
- Ensure backend allows CORS from Netlify domain
- Check backend is deployed and accessible

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_`
- Redeploy after adding/changing variables
- Clear build cache: Deploy settings → Clear cache and retry

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
# Netlify will auto-deploy
```

## Performance Tips

1. **Deploy Previews**: Every PR gets a preview URL
2. **Branch Deploys**: Set up staging branches
3. **Edge Functions**: Use for serverless functions if needed
4. **Analytics**: Enable Netlify Analytics for insights

## Resources

- [Netlify Next.js Docs](https://docs.netlify.com/frameworks/next-js/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
