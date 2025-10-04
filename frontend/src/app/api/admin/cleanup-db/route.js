import { NextResponse } from 'next/server';
import cleanupDatabaseIndexes from '@/scripts/cleanup-db-indexes';

// POST - Run database index cleanup
export async function POST(request) {
  try {
    // Add some basic authentication/authorization here if needed
    const { authorization } = request.headers;
    
    // For security, you might want to add authentication
    // if (!authorization || authorization !== 'Bearer your-admin-token') {
    //   return NextResponse.json({ 
    //     success: false, 
    //     error: 'Unauthorized' 
    //   }, { status: 401 });
    // }
    
    console.log('🔧 Starting database index cleanup...');
    
    await cleanupDatabaseIndexes();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database indexes cleaned up successfully' 
    });
    
  } catch (error) {
    console.error('❌ Error running database cleanup:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}