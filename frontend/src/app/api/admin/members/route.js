import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
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
    const role = searchParams.get("role") || "all";

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { college: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } }
      ];
    }

    if (role !== "all") {
      query.role = role;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalMembers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalMembers / limit);

    // Fetch members
    const members = await User.find(query)
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = {
      currentPage: page,
      totalPages,
      totalMembers,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      limit
    };

    return Response.json({
      success: true,
      data: {
        members,
        pagination
      }
    });

  } catch (error) {
    console.error("Error fetching members:", error);
    return Response.json(
      { success: false, message: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
