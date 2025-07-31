import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // For JWT-based authentication, logout is handled client-side
    // by removing the token from localStorage
    // This endpoint can be used for additional server-side cleanup if needed

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
