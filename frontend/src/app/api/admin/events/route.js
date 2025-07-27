import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { authMiddleware } from "@/middleware/authMiddleware";

export async function GET(req) {
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

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    if (status !== "all") {
      query.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalEvents = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalEvents / limit);

    // Fetch events
    const events = await Event.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = {
      currentPage: page,
      totalPages,
      totalEvents,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      limit
    };

    return Response.json({
      success: true,
      events
    });

  } catch (error) {
    console.error("Error fetching events:", error);
    return Response.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
