import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestion, FaSearch } from 'react-icons/fa';
import Layout from '../components/Layout';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState({});

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'membership', name: 'Membership' },
    { id: 'events', name: 'Events' },
    { id: 'technical', name: 'Technical' },
    { id: 'general', name: 'General' },
  ];

  const faqItems = [
    {
      id: 1,
      question: 'How do I become a member of IEEE?',
      answer: 'To become a member, visit the Membership page on our website and follow the registration instructions. You can also reach out to our membership coordinator for assistance.',
      category: 'membership',
    },
    {
      id: 2,
      question: 'What are the benefits of IEEE membership?',
      answer: 'IEEE membership offers access to exclusive events, workshops, networking opportunities, IEEE digital library, publication access, leadership development, and much more.',
      category: 'membership',
    },
    {
      id: 3,
      question: 'How much does IEEE membership cost for students?',
      answer: 'Student membership typically costs $32 per year, which provides access to all IEEE resources and benefits. There might be additional chapter fees which vary by location.',
      category: 'membership',
    },
    {
      id: 4,
      question: 'Can I participate in events without being a member?',
      answer: 'Yes, many of our events are open to non-members as well. However, members get priority registration and often receive discounted or free access to premium events.',
      category: 'events',
    },
    {
      id: 5,
      question: 'How can I get involved in organizing IEEE events?',
      answer: 'You can join our volunteer team by expressing interest to any of our executive members or by sending an email to our official address. We\'re always looking for enthusiastic members to help organize events!',
      category: 'events',
    },
    {
      id: 6,
      question: 'Are certificates provided for participation in events?',
      answer: 'Yes, certificates of participation are provided for most workshops, competitions, and conferences. For some events, there might be additional requirements to receive a certificate.',
      category: 'events',
    },
    {
      id: 7,
      question: 'What technical resources does IEEE provide?',
      answer: 'IEEE provides access to IEEE Xplore Digital Library, which contains journals, conference papers, standards, and educational courses. Members also get access to various software tools and learning resources.',
      category: 'technical',
    },
    {
      id: 8,
      question: 'How can I publish my research through IEEE?',
      answer: 'IEEE offers various journals and conferences where you can submit your research papers. The submission process typically involves peer review and adherence to specific formatting guidelines.',
      category: 'technical',
    },
    {
      id: 9,
      question: 'Does IEEE offer any scholarships or grants?',
      answer: 'Yes, IEEE and its societies offer various scholarships, grants, and funding opportunities for students and researchers. These are typically competitive and have specific eligibility criteria.',
      category: 'general',
    },
    {
      id: 10,
      question: 'How can I contact IEEE leadership or admin?',
      answer: 'You can reach out to us via email at geu.ieee.studenbranch@gmail.com or through the contact form on our website. You can also connect with us on social media platforms.',
      category: 'general',
    },
  ];

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter FAQ items based on search term and active category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Head>
        <title>Frequently Asked Questions | IEEE GEU</title>
        <meta name="description" content="Find answers to common questions about IEEE GEU membership, events, and more" />
      </Head>

      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-4 text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600">
                Find answers to common questions about IEEE membership, events, and resources
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <div className="relative max-w-md mx-auto mb-8">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="mb-4"
                >
                  <div
                    onClick={() => toggleQuestion(faq.id)}
                    className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FaQuestion className="flex-shrink-0 mr-4 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openQuestions[faq.id] ? (
                        <FaMinus className="text-blue-600" />
                      ) : (
                        <FaPlus className="text-blue-600" />
                      )}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {openQuestions[faq.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t-0 border border-gray-200 bg-gray-50 rounded-b-lg">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-xl text-gray-600">No questions found matching your search.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Contact Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl p-8 mx-auto mt-16 text-center bg-blue-600 rounded-lg shadow-md"
          >
            <h2 className="mb-4 text-2xl font-bold text-white">Still have questions?</h2>
            <p className="mb-6 text-blue-100">
              If you couldn't find the answer to your question, feel free to reach out to us directly.
            </p>
            <a
              href="mailto:geu.ieee.studenbranch@gmail.com?subject=FAQ Question"
              className="inline-flex items-center px-6 py-3 font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
