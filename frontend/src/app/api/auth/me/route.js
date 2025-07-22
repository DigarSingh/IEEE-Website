import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import dbConnect from "@/lib/mongodb";

// Get current user profile
export async function GET(request) {
  try {
    await dbConnect();

    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: authResult.message,
        },
        { status: authResult.status }
      );
    }

    // Return user data without password
    const userWithoutPassword = { ...authResult.user };
    delete userWithoutPassword.password;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
