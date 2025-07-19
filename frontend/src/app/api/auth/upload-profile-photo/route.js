import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    await dbConnect();
    
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: authResult.message 
      }, { status: authResult.status });
    }

    const formData = await request.formData();
    const file = formData.get('profilePhoto');

    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'No file uploaded'
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.'
      }, { status: 400 });
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const userId = authResult.user._id;
    const extension = path.extname(file.name);
    const filename = `profile-${userId}-${timestamp}${extension}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.log('Directory already exists or created');
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    
    await writeFile(filePath, buffer);

    // Update user's profile photo in database
    const profilePhotoUrl = `/uploads/profiles/${filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: profilePhotoUrl },
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'Profile photo updated successfully',
      user: updatedUser,
      profilePhotoUrl
    });

  } catch (error) {
    console.error('Profile photo upload error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to upload profile photo'
    }, { status: 500 });
  }
}
