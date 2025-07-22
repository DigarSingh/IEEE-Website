import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AdminDashboardSimple() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080D14]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D14] text-white">
      <Head>
        <title>Admin Dashboard | IEEE Portal</title>
        <meta name="description" content="IEEE Admin Dashboard - Manage users, events, and portal" />
      </Head>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome back, {user?.name}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Members</h3>
            <p className="text-2xl font-bold text-blue-400">Loading...</p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Events</h3>
            <p className="text-2xl font-bold text-green-400">Loading...</p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Certificates</h3>
            <p className="text-2xl font-bold text-purple-400">Loading...</p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Messages</h3>
            <p className="text-2xl font-bold text-yellow-400">Loading...</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              View Members
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              Manage Events
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
              Generate Certificates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
