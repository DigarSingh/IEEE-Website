import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

// Get all events or query by filter
export async function GET(request) {
  try {
    await dbConnect();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query object
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    // Get events with pagination
    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email');

    return NextResponse.json({
      success: true,
      count: events.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: events
    });
  } catch (error) {
    console.error('Error getting events:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching events'
    }, { status: 500 });
  }
}
