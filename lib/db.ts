import { neon } from '@neondatabase/serverless';

export interface EmailSubscriber {
  id: number;
  email: string;
  created_at: Date;
}

// Get the database connection
function getDb() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Database connection string not found. Please set POSTGRES_URL or DATABASE_URL environment variable.');
  }
  return neon(connectionString);
}

// Initialize the database table if it doesn't exist
export async function initDatabase() {
  try {
    const sql = getDb();
    await sql`
      CREATE TABLE IF NOT EXISTS email_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Add a new email subscriber
export async function addEmailSubscriber(email: string): Promise<EmailSubscriber> {
  try {
    const sql = getDb();
    const result = await sql`
      INSERT INTO email_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, created_at;
    `;
    
    if (result.length === 0) {
      throw new Error('Email already exists');
    }
    
    return {
      id: result[0].id,
      email: result[0].email,
      created_at: new Date(result[0].created_at),
    };
  } catch (error) {
    console.error('Error adding email subscriber:', error);
    throw error;
  }
}

// Get all email subscribers
export async function getAllEmailSubscribers(): Promise<EmailSubscriber[]> {
  try {
    const sql = getDb();
    const result = await sql`
      SELECT id, email, created_at
      FROM email_subscribers
      ORDER BY created_at DESC;
    `;
    
    return result.map(row => ({
      id: row.id,
      email: row.email,
      created_at: new Date(row.created_at),
    }));
  } catch (error) {
    console.error('Error fetching email subscribers:', error);
    throw error;
  }
}

// Check if email exists
export async function emailExists(email: string): Promise<boolean> {
  try {
    const sql = getDb();
    const result = await sql`
      SELECT COUNT(*) as count
      FROM email_subscribers
      WHERE email = ${email};
    `;
    
    return parseInt(result[0].count as string) > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}

// Delete an email subscriber by ID
export async function deleteEmailSubscriber(id: number): Promise<boolean> {
  try {
    const sql = getDb();
    const result = await sql`
      DELETE FROM email_subscribers
      WHERE id = ${id}
      RETURNING id;
    `;
    
    return result.length > 0;
  } catch (error) {
    console.error('Error deleting email subscriber:', error);
    throw error;
  }
}

// Feedback interfaces
export interface Feedback {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  created_at: string | Date;
  user_vote?: 'up' | 'down' | null;
}

export interface FeedbackVote {
  feedback_id: number;
  vote_type: 'up' | 'down';
  user_identifier: string; // IP address or session ID
}

// Initialize feedback tables
export async function initFeedbackDatabase() {
  try {
    const sql = getDb();
    
    // Create feedback table
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        upvotes INTEGER DEFAULT 0,
        downvotes INTEGER DEFAULT 0,
        score INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create votes table to track who voted (prevent duplicate votes)
    await sql`
      CREATE TABLE IF NOT EXISTS feedback_votes (
        id SERIAL PRIMARY KEY,
        feedback_id INTEGER NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
        user_identifier VARCHAR(255) NOT NULL,
        vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(feedback_id, user_identifier)
      );
    `;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_score ON feedback(score DESC, created_at DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_votes_feedback_id ON feedback_votes(feedback_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_feedback_votes_user ON feedback_votes(user_identifier);`;
  } catch (error) {
    console.error('Feedback database initialization error:', error);
    throw error;
  }
}

