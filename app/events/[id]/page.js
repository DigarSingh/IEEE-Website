"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RegisterModal from '../../../components/events/RegisterModal';

// Mock events data - in a real app, this would come from an API
const eventsData = [
  {
    id: 1,
    title: "Machine Learning Workshop",
    date: "15 Oct 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus Auditorium",
    category: "workshop",
    image: "/events/ml-workshop.jpg",
    shortDescription: "Join us for an intensive workshop on machine learning fundamentals and applications.",
    fullDescription: `
      <p>This comprehensive workshop is designed for students and professionals interested in mastering machine learning concepts and practices.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Foundations of machine learning algorithms</li>
        <li>Data preprocessing techniques</li>
        <li>Model training and evaluation</li>
        <li>Practical applications using Python</li>
        <li>Deployment strategies for ML models</li>
      </ul>
      
      <h3>Requirements:</h3>
      <p>Participants should have basic knowledge of programming and statistics. Please bring your laptop with Python installed.</p>
      
      <h3>Speakers:</h3>
      <p>Dr. Sarah Johnson, AI Researcher at Tech University<br>
      Mr. David Chen, Machine Learning Engineer at InnovateAI</p>
    `,
    organizer: "IEEE Computer Society",
    registrationFee: "$20 (IEEE members), $35 (non-members)",
    contactEmail: "events@ieee-chapter.org",
    contactPhone: "+1-123-456-7890"
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
    fullDescription: `
      <p>Join us for our flagship annual conference bringing together industry leaders, innovators, and tech enthusiasts from around the world.</p>
      
      <h3>Conference Highlights:</h3>
      <ul>
        <li>Keynote speeches from industry visionaries</li>
        <li>Panel discussions on emerging technologies</li>
        <li>Interactive workshops and demonstrations</li>
        <li>Networking opportunities with tech professionals</li>
        <li>Exhibition area featuring cutting-edge products</li>
      </ul>
      
      <h3>Featured Speakers:</h3>
      <p>Jane Smith, CTO of FutureTech<br>
      Mark Williams, AI Research Director<br>
      Lisa Johnson, Cybersecurity Expert</p>
      
      <h3>Schedule:</h3>
      <p>9:00 AM - Registration and breakfast<br>
      10:00 AM - Opening keynote<br>
      11:30 AM - Breakout sessions<br>
      1:00 PM - Lunch and networking<br>
      2:30 PM - Panel discussions<br>
      4:00 PM - Closing remarks<br>
      5:00 PM - Networking reception</p>
    `,
    organizer: "IEEE Chapter",
    registrationFee: "$120 (Early bird), $150 (Regular)",
    contactEmail: "conference@ieee-chapter.org",
    contactPhone: "+1-123-456-7890"
  },
  // Additional events data would go here
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "5 Dec 2023",
    time: "2:00 PM - 7:00 PM",
    location: "Innovation Hub",
    category: "competition",
    image: "/events/pitch-competition.jpg",
    shortDescription: "Entrepreneurs compete for funding and mentorship opportunities.",
    fullDescription: `
      <p>An exciting opportunity for startups to pitch their innovative ideas to investors and industry experts.</p>
      
      <h3>Competition Format:</h3>
      <ul>
        <li>5-minute pitch presentations</li>
        <li>Q&A with judge panel</li>
        <li>Feedback sessions with mentors</li>
        <li>Networking with investors and industry partners</li>
      </ul>
      
      <h3>Prizes:</h3>
      <p>1st Place: $10,000 seed funding + 6 months mentorship<br>
      2nd Place: $5,000 seed funding + 3 months mentorship<br>
      3rd Place: $2,500 seed funding</p>
      
      <h3>Eligibility:</h3>
      <p>Open to early-stage startups with a working prototype or MVP. Applicants must submit a business plan by November 20th.</p>
    `,
    organizer: "IEEE Entrepreneurship",
    registrationFee: "$50 per team",
    contactEmail: "startup@ieee-chapter.org",
    contactPhone: "+1-123-456-7890"
  }
];

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch from an API
    const eventId = parseInt(params.id);
    const foundEvent = eventsData.find(e => e.id === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // Redirect to events page if event not found
      router.push('/events');
    }
    
    setLoading(false);
  }, [params.id, router]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!event) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/events" className="text-blue-600 hover:underline">
            &larr; Back to Events
          </Link>
        </div>
        
        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              style={{objectFit: 'cover'}}
              priority
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{event.title}</h1>
              </div>
              
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Register Now
              </button>
            </div>
            
            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: event.fullDescription }}
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">ORGANIZED BY</h4>
                  <p>{event.organizer}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">REGISTRATION FEE</h4>
                  <p>{event.registrationFee}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-600">CONTACT</h4>
                  <p>Email: {event.contactEmail}<br />
                  Phone: {event.contactPhone}</p>
                </div>
                
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Registration Modal */}
      <RegisterModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        eventTitle={event.title}
      />
    </div>
  );
}
