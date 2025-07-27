import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/authMiddleware";

export async function PATCH(req, { params }) {
  try {
    // Check authentication and admin role
    const authResult = await authMiddleware(req);
    if (!authResult.success) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }

    if (authResult.user.role !== 'admin') {
      return Response.json({ success: false, message: "Access denied. Admin role required." }, { status: 403 });
    }

    await dbConnect();

    const { id } = params;
    const { isVerified } = await req.json();

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Update verification status
    user.isVerified = isVerified;
    await user.save();

    return Response.json({
      success: true,
      message: `User ${isVerified ? 'verified' : 'unverified'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error("Error updating user verification:", error);
    return Response.json(
      { success: false, message: "Failed to update user verification" },
      { status: 500 }
    );
  }
} 