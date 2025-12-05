-- Migration: Create email_subscribers table
-- This table stores email addresses of users who want to be notified when the app launches

CREATE TABLE IF NOT EXISTS email_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_email_subscribers_created_at ON email_subscribers(created_at DESC);

