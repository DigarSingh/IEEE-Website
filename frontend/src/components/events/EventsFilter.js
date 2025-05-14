import { motion } from 'framer-motion';

export default function EventsFilter({ activeFilter, setFilter }) {
  const filters = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'conference', label: 'Conferences' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'webinar', label: 'Webinars' },
    { value: 'competition', label: 'Competitions' }
  ];

  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {filters.map((filter, index) => (
          <motion.button
            key={filter.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              activeFilter === filter.value
                ? 'bg-ieee-blue text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFilter(filter.value)}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8 }}
        className="h-0.5 bg-gray-200"
      />
    </div>
  );
}
