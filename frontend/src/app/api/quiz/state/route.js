import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import QuizState from '@/models/QuizState';

// GET - Get current quiz state
export async function GET() {
  try {
    await dbConnect();
    
    let quizState = await QuizState.findOne();
    
    if (!quizState) {
      // Create default quiz state if none exists
      quizState = new QuizState({
        isActive: false,
        currentRound: 1,
        globalTimer: 0,
        round1: {
          isActive: false,
          globalTimer: 0,
          startTime: null,
          endTime: null,
          duration: 45 * 60, // 45 minutes in seconds
          password: "ieee@321"
        },
        quizSettings: {
          duration: 45,
          questionsPerRound: 25,
          allowMultipleAttempts: false
        }
      });
      
      await quizState.save();
    }
    
    return NextResponse.json({ 
      success: true, 
      data: quizState 
    });
    
  } catch (error) {
    console.error('Error fetching quiz state:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Update quiz state
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { action, round, settings } = body;
    
    let quizState = await QuizState.findOne();
    
    if (!quizState) {
      // Create new quiz state if none exists
      quizState = new QuizState();
    }
    
    switch (action) {
      case 'START_QUIZ':
        quizState.isActive = true;
        quizState.currentRound = round || 1;
        quizState.globalTimer = (settings?.duration || 45) * 60; // Convert minutes to seconds
        quizState[`round${round || 1}`].isActive = true;
        quizState[`round${round || 1}`].startTime = new Date();
        quizState[`round${round || 1}`].globalTimer = quizState.globalTimer;
        break;
        
      case 'STOP_QUIZ':
        quizState.isActive = false;
        quizState.globalTimer = 0;
        quizState.round1.isActive = false;
        quizState.round1.endTime = new Date();
        break;
        
      case 'START_ROUND':
        quizState.currentRound = round;
        quizState[`round${round}`].isActive = true;
        quizState[`round${round}`].startTime = new Date();
        quizState[`round${round}`].globalTimer = (settings?.duration || 45) * 60;
        break;
        
      case 'STOP_ROUND':
        quizState[`round${round}`].isActive = false;
        quizState[`round${round}`].endTime = new Date();
        quizState[`round${round}`].globalTimer = 0;
        break;
        
      case 'UPDATE_TIMER':
        if (quizState.isActive) {
          quizState.globalTimer = Math.max(0, quizState.globalTimer - 1);
          if (quizState.round1.isActive) {
            quizState.round1.globalTimer = Math.max(0, quizState.round1.globalTimer - 1);
          }
        }
        break;
        
      case 'UPDATE_SETTINGS':
        if (settings) {
          // Update general quiz settings
          if (settings.general) {
            quizState.quizSettings = { ...quizState.quizSettings, ...settings.general };
          }
          
          // Update round-specific settings
          if (settings.round1) {
            quizState.round1.duration = settings.round1.duration * 60; // Convert minutes to seconds
            quizState.round1.password = settings.round1.password;
          }
          
        }
        break;
        
      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
    
    const updatedQuizState = await quizState.save();
    
    console.log(`✅ Quiz state updated: ${action}`);
    return NextResponse.json({ 
      success: true, 
      data: updatedQuizState 
    });
    
  } catch (error) {
    console.error('Error updating quiz state:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}