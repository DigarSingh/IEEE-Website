import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where 
} from "firebase/firestore";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const round = searchParams.get('round');
    const limitCount = parseInt(searchParams.get('limit')) || 20;
    const type = searchParams.get('type') || 'overall'; // overall, round, recent
    
    let leaderboardQuery;
    
    switch (type) {
      case 'round':
        if (!round) {
          return NextResponse.json(
            { success: false, message: "Round parameter required for round leaderboard" },
            { status: 400 }
          );
        }
        leaderboardQuery = query(
          collection(db, 'quizResults'),
          where('round', '==', parseInt(round)),
          where('completed', '==', true),
          orderBy('score', 'desc'),
          orderBy('completedAt', 'asc'),
          limit(limitCount)
        );
        break;
        
      case 'recent':
        leaderboardQuery = query(
          collection(db, 'quizResults'),
          where('completed', '==', true),
          orderBy('completedAt', 'desc'),
          limit(limitCount)
        );
        break;
        
      case 'overall':
      default:
        leaderboardQuery = query(
          collection(db, 'quizResults'),
          where('completed', '==', true),
          orderBy('score', 'desc'),
          orderBy('completedAt', 'asc'),
          limit(limitCount)
        );
        break;
    }
    
    const leaderboardSnapshot = await getDocs(leaderboardQuery);
    const leaderboard = leaderboardSnapshot.docs.map((doc, index) => ({
      id: doc.id,
      rank: index + 1,
      ...doc.data()
    }));
    
    // Calculate statistics
    const totalParticipants = leaderboard.length;
    const averageScore = totalParticipants > 0 
      ? Math.round(leaderboard.reduce((sum, entry) => sum + (entry.score || 0), 0) / totalParticipants)
      : 0;
    const topScore = totalParticipants > 0 ? leaderboard[0]?.score || 0 : 0;
    const completedQuizzes = leaderboard.filter(entry => entry.completed).length;
    
    return NextResponse.json({
      success: true,
      data: {
        leaderboard,
        statistics: {
          totalParticipants,
          averageScore,
          topScore,
          completedQuizzes,
          type,
          round: round ? parseInt(round) : null
        }
      }
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
