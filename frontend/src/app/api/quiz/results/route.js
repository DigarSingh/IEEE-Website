import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const round = searchParams.get("round");
    const limitCount = parseInt(searchParams.get("limit")) || 100;
    const completedOnly = searchParams.get("completedOnly") === "true";

    // Build MongoDB query
    let query = {};

    if (round) {
      query.selectedRound = parseInt(round);
    }

    // Optionally filter for completed quizzes only
    if (completedOnly) {
      query.quizCompleted = true;
    }

    console.log("🔍 Quiz results query:", query);

    const students = await Student.find(query)
      .sort({ percentage: -1, timeSpent: 1 }) // Sort by percentage desc, then time asc
      .limit(limitCount)
      .lean(); // Use lean() for better performance

    console.log("📊 Found students:", students.length);

    // Transform data to match expected format
    const results = students.map((student) => ({
      id: student._id.toString(),
      name: student.name,
      rollNo: student.rollNo,
      score: student.score || 0,
      totalQuestions: 30, // Assuming 30 questions per quiz
      percentage: student.percentage || 0,
      grade: student.grade || "N/A",
      timeTaken: student.timeSpent || 0,
      timeSpent: student.timeSpent || 0,
      round: student.selectedRound || 1,
      completed: student.quizCompleted || false,
      quizCompleted: student.quizCompleted || false,
      completedAt: student.completedAt || student.updatedAt,
      answers: student.answers || {},
      warnings: student.warnings || 0,
      createdAt: student.createdAt,
    }));

    console.log("✅ Returning results:", results.length);

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("❌ Error fetching quiz results:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const resultData = await request.json();

    console.log("📥 Received quiz result submission:", {
      name: resultData.name,
      rollNo: resultData.rollNo,
      score: resultData.score,
      totalQuestions: resultData.totalQuestions,
      timeTaken: resultData.timeTaken,
      round: resultData.round,
    });

    // Validate required fields
    if (
      !resultData.name ||
      !resultData.rollNo ||
      resultData.score === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate additional fields
    const completedAt = new Date();
    const percentage = Math.round(
      (resultData.score / (resultData.totalQuestions || 30)) * 100
    );
    const grade = getGrade(percentage);

    console.log("📊 Calculated values:", { percentage, grade });

    // Find existing student record for the specific round
    const existingStudent = await Student.findOne({
      rollNo: resultData.rollNo,
      selectedRound: resultData.round || 1,
    });

    console.log("🔍 Found existing student:", existingStudent ? "Yes" : "No");

    if (existingStudent) {
      // Update existing student with quiz results
      const updateData = {
        score: resultData.score,
        percentage: percentage,
        grade: grade,
        timeSpent: resultData.timeTaken || resultData.timeSpent || 0,
        quizCompleted: true,
        completedAt: completedAt,
        answers: resultData.answers || {},
        warnings: resultData.warnings || 0,
        lastSeen: new Date(),
      };

      console.log("💾 Updating student with data:", updateData);

      const updatedStudent = await Student.findByIdAndUpdate(
        existingStudent._id,
        updateData,
        { new: true }
      );

      console.log("✅ Student updated successfully:", updatedStudent._id);

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
          warnings: updatedStudent.warnings,
        },
      });
    } else {
      // Create new student record (shouldn't happen in normal flow)
      console.log("⚠️ Creating new student record (no existing login found)");

      const newStudent = new Student({
        name: resultData.name,
        rollNo: resultData.rollNo,
        selectedRound: resultData.round || 1,
        score: resultData.score,
        percentage: percentage,
        grade: grade,
        timeSpent: resultData.timeTaken || resultData.timeSpent || 0,
        quizCompleted: true,
        completedAt: completedAt,
        answers: resultData.answers || {},
        warnings: resultData.warnings || 0,
        isActive: true,
        lastSeen: new Date(),
      });

      const savedStudent = await newStudent.save();

      console.log("✅ New student created:", savedStudent._id);

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
          warnings: savedStudent.warnings,
        },
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
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}
