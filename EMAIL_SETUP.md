# Email Collection Setup Guide

This guide will help you set up the email collection system for your HeyFriend website.

## Prerequisites

1. A Vercel account (for hosting and database)
2. The `@vercel/postgres` package is already installed

## Step 1: Set Up Vercel Postgres Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose a name for your database (e.g., `heyfriend-db`)
6. Select a region closest to your users
7. Click **Create**

## Step 2: Connect Database to Your Project

1. In the Vercel dashboard, go to your project's **Settings** → **Environment Variables**
2. Vercel should automatically add these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

3. If deploying locally, create a `.env.local` file in your project root and add:
   ```
   POSTGRES_URL=your_postgres_url_here
   POSTGRES_PRISMA_URL=your_prisma_url_here
   POSTGRES_URL_NON_POOLING=your_non_pooling_url_here
   POSTGRES_USER=your_user
   POSTGRES_HOST=your_host
   POSTGRES_PASSWORD=your_password
   POSTGRES_DATABASE=your_database
   ```

## Step 3: Set Admin Password

1. In your Vercel project settings, go to **Environment Variables**
2. Add a new variable:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: Choose a strong password (e.g., `heyfriend2024`)
   - **Environment**: Production, Preview, Development (check all)

3. For local development, add to `.env.local`:
   ```
   ADMIN_PASSWORD=your_secure_password_here
   ```

## Step 4: Initialize the Database

The database table will be created automatically on the first email submission. However, if you want to create it manually:

1. Go to your Vercel Postgres database dashboard
2. Click on **Query** or use a database client
3. Run this SQL:

```sql
CREATE TABLE IF NOT EXISTS email_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 5: Deploy and Test

1. Push your code to GitHub (if using Git)
2. Deploy to Vercel (or run `npm run dev` locally)
3. Visit your website and test the email form
4. Visit `/admin/emails` to view collected emails (use your admin password)

## Features

✅ **Email Collection Form**: Added to the hero section of your homepage
✅ **Admin Dashboard**: View all emails at `/admin/emails`
✅ **Password Protection**: Admin page is protected with a password
✅ **CSV Export**: Download all emails as a CSV file
✅ **Copy All**: Copy all email addresses to clipboard
✅ **Duplicate Prevention**: Prevents duplicate email submissions
✅ **Email Validation**: Validates email format before submission

## Admin Access

- **URL**: `https://yourdomain.com/admin/emails`
- **Password**: Set via `ADMIN_PASSWORD` environment variable
- **Features**:
  - View all subscribers in a table
  - Export to CSV
  - Copy all emails to clipboard
  - Refresh to get latest emails

## Troubleshooting

### Database Connection Issues
- Make sure all environment variables are set correctly
- Check that your Vercel Postgres database is active
- Verify the connection string format

### Admin Page Not Working
- Ensure `ADMIN_PASSWORD` is set in environment variables
- Check that the password matches what you're entering
- Clear browser cache and try again

### Emails Not Saving
- Check browser console for errors
- Verify API route is accessible at `/api/subscribe`
- Check Vercel function logs for errors

## Next Steps

When you're ready to send launch emails:
1. Export your email list from the admin dashboard
2. Use an email service like [Resend](https://resend.com), [SendGrid](https://sendgrid.com), or [Mailchimp](https://mailchimp.com)
3. Import your CSV and send your launch announcement!

