import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaCertificate, 
  FaEdit, 
  FaDownload, 
  FaExternalLinkAlt,
  FaSpinner
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Student dashboard layout component
const StudentLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/student/dashboard', icon: FaUser },
    { name: 'Events', href: '/student/events', icon: FaCalendarAlt },
    { name: 'My Certificates', href: '/student/certificates', icon: FaCertificate },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              IEEE Club
            </Link>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-6 border-b">
                <div className="text-xl font-bold text-blue-600">IEEE Club</div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center p-4 mb-6 space-x-4 bg-blue-50 rounded-lg">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                    {user?.profilePhoto ? (
                      <img 
                        src={user.profilePhoto.startsWith('http') 
                          ? user.profilePhoto 
                          : `http://localhost:5000${user.profilePhoto}`} 
                        alt={user.name}
                        className="object-cover w-full h-full" 
                      />
                    ) : (
                      <FaUser className="absolute w-6 h-6 text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name || 'Student'}</p>
                    <p className="text-sm text-gray-500">{user?.email || 'student@example.com'}</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 ${
                        router.pathname === item.href ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-left text-red-700 rounded-md hover:bg-red-50"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="flex h-screen overflow-hidden">
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-1 h-0 bg-white border-r border-gray-200">
              <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center justify-center flex-shrink-0 px-4">
                  <Link href="/" className="text-xl font-bold text-blue-600">
                    IEEE Club
                  </Link>
                </div>
                <div className="flex flex-col items-center px-4 py-6 mt-6 mb-6 space-y-2 bg-blue-50 mx-4 rounded-lg">
                  <div className="relative w-16 h-16 overflow-hidden bg-gray-300 rounded-full">
                    {user?.profilePhoto ? (
                      <img 
                        src={user.profilePhoto.startsWith('http') 
                          ? user.profilePhoto 
                          : `http://localhost:5000${user.profilePhoto}`} 
                        alt={user.name}
                        className="object-cover w-full h-full" 
                      />
                    ) : (
                      <FaUser className="absolute w-8 h-8 text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{user?.name || 'Student'}</p>
                    <p className="text-sm text-gray-500">{user?.email || 'student@example.com'}</p>
                  </div>
                  <Link 
                    href="/profile/edit" 
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
                  >
                    <FaEdit className="w-3 h-3 mr-1" />
                    Edit Profile
                  </Link>
                </div>
                <nav className="flex-1 px-4 mt-5 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 ${
                        router.pathname === item.href ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-700 rounded-md hover:bg-red-50"
                >
                  <svg
                    className="w-5 h-5 mr-3 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

// Student dashboard page
export default function StudentDashboard() {
  const [studentData, setStudentData] = useState({
    events: [],
    certificates: [],
    profile: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!loading && !isAuthenticated) {
      router.replace('/login?redirect=student/dashboard');
      return;
    }
    
    // Redirect if user is not a student
    if (!loading && isAuthenticated && user && user.role !== 'student') {
      router.replace('/');
      return;
    }
    
    if (!loading && isAuthenticated && user && user.role === 'student') {
      fetchStudentData();
    }
  }, [user, isAuthenticated, loading, router, token]);

  // Fetch student data from the API
  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Fetch profile, events and certificates in parallel
      const [profileRes, eventsRes, certificatesRes] = await Promise.all([
        fetch(`${apiUrl}/api/members/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        fetch(`${apiUrl}/api/events/registered`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        fetch(`${apiUrl}/api/certificates/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ]);

      // Process profile data
      if (!profileRes.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const profileData = await profileRes.json();
      
      // Process events data
      let eventsData = [];
      if (eventsRes.ok) {
        const eventsResponse = await eventsRes.json();
        eventsData = eventsResponse.events || [];
      }
      
      // Process certificates data
      let certificatesData = [];
      if (certificatesRes.ok) {
        const certificatesResponse = await certificatesRes.json();
        certificatesData = certificatesResponse.certificates || [];
      }

      // Set all student data
      setStudentData({
        profile: profileData.user,
        events: eventsData,
        certificates: certificatesData,
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Use mock data for demonstration
      setStudentData({
        profile: user,
        events: [
          { id: '1', title: 'AI Workshop', date: '2025-08-15', location: 'Online', status: 'upcoming' },
          { id: '2', title: 'Web Development Bootcamp', date: '2025-07-20', location: 'GEU Campus', status: 'completed' }
        ],
        certificates: [
          { id: '1', name: 'Web Development Bootcamp Certificate', issueDate: '2025-06-25' }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (loading || isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-screen">
          <FaSpinner className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <Head>
        <title>Student Dashboard | IEEE Club</title>
      </Head>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'Student'}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Access your IEEE membership resources and information here
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Summary */}
          <div className="col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900">Profile Summary</h2>
              <div className="mt-4">
                <div className="text-sm text-gray-500">College</div>
                <div className="mt-1 font-medium text-gray-900">
                  {studentData.profile?.college || 'Not specified'}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">Branch</div>
                <div className="mt-1 font-medium text-gray-900">
                  {studentData.profile?.branch || 'Not specified'}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">Year</div>
                <div className="mt-1 font-medium text-gray-900">
                  {studentData.profile?.year ? `${studentData.profile.year}${getYearSuffix(studentData.profile.year)} Year` : 'Not specified'}
                </div>
              </div>
              <div className="mt-6">
                <Link href="/profile/edit">
                  <motion.button 
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900">Your Events</h2>
              <div className="mt-4 space-y-4">
                {studentData.events.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    You haven't registered for any events yet
                  </div>
                ) : (
                  studentData.events.slice(0, 3).map((event) => (
                    <div key={event.id} className="p-3 border border-gray-100 rounded-lg hover:bg-blue-50">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <Link href={`/events/${event.id}`}>
                          <span className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800">
                            Details <FaExternalLinkAlt className="w-2 h-2 ml-1" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 text-center">
                <Link href="/student/events">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200">
                    View All Events
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900">Your Certificates</h2>
              <div className="mt-4 space-y-4">
                {studentData.certificates.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    You don't have any certificates yet
                  </div>
                ) : (
                  studentData.certificates.slice(0, 3).map((certificate) => (
                    <div key={certificate.id} className="p-3 border border-gray-100 rounded-lg hover:bg-yellow-50">
                      <div className="flex items-center">
                        <FaCertificate className="w-5 h-5 mr-2 text-yellow-500" />
                        <div className="font-medium text-gray-900">{certificate.name}</div>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Issued: {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="mt-2 text-right">
                        <a
                          href={`http://localhost:5000/api/certificates/download/${certificate.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          <FaDownload className="w-3 h-3 mr-1" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 text-center">
                <Link href="/student/certificates">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200">
                    View All Certificates
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

// Helper function to get ordinal suffix for years
function getYearSuffix(year) {
  const num = parseInt(year);
  if (isNaN(num)) return '';
  
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
}
