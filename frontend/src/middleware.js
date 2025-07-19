import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

// Define protected routes
const adminRoutes = [
  "/admin",
  "/admin/dashboard",
  "/admin/members",
  "/admin/events",
  "/admin/certificates",
  "/admin/messages",
];

const studentRoutes = [
  "/student",
  "/student/dashboard",
  "/student/events",
  "/student/certificates",
  "/student/profile",
];

// Helper function to determine if we're in build/static generation mode
const isBuildTime = () => {
  try {
    // Additional check for Vercel build environment
    if (process.env.NEXT_CONFIG_FILE === "next.config.build.js") {
      return true;
    }
    return (
      process.env.NODE_ENV === "production" && typeof window === "undefined"
    );
  } catch (e) {
    // If any error occurs, assume we're in build time to be safe
    return true;
  }
};

// Middleware for route protection
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Temporarily disable middleware for testing
  console.log("Middleware called for path:", pathname);
  return NextResponse.next();

  // Skip auth checks during build/static generation
  if (isBuildTime()) {
    return NextResponse.next();
  }

  // Check for protected routes
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isStudentRoute = studentRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAdminRoute && !isStudentRoute) {
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
    console.log("Is admin route:", isAdminRoute);
    console.log("Is student route:", isStudentRoute);

    // For admin routes, verify admin role
    if (
      isAdminRoute &&
      decoded.role !== "admin" &&
      decoded.role !== "superadmin"
    ) {
      console.log("Access denied: User is not admin for admin route");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // For student routes, verify student role
    if (isStudentRoute && decoded.role !== "student") {
      console.log("Access denied: User is not student for student route");
      return NextResponse.redirect(new URL("/login", request.url));
    }

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
  matcher: ["/admin/:path*", "/student/:path*", "/dashboard", "/profile"],
};
