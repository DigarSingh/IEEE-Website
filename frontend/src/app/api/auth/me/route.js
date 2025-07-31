import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const authResult = await authMiddleware(request);

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status || 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: authResult.user,
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
