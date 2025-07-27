
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import Layout from "../../../components/Layout";
import { useAuth } from "../../../contexts/AuthContext";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin()) {
      router.push("/login");
      return;
    }

    fetchMembers();
  }, [isAuthenticated, router, isAdmin]);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMembers(data.members);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMessage({ type: "error", text: "Failed to load members" });
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (memberId) => {
    if (!confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/members/${memberId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: "Member deleted successfully" });
        fetchMembers(); // Refresh the list
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      setMessage({ type: "error", text: "Failed to delete member" });
    }
  };

  const toggleVerification = async (memberId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/members/${memberId}/verify`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVerified: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: `Member ${!currentStatus ? 'verified' : 'unverified'} successfully` });
        fetchMembers(); // Refresh the list
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error updating member verification:", error);
      setMessage({ type: "error", text: "Failed to update member verification" });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
            <p className="text-gray-400">Loading members...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Manage Members - IEEE Admin</title>
        <meta name="description" content="Manage IEEE members" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Manage Members</h1>
            <p className="text-blue-200">View and manage IEEE student members</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "error" ? "bg-red-900 text-red-200" : "bg-green-900 text-green-200"
            }`}>
              {message.text}
            </div>
          )}

          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">All Members ({members.length})</h2>
              
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No members found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">College</th>
                        <th className="text-left py-3 px-4">Student ID</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member._id} className="border-b border-gray-700 hover:bg-gray-700">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaUser className="mr-2 text-blue-400" />
                              <span className="font-medium">{member.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaEnvelope className="mr-2 text-green-400" />
                              {member.email}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaGraduationCap className="mr-2 text-purple-400" />
                              {member.college}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {member.studentId}
                          </td>
                          <td className="py-3 px-4">
                            {formatDate(member.createdAt)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              member.isVerified ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                            }`}>
                              {member.isVerified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Link
                                href={`/admin/members/${member._id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                                title="View Details"
                              >
                                <FaEye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => toggleVerification(member._id, member.isVerified)}
                                className={`p-2 rounded transition-colors ${
                                  member.isVerified 
                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                                title={member.isVerified ? 'Unverify' : 'Verify'}
                              >
                                {member.isVerified ? <FaTimesCircle className="w-4 h-4" /> : <FaCheckCircle className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => deleteMember(member._id)}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                                title="Delete"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
}
