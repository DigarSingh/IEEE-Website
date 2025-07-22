import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { 
  FaUsers, 
  FaCalendar, 
  FaCertificate, 
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaUserShield,
  FaArrowUp,
  FaEye,
  FaPlus,
  FaBell,
  FaDownload
} from "react-icons/fa";
import { useSmoothScroll, useIntersectionObserver, useParallax } from "../../hooks/useEnhancedScroll";
import "../../styles/admin-dashboard.css";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const router = useRouter();
  
  // Enhanced scroll hooks
  const { scrollY, scrollToTop } = useSmoothScroll();
  const { isVisible, observeElement } = useIntersectionObserver();
  const parallaxOffset = useParallax(0.3);

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

      // Fetch dashboard stats
      fetchStats();
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Set mock data for display
      setStats({
        totalMembers: 156,
        totalEvents: 12,
        totalCertificates: 89,
        newMessages: 7
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#080D14] via-[#0F1419] to-[#1a1f2e]">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4 absolute top-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-lg font-medium">Loading Admin Dashboard</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080D14] via-[#0F1419] to-[#1a1f2e] text-white relative overflow-x-hidden">
      <Head>
        <title>Admin Dashboard | IEEE Portal</title>
        <meta name="description" content="IEEE Admin Dashboard - Manage users, events, and portal" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Header with parallax effect */}
      <div 
        className="relative bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border-b border-gray-800/50 backdrop-blur-sm"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <FaUserShield className="text-white text-2xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 text-lg">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <FaBell className="text-gray-400 hover:text-blue-400 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-white font-medium">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Stats Cards with enhanced animations */}
        <div 
          id="stats-section"
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 ${
            isVisible['stats-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          ref={(el) => {
            if (el) observeElement(el);
          }}
        >
          {[
            { title: "Total Members", value: stats?.totalMembers || "156", icon: FaUsers, color: "blue", trend: "+12%" },
            { title: "Active Events", value: stats?.totalEvents || "12", icon: FaCalendar, color: "green", trend: "+3%" },
            { title: "Certificates", value: stats?.totalCertificates || "89", icon: FaCertificate, color: "purple", trend: "+28%" },
            { title: "New Messages", value: stats?.newMessages || "7", icon: FaEnvelope, color: "yellow", trend: "+5%" }
          ].map((stat, index) => (
            <div
              key={stat.title}
              className={`group relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-500 hover:shadow-2xl hover:shadow-${stat.color}-500/10 hover:scale-105 hover:-translate-y-2`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center shadow-lg shadow-${stat.color}-500/25 group-hover:shadow-${stat.color}-500/40 transition-all duration-300`}>
                  <stat.icon className="text-white text-xl" />
                </div>
                <div className={`text-${stat.color}-400 text-sm font-medium bg-${stat.color}-500/10 px-2 py-1 rounded-lg`}>
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white group-hover:text-gray-100 transition-colors">
                  {stat.value}
                </p>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions with enhanced design */}
        <div 
          id="actions-section"
          className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible['actions-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          ref={(el) => {
            if (el) observeElement(el);
          }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Manage Members", 
                description: "View and manage all IEEE members",
                icon: FaUsers, 
                color: "blue",
                href: "/admin/members"
              },
              { 
                title: "Event Management", 
                description: "Create and manage IEEE events",
                icon: FaCalendar, 
                color: "green",
                href: "/admin/events"
              },
              { 
                title: "Generate Certificates", 
                description: "Create and distribute certificates",
                icon: FaCertificate, 
                color: "purple",
                href: "/admin/certificates"
              },
              { 
                title: "Analytics Dashboard", 
                description: "View detailed analytics and reports",
                icon: FaChartLine, 
                color: "orange",
                href: "/admin/analytics"
              },
              { 
                title: "System Settings", 
                description: "Configure system preferences",
                icon: FaCog, 
                color: "gray",
                href: "/admin/settings"
              },
              { 
                title: "Export Data", 
                description: "Download reports and data exports",
                icon: FaDownload, 
                color: "indigo",
                href: "/admin/exports"
              }
            ].map((action, index) => (
              <Link 
                key={action.title}
                href={action.href}
                className={`group relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-500 hover:shadow-2xl hover:shadow-${action.color}-500/10 hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center shadow-lg shadow-${action.color}-500/25 group-hover:shadow-${action.color}-500/40 transition-all duration-300 group-hover:scale-110`}>
                    <action.icon className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {action.description}
                    </p>
                  </div>
                  <FaArrowUp className="text-gray-600 group-hover:text-gray-400 transition-all duration-300 transform group-hover:rotate-45 group-hover:scale-110" />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br from-${action.color}-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div 
          id="activity-section"
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 transition-all duration-1000 delay-500 ${
            isVisible['activity-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          ref={(el) => {
            if (el) observeElement(el);
          }}
        >
          {/* Recent Members */}
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Members</h3>
              <Link href="/admin/members" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center space-x-1">
                <span>View All</span>
                <FaEye className="text-xs" />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "John Doe", email: "john@example.com", joined: "2 hours ago", status: "verified" },
                { name: "Jane Smith", email: "jane@example.com", joined: "5 hours ago", status: "pending" },
                { name: "Mike Johnson", email: "mike@example.com", joined: "1 day ago", status: "verified" }
              ].map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800/30 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-gray-400 text-sm">{member.email}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-2 py-1 rounded-lg text-xs ${
                      member.status === 'verified' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {member.status}
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{member.joined}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">System Overview</h3>
            <div className="space-y-6">
              {[
                { label: "Server Status", value: "Online", color: "green", percentage: 99 },
                { label: "Database Health", value: "Excellent", color: "blue", percentage: 95 },
                { label: "Storage Usage", value: "68%", color: "yellow", percentage: 68 },
                { label: "Active Sessions", value: "24", color: "purple", percentage: 80 }
              ].map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{metric.label}</span>
                    <span className={`text-${metric.color}-400 font-medium`}>{metric.value}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 z-50"
        >
          <FaArrowUp className="text-white" />
        </button>
      )}
    </div>
  );
}
