"use client";

import { useState } from 'react';
import EventCard from '../../components/events/EventCard';
import EventFilters from '../../components/events/EventFilters';

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  
  // Mock events data - in a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Machine Learning Workshop",
      date: "15 Oct 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Main Campus Auditorium",
      category: "workshop",
      image: "/events/ml-workshop.jpg",
      shortDescription: "Join us for an intensive workshop on machine learning fundamentals and applications.",
    },
    {
      id: 2,
      title: "Annual Tech Conference",
      date: "22 Nov 2023",
      time: "9:00 AM - 6:00 PM",
      location: "Convention Center",
      category: "conference",
      image: "/events/tech-conference.jpg",
      shortDescription: "The biggest tech gathering of the year with industry leaders and innovators.",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "5 Dec 2023",
      time: "2:00 PM - 7:00 PM",
      location: "Innovation Hub",
      category: "competition",
      image: "/events/pitch-competition.jpg",
      shortDescription: "Entrepreneurs compete for funding and mentorship opportunities.",
    },
    {
      id: 4,
      title: "IoT Hackathon",
      date: "18 Jan 2024",
      time: "9:00 AM - 9:00 PM",
      location: "Engineering Block",
      category: "hackathon",
      image: "/events/iot-hackathon.jpg",
      shortDescription: "24-hour challenge to build innovative IoT solutions for real-world problems.",
    },
    {
      id: 5,
      title: "Women in Tech Panel",
      date: "8 Mar 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Seminar Hall",
      category: "panel",
      image: "/events/women-tech.jpg",
      shortDescription: "Distinguished female leaders discuss challenges and opportunities in tech.",
    },
    {
      id: 6,
      title: "AI Research Symposium",
      date: "20 Apr 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Research Center",
      category: "symposium",
      image: "/events/ai-symposium.jpg",
      shortDescription: "Latest advancements and research in artificial intelligence and machine learning.",
    }
  ];

  // Filter events based on selected category
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">IEEE Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover technical workshops, conferences, and networking opportunities to enhance your skills and connect with industry professionals.
          </p>
        </div>
        
        {/* Filters */}
        <EventFilters activeFilter={filter} onFilterChange={setFilter} />
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No events found in this category</h3>
            <button 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setFilter('all')}
            >
              View All Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
