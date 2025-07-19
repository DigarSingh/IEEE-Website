import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaCertificate,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaGraduationCap,
  FaUsers,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";
import Layout from "@/components/Layout";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Verify if user is actually a student
      if (parsedUser.role !== "student") {
        router.push("/login");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const dashboardStats = [
    {
      title: "Events Attended",
      value: "12",
      icon: <FaCalendar className="text-2xl text-blue-500" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Certificates Earned",
      value: "8",
      icon: <FaCertificate className="text-2xl text-green-500" />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Projects Completed",
      value: "5",
      icon: <FaLightbulb className="text-2xl text-yellow-500" />,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Achievements",
      value: "3",
      icon: <FaTrophy className="text-2xl text-purple-500" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "View Events",
      description: "Browse upcoming IEEE events and workshops",
      icon: <FaCalendar className="text-2xl" />,
      href: "/student/events",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "My Certificates",
      description: "Access your earned certificates and achievements",
      icon: <FaCertificate className="text-2xl" />,
      href: "/student/certificates",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Profile Settings",
      description: "Update your profile and preferences",
      icon: <FaUser className="text-2xl" />,
      href: "/profile",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const recentActivities = [
    {
      type: "Event",
      title: "Machine Learning Workshop",
      date: "2 days ago",
      status: "Completed",
    },
    {
      type: "Certificate",
      title: "AWS Cloud Practitioner",
      date: "1 week ago",
      status: "Earned",
    },
    {
      type: "Project",
      title: "IoT Smart Home System",
      date: "2 weeks ago",
      status: "Submitted",
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#080D14]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Student Dashboard | IEEE Club</title>
        <meta name="description" content="IEEE Student Portal Dashboard" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-gray-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Student Portal
                  </h1>
                  <p className="text-gray-400">Welcome back, {user?.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <FaBell className="text-xl" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <FaCog className="text-xl" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {dashboardStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={action.href}>
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 cursor-pointer h-full">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-4`}
                        >
                          {action.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {action.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Recent Activities
              </h2>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          activity.type === "Event"
                            ? "bg-blue-500"
                            : activity.type === "Certificate"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {activity.type.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {activity.title}
                        </p>
                        <p className="text-gray-400 text-sm">{activity.date}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "Completed" ||
                          activity.status === "Earned"
                            ? "bg-green-900 text-green-300"
                            : "bg-yellow-900 text-yellow-300"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Events Preview */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
              <Link href="/student/events">
                <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                  View All Events →
                </span>
              </Link>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaCalendar className="text-blue-400" />
                    <span className="text-sm text-gray-400">May 29, 2025</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    AWS Jam Skill Builder Program
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Hands-on cloud computing experience with AWS platform.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaCalendar className="text-blue-400" />
                    <span className="text-sm text-gray-400">June 15, 2025</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Cybersecurity Workshop
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Learn about network security and ethical hacking.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaCalendar className="text-blue-400" />
                    <span className="text-sm text-gray-400">June 30, 2025</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Drone Technology Seminar
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Explore the future of autonomous aerial vehicles.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
};
