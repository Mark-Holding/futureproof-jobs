# Supabase Setup Guide

The sign out button (and all authentication features) require Supabase to be configured. Here's how to set it up:

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter a project name (e.g., "futureproof-jobs")
6. Enter a database password
7. Choose a region close to you
8. Click "Create new project"

## 2. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** (starts with `https://`)
3. Copy the **anon public** key (starts with `eyJ`)

## 3. Create Environment File

Create a `.env.local` file in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the values with your actual Supabase project URL and anon key.

## 4. Set Up Database Schema

Run the SQL from `supabase-auth-schema.sql` in your Supabase SQL Editor to create the necessary tables.

## 5. Restart Your Development Server

```bash
npm run dev
```

## 6. Test Authentication

The sign out button and all authentication features should now work properly.

## Troubleshooting

- Make sure your `.env.local` file is in the project root
- Restart the development server after adding environment variables
- Check the browser console for any error messages
- Ensure your Supabase project is active and not paused 