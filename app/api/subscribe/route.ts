import { NextRequest, NextResponse } from 'next/server';
import { addEmailSubscriber, emailExists, initDatabase } from '@/lib/db';

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const exists = await emailExists(email);
    if (exists) {
      return NextResponse.json(
        { error: 'Email already subscribed', alreadyExists: true },
        { status: 409 }
      );
    }

    // Add email to database
    const subscriber = await addEmailSubscriber(email);

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!',
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
        }
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Subscribe API error:', error);
    
    // Handle duplicate email error
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json(
        { error: 'Email already subscribed', alreadyExists: true },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

