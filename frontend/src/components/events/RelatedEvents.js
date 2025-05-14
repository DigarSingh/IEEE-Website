import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCalendar } from 'react-icons/fa';

const RelatedEvents = ({ currentEventId, category }) => {
  const router = useRouter();
  const [relatedEvents, setRelatedEvents] = useState([]);
  
  useEffect(() => {
    // Mock data - In a real app, fetch related events from API
    const mockEvents = [
      {
        id: 1,
        title: "Machine Learning Workshop",
        date: "June 15, 2023",
        image: "/images/events/ai-workshop.jpg",
        category: "workshop"
      },
      {
        id: 2,
        title: "IEEE Leadership Summit",
        date: "July 8, 2023",
        image: "/images/events/leadership-summit.jpg",
        category: "conference"
      },
      {
        id: 3,
        title: "Hackathon 2025",
        date: "May 01, 2025",
        image: "/images/events/hackathon.jpg",
        category: "hackathon"
      },
      {
        id: 4,
        title: "Web Development Bootcamp",
        date: "August 12, 2023",
        image: "/images/events/webdev.jpg",
        category: "workshop"
      }
    ];
    
    // Filter out the current event and get events from the same category
    const filtered = mockEvents
      .filter(event => event.id !== currentEventId && event.category === category)
      .slice(0, 3);
      
    setRelatedEvents(filtered);
  }, [currentEventId, category]);
  
  if (relatedEvents.length === 0) return null;
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-6 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-900 mb-8"
        >
          Related Events
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
              onClick={() => router.push(`/events/${event.id}`)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2 text-sm text-gray-500">
                  <FaCalendar className="mr-2 text-ieee-blue" />
                  {event.date}
                </div>
                <h3 className="font-bold text-gray-900">{event.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedEvents;
