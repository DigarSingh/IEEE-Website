import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Update user profile
export async function PUT(request) {
  try {
    await dbConnect();
    
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }

    const body = await request.json();
    const { 
      name, 
      email, 
      college, 
      branch, 
      year, 
      mobile, 
      studentId, 
      ieeeId,
      currentPassword,
      newPassword 
    } = body;

    // Find the user
    const user = await User.findById(authResult.user._id);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({
          success: false,
          message: 'Current password is required to change password'
        }, { status: 400 });
      }

      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return NextResponse.json({
          success: false,
          message: 'Current password is incorrect'
        }, { status: 400 });
      }

      // Validate new password
      if (newPassword.length < 6) {
        return NextResponse.json({
          success: false,
          message: 'New password must be at least 6 characters long'
        }, { status: 400 });
      }
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          message: 'Email is already registered'
        }, { status: 400 });
      }
    }

    // Check if studentId is being changed and if it's already taken
    if (studentId && studentId !== user.studentId) {
      const existingUser = await User.findOne({ studentId });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          message: 'Student ID is already registered'
        }, { status: 400 });
      }
    }

    // Check if ieeeId is being changed and if it's already taken
    if (ieeeId && ieeeId !== user.ieeeId) {
      const existingUser = await User.findOne({ ieeeId });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          message: 'IEEE ID is already registered'
        }, { status: 400 });
      }
    }

    // Validate mobile number
    if (mobile && !/^\d{10}$/.test(mobile)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number'
      }, { status: 400 });
    }

    // Validate email format
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address'
      }, { status: 400 });
    }

    // Update user fields
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.trim().toLowerCase();
    if (college) updateData.college = college.trim();
    if (branch) updateData.branch = branch.trim();
    if (year) updateData.year = year.trim();
    if (mobile) updateData.mobile = mobile.trim();
    if (studentId) updateData.studentId = studentId.trim();
    if (ieeeId) updateData.ieeeId = ieeeId.trim();

    // Hash new password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      authResult.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        message: validationErrors[0] || 'Validation error'
      }, { status: 400 });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return NextResponse.json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} is already registered`
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
