import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaSearch, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!authLoading && !isAuthenticated) {
      router.replace('/login?redirect=student/events');
      return;
    }
    
    // Redirect if user is not a student
    if (!authLoading && isAuthenticated && user && user.role !== 'student') {
      router.replace('/');
      return;
    }
    
    if (!authLoading && isAuthenticated && user && user.role === 'student') {
      fetchEvents();
    }
  }, [user, isAuthenticated, authLoading, router, token]);

  useEffect(() => {
    if (events.length > 0) {
      let filtered = events;
      
      // Apply status filter
      if (filterStatus !== 'all') {
        filtered = filtered.filter(event => event.status === filterStatus);
      }
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(event => 
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      setFilteredEvents(filtered);
    }
  }, [searchTerm, filterStatus, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/events/registered`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      setEvents(data.events || []);
      setFilteredEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message || 'Failed to load events');
      
      // Use mock data for demonstration
      const mockEvents = [
        {
          id: '1', 
          title: 'AI Workshop', 
          description: 'Learn about the latest AI technologies and their applications',
          date: '2025-08-15T10:00:00Z',
          endDate: '2025-08-15T16:00:00Z',
          location: 'Online',
          status: 'upcoming',
          participants: 45
        },
        {
          id: '2',
          title: 'Web Development Bootcamp',
          description: 'Comprehensive course covering frontend and backend development',
          date: '2025-07-20T09:00:00Z',
          endDate: '2025-07-20T17:00:00Z',
          location: 'GEU Campus',
          status: 'upcoming',
          participants: 30
        },
        {
          id: '3',
          title: 'IEEE Annual Conference',
          description: 'Annual gathering of IEEE members with keynote speakers',
          date: '2025-06-10T08:30:00Z',
          endDate: '2025-06-10T18:00:00Z',
          location: 'Convention Center',
          status: 'completed',
          participants: 120
        }
      ];
      
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };
  
  // Format date helper
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        <title>My Events | IEEE Club</title>
      </Head>

      <div className="container px-6 py-8 mx-auto">
        <div className="mb-6">
          <Link href="/student/dashboard">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              ← Back to Dashboard
            </button>
          </Link>
        </div>

        <div className="mb-6 md:flex md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">My Events</h1>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming Events</option>
              <option value="ongoing">Ongoing Events</option>
              <option value="completed">Completed Events</option>
            </select>
          </div>
        </div>
        
        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow">
            <FaCalendarAlt className="w-16 h-16 mb-4 text-gray-300" />
            <h2 className="text-xl font-medium text-gray-900">No Events Found</h2>
            <p className="mt-2 text-gray-500">
              {searchTerm || filterStatus !== 'all'
                ? 'No events match your current filters. Try different search criteria.'
                : 'You haven\'t registered for any events yet.'}
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="overflow-hidden bg-white rounded-lg shadow"
                whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      event.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800' 
                        : event.status === 'ongoing'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                  
                  {event.description && (
                    <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
                      {formatEventDate(event.date)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatEventTime(event.date)} - {formatEventTime(event.endDate || event.date)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                      {event.location || 'TBD'}
                    </div>
                    
                    {event.participants && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FaUsers className="w-4 h-4 mr-2 text-gray-400" />
                        {event.participants} {event.participants === 1 ? 'participant' : 'participants'}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link href={`/events/${event.id}`}>
                      <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200">
                        View Details
                      </button>
                    </Link>
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
