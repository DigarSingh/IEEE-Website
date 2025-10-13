import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const round = searchParams.get('round');
    const limitCount = parseInt(searchParams.get('limit')) || 20;
    const type = searchParams.get('type') || 'overall'; // overall, round, recent
    
    // Build MongoDB query based on type
    let query = {};
    
    if (type === 'round' && round) {
      query.selectedRound = parseInt(round);
    }
    
    console.log("🔍 Leaderboard query:", { type, round, query });
    
    // Get students from database
    const students = await Student.find(query)
      .sort({ percentage: -1, timeSpent: 1 })
      .lean();
    
    console.log("📊 Found students for leaderboard:", students.length);
    
    // Transform to expected format
    let leaderboardData = students.map((student) => ({
      id: student._id.toString(),
      _id: student._id.toString(),
      name: student.name,
      rollNo: student.rollNo,
      score: student.score || 0,
      percentage: student.percentage || 0,
      grade: student.grade || 'F',
      timeSpent: student.timeSpent || 0,
      selectedRound: student.selectedRound,
      round: student.selectedRound, // For compatibility
      quizCompleted: student.quizCompleted || false,
      completedAt: student.completedAt,
      isCompleted: student.quizCompleted || false,
      warnings: student.warnings || 0,
    }));
    
    // Sort and limit based on type
    switch (type) {
      case 'round':
        // Data is already filtered by database query
        leaderboardData = leaderboardData
          .sort((a, b) => {
            if (b.score === a.score) {
              return new Date(a.completedAt) - new Date(b.completedAt);
            }
            return b.score - a.score;
          })
          .slice(0, limitCount);
        break;
        
      case 'recent':
        const fortyFiveMinutesAgo = new Date(Date.now() - 45 * 60 * 1000);
        leaderboardData = leaderboardData
          .filter(item => new Date(item.completedAt) > fortyFiveMinutesAgo)
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
