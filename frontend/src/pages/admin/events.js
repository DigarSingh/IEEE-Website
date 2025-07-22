import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaSpinner,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Layout from "@/components/Layout";

export default function AdminEventsPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const statusOptions = [
    { value: "all", label: "All Events" },
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" }
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
      fetchEvents();
    }
  }, [loading, selectedStatus, searchTerm, currentPage]);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        status: selectedStatus,
        page: currentPage.toString(),
        limit: "10"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/admin/events?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setEvents(data.data.events);
        setPagination(data.data.pagination);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setMessage({ type: "error", text: "Failed to load events" });
    } finally {
      setLoadingEvents(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-900 text-blue-300';
      case 'ongoing': return 'bg-green-900 text-green-300';
      case 'completed': return 'bg-gray-900 text-gray-300';
      case 'canceled': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop': return 'bg-blue-900 text-blue-300';
      case 'Webinar': return 'bg-green-900 text-green-300';
      case 'Conference': return 'bg-purple-900 text-purple-300';
      case 'Competition': return 'bg-red-900 text-red-300';
      case 'Social': return 'bg-yellow-900 text-yellow-300';
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
            <p className="text-gray-400">Loading events...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Manage Events | IEEE Admin Portal</title>
        <meta name="description" content="Manage IEEE events and activities" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-gray-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <FaArrowLeft className="text-xl" />
                  </button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">Manage Events</h1>
                  <p className="text-gray-400">Create and manage IEEE events</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <FaPlus className="mr-2" />
                  Create Event
                </button>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{pagination?.totalEvents || 0}</p>
                  <p className="text-sm text-gray-400">Total Events</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FaCalendar className="text-white text-xl" />
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
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("all");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Events Table */}
          {loadingEvents ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <FaSpinner className="h-8 w-8 text-green-500" />
              </motion.div>
              <p className="text-gray-400">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Attendees
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {events.map((event, index) => (
                        <motion.tr
                          key={event._id}
                          className="hover:bg-gray-800/50 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <FaCalendar className="text-white" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white">{event.title}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                                    {event.category}
                                  </span>
                                  <div className="flex items-center text-xs text-gray-400">
                                    <FaMapMarkerAlt className="mr-1" />
                                    {event.isVirtual ? "Virtual" : event.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{formatDate(event.date)}</div>
                            <div className="text-sm text-gray-400 flex items-center">
                              <FaClock className="mr-1" />
                              {formatTime(event.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-300">
                              <FaUsers className="mr-2" />
                              <span className="text-white font-medium">{event.attendeesCount || 0}</span>
                              {event.maxAttendees && (
                                <span className="text-gray-400">/ {event.maxAttendees}</span>
                              )}
                            </div>
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
              <FaCalendar className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedStatus !== "all" 
                  ? "No events match your current filters."
                  : "No events have been created yet."}
              </p>
              <div className="flex justify-center space-x-4">
                {(searchTerm || selectedStatus !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedStatus("all");
                      setCurrentPage(1);
                    }}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
                <button className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <FaPlus className="mr-2" />
                  Create Event
                </button>
              </div>
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
