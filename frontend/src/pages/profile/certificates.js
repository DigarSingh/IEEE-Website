import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDownload, FaCertificate, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!authLoading && !user) {
      router.replace('/login');
      return;
    }
    
    if (!authLoading && user) {
      fetchCertificates();
    }
  }, [user, authLoading, router]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
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
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setError(error.message || 'Failed to load certificates');
      
      // Use mock data for demonstration
      setCertificates([
        {
          _id: '1',
          name: 'IEEE Web Development Bootcamp',
          description: 'Successfully completed the web development workshop',
          issueDate: '2025-05-15',
          event: { title: 'Web Development Bootcamp', date: '2025-04-20' }
        },
        {
          _id: '2',
          name: 'IEEE Membership Certificate',
          description: 'Official membership certificate for IEEE student chapter',
          issueDate: '2025-01-10'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>My Certificates | IEEE Club</title>
      </Head>

      <div className="container px-6 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center px-3 py-2 mr-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
            </div>
          </div>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          {certificates.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 mt-8 bg-white rounded-lg shadow">
              <FaCertificate className="w-16 h-16 mb-4 text-gray-300" />
              <h2 className="text-xl font-medium text-gray-900">No Certificates Yet</h2>
              <p className="mt-2 text-gray-500">
                You haven't received any certificates yet. Participate in IEEE events to earn certificates.
              </p>
              <Link href="/events">
                <motion.button
                  className="px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Events
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {certificates.map((certificate) => (
                <motion.div
                  key={certificate._id}
                  className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
                  whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                          <FaCertificate className="w-6 h-6 text-blue-600" />
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
                        href={`http://localhost:5000/api/certificates/download/${certificate._id}`}
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
    </div>
  );
}
