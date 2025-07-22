
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaEye,
  FaUserCheck,
  FaUserTimes,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Layout from "@/components/Layout";

export default function StudentEventsPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [registering, setRegistering] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Workshop", label: "Workshop" },
    { value: "Webinar", label: "Webinar" },
    { value: "Conference", label: "Conference" },
    { value: "Competition", label: "Competition" },
    { value: "Social", label: "Social" },
    { value: "Other", label: "Other" }
  ];

  const statusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "all", label: "All Events" }
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

  useEffect(() => {
    if (!loading) {
      fetchEvents();
    }
  }, [loading, selectedCategory, selectedStatus, searchTerm, currentPage]);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        category: selectedCategory,
        status: selectedStatus,
        page: currentPage.toString(),
        limit: "9"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/student/events?${params}`, {
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

  const handleRegister = async (eventId, isRegistered) => {
    setRegistering(eventId);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/events/register", {
        method: isRegistered ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ 
          type: "success", 
          text: isRegistered ? "Successfully unregistered from event" : "Successfully registered for event"
        });
        // Refresh events to update registration status
        fetchEvents();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error with registration:", error);
      setMessage({ type: "error", text: "Failed to update registration" });
    } finally {
      setRegistering(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
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
              <FaSpinner className="w-12 h-12 text-blue-500" />
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
        <title>Events | IEEE Student Portal</title>
        <meta name="description" content="Browse and register for IEEE events" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-gray-300">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="container px-6 py-6 mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/student/dashboard">
                  <button className="p-2 text-gray-400 transition-colors hover:text-white">
                    <FaArrowLeft className="text-xl" />
                  </button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">Events</h1>
                  <p className="text-gray-400">Discover and join IEEE events</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-6 py-8 mx-auto">
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
          <div className="p-6 mb-8 border border-gray-800 rounded-lg bg-gray-900/50">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  setSelectedCategory("all");
                  setSelectedStatus("upcoming");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {loadingEvents ? (
            <div className="py-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <FaSpinner className="w-8 h-8 text-blue-500" />
              </motion.div>
              <p className="text-gray-400">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                  <motion.div
                    key={event._id}
                    className="overflow-hidden transition-all duration-300 border border-gray-800 rounded-lg bg-gray-900/50 hover:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Event Image */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                      {event.image && event.image !== 'default-event.jpg' ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <FaCalendar className="text-4xl text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-white line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="mb-4 text-sm text-gray-400 line-clamp-3">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <FaCalendar className="mr-2" />
                          {formatDate(event.date)} at {formatTime(event.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <FaMapMarkerAlt className="mr-2" />
                          {event.isVirtual ? "Virtual Event" : event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <FaUsers className="mr-2" />
                          {event.attendeesCount} registered
                          {event.maxAttendees && ` / ${event.maxAttendees} max`}
                        </div>
                      </div>

                      {/* Registration Status */}
                      <div className="flex items-center justify-between">
                        {event.isRegistered ? (
                          <span className="flex items-center text-sm text-green-400">
                            <FaCheck className="mr-1" />
                            Registered
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">Not registered</span>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          {event.status === 'upcoming' && (
                            <button
                              onClick={() => handleRegister(event._id, event.isRegistered)}
                              disabled={registering === event._id}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                event.isRegistered
                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                  : "bg-blue-600 hover:bg-blue-700 text-white"
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {registering === event._id ? (
                                <FaSpinner className="animate-spin" />
                              ) : event.isRegistered ? (
                                <>
                                  <FaUserTimes className="mr-1" />
                                  Unregister
                                </>
                              ) : (
                                <>
                                  <FaUserCheck className="mr-1" />
                                  Register
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="flex items-center px-4 py-2 text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="flex items-center px-4 py-2 text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <FaCalendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="mb-2 text-xl font-semibold text-white">No events found</h3>
              <p className="mb-6 text-gray-400">
                Try adjusting your filters or check back later for new events.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedStatus("upcoming");
                  setCurrentPage(1);
                }}
                className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
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
