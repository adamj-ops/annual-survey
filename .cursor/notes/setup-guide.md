# VLN Annual Survey Setup Guide

## Environment Variables

Add the following to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here

# Admin Password (for /responses page)
ADMIN_PASSWORD=your_secure_password_here
```

**Note:** The `NEXT_PUBLIC_SUPABASE_URL` should be your Supabase project URL (e.g., `https://xxxxx.supabase.co`), not the connection string. The connection string is used for direct database access, but the Supabase JS client needs the project URL.

## Database

The `survey_responses` table has been created via migration. You can verify it exists using:

```bash
# Using Supabase MCP (if available)
mcp_supabase_list_tables
```

## Running the Application

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables in `.env.local`

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Access the survey at `http://localhost:3000`

5. Access the admin panel at `http://localhost:3000/responses`

## Features Implemented

- ✅ 7-step multi-step form
- ✅ Form validation with Zod
- ✅ Progress indicator
- ✅ Step navigation with validation
- ✅ Database storage via Supabase
- ✅ Admin interface at `/responses`
- ✅ CSV export functionality
- ✅ Design system matching thrombosis.org
- ✅ Responsive design
- ✅ Draft saving to localStorage
- ✅ Thank you page with links

## Survey Steps

1. **About You** - Name, email, role, familiarity
2. **Brand Perception** - Brand questions and trustworthiness
3. **Community Engagement** - Community factors and referrals
4. **Experience** - Ease of use and valuable resources
5. **Testimonials** - Testimonial and contact permission
6. **Review** - Summary before submission
7. **Thank You** - Confirmation page with links

## Admin Access

The `/responses` page is password-protected. Use the `ADMIN_PASSWORD` environment variable to set the password. The admin interface allows you to:
- View all survey responses in a table
- Export responses to CSV
- See paginated results (50 per page by default)

## Deployment

For production deployment:

1. Set up environment variables in your hosting platform
2. Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set for client-side access
3. Set `SUPABASE_SERVICE_KEY` for server-side admin operations
4. Set `ADMIN_PASSWORD` for admin access
5. Deploy to your domain: `annual-survey25.thrombosis.org`

