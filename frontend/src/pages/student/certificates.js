
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCertificate,
  FaDownload,
  FaEye,
  FaSearch,
  FaSpinner,
  FaArrowLeft,
  FaCalendar,
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt
} from "react-icons/fa";
import Layout from "@/components/Layout";

export default function StudentCertificatesPage() {
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
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
      fetchCertificates();
    }
  }, [loading, searchTerm, currentPage]);

  const fetchCertificates = async () => {
    setLoadingCertificates(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/student/certificates?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCertificates(data.data.certificates);
        setPagination(data.data.pagination);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setMessage({ type: "error", text: "Failed to load certificates" });
    } finally {
      setLoadingCertificates(false);
    }
  };

  const handleDownload = async (certificate) => {
    try {
      // Create a temporary link to download the certificate
      const link = document.createElement('a');
      link.href = certificate.filePath;
      link.download = `${certificate.name}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      setMessage({ type: "error", text: "Failed to download certificate" });
    }
  };

  const handleView = (certificate) => {
    // Open certificate in new tab
    window.open(certificate.filePath, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
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
            <p className="text-gray-400">Loading certificates...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>My Certificates | IEEE Student Portal</title>
        <meta name="description" content="View and download your IEEE certificates" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-gray-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/student/dashboard">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <FaArrowLeft className="text-xl" />
                  </button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">My Certificates</h1>
                  <p className="text-gray-400">View and download your earned certificates</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{pagination?.totalCertificates || 0}</p>
                  <p className="text-sm text-gray-400">Total Certificates</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-white text-xl" />
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

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Certificates Grid */}
          {loadingCertificates ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <FaSpinner className="h-8 w-8 text-blue-500" />
              </motion.div>
              <p className="text-gray-400">Loading certificates...</p>
            </div>
          ) : certificates.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate._id}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Certificate Preview */}
                    <div className="h-48 bg-gradient-to-br from-green-600 to-blue-600 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaCertificate className="text-6xl text-white opacity-20" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg line-clamp-2">
                          {certificate.name}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300">
                          Earned
                        </span>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="p-4">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <FaCalendar className="mr-2" />
                          Issued on {formatDate(certificate.issueDate)}
                        </div>
                        {certificate.event && (
                          <div className="flex items-center text-sm text-gray-400">
                            <FaFileAlt className="mr-2" />
                            {certificate.event.title}
                          </div>
                        )}
                        {certificate.description && (
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {certificate.description}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(certificate)}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <FaEye className="mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(certificate)}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <FaDownload className="mr-1" />
                          Download
                        </button>
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
              <FaCertificate className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No certificates yet</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm 
                  ? "No certificates match your search. Try a different term."
                  : "Participate in events to earn certificates and showcase your achievements."}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              ) : (
                <Link href="/student/events">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Browse Events
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* Achievement Summary */}
          {certificates.length > 0 && (
            <motion.div
              className="mt-12 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-gray-800 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center">
                <FaTrophy className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Achievement Unlocked!</h3>
                <p className="text-gray-400">
                  You've earned {pagination?.totalCertificates || certificates.length} certificate{certificates.length !== 1 ? 's' : ''}. 
                  Keep participating in events to earn more achievements!
                </p>
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
};
