import { NextResponse } from "next/server";
import { getQuizResults } from "@/lib/mongodb-storage";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const round = searchParams.get('round');
    const limitCount = parseInt(searchParams.get('limit')) || 20;
    const type = searchParams.get('type') || 'overall'; // overall, round, recent
    
    // Build filters for MongoDB query
    const filters = {};
    
    if (type === 'round' && round) {
      filters.round = parseInt(round);
    }
    
    // Get results from MongoDB
    const result = await getQuizResults(filters);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch leaderboard data" },
        { status: 500 }
      );
    }
    
    let leaderboardData = result.data || [];
    
    // Sort and limit based on type
    switch (type) {
      case 'round':
        leaderboardData = leaderboardData
          .filter(item => item.round === parseInt(round))
          .sort((a, b) => {
            if (b.score === a.score) {
              return new Date(a.completedAt) - new Date(b.completedAt);
            }
            return b.score - a.score;
          })
          .slice(0, limitCount);
        break;
        
      case 'recent':
        leaderboardData = leaderboardData
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
          .slice(0, limitCount);
        break;
        
      case 'overall':
      default:
        leaderboardData = leaderboardData
          .sort((a, b) => {
            if (b.score === a.score) {
              return new Date(a.completedAt) - new Date(b.completedAt);
            }
            return b.score - a.score;
          })
          .slice(0, limitCount);
        break;
    }
    
    // Add rank to leaderboard data
    const leaderboard = leaderboardData.map((entry, index) => ({
      id: entry._id || entry.id,
      rank: index + 1,
      ...entry
    }));
    
    // Calculate statistics
    const totalParticipants = leaderboard.length;
    const averageScore = totalParticipants > 0 
      ? Math.round(leaderboard.reduce((sum, entry) => sum + (entry.score || 0), 0) / totalParticipants)
      : 0;
    const topScore = totalParticipants > 0 ? leaderboard[0]?.score || 0 : 0;
    const completedQuizzes = leaderboard.filter(entry => entry.isCompleted !== false).length;
    
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
