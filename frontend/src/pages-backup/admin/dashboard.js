
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
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin()) {
      router.push("/login");
      return;
    }

    setLoading(false);
    fetchStats();
  }, [isAuthenticated, router, isAdmin]);

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
        <title>Admin Dashboard - IEEE</title>
        <meta name="description" content="IEEE Admin Dashboard" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-blue-200">Welcome back, {user?.name || 'Admin'}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto p-6">
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "error" ? "bg-red-900 text-red-200" : "bg-green-900 text-green-200"
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Members</p>
                  <p className="text-3xl font-bold">{stats?.totalMembers || 0}</p>
                </div>
                <FaUsers className="text-4xl text-blue-300" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Total Events</p>
                  <p className="text-3xl font-bold">{stats?.totalEvents || 0}</p>
                </div>
                <FaCalendar className="text-4xl text-green-300" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Certificates</p>
                  <p className="text-3xl font-bold">{stats?.totalCertificates || 0}</p>
                </div>
                <FaCertificate className="text-4xl text-purple-300" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Unread Messages</p>
                  <p className="text-3xl font-bold">{stats?.unreadMessages || 0}</p>
                </div>
                <FaEnvelope className="text-4xl text-orange-300" />
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaUserPlus className="mr-2 text-blue-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/admin/events" className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Manage Events
                </Link>
                <Link href="/admin/members" className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
                  View Members
                </Link>
                <Link href="/admin/certificates" className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Manage Certificates
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaChartLine className="mr-2 text-green-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">New Members</p>
                    <p className="text-sm text-gray-400">Last 7 days</p>
                  </div>
                  <FaArrowUp className="text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Events Created</p>
                    <p className="text-sm text-gray-400">Last 7 days</p>
                  </div>
                  <FaArrowUp className="text-green-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Members */}
          {stats?.recentMembers && stats.recentMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaUsers className="mr-2 text-blue-400" />
                Recent Members
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">College</th>
                      <th className="text-left py-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-700">
                        <td className="py-2">{member.name}</td>
                        <td className="py-2">{member.email}</td>
                        <td className="py-2">{member.college}</td>
                        <td className="py-2">{formatDate(member.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
}
