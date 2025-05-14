'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const RegisterModal = ({ isOpen, onClose, event }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    ieeeMember: false,
    membershipId: '',
  });
  
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  // Don't render anything on the server
  if (typeof window === 'undefined') return null;
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg mx-4 bg-white shadow-xl rounded-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>

          {success ? (
            <div className="p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Registration Successful!</h3>
              <p className="mb-6 text-gray-600">
                Thank you for registering for {event.title}. We've sent a confirmation email with all the details.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 text-white transition-colors rounded-full bg-ieee-blue hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="mb-1 text-2xl font-bold text-gray-900">Register for Event</h2>
              <h3 className="mb-6 text-lg text-gray-600">{event.title}</h3>

              <form onSubmit={handleSubmit}>
                {formStep === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ieee-blue focus:border-ieee-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ieee-blue focus:border-ieee-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ieee-blue focus:border-ieee-blue"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="w-full px-6 py-3 font-medium text-white transition-colors rounded-full bg-ieee-blue hover:bg-blue-700"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="institution" className="block mb-1 text-sm font-medium text-gray-700">
                        Institution/Organization *
                      </label>
                      <input
                        id="institution"
                        name="institution"
                        type="text"
                        required
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ieee-blue focus:border-ieee-blue"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="ieeeMember"
                        name="ieeeMember"
                        type="checkbox"
                        checked={formData.ieeeMember}
                        onChange={handleChange}
                        className="w-4 h-4 border-gray-300 rounded text-ieee-blue focus:ring-ieee-blue"
                      />
                      <label htmlFor="ieeeMember" className="block ml-2 text-sm text-gray-700">
                        I am an IEEE Member
                      </label>
                    </div>
                    
                    {formData.ieeeMember && (
                      <div>
                        <label htmlFor="membershipId" className="block mb-1 text-sm font-medium text-gray-700">
                          IEEE Membership ID *
                        </label>
                        <input
                          id="membershipId"
                          name="membershipId"
                          type="text"
                          required={formData.ieeeMember}
                          value={formData.membershipId}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ieee-blue focus:border-ieee-blue"
                        />
                      </div>
                    )}
                    
                    <div className="flex pt-4 space-x-4">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="w-1/2 px-6 py-3 font-medium text-gray-800 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-1/2 px-6 py-3 font-medium text-white transition-colors rounded-full bg-ieee-blue hover:bg-blue-700 disabled:bg-blue-300"
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing
                          </span>
                        ) : "Register"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RegisterModal;
