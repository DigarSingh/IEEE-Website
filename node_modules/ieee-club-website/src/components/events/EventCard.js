import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function EventCard({ event, index, featured = false }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
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
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-gray-900">
            Featured
          </div>
        )}
        <div className={`absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t ${
          featured ? 'from-black' : 'from-gray-900'
        } to-transparent`}>
          <span className="text-white text-sm font-medium bg-ieee-blue rounded-full px-3 py-1 inline-block">
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-xl mb-2 text-gray-900">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
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
        
        <Link href={`/events/${event.id}`}>
          <span className="inline-block bg-white text-ieee-blue font-medium border border-ieee-blue rounded-full px-4 py-2 hover:bg-ieee-blue hover:text-white transition-colors cursor-pointer">
            View Details
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
