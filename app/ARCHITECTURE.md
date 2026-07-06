# Architecture Overview

## Frontend
- Next.js 16 App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui components

## Data Layer
- Firebase Authentication for Google sign-in
- Firestore for user profiles, scheduling, AI history, feedback, and notifications
- Modular services in app/lib for maintainability

## Future-ready Extension Points
- OpenAI integration layer via ai-service abstractions
- TikTok OAuth and publishing API adapters
- Admin dashboard module and billing hooks
