import { NextRequest, NextResponse } from 'next/server';
import { voteOnFeedback, initFeedbackDatabase } from '@/lib/db';

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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!dbInitialized) {
      await initFeedbackDatabase();
      dbInitialized = true;
    }

    const { id } = await params;
    const feedbackId = parseInt(id);

    if (isNaN(feedbackId)) {
      return NextResponse.json(
        { error: 'Invalid feedback ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { voteType } = body;

    if (!voteType || (voteType !== 'up' && voteType !== 'down')) {
      return NextResponse.json(
        { error: 'Invalid vote type. Must be "up" or "down"' },
        { status: 400 }
      );
    }

    const userIdentifier = getUserIdentifier(request);
    const result = await voteOnFeedback(feedbackId, voteType, userIdentifier);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}

