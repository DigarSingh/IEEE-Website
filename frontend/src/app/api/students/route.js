import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

// GET - Get all students or search by rollNo
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const rollNo = searchParams.get('rollNo');
    
    if (rollNo) {
      // Get specific student by rollNo
      const student = await Student.findOne({ rollNo });
      if (!student) {
        return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: student });
    } else {
      // Get all students
      const students = await Student.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: students });
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Create new student
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, rollNo, selectedRound, loginTime } = body;
    
    // Validate required fields
    if (!name || !rollNo || !selectedRound) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, rollNo, selectedRound' 
      }, { status: 400 });
    }
    
    const trimmedRollNo = rollNo.trim();
    const trimmedName = name.trim();
    
    console.log(`🔄 Processing student registration: ${trimmedRollNo} for Round ${selectedRound}`);
    
    // Check if student already exists for this specific round
    const existingStudent = await Student.findOne({ rollNo: trimmedRollNo, selectedRound });
    if (existingStudent) {
      // Student already exists for this round - just update login time
      console.log(`🔄 Student ${trimmedRollNo} re-logging into Round ${selectedRound}`);
      
      existingStudent.loginTime = loginTime || new Date();
      existingStudent.lastSeen = new Date();
      existingStudent.isActive = true;
      
      const updatedStudent = await existingStudent.save();
      
      console.log('✅ Student login updated:', updatedStudent._id);
      return NextResponse.json({ 
        success: true, 
        id: updatedStudent._id.toString(),
        data: updatedStudent,
        message: `Successfully re-logged into Round ${selectedRound}`
      }, { status: 200 });
    }
    
    // Check if student exists for a different round
    const studentOtherRound = await Student.findOne({ rollNo: trimmedRollNo, selectedRound: { $ne: selectedRound } });
    if (studentOtherRound) {
      console.log(`✅ Student ${trimmedRollNo} participating in Round ${selectedRound} (previously participated in Round ${studentOtherRound.selectedRound})`);
    }
    
    // Create new student record for this round
    const studentData = {
      name: trimmedName,
      rollNo: trimmedRollNo,
      selectedRound,
      loginTime: loginTime || new Date(),
      isActive: true,
      lastSeen: new Date()
    };
    
    const student = new Student(studentData);
    
    try {
      const savedStudent = await student.save();
      console.log('✅ New student record created:', savedStudent._id);
      return NextResponse.json({ 
        success: true, 
        id: savedStudent._id.toString(),
        data: savedStudent,
        message: `Successfully registered for Round ${selectedRound}`
      }, { status: 201 });
    } catch (saveError) {
      // Handle MongoDB duplicate key errors specifically
      if (saveError.code === 11000) {
        console.log(`⚠️ Duplicate key error for ${trimmedRollNo}, attempting to find existing record...`);
        
        // Try to find the existing student record
        const existingRecord = await Student.findOne({ rollNo: trimmedRollNo, selectedRound });
        if (existingRecord) {
          // Update the existing record instead
          existingRecord.name = trimmedName;
          existingRecord.loginTime = loginTime || new Date();
          existingRecord.lastSeen = new Date();
          existingRecord.isActive = true;
          
          const updatedRecord = await existingRecord.save();
          console.log('✅ Updated existing student record:', updatedRecord._id);
          return NextResponse.json({ 
            success: true, 
            id: updatedRecord._id.toString(),
            data: updatedRecord,
            message: `Successfully updated registration for Round ${selectedRound}`
          }, { status: 200 });
        }
        
        // If we still can't find the record, there might be an index issue
        console.error('❌ Duplicate key error but no existing record found. Possible index conflict.');
        return NextResponse.json({ 
          success: false, 
          error: `Student with roll number ${trimmedRollNo} may already be registered. Please contact administrator if this persists.`,
          code: 'DUPLICATE_STUDENT'
        }, { status: 409 });
      }
      
      // Re-throw other save errors
      throw saveError;
    }
    
  } catch (error) {
    console.error('❌ Error creating/updating student:', error);
    
    // Provide more specific error messages
    if (error.code === 11000) {
      const field = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'rollNo';
      return NextResponse.json({ 
        success: false, 
        error: `A student with this ${field} already exists for the selected round.`,
        code: 'DUPLICATE_KEY'
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to register student',
      code: 'REGISTRATION_ERROR'
    }, { status: 500 });
  }
}

// PUT - Update student
export async function PUT(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { studentId, updateData } = body;
    
    if (!studentId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Student ID is required' 
      }, { status: 400 });
    }
    
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { 
        ...updateData,
        lastSeen: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return NextResponse.json({ 
        success: false, 
        error: 'Student not found' 
      }, { status: 404 });
    }
    
    console.log('✅ Student updated:', studentId);
    return NextResponse.json({ 
      success: true, 
      data: updatedStudent 
    });
    
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
