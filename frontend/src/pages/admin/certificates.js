
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSpinner,
  FaDownload,
  FaCertificate,
  FaUser
} from "react-icons/fa";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
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

    fetchCertificates();
  }, [isAuthenticated, router, isAdmin]);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/certificates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCertificates(data.certificates);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setMessage({ type: "error", text: "Failed to load certificates" });
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (certificateId) => {
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/certificates/${certificateId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: "Certificate deleted successfully" });
        fetchCertificates(); // Refresh the list
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      setMessage({ type: "error", text: "Failed to delete certificate" });
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
            <p className="text-gray-400">Loading certificates...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Manage Certificates - IEEE Admin</title>
        <meta name="description" content="Manage IEEE certificates" />
      </Head>

      <div className="min-h-screen bg-[#080D14] text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Certificates</h1>
              <p className="text-blue-200">Create and manage IEEE certificates</p>
            </div>
            <Link
              href="/admin/certificates/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Certificate
            </Link>
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
              <h2 className="text-xl font-semibold mb-4">All Certificates</h2>
              
              {certificates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No certificates found</p>
                  <Link
                    href="/admin/certificates/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Create First Certificate
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Recipient</th>
                        <th className="text-left py-3 px-4">Event</th>
                        <th className="text-left py-3 px-4">Issued Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((certificate) => (
                        <tr key={certificate._id} className="border-b border-gray-700 hover:bg-gray-700">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaCertificate className="mr-2 text-yellow-400" />
                              <span className="font-medium">{certificate.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaUser className="mr-2 text-blue-400" />
                              {certificate.recipientName}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {certificate.eventName || 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            {formatDate(certificate.issuedDate)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              certificate.status === 'issued' ? 'bg-green-900 text-green-200' :
                              certificate.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                              'bg-gray-900 text-gray-200'
                            }`}>
                              {certificate.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Link
                                href={`/admin/certificates/${certificate._id}/edit`}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                                title="Edit"
                              >
                                <FaEdit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => deleteCertificate(certificate._id)}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                                title="Delete"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                              <Link
                                href={`/api/certificates/${certificate._id}/download`}
                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors"
                                title="Download"
                              >
                                <FaDownload className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/admin/certificates/${certificate._id}`}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded transition-colors"
                                title="View"
                              >
                                <FaEye className="w-4 h-4" />
                              </Link>
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
