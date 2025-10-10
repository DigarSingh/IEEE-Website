import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useState } from 'react';
import EventDetailsModal from './EventDetailsModal';

export default function EventCard({ event, index, featured = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleViewDetails = () => {
    if (event.detailedContent) {
      setIsModalOpen(true);
    } else {
      // Fallback for events without detailed content
      window.location.href = `/events/${event.id}`;
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow ${
          featured ? 'transform hover:-translate-y-2 transition-transform duration-300' : ''
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image || "/images/events/default.jpg"} 
            alt={event.title} 
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          {featured && (
            <div className="absolute px-3 py-1 text-xs font-bold text-gray-900 bg-yellow-400 rounded-full top-4 right-4">
              Featured
            </div>
          )}
          <div className={`absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t ${
            featured ? 'from-black' : 'from-gray-900'
          } to-transparent`}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-ieee-blue">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold text-gray-900">{event.title}</h3>
          <p className="mb-4 text-gray-600 line-clamp-2">{event.description}</p>
          
          <div className="mb-4 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <FaCalendar className="mr-2 text-ieee-blue" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaClock className="mr-2 text-ieee-blue" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaMapMarkerAlt className="mr-2 text-ieee-blue" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <button
            onClick={handleViewDetails}
            className="inline-block px-4 py-2 font-medium transition-colors bg-white border rounded-full cursor-pointer text-ieee-blue border-ieee-blue hover:bg-ieee-blue hover:text-white"
          >
            View Details
          </button>
        </div>
      </motion.div>

      <EventDetailsModal 
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}