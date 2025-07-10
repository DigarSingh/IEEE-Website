import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUsers, FaCalendarAlt, FaCertificate, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    members: { total: 0, verified: 0, unverified: 0 },
    events: { total: 0, upcoming: 0, ongoing: 0, completed: 0 },
    certificates: 0,
    messages: { unread: 0 }
  });
  const [recentMembers, setRecentMembers] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    if (!isLoading && isAuthenticated && user && (user.role !== 'admin' && user.role !== 'superadmin')) {
      router.push('/');
    }

    if (!isAuthenticated && !isLoading) {
      router.push('/login?redirect=admin/dashboard');
    }
  }, [user, isAuthenticated, isLoading, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (token) {
        try {
          setIsLoading(true);
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
          
          const response = await fetch(`${apiUrl}/api/admin/stats`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.success) {
            console.log('Dashboard data loaded:', data);
            setStats(data.stats);
            setRecentMembers(data.stats.recentMembers || []);
            setRecentEvents(data.stats.recentEvents || []);
          } else {
            throw new Error(data.message || 'Failed to load dashboard data');
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          // Show error message to user or use mock data for demonstration
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (token && (user?.role === 'admin' || user?.role === 'superadmin')) {
      fetchDashboardData();
    }
  }, [token, user]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <StatCard 
            title="Total Members" 
            value={stats.members.total} 
            icon={<FaUsers className="text-3xl text-blue-600" />} 
            detail={`${stats.members.verified} verified, ${stats.members.unverified} unverified`}
            bgColor="bg-gradient-to-r from-blue-50 to-blue-100"
            link="/admin/members"
          />
          <StatCard 
            title="Total Events" 
            value={stats.events.total} 
            icon={<FaCalendarAlt className="text-3xl text-green-600" />} 
            detail={`${stats.events.upcoming} upcoming, ${stats.events.ongoing} ongoing`}
            bgColor="bg-gradient-to-r from-green-50 to-green-100"
            link="/admin/events"
          />
          <StatCard 
            title="Certificates" 
            value={stats.certificates} 
            icon={<FaCertificate className="text-3xl text-yellow-600" />}
            bgColor="bg-gradient-to-r from-yellow-50 to-yellow-100"
            link="/admin/certificates"
          />
          <StatCard 
            title="Unread Messages" 
            value={stats.messages.unread} 
            icon={<FaEnvelope className="text-3xl text-purple-600" />}
            bgColor="bg-gradient-to-r from-purple-50 to-purple-100"
            link="/admin/messages"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Members */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Recent Members</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.map((member, index) => (
                    <tr key={member._id || index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{member.name}</td>
                      <td className="px-4 py-3">{member.email}</td>
                      <td className="px-4 py-3">{new Date(member.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {recentMembers.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <a 
                href="/admin/members" 
                className="inline-block px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                View All Members
              </a>
            </div>
          </div>

          {/* Recent Events */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Recent Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((event, index) => (
                    <tr key={event._id || index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{event.title}</td>
                      <td className="px-4 py-3">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                          ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                            event.status === 'ongoing' ? 'bg-green-100 text-green-800' : 
                            event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentEvents.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                        No events found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <a 
                href="/admin/events" 
                className="inline-block px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                View All Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
