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

