import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import { processFileUpload } from '@/utils/fileUpload';

// Use the new Next.js App Router configuration
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1] 
      || request.cookies.get('token')?.value;

    // Create a request-like object for the authMiddleware
    const authReq = {
      headers: { 
        authorization: token ? `Bearer ${token}` : undefined 
      },
      cookies: {
        token: token
      }
    };

    const authResult = await authMiddleware(authReq);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }
    
    // Get fileType from query parameters
    const url = new URL(request.url);
    const fileType = url.searchParams.get('fileType') || 'general';
    
    // Process the file upload using our utility function
    const result = await processFileUpload(request, fileType);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error uploading file'
    }, { status: 500 });
  }
}
