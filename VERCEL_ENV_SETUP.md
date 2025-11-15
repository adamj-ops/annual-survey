# Vercel Environment Variables Setup

## Required Environment Variables

You need to add these environment variables in your Vercel project settings:

### 1. Go to Vercel Dashboard
- Navigate to: https://vercel.com/opsfx/shadcn-tanstack-form/settings/environment-variables

### 2. Add the following variables for **Production** environment:

```
NEXT_PUBLIC_SUPABASE_URL=https://cipooxjmddupysmmluto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcG9veGptZGR1cHlzbW1sdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzM0MzEsImV4cCI6MjA3ODMwOTQzMX0.abO5EKTZusWDMCTI-a2LIFKoF85GfpXrIb8ww_dpimU
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcG9veGptZGR1cHlzbW1sdXRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjczMzQzMSwiZXhwIjoyMDc4MzA5NDMxfQ.VJEX2XUwKeb2wutrzojjMBzrBG09BTrkdHm3hAR--2A
ADMIN_PASSWORD=Survey2025
```

### 3. Important Notes:
- Make sure to select **Production** environment (or all environments)
- After adding variables, you need to **redeploy** for them to take effect
- The `NEXT_PUBLIC_*` variables are exposed to the browser
- The `SUPABASE_SERVICE_KEY` is server-side only and should be kept secret

### 4. After adding variables, trigger a new deployment:
```bash
vercel --prod
```
Or push a new commit to trigger automatic deployment.