// Submit new feedback
export async function submitFeedback(content: string): Promise<Feedback> {
  try {
    const sql = getDb();
    const result = await sql`
      INSERT INTO feedback (content, upvotes, downvotes, score)
      VALUES (${content}, 0, 0, 0)
      RETURNING id, content, upvotes, downvotes, score, created_at;
    `;
    
    return {
      id: result[0].id,
      content: result[0].content,
      upvotes: result[0].upvotes,
      downvotes: result[0].downvotes,
      score: result[0].score,
      created_at: new Date(result[0].created_at),
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

// Get all feedback with user's vote status
export async function getAllFeedback(userIdentifier: string): Promise<Feedback[]> {
  try {
    const sql = getDb();
    
    // Get feedback with user's vote status
    const result = await sql`
      SELECT 
        f.id,
        f.content,
        f.upvotes,
        f.downvotes,
        f.score,
        f.created_at,
        v.vote_type as user_vote
      FROM feedback f
      LEFT JOIN feedback_votes v ON f.id = v.feedback_id AND v.user_identifier = ${userIdentifier}
      ORDER BY f.score DESC, f.created_at DESC;
    `;
    
    return result.map(row => ({
      id: row.id,
      content: row.content,
      upvotes: row.upvotes,
      downvotes: row.downvotes,
      score: row.score,
      created_at: row.created_at instanceof Date 
        ? row.created_at.toISOString() 
        : String(row.created_at),
      user_vote: row.user_vote || null,
    }));
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
}

// Vote on feedback
export async function voteOnFeedback(
  feedbackId: number,
  voteType: 'up' | 'down',
  userIdentifier: string
): Promise<{ success: boolean; newScore: number; newUpvotes: number; newDownvotes: number }> {
  try {
    const sql = getDb();
    
    // Check if user already voted
    const existingVote = await sql`
      SELECT vote_type FROM feedback_votes
      WHERE feedback_id = ${feedbackId} AND user_identifier = ${userIdentifier};
    `;
    
    if (existingVote.length > 0) {
      const oldVoteType = existingVote[0].vote_type;
      
      // If voting the same way, remove the vote
      if (oldVoteType === voteType) {
        await sql`
          DELETE FROM feedback_votes
          WHERE feedback_id = ${feedbackId} AND user_identifier = ${userIdentifier};
        `;
        
        // Update feedback counts
        if (voteType === 'up') {
          await sql`
            UPDATE feedback
            SET upvotes = upvotes - 1, score = score - 1
            WHERE id = ${feedbackId};
          `;
        } else {
          await sql`
            UPDATE feedback
            SET downvotes = downvotes - 1, score = score + 1
            WHERE id = ${feedbackId};
          `;
        }
      } else {
        // Change vote type
        await sql`
          UPDATE feedback_votes
          SET vote_type = ${voteType}
          WHERE feedback_id = ${feedbackId} AND user_identifier = ${userIdentifier};
        `;
        
        // Update feedback counts (reverse old vote, apply new vote)
        if (oldVoteType === 'up') {
          await sql`
            UPDATE feedback
            SET upvotes = upvotes - 1, downvotes = downvotes + 1, score = score - 2
            WHERE id = ${feedbackId};
          `;
        } else {
          await sql`
            UPDATE feedback
            SET upvotes = upvotes + 1, downvotes = downvotes - 1, score = score + 2
            WHERE id = ${feedbackId};
          `;
        }
      }
    } else {
      // New vote
      await sql`
        INSERT INTO feedback_votes (feedback_id, user_identifier, vote_type)
        VALUES (${feedbackId}, ${userIdentifier}, ${voteType});
      `;
      
      // Update feedback counts
      if (voteType === 'up') {
        await sql`
          UPDATE feedback
          SET upvotes = upvotes + 1, score = score + 1
          WHERE id = ${feedbackId};
        `;
      } else {
        await sql`
          UPDATE feedback
          SET downvotes = downvotes + 1, score = score - 1
          WHERE id = ${feedbackId};
        `;
      }
    }
    
    // Get updated counts - always fetch fresh from database
    const updated = await sql`
      SELECT upvotes, downvotes, score
      FROM feedback
      WHERE id = ${feedbackId};
    `;
    
    if (updated.length === 0) {
      throw new Error('Feedback not found');
    }
    
    return {
      success: true,
      newScore: updated[0].score as number,
      newUpvotes: updated[0].upvotes as number,
      newDownvotes: updated[0].downvotes as number,
    };
  } catch (error) {
    console.error('Error voting on feedback:', error);
    throw error;
  }
}

// Delete feedback by ID (cascade deletes votes)
export async function deleteFeedback(id: number): Promise<boolean> {
  try {
    const sql = getDb();
    const result = await sql`
      DELETE FROM feedback
      WHERE id = ${id}
      RETURNING id;
    `;
    
    return result.length > 0;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
}

// Update feedback content by ID
export async function updateFeedback(id: number, content: string): Promise<Feedback> {
  try {
    const sql = getDb();
    
    // Validate content length
    const trimmedContent = content.trim();
    if (trimmedContent.length < 10) {
      throw new Error('Feedback must be at least 10 characters long');
    }
    if (trimmedContent.length > 1000) {
      throw new Error('Feedback must be less than 1000 characters');
    }
    
    const result = await sql`
      UPDATE feedback
      SET content = ${trimmedContent}
      WHERE id = ${id}
      RETURNING id, content, upvotes, downvotes, score, created_at;
    `;
    
    if (result.length === 0) {
      throw new Error('Feedback not found');
    }
    
    return {
      id: result[0].id,
      content: result[0].content,
      upvotes: result[0].upvotes,
      downvotes: result[0].downvotes,
      score: result[0].score,
      created_at: new Date(result[0].created_at),
    };
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
}

// Get all feedback for admin (without user vote filtering)
export async function getAllFeedbackForAdmin(): Promise<Feedback[]> {
  try {
    const sql = getDb();
    
    const result = await sql`
      SELECT 
        id,
        content,
        upvotes,
        downvotes,
        score,
        created_at
      FROM feedback
      ORDER BY score DESC, created_at DESC;
    `;
    
    return result.map(row => ({
      id: row.id,
      content: row.content,
      upvotes: row.upvotes,
      downvotes: row.downvotes,
      score: row.score,
      created_at: row.created_at instanceof Date 
        ? row.created_at.toISOString() 
        : String(row.created_at),
    }));
  } catch (error) {
    console.error('Error fetching feedback for admin:', error);
    throw error;
  }
}

