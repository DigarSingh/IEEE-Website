"use client";

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function EventCard({ event }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Safe navigation function
  const navigateToEvent = () => {
    const eventUrl = `/events/${event.id}`;
    if (pathname !== eventUrl) {
      router.push(eventUrl);
    }
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={navigateToEvent}
    >
      <div className="relative h-48">
        <Image 
          src={event.image || '/events/default-event.jpg'} 
          alt={event.title} 
          fill 
          style={{objectFit: 'cover'}}
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          <span className="text-sm text-gray-600">{event.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {event.shortDescription}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {event.location}
        </div>
      </div>
    </div>
  );
}
