import { NextRequest, NextResponse } from 'next/server';

// Simple debug endpoint to check if ADMIN_PASSWORD is set (without revealing it)
// Only available in development mode for security
export async function GET() {
  // Disable in production for security
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 404 }
    );
  }

  const isSet = !!process.env.ADMIN_PASSWORD;
  const length = process.env.ADMIN_PASSWORD?.length || 0;
  
  return NextResponse.json({
    passwordIsSet: isSet,
    passwordLength: length,
    environment: process.env.NODE_ENV || 'development',
    hint: isSet 
      ? `Password is set and has ${length} characters. Make sure there are no extra spaces.`
      : 'ADMIN_PASSWORD environment variable is not set. Please set it in Vercel dashboard.'
  });
}

