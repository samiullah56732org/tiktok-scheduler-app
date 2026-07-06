# Deployment Guide

## Local Development
1. Install dependencies with npm install.
2. Run npm run dev.
3. Open http://localhost:3000.

## Production
- Deploy the Next.js app to Vercel.
- Set Firebase environment variables in Vercel.
- Ensure Firestore security rules allow the intended app access patterns.
- Keep the app behind authenticated routes for production safety.
