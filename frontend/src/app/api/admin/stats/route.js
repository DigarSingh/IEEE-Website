import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';

// Dashboard stats endpoint
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
    
    // Admin only
    if (authResult.user.role !== 'admin' && authResult.user.role !== 'superadmin') {
      return NextResponse.json({
        success: false,
        message: 'Not authorized to access admin dashboard'
      }, { status: 403 });
    }
    
    // Import models here to avoid circular dependencies
    const User = (await import('@/models/User')).default;
    const Event = (await import('@/models/Event')).default;
    const Certificate = (await import('@/models/Certificate')).default;
    const Message = (await import('@/models/Message')).default;
    
    // Get counts for dashboard
    const [
      totalMembers,
      totalEvents,
      totalCertificates,
      unreadMessages,
      recentMembers,
      upcomingEvents
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Certificate.countDocuments(),
      Message.countDocuments({ read: false, toAdmin: true }),
      User.find().sort({ createdAt: -1 }).limit(5).select('-password'),
      Event.find({ status: 'upcoming' }).sort({ date: 1 }).limit(5)
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        totalMembers,
        totalEvents,
        totalCertificates,
        unreadMessages,
        recentMembers,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching admin dashboard data'
    }, { status: 500 });
  }
}
