-- Migration: Create feedback and feedback_votes tables
-- This enables users to submit feedback and vote on feedback items

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create votes table to track who voted (prevents duplicate votes)
CREATE TABLE IF NOT EXISTS feedback_votes (
  id SERIAL PRIMARY KEY,
  feedback_id INTEGER NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
  user_identifier VARCHAR(255) NOT NULL,
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(feedback_id, user_identifier)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_feedback_score ON feedback(score DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_votes_feedback_id ON feedback_votes(feedback_id);
CREATE INDEX IF NOT EXISTS idx_feedback_votes_user ON feedback_votes(user_identifier);

