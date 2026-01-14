import { NextRequest, NextResponse } from 'next/server';
import { submitFeedback, getAllFeedback, initFeedbackDatabase } from '@/lib/db';

// Get user identifier from request (prefer session ID, fallback to IP)
function getUserIdentifier(request: NextRequest): string {
  // Prefer session ID from header (more reliable for localhost)
  const sessionId = request.headers.get('x-session-id');
  if (sessionId) {
    return sessionId;
  }
  
  // Fallback to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'anonymous';
  return ip;
}

// Initialize database on first request
let dbInitialized = false;

export async function GET(request: NextRequest) {
  try {
    if (!dbInitialized) {
      await initFeedbackDatabase();
      dbInitialized = true;
    }

    const userIdentifier = getUserIdentifier(request);
    const feedback = await getAllFeedback(userIdentifier);

    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error) {
    console.error('Get feedback API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!dbInitialized) {
      await initFeedbackDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { content } = body;

    // Validate content
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Feedback content is required' },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length < 10) {
      return NextResponse.json(
        { error: 'Feedback must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (trimmedContent.length > 1000) {
      return NextResponse.json(
        { error: 'Feedback must be less than 1000 characters' },
        { status: 400 }
      );
    }

    const feedback = await submitFeedback(trimmedContent);

    return NextResponse.json(
      { message: 'Feedback submitted successfully', feedback },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submit feedback API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

