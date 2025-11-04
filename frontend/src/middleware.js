import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

// Middleware for route protection
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Temporarily disable middleware for testing
  console.log("Middleware called for path:", pathname);
  return NextResponse.next();

  // Check for protected routes - only dashboard and profile remain
  const protectedRoutes = ["/dashboard", "/profile"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify token
    const jwtSecret = process.env.JWT_SECRET || "secretkey";
    const decoded = verify(token, jwtSecret);

    console.log("Token decoded:", decoded);
    console.log("User role:", decoded.role);
    console.log("Is protected route:", isProtectedRoute);

    // If we get here, the user is authenticated correctly
    console.log("Access granted for user with role:", decoded.role);
    return NextResponse.next();
  } catch (error) {
    // Invalid token
    console.log("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/profile"],
};
