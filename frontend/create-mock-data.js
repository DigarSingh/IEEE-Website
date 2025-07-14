// This script creates mock data for build-time static generation
// Run it before the build to create mock data for authenticated pages

const fs = require('fs');
const path = require('path');

console.log('Creating mock data for build-time static generation...');

// Create mock data directory
const mockDataDir = path.join(__dirname, 'src', 'mock-data');
if (!fs.existsSync(mockDataDir)) {
  fs.mkdirSync(mockDataDir, { recursive: true });
}

// Mock user data
const mockUser = {
  _id: 'mock-user-id',
  name: 'Mock User',
  email: 'mock@example.com',
  role: 'user',
  profileImage: '/images/testimonials/member1.jpg',
  membershipType: 'student',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Mock admin user data
const mockAdmin = {
  _id: 'mock-admin-id',
  name: 'Mock Admin',
  email: 'admin@example.com',
  role: 'admin',
  profileImage: '/images/testimonials/member2.jpg',
  membershipType: 'faculty',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Mock events data
const mockEvents = [
  {
    _id: 'event-1',
    title: 'AI Workshop',
    description: 'Learn about artificial intelligence and machine learning fundamentals',
    date: new Date().toISOString(),
    location: 'Online',
    image: '/images/events/ai-workshop.jpg',
    category: 'workshop',
    isRegistrationOpen: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'event-2',
    title: 'Web Development Bootcamp',
    description: 'Master modern web development technologies',
    date: new Date().toISOString(),
    location: 'Room 101',
    image: '/images/events/webdev.jpg',
    category: 'bootcamp',
    isRegistrationOpen: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock certificates data
const mockCertificates = [
  {
    _id: 'cert-1',
    title: 'Web Development Participation',
    user: 'mock-user-id',
    event: 'Web Development Bootcamp',
    issueDate: new Date().toISOString(),
    certificateUrl: '/uploads/certificates/mock-certificate.pdf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock statistics for admin dashboard
const mockStats = {
  totalUsers: 150,
  totalEvents: 12,
  totalCertificates: 87,
  recentUsers: 24,
  recentEvents: 3
};

// Write mock data files
fs.writeFileSync(
  path.join(mockDataDir, 'user.json'),
  JSON.stringify(mockUser, null, 2)
);

fs.writeFileSync(
  path.join(mockDataDir, 'admin.json'),
  JSON.stringify(mockAdmin, null, 2)
);

fs.writeFileSync(
  path.join(mockDataDir, 'events.json'),
  JSON.stringify(mockEvents, null, 2)
);

fs.writeFileSync(
  path.join(mockDataDir, 'certificates.json'),
  JSON.stringify(mockCertificates, null, 2)
);

fs.writeFileSync(
  path.join(mockDataDir, 'stats.json'),
  JSON.stringify(mockStats, null, 2)
);

console.log('Mock data created successfully!');
