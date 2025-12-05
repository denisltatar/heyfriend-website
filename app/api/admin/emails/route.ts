import { NextRequest, NextResponse } from 'next/server';
import { getAllEmailSubscribers, deleteEmailSubscriber } from '@/lib/db';

// Simple password protection - in production, use proper auth
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'heyfriend2024').trim();

export async function GET(request: NextRequest) {
  try {
    // Check for password in query params or header
    const password = (request.headers.get('x-admin-password') || 
                     request.nextUrl.searchParams.get('password') || '').trim();

    // Compare passwords (case-sensitive, trimmed)
    if (!password || password !== ADMIN_PASSWORD) {
      console.log('Admin password check failed:', {
        provided: password ? '***' : '(empty)',
        expected: ADMIN_PASSWORD ? '***' : '(not set)',
        envSet: !!process.env.ADMIN_PASSWORD
      });
      return NextResponse.json(
        { error: 'Unauthorized - Incorrect password' },
        { status: 401 }
      );
    }

    const subscribers = await getAllEmailSubscribers();

    return NextResponse.json(
      { 
        subscribers,
        count: subscribers.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get password from request body (better for special characters)
    const body = await request.json();
    const password = (body.password || '').trim();

    // Debug logging (remove in production)
    console.log('Password check:', {
      providedLength: password.length,
      expectedLength: ADMIN_PASSWORD.length,
      envSet: !!process.env.ADMIN_PASSWORD,
      match: password === ADMIN_PASSWORD
    });

    // Compare passwords (case-sensitive, trimmed)
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized - Incorrect password' },
        { status: 401 }
      );
    }

    const subscribers = await getAllEmailSubscribers();

    return NextResponse.json(
      { 
        subscribers,
        count: subscribers.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get password and ID from request body
    const body = await request.json();
    const password = (body.password || '').trim();
    const id = body.id;

    // Verify password
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized - Incorrect password' },
        { status: 401 }
      );
    }

    // Validate ID
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Invalid email ID' },
        { status: 400 }
      );
    }

    // Delete the email subscriber
    const deleted = await deleteEmailSubscriber(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Email deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}

