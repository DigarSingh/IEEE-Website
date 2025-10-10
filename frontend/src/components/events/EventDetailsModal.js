import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaMapMarkerAlt, FaClock, FaUsers, FaAward, FaGraduationCap, FaExpand } from 'react-icons/fa';
import { useState } from 'react';

export default function EventDetailsModal({ event, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullPoster, setShowFullPoster] = useState(false);
  const [showCleanPoster, setShowCleanPoster] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGraduationCap },
    { id: 'agenda', label: 'Agenda', icon: FaClock },
    { id: 'details', label: 'Details', icon: FaAward },
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (!event?.detailedContent) return null;

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* Event Poster Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Poster</h3>
        <div 
          className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setShowFullPoster(true)}
        >
          <img
            src={event.image || "/images/events/default.jpg"}
            alt={event.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full p-3 transition-all duration-300">
              <FaExpand className="text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            Click to view full size
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
        <p className="text-gray-600 leading-relaxed">{event.detailedContent.overview}</p>
      </div>
      
      {event.detailedContent.objectives && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
          <ul className="space-y-2">
            {event.detailedContent.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-ieee-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.detailedContent.prerequisites && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
          <ul className="space-y-2">
            {event.detailedContent.prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderAgendaContent = () => (
    <div className="space-y-6">
      {event.detailedContent.agenda && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Schedule</h3>
          <div className="space-y-3">
            {event.detailedContent.agenda.map((item, index) => (
              <div key={index} className="border-l-4 border-ieee-blue pl-4 py-2">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.curriculum && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Curriculum</h3>
          <div className="space-y-3">
            {event.detailedContent.curriculum.map((item, index) => (
              <div key={index} className="border-l-4 border-ieee-blue pl-4 py-2">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.timeline && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Timeline</h3>
          <div className="space-y-3">
            {event.detailedContent.timeline.map((item, index) => (
              <div key={index} className="border-l-4 border-ieee-blue pl-4 py-2">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.program && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Schedule</h3>
          <div className="space-y-3">
            {event.detailedContent.program.map((item, index) => (
              <div key={index} className="border-l-4 border-ieee-blue pl-4 py-2">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.rounds && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Competition Rounds</h3>
          <div className="space-y-4">
            {event.detailedContent.rounds.map((round, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-ieee-blue mb-2">{round.round}</h4>
                <p className="text-gray-600 mb-2">{round.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Duration:</span> {round.duration}
                </div>
                {round.topics && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Topics: </span>
                    <span className="text-sm text-gray-600">{round.topics.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderDetailsContent = () => (
    <div className="space-y-6">
      {event.detailedContent.prizes && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Prizes & Recognition</h3>
          <div className="space-y-2">
            {event.detailedContent.prizes.map((prize, index) => (
              <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3">
                <span className="text-gray-700">{prize}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.speakers && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Speakers</h3>
          <div className="grid gap-4">
            {event.detailedContent.speakers.map((speaker, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900">{speaker.name}</h4>
                <p className="text-ieee-blue text-sm">{speaker.designation}</p>
                <p className="text-gray-600 text-sm mt-1">{speaker.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.outcomes && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Get</h3>
          <ul className="space-y-2">
            {event.detailedContent.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.detailedContent.registration && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Registration Information</h3>
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            {typeof event.detailedContent.registration === 'object' ? (
              Object.entries(event.detailedContent.registration).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium text-gray-700 capitalize">{key}:</span>
                  <span className="text-gray-600">{Array.isArray(value) ? value.join(', ') : value}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">{event.detailedContent.registration}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={event.image || "/images/events/default.jpg"}
                alt={event.title}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setShowFullPoster(true)}
              />
              {/* Minimal gradient overlay only at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Top controls with minimal background */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black bg-opacity-40 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-60 transition-all z-10"
              >
                <FaTimes size={20} />
              </button>
              <button
                onClick={() => setShowFullPoster(true)}
                className="absolute top-4 right-16 bg-black bg-opacity-40 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-60 transition-all z-10"
                title="View Full Poster"
              >
                <FaExpand size={16} />
              </button>
              <button
                onClick={() => setShowCleanPoster(!showCleanPoster)}
                className="absolute top-4 right-28 bg-black bg-opacity-40 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-60 transition-all z-10"
                title={showCleanPoster ? "Show Event Info" : "Hide Event Info"}
              >
                {showCleanPoster ? "📄" : "🖼️"}
              </button>
              
              {/* Compact event info at bottom - conditional */}
              {!showCleanPoster && (
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                    <h2 className="text-xl font-bold text-white mb-1 truncate">{event.title}</h2>
                    <div className="flex items-center space-x-4 text-xs text-white/90">
                      <div className="flex items-center">
                        <FaCalendar className="mr-1" size={10} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1" size={10} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1" size={10} />
                        <span>{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center">
                          <FaUsers className="mr-1" size={10} />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-ieee-blue text-ieee-blue'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[50vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && renderOverviewContent()}
                  {activeTab === 'agenda' && renderAgendaContent()}
                  {activeTab === 'details' && renderDetailsContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-ieee-blue">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  {event.difficulty && (
                    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 rounded-full bg-gray-200">
                      {event.difficulty}
                    </span>
                  )}
                </div>
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    className="px-6 py-2 bg-ieee-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Full-Screen Poster Modal */}
      {showFullPoster && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]"
          onClick={() => setShowFullPoster(false)}
        >
          <button
            onClick={() => setShowFullPoster(false)}
            className="absolute top-6 right-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-opacity-30 transition-all z-10"
          >
            <FaTimes size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={event.image || "/images/events/default.jpg"}
              alt={event.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="text-xl font-bold mb-1">{event.title}</h3>
              <p className="text-sm opacity-90">{event.date} • {event.time} • {event.location}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}