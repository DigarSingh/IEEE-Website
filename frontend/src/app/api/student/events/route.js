import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

// Get events for students
export async function GET(request) {
  try {
    await dbConnect();
    
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'upcoming';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search');

    // Build query
    const query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get events with pagination
    const events = await Event.find(query)
      .populate('attendees', 'name email')
      .populate('organizers', 'name email')
      .sort({ date: status === 'completed' ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalEvents = await Event.countDocuments(query);

    // Add registration status for current user
    const eventsWithStatus = events.map(event => {
      const eventObj = event.toObject();
      eventObj.isRegistered = event.attendees.some(
        attendee => attendee._id.toString() === authResult.user._id.toString()
      );
      eventObj.attendeesCount = event.attendees.length;
      return eventObj;
    });

    return NextResponse.json({
      success: true,
      data: {
        events: eventsWithStatus,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalEvents / limit),
          totalEvents,
          hasNext: page < Math.ceil(totalEvents / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get student events error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
