import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    
    const admin = await User.findOne({ email: "admin@ieee.org" });
    
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Admin user not found"
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        hasPassword: !!admin.password,
        passwordLength: admin.password ? admin.password.length : 0,
        isHashed: admin.password ? admin.password.startsWith('$2') : false
      }
    });

  } catch (error) {
    console.error("Error checking admin:", error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
