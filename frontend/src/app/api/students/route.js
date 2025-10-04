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
    
    // Check if student already exists
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return NextResponse.json({ 
        success: false, 
        error: 'Student with this roll number already exists' 
      }, { status: 409 });
    }
    
    // Create new student
    const student = new Student({
      name: name.trim(),
      rollNo: rollNo.trim(),
      selectedRound,
      loginTime: loginTime || new Date(),
      isActive: true,
      lastSeen: new Date()
    });
    
    const savedStudent = await student.save();
    
    console.log('✅ Student created:', savedStudent._id);
    return NextResponse.json({ 
      success: true, 
      id: savedStudent._id.toString(),
      data: savedStudent 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
