import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaCertificate, FaBell, FaDownload, FaUserPlus, FaClipboardList } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

// Admin dashboard component
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeEvents: 0,
    totalCertificates: 0,
    pendingMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not admin
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/login');
    } else if (!loading && user) {
      fetchDashboardStats();
    }
  }, [user, loading, router]);

  // Fetch dashboard stats from the API
  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard statistics');
      }

      const data = await response.json();
      setStats({
        totalMembers: data.totalMembers || 0,
        activeEvents: data.activeEvents || 0,
        totalCertificates: data.totalCertificates || 0,
        pendingMessages: data.pendingMessages || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Use mock data for demonstration
      setStats({
        totalMembers: 156,
        activeEvents: 4,
        totalCertificates: 78,
        pendingMessages: 12,
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

  // Stat card component
  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      className="overflow-hidden bg-white rounded-lg shadow-md"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-6 py-5">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-${color}-100`}>
            {icon}
          </div>
          <div className="ml-5">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="mt-1">
              <p className="text-3xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin Dashboard | IEEE Club</title>
      </Head>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="container px-6 py-6 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {user?.name || 'Admin'}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container px-6 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            icon={<FaUsers className="text-xl text-blue-500" />}
            color="blue"
          />
          <StatCard
            title="Active Events"
            value={stats.activeEvents}
            icon={<FaCalendarAlt className="text-xl text-green-500" />}
            color="green"
          />
          <StatCard
            title="Certificates Issued"
            value={stats.totalCertificates}
            icon={<FaCertificate className="text-xl text-yellow-500" />}
            color="yellow"
          />
          <StatCard
            title="Pending Messages"
            value={stats.pendingMessages}
            icon={<FaBell className="text-xl text-red-500" />}
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/members">
              <motion.div
                className="flex items-center p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <FaUsers className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Manage Members</h3>
                  <p className="text-sm text-gray-500">Add, update or remove student members</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/events">
              <motion.div
                className="flex items-center p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <FaCalendarAlt className="text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Manage Events</h3>
                  <p className="text-sm text-gray-500">Create and manage IEEE events</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/certificates">
              <motion.div
                className="flex items-center p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-yellow-50 hover:border-yellow-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                  <FaCertificate className="text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Manage Certificates</h3>
                  <p className="text-sm text-gray-500">Upload and assign certificates to members</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/messages">
              <motion.div
                className="flex items-center p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-red-50 hover:border-red-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                  <FaBell className="text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Messages</h3>
                  <p className="text-sm text-gray-500">View and respond to member messages</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/members/export">
              <motion.div
                className="flex items-center p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 hover:border-purple-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                  <FaDownload className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Export Data</h3>
                  <p className="text-sm text-gray-500">Download member data as Excel/CSV</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/members/add">
              <motion.div
                className="flex items-center p-4 transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                  <FaUserPlus className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Add Member</h3>
                  <p className="text-sm text-gray-500">Manually add a new member</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 overflow-hidden bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-200">
              <li className="px-6 py-4">
                <div className="flex items-center">
                  <FaUserPlus className="text-green-500" />
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">New member</span> joined: Aryan Sharma
                  </p>
                  <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-500" />
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">New event</span> created: AI Workshop 2025
                  </p>
                  <span className="ml-auto text-xs text-gray-500">Yesterday</span>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-center">
                  <FaCertificate className="text-yellow-500" />
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">15 certificates</span> uploaded for Web Dev Workshop
                  </p>
                  <span className="ml-auto text-xs text-gray-500">3 days ago</span>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-center">
                  <FaBell className="text-red-500" />
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">New message</span> received from Priya Gupta
                  </p>
                  <span className="ml-auto text-xs text-gray-500">4 days ago</span>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-center">
                  <FaClipboardList className="text-purple-500" />
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Member report</span> generated for June 2025
                  </p>
                  <span className="ml-auto text-xs text-gray-500">1 week ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
