import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaCertificate, FaEnvelope, FaEdit, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState({
    events: [],
    certificates: [],
    profile: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!loading && !user) {
      router.replace('/login');
    } else if (!loading && user) {
      fetchStudentData();
    }
  }, [user, loading, router]);

  // Fetch student data from the API
  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
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
      const profileData = await profileRes.json();
      if (!profileRes.ok) throw new Error(profileData.message || 'Failed to fetch profile');
      
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
          { id: '2', title: 'Web Development Bootcamp', date: '2025-07-20', location: 'GEU Campus', status: 'completed' },
          { id: '3', title: 'IEEE Annual Conference', date: '2025-09-10', location: 'Convention Center', status: 'upcoming' }
        ],
        certificates: [
          { id: '1', title: 'Web Development Bootcamp Completion', issueDate: '2025-06-25', downloadUrl: '#' },
          { id: '2', title: 'IEEE Membership Certificate', issueDate: '2025-05-10', downloadUrl: '#' }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Student Dashboard | IEEE Club</title>
      </Head>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="container px-6 py-6 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {user?.name || 'Student'}
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container px-6 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Profile Summary</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-blue-100 rounded-full">
                    {studentData.profile?.profilePhoto ? (
                      <img 
                        src={studentData.profile.profilePhoto.startsWith('http') 
                          ? studentData.profile.profilePhoto
                          : `http://localhost:5000${studentData.profile.profilePhoto}`
                        } 
                        alt={studentData.profile.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 text-blue-500" />
                    )}
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-medium text-gray-900">{studentData.profile?.name || 'Student Name'}</h4>
                    <p className="text-gray-500">{studentData.profile?.email || 'email@example.com'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">College</p>
                      <p className="mt-1 text-gray-900">{studentData.profile?.college || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Branch</p>
                      <p className="mt-1 text-gray-900">{studentData.profile?.branch || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year</p>
                      <p className="mt-1 text-gray-900">{studentData.profile?.year || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Student ID</p>
                      <p className="mt-1 text-gray-900">{studentData.profile?.studentId || 'Not specified'}</p>
                    </div>
                    {studentData.profile?.ieeeId && (
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500">IEEE ID</p>
                        <p className="mt-1 text-gray-900">{studentData.profile.ieeeId}</p>
                      </div>
                    )}
                  </div>

                  <Link href="/profile/edit">
                    <motion.button 
                      className="flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>                {/* Quick Actions */}
            <div className="mt-6 overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/profile/certificates">
                    <motion.button 
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaCertificate className="mr-2" />
                      View My Certificates
                    </motion.button>
                  </Link>
                  
                  <Link href="/contact">
                    <motion.button 
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaEnvelope className="mr-2" />
                      Contact Admin
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Events and Certificates */}
          <div className="lg:col-span-2">
            {/* Registered Events */}
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Your Events</h3>
              </div>
              
              {studentData.events.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <FaCalendarAlt className="w-12 h-12 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900">No Events</h3>
                  <p className="mt-1 text-gray-500">You haven't registered for any events yet.</p>
                  <Link href="/events">
                    <motion.button
                      className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Events
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Event</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentData.events.map((event) => (
                        <tr key={event.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{event.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              event.status === 'upcoming' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link href={`/events/${event.id}`}>
                              <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-900">Details</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Certificates */}
            <div className="mt-6 overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Your Certificates</h3>
              </div>
              
              {studentData.certificates.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <FaCertificate className="w-12 h-12 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900">No Certificates</h3>
                  <p className="mt-1 text-gray-500">You haven't received any certificates yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Certificate</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Issue Date</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentData.certificates.map((certificate) => (
                        <tr key={certificate.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{certificate.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a 
                              href={certificate.downloadUrl}
                              className="inline-flex items-center text-sm text-blue-600 cursor-pointer hover:text-blue-900"
                              download
                            >
                              <FaDownload className="mr-1" /> Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Upcoming IEEE Events */}
            <div className="mt-6 overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Upcoming IEEE Events</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 transition-colors border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200">
                    <h4 className="font-medium text-gray-900">AI Workshop 2025</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <FaCalendarAlt className="mr-1" /> Aug 15, 2025
                      </span>
                      <span className="inline-flex items-center ml-4">
                        <FaUser className="mr-1" /> 45 participants registered
                      </span>
                    </p>
                    <div className="flex mt-2">
                      <Link href="/events/ai-workshop">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                          View Details <FaExternalLinkAlt className="ml-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 transition-colors border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200">
                    <h4 className="font-medium text-gray-900">IEEE Annual Conference</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <FaCalendarAlt className="mr-1" /> Sep 10, 2025
                      </span>
                      <span className="inline-flex items-center ml-4">
                        <FaUser className="mr-1" /> 78 participants registered
                      </span>
                    </p>
                    <div className="flex mt-2">
                      <Link href="/events/annual-conference">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                          View Details <FaExternalLinkAlt className="ml-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <Link href="/events">
                      <motion.button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View All Events
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
