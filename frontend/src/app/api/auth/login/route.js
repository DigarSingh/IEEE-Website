import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/middleware/authMiddleware";
import bcrypt from "bcryptjs";

// Login user
export async function POST(request) {
  try {
    console.log("Login endpoint called");
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        {
          success: false,
          message: "Please provide email and password",
        },
        { status: 400 }
      );
    }

    console.log("Looking up user by email:", email);

    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    console.log("User found, checking password");

    // Check password using simple comparison
    const isMatch = password == user.password;
    if (!isMatch) {
      console.log("Password does not match");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    console.log("Password matched, generating token");

    // Generate token with user role
    const token = generateToken(user._id, user.role);
    console.log("Token generated successfully with role:", user.role);

    // Prepare response
    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        role: user.role,
        isVerified: user.isVerified,
        studentId: user.studentId,
      },
    });

    // Set cookie with token (for extra security, make it HTTP-only)
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    console.log("Login successful for user:", user.email);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login. Please try again.",
      },
      { status: 500 }
    );
  }
}
