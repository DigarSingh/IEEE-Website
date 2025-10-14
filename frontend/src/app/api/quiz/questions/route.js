import { NextResponse } from 'next/server';
import questionsData from '@/data/questions.json';

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// GET - Get random 30 questions
export async function GET() {
  try {
    // Shuffle all questions and take first 30
    const shuffledQuestions = shuffleArray(questionsData);
    const selectedQuestions = shuffledQuestions.slice(0, 30);
    
    // Assign new sequential IDs to avoid conflicts
    const questionsWithNewIds = selectedQuestions.map((question, index) => ({
      ...question,
      id: index + 1
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: questionsWithNewIds,
      totalQuestions: questionsWithNewIds.length
    });
    
  } catch (error) {
    console.error('Error fetching random questions:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
