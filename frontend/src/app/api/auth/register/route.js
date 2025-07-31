import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/middleware/authMiddleware";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(request) {
  try {
    // Skip database connection during build time
    if (
      process.env.NODE_ENV === "production" ||
      process.env.SKIP_MONGODB === "true"
    ) {
      return NextResponse.json(
        { success: false, message: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    await dbConnect();

    const {
      name,
      email,
      password,
      college,
      studentId,
      role = "student",
    } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !college || !studentId) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Check if student ID already exists
    const existingStudentId = await User.findOne({ studentId });
    if (existingStudentId) {
      return NextResponse.json(
        { success: false, message: "Student ID already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      college,
      studentId,
      role,
      isVerified: false, // Default to false, admin can verify later
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id, newUser.role);

    // Return user data (without password) and token
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      college: newUser.college,
      role: newUser.role,
      isVerified: newUser.isVerified,
      studentId: newUser.studentId,
    };

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
