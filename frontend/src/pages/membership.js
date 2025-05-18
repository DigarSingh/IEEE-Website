import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaTimes, FaChevronDown, FaChevronUp, FaUserPlus, FaShieldAlt, FaRegLightbulb } from 'react-icons/fa';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Membership() {
  const benefits = [
    "Access to exclusive workshops and technical events",
    "Network with industry professionals and academic experts",
    "Opportunities to work on cutting-edge projects",
    "Leadership roles within IEEE student chapter",
    "IEEE digital library and publication access",
    "Discounted tickets to conferences and seminars",
    "Resume building opportunities",
    "Mentorship from senior members"
  ];

  const faqs = [
    {
      question: "How do I become a member of the IEEE Club?",
      answer: "To become a member, you need to register through our website by completing the application form and paying the membership fee. Once your application is reviewed and approved, you will receive a confirmation email with your membership details."
    },
    {
      question: "What are the benefits of joining the IEEE Club?",
      answer: "As a member, you get access to exclusive workshops, networking events, technical resources, mentorship opportunities, and the ability to participate in or lead club projects. You'll also get discounted or free entry to IEEE conferences and events."
    },
    {
      question: "How long does the membership last?",
      answer: "The standard membership is valid for one academic year. You will need to renew your membership at the start of each academic year to continue enjoying the benefits."
    },
    {
      question: "Can I upgrade my membership tier later?",
      answer: "Yes, you can upgrade your membership tier at any time. You'll only need to pay the difference between your current tier and the new one. Please contact the membership coordinator for assistance with upgrades."
    },
    {
      question: "Is the club membership the same as IEEE global membership?",
      answer: "No, our club membership is separate from the IEEE global membership. However, we encourage our members to also join IEEE global for additional benefits and resources. We can guide you through that process if you're interested."
    }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <Layout> {/* Wrap content with Layout */}
      <div className="bg-white">
        <Head>
          <title>IEEE Membership - Join Our Community</title>
          <meta name="description" content="Join the IEEE Club and access exclusive workshops, projects, and networking opportunities." />
        </Head>

        {/* Enhanced Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ieee-blue via-blue-700 to-purple-900 opacity-95"></div>
          
          {/* Abstract Tech Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 opacity-10">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <radialGradient id="fadeGradient" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
              <rect width="100%" height="100%" fill="url(#fadeGradient)"/>
            </svg>
          </div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-1 bg-yellow-300 rounded-full"></div>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
              >
                Join Our Community <br/> of <span className="text-yellow-300">Innovators</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mx-auto mb-10 text-xl text-gray-100"
              >
                Become a member of the IEEE Club and unlock access to exclusive events, projects, and networking opportunities.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/signup">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-8 py-3 font-medium text-white transition-all bg-transparent border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-ieee-blue"
                  >
                    Sign Up Now
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative circles */}
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300 rounded-full opacity-10"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          <motion.div
            className="absolute top-0 right-0 bg-blue-400 rounded-full w-96 h-96 opacity-10"
            animate={{ 
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-ieee-blue"></div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Why Join IEEE Club?</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                IEEE membership offers you the tools, resources, and opportunities to advance your career, build your network, and contribute to technological innovation.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-ieee-blue bg-opacity-10">
                    <FaCheck className="text-ieee-blue" />
                  </div>
                  <p className="font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced How to Join */}
        <section className="py-20 bg-gray-50">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-ieee-blue"></div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">How to Join</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Becoming a member is easy. Follow these simple steps to join our IEEE community.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-0 z-0 hidden w-1 h-full transform -translate-x-1/2 left-1/2 bg-ieee-light md:block"></div>
                
                <div className="relative z-10 space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center md:flex-row"
                  >
                    <div className="hidden mb-6 text-right md:w-1/2 md:mb-0 md:pr-12 md:block">
                      <h3 className="mb-2 text-xl font-bold">Create an Account</h3>
                      <p className="text-gray-600">
                        Sign up on our website with your academic email and basic information.
                      </p>
                    </div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 mx-auto text-xl font-bold text-white rounded-full bg-ieee-blue md:mx-0">
                      1
                    </div>
                    <div className="text-center md:w-1/2 md:pl-12 md:text-left md:hidden">
                      <h3 className="mb-2 text-xl font-bold">Create an Account</h3>
                      <p className="text-gray-600">
                        Sign up on our website with your academic email and basic information.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-center md:flex-row"
                  >
                    <div className="mb-6 text-right md:w-1/2 md:mb-0 md:pr-12 md:hidden">
                      <h3 className="mb-2 text-xl font-bold">Select a Plan</h3>
                      <p className="text-gray-600">
                        Choose the membership tier that best suits your needs and interests.
                      </p>
                    </div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 mx-auto text-xl font-bold text-white rounded-full bg-ieee-blue md:mx-0">
                      2
                    </div>
                    <div className="text-center md:w-1/2 md:pl-12 md:text-left">
                      <h3 className="mb-2 text-xl font-bold">Select a Plan</h3>
                      <p className="text-gray-600">
                        Choose the membership tier that best suits your needs and interests.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center md:flex-row"
                  >
                    <div className="hidden mb-6 text-right md:w-1/2 md:mb-0 md:pr-12 md:block">
                      <h3 className="mb-2 text-xl font-bold">Complete Payment</h3>
                      <p className="text-gray-600">
                        Pay the membership fee securely through our online portal.
                      </p>
                    </div>
                    <div className="z-10 flex items-center justify-center w-16 h-16 mx-auto text-xl font-bold text-white rounded-full bg-ieee-blue md:mx-0">
                      3
                    </div>
                    <div className="text-center md:w-1/2 md:pl-12 md:text-left md:hidden">
                      <h3 className="mb-2 text-xl font-bold">Complete Payment</h3>
                      <p className="text-gray-600">
                        Pay the membership fee securely through our online portal.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-16 text-center"
              >
                <Link href="/signup">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-10 py-4 font-medium text-white transition-all rounded-full shadow-lg cursor-pointer bg-ieee-blue hover:bg-ieee-dark"
                  >
                    Sign Up Now <FaArrowRight className="ml-2" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-ieee-blue"></div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Still have questions about IEEE membership? Find answers to common questions below.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-5"
                >
                  <div 
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all ${openFaqIndex === index ? "border-ieee-blue" : ""}`}
                  >
                    <button 
                      className="flex items-center justify-between w-full p-6 font-medium text-left focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-lg">{faq.question}</span>
                      <span className={`text-ieee-blue transition-transform duration-300 ${openFaqIndex === index ? "transform rotate-180" : ""}`}>
                        {openFaqIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </button>
                    
                    <motion.div 
                      initial={false}
                      animate={{ height: openFaqIndex === index ? "auto" : 0, opacity: openFaqIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="mb-6 text-gray-600">
                Still have questions? We're here to help!
              </p>
              <Link href="/contact">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 font-medium transition-all bg-white border rounded-full cursor-pointer text-ieee-blue border-ieee-blue hover:bg-ieee-blue hover:text-white"
                >
                  Contact Us
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 text-white bg-gradient-to-r from-ieee-blue to-blue-700">
          <div className="relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 w-64 h-64 bg-white rounded-full left-10 opacity-10"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 20, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
            <motion.div
              className="absolute bottom-0 bg-white rounded-full right-10 w-96 h-96 opacity-10"
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -20, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
            
            <div className="container relative z-10 px-6 mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 text-3xl font-bold md:text-5xl"
                >
                  Ready to Join Our IEEE Community?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-10 text-xl text-gray-100"
                >
                  Take the first step towards enhancing your academic and professional journey. Join IEEE today!
                </motion.p>
                <Link href="/signup">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center px-10 py-4 font-medium transition-all bg-white rounded-full shadow-lg cursor-pointer text-ieee-blue hover:bg-yellow-300 hover:text-gray-900"
                  >
                    Sign Up Now <FaArrowRight className="ml-2" />
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
