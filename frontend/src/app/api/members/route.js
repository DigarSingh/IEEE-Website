import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Get all members (admin only)
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
    
    // Admin only access
    if (authResult.user.role !== 'admin' && authResult.user.role !== 'superadmin') {
      return NextResponse.json({
        success: false,
        message: 'Not authorized to access member list'
      }, { status: 403 });
    }
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const verified = searchParams.get('verified');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (role) query.role = role;
    if (verified !== null) query.isVerified = verified === 'true';
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    // Get users with pagination (excluding password)
    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users
    });
  } catch (error) {
    console.error('Error getting members:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching members'
    }, { status: 500 });
  }
}
