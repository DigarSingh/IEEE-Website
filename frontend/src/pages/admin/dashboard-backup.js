
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendar,
  FaCertificate,
  FaEnvelope,
  FaChartLine,
  FaUserPlus,
  FaEye,
  FaSpinner,
  FaUserShield,
  FaTrendingUp,
  FaCog,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import Layout from "../../components/Layout";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      if (parsedUser.role !== "admin") {
        router.push("/login");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
      return;
    }

    setLoading(false);
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setMessage({ type: "error", text: "Failed to load dashboard statistics" });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#080D14]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-4"
            >
              <FaSpinner className="h-12 w-12 text-blue-500" />
            </motion.div>
            <p className="text-gray-400">Loading admin dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard | IEEE Portal</title>
        <meta name="description" content="IEEE Admin Dashboard - Manage users, events, and portal" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-gray-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUserShield className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400">Welcome back, {user?.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-white font-medium">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-900/50 border border-green-800 text-green-300"
                  : "bg-red-900/50 border border-red-800 text-red-300"
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {stats ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Members</p>
                      <p className="text-2xl font-bold text-white">{stats.totalMembers || 0}</p>
                      {stats.newUsersThisMonth > 0 && (
                        <div className="flex items-center text-green-400 text-sm mt-1">
                          <FaArrowUp className="mr-1" />
                          +{stats.newUsersThisMonth} this month
                        </div>
                      )}
                    </div>
                    <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-blue-400 text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Events</p>
                      <p className="text-2xl font-bold text-white">{stats.totalEvents || 0}</p>
                      {stats.newEventsThisMonth > 0 && (
                        <div className="flex items-center text-green-400 text-sm mt-1">
                          <FaArrowUp className="mr-1" />
                          +{stats.newEventsThisMonth} this month
                        </div>
                      )}
                    </div>
                    <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center">
                      <FaCalendar className="text-green-400 text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Certificates Issued</p>
                      <p className="text-2xl font-bold text-white">{stats.totalCertificates || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-900 rounded-lg flex items-center justify-center">
                      <FaCertificate className="text-yellow-400 text-xl" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Unread Messages</p>
                      <p className="text-2xl font-bold text-white">{stats.unreadMessages || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-red-400 text-xl" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/admin/members">
                      <button className="w-full flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <FaUsers className="mr-3" />
                        Manage Members
                      </button>
                    </Link>
                    <Link href="/admin/events">
                      <button className="w-full flex items-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <FaCalendar className="mr-3" />
                        Manage Events
                      </button>
                    </Link>
                    <Link href="/admin/certificates">
                      <button className="w-full flex items-center px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                        <FaCertificate className="mr-3" />
                        Issue Certificates
                      </button>
                    </Link>
                  </div>
                </motion.div>

                {/* Recent Members */}
                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Members</h3>
                  <div className="space-y-3">
                    {stats.recentMembers && stats.recentMembers.length > 0 ? (
                      stats.recentMembers.slice(0, 5).map((member, index) => (
                        <div key={member._id} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs text-white">
                            {member.name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{member.name}</p>
                            <p className="text-xs text-gray-400">{formatDate(member.createdAt)}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            member.role === 'admin' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'
                          }`}>
                            {member.role}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No recent members</p>
                    )}
                  </div>
                </motion.div>

                {/* Upcoming Events */}
                <motion.div
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    {stats.upcomingEvents && stats.upcomingEvents.length > 0 ? (
                      stats.upcomingEvents.slice(0, 5).map((event, index) => (
                        <div key={event._id} className="border-l-2 border-blue-500 pl-3">
                          <p className="text-sm text-white truncate">{event.title}</p>
                          <p className="text-xs text-gray-400">{formatDate(event.date)}</p>
                          <p className="text-xs text-blue-400">
                            {event.attendeesCount || 0} registered
                            {event.maxAttendees && ` / ${event.maxAttendees}`}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No upcoming events</p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* System Overview */}
              <motion.div
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">System Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaTrendingUp className="text-white text-2xl" />
                    </div>
                    <p className="text-white font-semibold">Growing Community</p>
                    <p className="text-sm text-gray-400">Active member engagement</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCalendar className="text-white text-2xl" />
                    </div>
                    <p className="text-white font-semibold">Event Management</p>
                    <p className="text-sm text-gray-400">Streamlined event processes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCertificate className="text-white text-2xl" />
                    </div>
                    <p className="text-white font-semibold">Digital Certificates</p>
                    <p className="text-sm text-gray-400">Automated certificate system</p>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <FaSpinner className="h-8 w-8 text-blue-500" />
              </motion.div>
              <p className="text-gray-400">Loading dashboard data...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
};
