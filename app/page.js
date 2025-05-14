"use client";

import { useSafeNavigation } from '../components/SafeNavigation';

export default function Home() {
  const navigateTo = useSafeNavigation();
  
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to IEEE Events</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
          <p className="mb-4">Check out our latest events and activities</p>
          <button 
            onClick={() => navigateTo('/events')} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Events
          </button>
        </div>
        
        {/* Other content sections */}
      </div>
    </main>
  );
}
