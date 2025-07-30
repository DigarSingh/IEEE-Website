import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/middleware/authMiddleware";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password, branch, year, mobile, studentId } = body;

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "password",
      "branch",
      "year",
      "mobile",
      "studentId",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if email or studentId already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    const studentIdExists = await User.findOne({ studentId });
    if (studentIdExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this Student ID already exists",
        },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      branch,
      year,
      mobile,
      studentId,
    });

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
          role: user.role,
          isVerified: user.isVerified,
        },
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

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
