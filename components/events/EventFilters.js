"use client";

export default function EventFilters({ activeFilter, onFilterChange }) {
  // Event categories 
  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'conference', label: 'Conferences' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'competition', label: 'Competitions' },
    { value: 'panel', label: 'Panels & Talks' },
    { value: 'symposium', label: 'Symposiums' }
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {categories.map(category => (
        <button
          key={category.value}
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === category.value 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onFilterChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
