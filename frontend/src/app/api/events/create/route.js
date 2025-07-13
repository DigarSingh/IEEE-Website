import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

// Create new event
export async function POST(request) {
  try {
    await dbConnect();
    
    // Verify authentication
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }
    
    // Admin or superadmin only
    if (authResult.user.role !== 'admin' && authResult.user.role !== 'superadmin') {
      return NextResponse.json({
        success: false,
        message: 'Not authorized to create events'
      }, { status: 403 });
    }
    
    const body = await request.json();
    
    // Create event with current user as creator
    const event = await Event.create({
      ...body,
      createdBy: authResult.user._id
    });

    return NextResponse.json({
      success: true,
      data: event
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({
        success: false,
        message: messages.join(', ')
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Server error creating event'
    }, { status: 500 });
  }
}
