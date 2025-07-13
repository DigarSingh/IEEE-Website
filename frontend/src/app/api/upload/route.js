import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import { processFileUpload } from '@/utils/fileUpload';

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await authMiddleware(request);
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
