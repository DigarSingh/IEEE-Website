import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';

// Register for an event
export async function POST(request) {
  try {
    await dbConnect();
    
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({
        success: false,
        message: 'Event ID is required'
      }, { status: 400 });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({
        success: false,
        message: 'Event not found'
      }, { status: 404 });
    }

    // Check if event is still accepting registrations
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json({
        success: false,
        message: 'Registration deadline has passed'
      }, { status: 400 });
    }

    // Check if event has reached maximum capacity
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return NextResponse.json({
        success: false,
        message: 'Event is full'
      }, { status: 400 });
    }

    // Check if user is already registered
    if (event.attendees.includes(authResult.user._id)) {
      return NextResponse.json({
        success: false,
        message: 'You are already registered for this event'
      }, { status: 400 });
    }

    // Add user to event attendees
    event.attendees.push(authResult.user._id);
    await event.save();

    // Add event to user's registered events
    await User.findByIdAndUpdate(
      authResult.user._id,
      { $addToSet: { registeredEvents: eventId } }
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for event'
    });

  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}

// Unregister from an event
export async function DELETE(request) {
  try {
    await dbConnect();
    
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({
        success: false,
        message: 'Event ID is required'
      }, { status: 400 });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({
        success: false,
        message: 'Event not found'
      }, { status: 404 });
    }

    // Check if user is registered
    if (!event.attendees.includes(authResult.user._id)) {
      return NextResponse.json({
        success: false,
        message: 'You are not registered for this event'
      }, { status: 400 });
    }

    // Remove user from event attendees
    event.attendees = event.attendees.filter(
      attendee => !attendee.equals(authResult.user._id)
    );
    await event.save();

    // Remove event from user's registered events
    await User.findByIdAndUpdate(
      authResult.user._id,
      { $pull: { registeredEvents: eventId } }
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully unregistered from event'
    });

  } catch (error) {
    console.error('Event unregistration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
