import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

// Get all certificates (admin) or user certificates (student)
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
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Build query
    const query = {};
    
    // Admin can get all certificates, users can only get their own
    if (authResult.user.role === 'admin' || authResult.user.role === 'superadmin') {
      // If userId provided, filter by that
      if (userId) {
        query.issuedTo = userId;
      }
    } else {
      // Non-admin users can only see their own certificates
      query.issuedTo = authResult.user._id;
    }
    
    const certificates = await Certificate.find(query)
      .populate('issuedTo', 'name email')
      .populate('issuedBy', 'name')
      .populate('event', 'title');
    
    return NextResponse.json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error) {
    console.error('Error getting certificates:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching certificates'
    }, { status: 500 });
  }
}
