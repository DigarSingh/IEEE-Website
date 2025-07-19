# Student Portal Testing Guide

## Overview

After implementing the student portal redirect functionality, users with the "student" role will be automatically redirected to the student dashboard (`/student/dashboard`) after signing in.

## Test User Setup

### 1. Create Test Student User

Run the following command to create a test student user in your database:

```bash
npm run create-test-user
```

This will create a test student with the following credentials:

- **Email**: student@ieee.org
- **Password**: student123
- **Role**: student

### 2. Test Admin User (Already Available)

There's already a test admin user available:

- **Email**: admin@ieee.org
- **Password**: admin123
- **Role**: admin

## Testing the Redirect Flow

### 1. Student Login Test

1. Navigate to `/login`
2. Enter the student credentials:
   - Email: `student@ieee.org`
   - Password: `student123`
3. Click "Sign In"
4. You should be automatically redirected to `/student/dashboard`

### 2. Admin Login Test

1. Navigate to `/login`
2. Enter the admin credentials:
   - Email: `admin@ieee.org`
   - Password: `admin123`
3. Click "Sign In"
4. You should be automatically redirected to `/admin/dashboard`

## Student Dashboard Features

The student dashboard includes:

### Dashboard Statistics

- Events Attended
- Certificates Earned
- Projects Completed
- Achievements

### Quick Actions

- **View Events**: Browse upcoming IEEE events and workshops
- **My Certificates**: Access earned certificates and achievements
- **Profile Settings**: Update profile and preferences

### Recent Activities

- Shows recent events, certificates, and projects
- Displays completion status

### Upcoming Events Preview

- Shows upcoming events with dates and descriptions
- Link to view all events

## Technical Implementation

### Login Flow

1. User submits login form
2. API validates credentials using bcrypt
3. If successful, user role is checked
4. Redirect based on role:
   - `student` → `/student/dashboard`
   - `admin` → `/admin/dashboard`
   - Other → `/dashboard`

### Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- HTTP-only cookies for token storage

### Database Schema

The User model includes:

- `role`: Enum with values ['student', 'admin', 'superadmin']
- `isVerified`: Boolean for account verification
- `studentId`: Unique student identifier
- Other profile fields (name, email, college, etc.)

## Troubleshooting

### Common Issues

1. **User not found**: Ensure the test user was created successfully
2. **Password mismatch**: Verify you're using the correct credentials
3. **Redirect not working**: Check browser console for errors
4. **Database connection**: Ensure MongoDB is running and accessible

### Debug Steps

1. Check browser console for any JavaScript errors
2. Verify API responses in Network tab
3. Check server logs for authentication errors
4. Ensure environment variables are set correctly

## Development Notes

- The student dashboard is fully responsive
- Uses Framer Motion for smooth animations
- Implements proper loading states
- Includes logout functionality
- Protected by authentication middleware
