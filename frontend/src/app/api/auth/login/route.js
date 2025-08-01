import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/middleware/authMiddleware";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Return user data (without password) and token
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      year: user.year,
      mobile: user.mobile,
      role: user.role,
      isVerified: user.isVerified,
      studentId: user.studentId,
    };

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
