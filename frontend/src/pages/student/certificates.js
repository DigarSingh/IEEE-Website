import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaDownload, FaCertificate, FaSpinner, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function StudentCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!authLoading && !isAuthenticated) {
      router.replace('/login?redirect=student/certificates');
      return;
    }
    
    // Redirect if user is not a student
    if (!authLoading && isAuthenticated && user && user.role !== 'student') {
      router.replace('/');
      return;
    }
    
    if (!authLoading && isAuthenticated && user && user.role === 'student') {
      fetchCertificates();
    }
  }, [user, isAuthenticated, authLoading, router, token]);

  useEffect(() => {
    if (certificates.length > 0) {
      const filtered = certificates.filter(cert => 
        cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cert.description && cert.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cert.event && cert.event.title && cert.event.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCertificates(filtered);
    }
  }, [searchTerm, certificates]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/certificates/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }
      
      const data = await response.json();
      setCertificates(data.certificates || []);
      setFilteredCertificates(data.certificates || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setError(error.message || 'Failed to load certificates');
      
      // Use mock data for demonstration
      const mockCertificates = [
        {
          id: '1',
          name: 'IEEE Web Development Bootcamp',
          description: 'Successfully completed the web development workshop',
          issueDate: '2025-05-15',
          event: { title: 'Web Development Bootcamp', date: '2025-04-20' }
        },
        {
          id: '2',
          name: 'IEEE Membership Certificate',
          description: 'Official membership certificate for IEEE student chapter',
          issueDate: '2025-01-10'
        },
        {
          id: '3',
          name: 'Robotics Workshop Participation',
          description: 'Successfully participated in the robotics workshop',
          issueDate: '2025-03-22',
          event: { title: 'Robotics Workshop', date: '2025-03-15' }
        }
      ];
      
      setCertificates(mockCertificates);
      setFilteredCertificates(mockCertificates);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>My Certificates | IEEE Club</title>
      </Head>

      <div className="container px-6 py-8 mx-auto">
        <div className="mb-6">
          <Link href="/student/dashboard">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              ← Back to Dashboard
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">My Certificates</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search certificates..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        {filteredCertificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow">
            <FaCertificate className="w-16 h-16 mb-4 text-gray-300" />
            <h2 className="text-xl font-medium text-gray-900">No Certificates Found</h2>
            <p className="mt-2 text-gray-500">
              {searchTerm 
                ? 'No certificates match your search criteria. Try a different search term.' 
                : 'You haven\'t received any certificates yet. Participate in IEEE events to earn certificates.'}
            </p>
            {!searchTerm && (
              <Link href="/student/events">
                <motion.button
                  className="px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Events
                </motion.button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
                        <FaCertificate className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{certificate.name}</h3>
                        {certificate.event && certificate.event.title && (
                          <p className="text-sm text-gray-500">
                            Event: {certificate.event.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {certificate.description && (
                    <p className="mt-4 text-gray-600">
                      {certificate.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Issued on: {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <a
                      href={`http://localhost:5000/api/certificates/download/${certificate.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
