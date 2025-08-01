import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Get event by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const event = await Event.findById(params.id)
      .populate("createdBy", "name email")
      .populate("attendees", "name email");

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(`Error getting event ${params.id}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error fetching event",
      },
      { status: 500 }
    );
  }
}
