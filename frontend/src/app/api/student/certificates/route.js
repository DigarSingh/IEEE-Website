import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

// Get certificates for student
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
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search');

    // Build query for user's certificates
    const query = { issuedTo: authResult.user._id };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get certificates with pagination
    const certificates = await Certificate.find(query)
      .populate('event', 'title date category')
      .populate('issuedBy', 'name email')
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCertificates = await Certificate.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        certificates,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCertificates / limit),
          totalCertificates,
          hasNext: page < Math.ceil(totalCertificates / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get student certificates error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
