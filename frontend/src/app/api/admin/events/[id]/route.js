import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
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

    // Check if event exists
    const event = await Event.findById(id);
    if (!event) {
      return Response.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    // Delete the event
    await Event.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting event:", error);
    return Response.json(
      { success: false, message: "Failed to delete event" },
      { status: 500 }
    );
  }
} 