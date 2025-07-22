
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaSpinner,
  FaArrowLeft,
  FaUserShield,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaPlus
} from "react-icons/fa";
import Layout from "@/components/Layout";

export default function AdminMembersPage() {
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "student", label: "Students" },
    { value: "admin", label: "Admins" }
  ];

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

  useEffect(() => {
    if (!loading) {
      fetchMembers();
    }
  }, [loading, selectedRole, searchTerm, currentPage]);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        role: selectedRole,
        page: currentPage.toString(),
        limit: "10"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/admin/members?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMembers(data.data.members);
        setPagination(data.data.pagination);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMessage({ type: "error", text: "Failed to load members" });
    } finally {
      setLoadingMembers(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-900 text-red-300';
      case 'student': return 'bg-blue-900 text-blue-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-900 text-green-300';
      case 'pending': return 'bg-yellow-900 text-yellow-300';
      case 'suspended': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
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
        <title>Manage Members | IEEE Admin Portal</title>
        <meta name="description" content="Manage IEEE members and users" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-gray-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <FaArrowLeft className="text-xl" />
                  </button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">Manage Members</h1>
                  <p className="text-gray-400">View and manage all IEEE members</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{pagination?.totalMembers || 0}</p>
                  <p className="text-sm text-gray-400">Total Members</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUsers className="text-white text-xl" />
                </div>
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

          {/* Filters */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Role Filter */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRole("all");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Members Table */}
          {loadingMembers ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <FaSpinner className="h-8 w-8 text-blue-500" />
              </motion.div>
              <p className="text-gray-400">Loading members...</p>
            </div>
          ) : members.length > 0 ? (
            <>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          College
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {members.map((member, index) => (
                        <motion.tr
                          key={member._id}
                          className="hover:bg-gray-800/50 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                {member.name?.charAt(0) || 'U'}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white">{member.name}</div>
                                <div className="text-sm text-gray-400">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                              {member.role === 'admin' ? <FaUserShield className="mr-1" /> : <FaUser className="mr-1" />}
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {member.college}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.membershipStatus)}`}>
                              {member.membershipStatus || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDate(member.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <FaEye />
                              </button>
                              <button className="text-green-400 hover:text-green-300">
                                <FaEdit />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft className="mr-2" />
                    Previous
                  </button>

                  <span className="text-gray-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className="flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <FaUsers className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No members found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedRole !== "all" 
                  ? "No members match your current filters."
                  : "No members have been registered yet."}
              </p>
              {(searchTerm || selectedRole !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedRole("all");
                    setCurrentPage(1);
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
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
