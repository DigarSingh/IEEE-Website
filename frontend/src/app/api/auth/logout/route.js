import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
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
