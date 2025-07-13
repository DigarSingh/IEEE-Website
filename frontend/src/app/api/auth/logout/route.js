import { NextResponse } from 'next/server';

// Logout user
export async function POST() {
  // Create a response that will clear the token cookie
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });

  // Clear the token cookie
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    expires: new Date(0), // Immediately expire the cookie
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return response;
}
