import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import QuizState from '@/models/QuizState';

// GET - Get current quiz settings (including passwords for validation)
export async function GET() {
  try {
    await dbConnect();
    
    let quizState = await QuizState.findOne();
    
    if (!quizState) {
      // Return default settings if none exist
      return NextResponse.json({ 
        success: true, 
        data: {
          round1: {
            duration: 40 * 60,
            password: "ieee@kindlejr4.0"
          }
        }
      });
    }
    
    // Return only the necessary settings (duration and password for round 1)
    return NextResponse.json({ 
      success: true, 
      data: {
        round1: {
          duration: quizState.round1?.duration || 40 * 60,
          password: quizState.round1?.password || "ieee@kindlejr4.0"
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching quiz settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}