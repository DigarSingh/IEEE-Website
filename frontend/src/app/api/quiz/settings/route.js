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
            duration: 30 * 60,
            password: "ieee@321"
          },
          round2: {
            duration: 45 * 60,
            password: "ieeegg@321"
          }
        }
      });
    }
    
    // Return only the necessary settings (duration and password for each round)
    return NextResponse.json({ 
      success: true, 
      data: {
        round1: {
          duration: quizState.round1?.duration || 30 * 60,
          password: quizState.round1?.password || "ieee@321"
        },
        round2: {
          duration: quizState.round2?.duration || 45 * 60,
          password: quizState.round2?.password || "ieeegg@321"
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching quiz settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}