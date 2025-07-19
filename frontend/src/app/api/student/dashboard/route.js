import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import Certificate from '@/models/Certificate';

// Get student dashboard statistics
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

    const userId = authResult.user._id;

    // Get registered events count
    const registeredEventsCount = await Event.countDocuments({
      attendees: userId
    });

    // Get completed events count
    const completedEventsCount = await Event.countDocuments({
      attendees: userId,
      status: 'completed'
    });

    // Get certificates count
    const certificatesCount = await Certificate.countDocuments({
      issuedTo: userId
    });

    // Get upcoming events
    const upcomingEvents = await Event.find({
      attendees: userId,
      status: 'upcoming',
      date: { $gte: new Date() }
    })
    .sort({ date: 1 })
    .limit(5)
    .select('title date location category');

    // Get recent certificates
    const recentCertificates = await Certificate.find({
      issuedTo: userId
    })
    .populate('event', 'title')
    .sort({ issueDate: -1 })
    .limit(5)
    .select('name issueDate event');

    // Get recent activities (events attended)
    const recentActivities = await Event.find({
      attendees: userId,
      status: 'completed'
    })
    .sort({ date: -1 })
    .limit(5)
    .select('title date category');

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          registeredEvents: registeredEventsCount,
          completedEvents: completedEventsCount,
          certificates: certificatesCount,
          upcomingEvents: upcomingEvents.length
        },
        upcomingEvents,
        recentCertificates,
        recentActivities
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
