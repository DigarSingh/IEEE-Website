import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/middleware/authMiddleware";
import mongoose from "mongoose";

// Register new user
export async function POST(request) {
  try {
    console.log("Register endpoint called");
    await dbConnect();

    const body = await request.json();
    const { name, email, password, college, branch, year, mobile, studentId } =
      body;

    console.log("Registration data received:", {
      name,
      email,
      college,
      branch,
      year,
      mobile,
      studentId,
      passwordProvided: !!password,
    });

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "password",
      "college", // Default college
      "branch",
      "year",
      "mobile",
      "studentId",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    // Check if student ID already exists
    const studentIdExists = await User.findOne({ studentId });
    if (studentIdExists) {
      console.log("Student ID already exists:", studentId);
      return NextResponse.json(
        {
          success: false,
          message: "User with this Student ID already exists",
        },
        { status: 400 }
      );
    }

    // Create user
    console.log("Creating new user...");
    const user = await User.create({
      name,
      email,
      password,
      college: "geu",
      branch,
      year,
      mobile,
      studentId,
    });
    console.log("User created successfully:", user._id);

    // Generate token
    const token = generateToken(user._id);

    // Send response
    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          role: user.role,
          isVerified: user.isVerified,
        },
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return NextResponse.json(
        {
          success: false,
          message: messages.join(", "),
        },
        { status: 400 }
      );
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return NextResponse.json(
        {
          success: false,
          message: `${field} already exists. Please use a different value.`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Server error during registration",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
