import dbConnect from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
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

    // Check if certificate exists
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return Response.json({ success: false, message: "Certificate not found" }, { status: 404 });
    }

    // Delete the certificate
    await Certificate.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Certificate deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting certificate:", error);
    return Response.json(
      { success: false, message: "Failed to delete certificate" },
      { status: 500 }
    );
  }
} 