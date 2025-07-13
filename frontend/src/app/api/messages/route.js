import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';

// Get all messages (admin) or user messages (student)
export async function GET(request) {
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
    
    // Build query
    const query = {};
    
    // Admin gets all messages sent to admin
    if (authResult.user.role === 'admin' || authResult.user.role === 'superadmin') {
      query.toAdmin = true;
    } else {
      // Students get only their own messages
      query.fromUser = authResult.user._id;
    }
    
    const messages = await Message.find(query)
      .populate('fromUser', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error getting messages:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching messages'
    }, { status: 500 });
  }
}

// Create new message
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
    
    const body = await request.json();
    
    // Create message with current user as sender
    const message = await Message.create({
      ...body,
      fromUser: authResult.user._id
    });
    
    return NextResponse.json({
      success: true,
      data: message
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    
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
      message: 'Server error creating message'
    }, { status: 500 });
  }
}
