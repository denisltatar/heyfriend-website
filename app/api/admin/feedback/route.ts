import { NextRequest, NextResponse } from 'next/server';
import { getAllFeedbackForAdmin, deleteFeedback, updateFeedback, initFeedbackDatabase } from '@/lib/db';

// Initialize database on first request
let dbInitialized = false;

// Helper to verify password from body
function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword) {
    return false;
  }
  const providedPassword = (password || '').trim();
  return providedPassword === adminPassword;
}

// GET - Fetch all feedback (admin only)
export async function POST(request: NextRequest) {
  try {
    if (!dbInitialized) {
      await initFeedbackDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { password } = body;

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const feedback = await getAllFeedbackForAdmin();
    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error) {
    console.error('Get feedback API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a feedback post (admin only)
export async function DELETE(request: NextRequest) {
  try {
    if (!dbInitialized) {
      await initFeedbackDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { password, id } = body;

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    const deleted = await deleteFeedback(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Feedback deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete feedback API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete feedback' },
      { status: 500 }
    );
  }
}

// PUT - Update feedback content (admin only)
export async function PUT(request: NextRequest) {
  try {
    if (!dbInitialized) {
      await initFeedbackDatabase();
      dbInitialized = true;
    }

    const body = await request.json();
    const { password, id, content } = body;

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

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

    const updatedFeedback = await updateFeedback(id, trimmedContent);

    return NextResponse.json(
      { message: 'Feedback updated successfully', feedback: updatedFeedback },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Update feedback API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update feedback';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

