import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaUpload, FaTrash, FaSpinner, FaFilePdf, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    userId: '',
    eventId: '',
  });
  const [file, setFile] = useState(null);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not admin
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.replace('/login');
      return;
    }
    
    if (!authLoading && user && user.role === 'admin') {
      fetchData();
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      // Fetch certificates, users, and events in parallel
      const [certificatesRes, usersRes, eventsRes] = await Promise.all([
        fetch(`${apiUrl}/api/certificates`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${apiUrl}/api/members`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${apiUrl}/api/events`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      // Process certificates
      if (!certificatesRes.ok) throw new Error('Failed to fetch certificates');
      const certificatesData = await certificatesRes.json();
      setCertificates(certificatesData.certificates || []);
      
      // Process users
      if (!usersRes.ok) throw new Error('Failed to fetch users');
      const usersData = await usersRes.json();
      setUsers(usersData.members || []);
      
      // Process events
      if (!eventsRes.ok) throw new Error('Failed to fetch events');
      const eventsData = await eventsRes.json();
      setEvents(eventsData.events || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
      
      // Use mock data for demonstration
      setCertificates([
        { 
          _id: '1', 
          name: 'Certificate of Completion', 
          description: 'Web Development Workshop',
          issueDate: '2025-04-15',
          issuedTo: { name: 'John Doe', email: 'john@example.com' },
          event: { title: 'Web Dev Bootcamp' }
        },
        { 
          _id: '2', 
          name: 'Certificate of Merit', 
          description: 'Outstanding performance in IEEE hackathon',
          issueDate: '2025-03-22',
          issuedTo: { name: 'Jane Smith', email: 'jane@example.com' },
          event: { title: 'IEEE Hackathon 2025' }
        }
      ]);
      
      setUsers([
        { _id: '1', name: 'John Doe', email: 'john@example.com' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { _id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
      ]);
      
      setEvents([
        { _id: '1', title: 'Web Dev Bootcamp' },
        { _id: '2', title: 'IEEE Hackathon 2025' },
        { _id: '3', title: 'AI Workshop' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Check if file is PDF
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      setError('Certificate name is required');
      return;
    }
    
    if (!formData.userId) {
      setError('Please select a student');
      return;
    }
    
    if (!file) {
      setError('Please upload a certificate file (PDF)');
      return;
    }
    
    try {
      setUploading(true);
      setError('');
      setSuccessMsg('');
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      // Create form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('userId', formData.userId);
      if (formData.eventId) {
        formDataToSend.append('eventId', formData.eventId);
      }
      formDataToSend.append('certificate', file);
      
      // Send request
      const response = await fetch(`${apiUrl}/api/certificates/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload certificate');
      }
      
      // Clear form and show success message
      setFormData({
        name: '',
        description: '',
        userId: '',
        eventId: '',
      });
      setFile(null);
      document.getElementById('certificateFile').value = '';
      
      setSuccessMsg('Certificate uploaded successfully');
      
      // Refresh certificates list
      fetchData();
    } catch (err) {
      console.error('Error uploading certificate:', err);
      setError(err.message || 'Failed to upload certificate');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      return;
    }
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/api/certificates/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete certificate');
      }
      
      // Update certificates list
      setCertificates(prev => prev.filter(cert => cert._id !== id));
      setSuccessMsg('Certificate deleted successfully');
    } catch (err) {
      console.error('Error deleting certificate:', err);
      setError(err.message || 'Failed to delete certificate');
    }
  };

  // Filter certificates based on search term
  const filteredCertificates = certificates.filter(cert => {
    const searchLower = searchTerm.toLowerCase();
    return (
      cert.name.toLowerCase().includes(searchLower) ||
      (cert.description && cert.description.toLowerCase().includes(searchLower)) ||
      (cert.issuedTo && cert.issuedTo.name && cert.issuedTo.name.toLowerCase().includes(searchLower)) ||
      (cert.event && cert.event.title && cert.event.title.toLowerCase().includes(searchLower))
    );
  });

  // Loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Manage Certificates | Admin Panel</title>
      </Head>

      <div className="container px-6 py-8 mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => router.push('/admin')} 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Upload Certificate Form */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upload Certificate</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Upload a new certificate for a student.
                </p>
              </div>
              <div className="p-6">
                {error && (
                  <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                  </div>
                )}
                {successMsg && (
                  <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {successMsg}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Certificate Name */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Certificate of Completion"
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Completed Web Development Workshop"
                      rows={2}
                    />
                  </div>
                  
                  {/* Select Student */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Student
                    </label>
                    <select
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a student</option>
                      {users.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.name} - {user.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Select Event (Optional) */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Related Event (Optional)
                    </label>
                    <select
                      name="eventId"
                      value={formData.eventId}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an event</option>
                      {events.map(event => (
                        <option key={event._id} value={event._id}>
                          {event.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* File Upload */}
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Certificate File (PDF only)
                    </label>
                    <input
                      type="file"
                      id="certificateFile"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum file size: 5MB
                    </p>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="w-5 h-5 mr-2" />
                        Upload Certificate
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Certificates List */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">All Certificates</h2>
                  <div className="relative flex-1 max-w-xs ml-4">
                    <input
                      type="text"
                      placeholder="Search certificates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center p-6">
                  <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : filteredCertificates.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <FaFilePdf className="w-12 h-12 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900">No certificates found</h3>
                  <p className="mt-1 text-gray-500">
                    {searchTerm ? 'Try a different search term' : 'Start by uploading a certificate'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Certificate
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Student
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Issue Date
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCertificates.map((certificate) => (
                        <tr key={certificate._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{certificate.name}</div>
                            {certificate.description && (
                              <div className="text-sm text-gray-500">{certificate.description}</div>
                            )}
                            {certificate.event && certificate.event.title && (
                              <div className="text-xs text-gray-500">
                                Event: {certificate.event.title}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {certificate.issuedTo ? (
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-8 h-8">
                                  {certificate.issuedTo.profilePhoto ? (
                                    <img 
                                      className="object-cover w-8 h-8 rounded-full" 
                                      src={certificate.issuedTo.profilePhoto.startsWith('http')
                                        ? certificate.issuedTo.profilePhoto
                                        : `http://localhost:5000${certificate.issuedTo.profilePhoto}`
                                      } 
                                      alt={certificate.issuedTo.name} 
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                                      <FaUser className="w-4 h-4 text-gray-500" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {certificate.issuedTo.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {certificate.issuedTo.email}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">Unknown user</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-3">
                              <a
                                href={`http://localhost:5000/api/certificates/download/${certificate._id}`}
                                className="text-blue-600 hover:text-blue-900"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                              <button
                                onClick={() => handleDelete(certificate._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
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
    </div>
  );
}
