import dbConnect from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
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

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalCertificates = await Certificate.countDocuments(query);
    const totalPages = Math.ceil(totalCertificates / limit);

    // Fetch certificates with populated user and event data
    const certificates = await Certificate.find(query)
      .populate('user', 'name email')
      .populate('event', 'title')
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(limit);

    const pagination = {
      currentPage: page,
      totalPages,
      totalCertificates,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      limit
    };

    return Response.json({
      success: true,
      certificates
    });

  } catch (error) {
    console.error("Error fetching certificates:", error);
    return Response.json(
      { success: false, message: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
