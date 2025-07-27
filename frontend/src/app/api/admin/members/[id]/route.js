import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authMiddleware } from "@/middleware/authMiddleware";

export async function DELETE(req, { params }) {
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

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Prevent deleting admin users
    if (user.role === 'admin' || user.role === 'superadmin') {
      return Response.json({ success: false, message: "Cannot delete admin users" }, { status: 403 });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json(
      { success: false, message: "Failed to delete user" },
      { status: 500 }
    );
  }
} 