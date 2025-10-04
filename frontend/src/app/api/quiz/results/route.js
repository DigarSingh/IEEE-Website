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
    const limitCount = parseInt(searchParams.get('limit')) || 50;
    
    // Build MongoDB query
    let query = {};
    
    if (round) {
      query.selectedRound = parseInt(round);
    }
    
    // Only get completed quizzes for leaderboard
    query.quizCompleted = true;
    
    const students = await Student.find(query)
      .sort({ percentage: -1, timeSpent: 1 }) // Sort by percentage desc, then time asc
      .limit(limitCount)
      .lean(); // Use lean() for better performance
    
    // Transform data to match expected format
    const results = students.map(student => ({
      id: student._id.toString(),
      name: student.name,
      rollNo: student.rollNo,
      score: student.score,
      totalQuestions: 20, // Assuming 20 questions per quiz
      percentage: student.percentage,
      grade: student.grade,
      timeTaken: student.timeSpent,
      round: student.selectedRound,
      completed: student.quizCompleted,
      completedAt: student.completedAt || student.updatedAt,
      answers: student.answers || {},
      warnings: student.warnings || 0,
      createdAt: student.createdAt
    }));
    
    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const resultData = await request.json();
    
    // Validate required fields
    if (!resultData.name || !resultData.rollNo || resultData.score === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Calculate additional fields
    const completedAt = new Date();
    const percentage = Math.round((resultData.score / resultData.totalQuestions) * 100);
    const grade = getGrade(percentage);
    
    // Find existing student record
    const existingStudent = await Student.findOne({ rollNo: resultData.rollNo });
    
    if (existingStudent) {
      // Update existing student with quiz results
      const updatedStudent = await Student.findByIdAndUpdate(
        existingStudent._id,
        {
          score: resultData.score,
          percentage: percentage,
          grade: grade,
          timeSpent: resultData.timeTaken || 0,
          quizCompleted: true,
          completedAt: completedAt,
          answers: resultData.answers || {},
          warnings: resultData.warnings || 0,
          lastSeen: new Date()
        },
        { new: true }
      );
      
      return NextResponse.json({
        success: true,
        message: "Result saved successfully",
        data: {
          id: updatedStudent._id.toString(),
          name: updatedStudent.name,
          rollNo: updatedStudent.rollNo,
          score: updatedStudent.score,
          percentage: updatedStudent.percentage,
          grade: updatedStudent.grade,
          timeTaken: updatedStudent.timeSpent,
          round: updatedStudent.selectedRound,
          completed: updatedStudent.quizCompleted,
          completedAt: updatedStudent.completedAt,
          answers: updatedStudent.answers,
          warnings: updatedStudent.warnings
        }
      });
    } else {
      // Create new student record (shouldn't happen in normal flow)
      const newStudent = new Student({
        name: resultData.name,
        rollNo: resultData.rollNo,
        selectedRound: resultData.round || 1,
        score: resultData.score,
        percentage: percentage,
        grade: grade,
        timeSpent: resultData.timeTaken || 0,
        quizCompleted: true,
        completedAt: completedAt,
        answers: resultData.answers || {},
        warnings: resultData.warnings || 0,
        isActive: true,
        lastSeen: new Date()
      });
      
      const savedStudent = await newStudent.save();
      
      return NextResponse.json({
        success: true,
        message: "Result saved successfully",
        data: {
          id: savedStudent._id.toString(),
          name: savedStudent.name,
          rollNo: savedStudent.rollNo,
          score: savedStudent.score,
          percentage: savedStudent.percentage,
          grade: savedStudent.grade,
          timeTaken: savedStudent.timeSpent,
          round: savedStudent.selectedRound,
          completed: savedStudent.quizCompleted,
          completedAt: savedStudent.completedAt,
          answers: savedStudent.answers,
          warnings: savedStudent.warnings
        }
      });
    }
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to calculate grade
function getGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}
