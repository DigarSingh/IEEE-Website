import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Define protected routes
const adminRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/members',
  '/admin/events',
  '/admin/certificates',
  '/admin/messages',
];

const studentRoutes = [
  '/student',
  '/student/dashboard',
  '/student/events',
  '/student/certificates',
  '/student/profile',
];

// Middleware for route protection
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check for protected routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isStudentRoute = studentRoutes.some(route => pathname.startsWith(route));
  
  if (!isAdminRoute && !isStudentRoute) {
    return NextResponse.next();
  }
  
  // Get token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'secretkey';
    const decoded = verify(token, jwtSecret);
    
    // For admin routes, verify admin role
    if (isAdminRoute && decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // If we get here, the user is authenticated correctly
    return NextResponse.next();
  } catch (error) {
    // Invalid token
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/dashboard',
    '/profile',
  ],
};
