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
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Event Poster</h3>
        <div 
          className="relative overflow-hidden bg-gray-100 rounded-lg cursor-pointer group"
          onClick={() => setShowFullPoster(true)}
        >
          <img
            src={event.image || "/images/events/default.jpg"}
            alt={event.title}
            className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20">
            <div className="p-3 transition-all duration-300 bg-white bg-opacity-0 rounded-full group-hover:bg-opacity-90">
              <FaExpand className="text-gray-800 transition-opacity duration-300 opacity-0 group-hover:opacity-100" size={20} />
            </div>
          </div>
          <div className="absolute px-3 py-1 text-sm text-white bg-black bg-opacity-50 rounded-full bottom-3 right-3 backdrop-blur-sm">
            Click to view full size
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">About This Event</h3>
        <p className="leading-relaxed text-gray-600">{event.detailedContent.overview}</p>
      </div>
      
      {event.detailedContent.objectives && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Learning Objectives</h3>
          <ul className="space-y-2">
            {event.detailedContent.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-ieee-blue"></span>
                <span className="text-gray-600">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.detailedContent.prerequisites && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Prerequisites</h3>
          <ul className="space-y-2">
            {event.detailedContent.prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 inline-block w-2 h-2 mt-2 mr-3 bg-green-500 rounded-full"></span>
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
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Schedule</h3>
          <div className="space-y-3">
            {event.detailedContent.agenda.map((item, index) => (
              <div key={index} className="py-2 pl-4 border-l-4 border-ieee-blue">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.curriculum && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Curriculum</h3>
          <div className="space-y-3">
            {event.detailedContent.curriculum.map((item, index) => (
              <div key={index} className="py-2 pl-4 border-l-4 border-ieee-blue">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.timeline && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Timeline</h3>
          <div className="space-y-3">
            {event.detailedContent.timeline.map((item, index) => (
              <div key={index} className="py-2 pl-4 border-l-4 border-ieee-blue">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.program && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Program Schedule</h3>
          <div className="space-y-3">
            {event.detailedContent.program.map((item, index) => (
              <div key={index} className="py-2 pl-4 border-l-4 border-ieee-blue">
                <div className="text-sm font-medium text-ieee-blue">{item.split(':')[0]}:{item.split(':')[1]}</div>
                <div className="text-gray-700">{item.split(': ').slice(1).join(': ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.rounds && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Competition Rounds</h3>
          <div className="space-y-4">
            {event.detailedContent.rounds.map((round, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-semibold text-ieee-blue">{round.round}</h4>
                <p className="mb-2 text-gray-600">{round.description}</p>
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
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Prizes & Recognition</h3>
          <div className="space-y-2">
            {event.detailedContent.prizes.map((prize, index) => (
              <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                <span className="text-gray-700">{prize}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.speakers && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Expert Speakers</h3>
          <div className="grid gap-4">
            {event.detailedContent.speakers.map((speaker, index) => (
              <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900">{speaker.name}</h4>
                <p className="text-sm text-ieee-blue">{speaker.designation}</p>
                <p className="mt-1 text-sm text-gray-600">{speaker.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.detailedContent.outcomes && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">What You'll Get</h3>
          <ul className="space-y-2">
            {event.detailedContent.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 inline-block w-2 h-2 mt-2 mr-3 bg-green-500 rounded-full"></span>
                <span className="text-gray-600">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.detailedContent.registration && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Registration Information</h3>
          <div className="p-4 space-y-2 rounded-lg bg-blue-50">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative overflow-hidden h-80">
              <img
                src={event.image || "/images/events/default.jpg"}
                alt={event.title}
                className="object-cover w-full h-full transition-transform duration-300 cursor-pointer hover:scale-105"
                onClick={() => setShowFullPoster(true)}
              />
              {/* Minimal gradient overlay only at the bottom - conditional */}
              {!showCleanPoster && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
              )}
              
              {/* Top controls with minimal background */}
              <button
                onClick={onClose}
                className="absolute z-10 p-2 text-white transition-all bg-black rounded-full top-4 right-4 bg-opacity-40 backdrop-blur-sm hover:bg-opacity-60"
              >
                <FaTimes size={20} />
              </button>
              <button
                onClick={() => setShowFullPoster(true)}
                className="absolute z-10 p-2 text-white transition-all bg-black rounded-full top-4 right-16 bg-opacity-40 backdrop-blur-sm hover:bg-opacity-60"
                title="View Full Poster"
              >
                <FaExpand size={16} />
              </button>
              <button
                onClick={() => setShowCleanPoster(!showCleanPoster)}
                className="absolute z-10 p-2 text-white transition-all bg-black rounded-full top-4 right-28 bg-opacity-40 backdrop-blur-sm hover:bg-opacity-60"
                title={showCleanPoster ? "Show Event Info" : "Hide Event Info"}
              >
                {showCleanPoster ? "📄" : "🖼️"}
              </button>
              
              {/* Compact event info at bottom - conditional */}
              {!showCleanPoster && (
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="p-3 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm">
                    <h2 className="mb-1 text-xl font-bold text-white truncate">{event.title}</h2>
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
              <nav className="flex px-6 space-x-8">
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
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-ieee-blue">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  {event.difficulty && (
                    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
                      {event.difficulty}
                    </span>
                  )}
                </div>
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    className="px-6 py-2 font-medium text-white transition-colors rounded-lg bg-ieee-blue hover:bg-blue-700"
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
            className="absolute z-10 p-3 text-white transition-all bg-white rounded-full top-6 right-6 bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
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
              className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}