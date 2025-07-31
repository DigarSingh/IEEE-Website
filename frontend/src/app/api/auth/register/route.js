import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/middleware/authMiddleware";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(request) {
  try {
    await dbConnect();

    const {
      name,
      email,
      password,
      branch,
      year,
      mobile,
      studentId,
      role = "student",
    } = await request.json();

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !branch ||
      !year ||
      !mobile ||
      !studentId
    ) {
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
      branch,
      year,
      mobile,
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
      branch: newUser.branch,
      year: newUser.year,
      mobile: newUser.mobile,
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
