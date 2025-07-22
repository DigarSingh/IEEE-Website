import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaPaperPlane, FaArrowRight, FaUsers } from 'react-icons/fa';
import Layout from '@/components/Layout';

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen overflow-hidden bg-white">
        <Head>
          <title>Contact Us - IEEE Club</title>
          <meta name="description" content="Get in touch with the IEEE Club. We'd love to hear from you!" />
        </Head>

        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/30"></div>
          
          {/* Animated Background Elements */}
          <motion.div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-36 h-36 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
          </motion.div>
          
          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-5"></div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div 
              className="max-w-5xl mx-auto text-center text-white"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FaEnvelope className="text-blue-400 mr-2" />
                <span className="text-sm font-medium">Let's Connect</span>
              </motion.div>
              
              {/* Main Title */}
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="text-white">Get in</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Touch
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Today
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Have questions about membership, events, or collaboration opportunities? We're here to help and would love to connect with you.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <a href="#contact-form">
                  <motion.div
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white cursor-pointer overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      Send Message <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </a>
                
                <a href="tel:+917668410473">
                  <motion.div
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-white cursor-pointer hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      Call Us <FaPhone className="ml-2" />
                    </span>
                  </motion.div>
                </a>
              </motion.div>

              {/* Contact Info Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 mt-8 border-t border-white/20"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <FaPhone className="text-blue-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white font-medium">+91 7668410473</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <FaEnvelope className="text-purple-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white font-medium">ieee@geu.ac.in</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-yellow-500/20 rounded-full">
                      <FaMapMarkerAlt className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white font-medium">Dehradun, India</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm mb-2 font-medium">Send us a message</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Enhanced Why Contact Us Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Why Reach Out to Us?
              </h2>
              <p className="text-xl leading-relaxed text-gray-600">
                Whether you're interested in joining, collaborating, or have questions about our events, we're here to help.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Quick Response",
                  description: "We respond to all inquiries within 24-48 hours during business days",
                  icon: <FaClock className="text-2xl text-blue-500" />,
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Expert Guidance",
                  description: "Get advice from experienced IEEE professionals and industry experts",
                  icon: <FaUsers className="text-2xl text-green-500" />,
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Partnership Opportunities",
                  description: "Explore collaboration and partnership possibilities with our organization",
                  icon: <FaArrowRight className="text-2xl text-purple-500" />,
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Technical Support",
                  description: "Get help with technical questions, projects, and research inquiries",
                  icon: <FaEnvelope className="text-2xl text-orange-500" />,
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative h-full p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg rounded-3xl hover:shadow-2xl">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-10 transform scale-0 group-hover:scale-100 transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact-form" className="relative z-10 px-4 py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="grid gap-12 md:grid-cols-5">
              {/* Contact Information Card */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative p-8 overflow-hidden text-white shadow-2xl md:col-span-2 rounded-3xl bg-gradient-to-br from-ieee-blue via-blue-700 to-blue-800"
              >
                {/* Background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                  <div className="absolute bg-white rounded-full w-96 h-96 -top-20 -right-20"></div>
                  <div className="absolute bg-blue-300 rounded-full w-80 h-80 -bottom-20 -left-20"></div>
                  <div className="w-full h-full bg-[url('/images/hero/circuit-pattern.png')] opacity-20"></div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                  <p className="mb-8 text-blue-100">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-8">
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 rounded-full bg-white/20 backdrop-blur-sm">
                        <FaMapMarkerAlt className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Our Location</h3>
                        <address className="not-italic leading-relaxed text-blue-100">
                          566/6, Bell Road, Society Area,<br />
                          Clement Town,<br />
                          Dehradun, Uttarakhand, PIN : 248002
                        </address>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 rounded-full bg-white/20 backdrop-blur-sm">
                        <FaEnvelope className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Email Address</h3>
                        <a 
                          href="mailto:geu.ieee.studenbranch@gmail.com" 
                          className="text-blue-100 transition-colors hover:text-white hover:underline"
                        >
                          geu.ieee.studenbranch@gmail.com
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 rounded-full bg-white/20 backdrop-blur-sm">
                        <FaPhone className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Phone Number</h3>
                        <a 
                          href="tel:+911234567890" 
                          className="text-blue-100 transition-colors hover:text-white hover:underline"
                        >
                          +91 7668410473
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 rounded-full bg-white/20 backdrop-blur-sm">
                        <FaClock className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Office Hours</h3>
                        <p className="text-blue-100">
                          Monday - Friday: 9:00 AM - 5:00 PM<br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="pt-8 mt-12 border-t border-white/20">
                    <h3 className="mb-6 text-lg font-medium">Connect With Us</h3>
                    <div className="flex space-x-4">
                      {[
                        { icon: <FaFacebook />, url: "https://facebook.com", color: "hover:bg-[#1877F2]" },
                        { icon: <FaTwitter />, url: "https://twitter.com", color: "hover:bg-[#1DA1F2]" },
                        { icon: <FaInstagram />, url: "https://instagram.com", color: "hover:bg-[#E4405F]" },
                        { icon: <FaLinkedin />, url: "https://linkedin.com", color: "hover:bg-[#0A66C2]" },
                        { icon: <FaGithub />, url: "https://github.com", color: "hover:bg-[#333333]" }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center w-12 h-12 transition-all rounded-full bg-white/20 backdrop-blur-sm ${social.color} hover:scale-110`}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative p-8 overflow-hidden bg-white border border-gray-100 shadow-2xl md:col-span-3 rounded-3xl"
              >
                {/* Background subtle patterns */}
                <div className="absolute inset-0 z-0 opacity-5">
                  <div className="absolute -bottom-40 -right-40 rounded-full w-96 h-96 bg-ieee-blue"></div>
                  <div className="w-full h-full bg-gradient-to-br from-transparent to-blue-100"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">Send Us a Message</h2>
                    <p className="text-gray-600">We'd love to hear from you. Fill out the form below.</p>
                  </div>
                  
                  {/* Success message with animation */}
                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center p-6 mb-8 border-l-4 border-green-500 rounded-lg bg-green-50"
                      >
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                            <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-1 text-lg font-medium text-green-800">Message Sent Successfully!</h3>
                          <p className="text-green-700">
                            Thank you for reaching out. We'll get back to you shortly.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Formik
                    initialValues={{ name: '', email: '', subject: '', message: '' }}
                    validationSchema={Yup.object({
                      name: Yup.string().required('Name is required'),
                      email: Yup.string().email('Invalid email address').required('Email is required'),
                      subject: Yup.string().required('Subject is required'),
                      message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      try {
                        // In a real application, you would send this data to your backend
                        console.log('Form values:', values);
                        
                        // Simulate API call delay
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                        // Success!
                        setFormSuccess(true);
                        resetForm();
                        
                        // Reset success message after 5 seconds
                        setTimeout(() => setFormSuccess(false), 5000);
                      } catch (error) {
                        console.error('Error submitting form:', error);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Name Field */}
                          <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                              Your Name
                            </label>
                            <div className="relative">
                              <Field
                                id="name"
                                name="name"
                                type="text"
                                className={`appearance-none block w-full px-5 py-4 border ${
                                  errors.name && touched.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-ieee-blue focus:border-ieee-blue'
                                } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                                placeholder="John Doe"
                              />
                              {errors.name && touched.name ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              ) : null}
                            </div>
                            <ErrorMessage name="name" component="p" className="mt-2 text-sm text-red-600" />
                          </div>
                          
                          {/* Email Field */}
                          <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                              Your Email
                            </label>
                            <div className="relative">
                              <Field
                                id="email"
                                name="email"
                                type="email"
                                className={`appearance-none block w-full px-5 py-4 border ${
                                  errors.email && touched.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-ieee-blue focus:border-ieee-blue'
                                } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                                placeholder="johndoe@example.com"
                              />
                              {errors.email && touched.email ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              ) : null}
                            </div>
                            <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
                          </div>
                        </div>
                        
                        {/* Subject Field */}
                        <div>
                          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <Field
                            id="subject"
                            name="subject"
                            type="text"
                            className={`appearance-none block w-full px-5 py-4 border ${
                              errors.subject && touched.subject ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-ieee-blue focus:border-ieee-blue'
                            } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                            placeholder="How can we help you?"
                          />
                          <ErrorMessage name="subject" component="p" className="mt-2 text-sm text-red-600" />
                        </div>
                        
                        {/* Message Field */}
                        <div>
                          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                            Your Message
                          </label>
                          <Field
                            as="textarea"
                            id="message"
                            name="message"
                            rows={5}
                            className={`appearance-none block w-full px-5 py-4 border ${
                              errors.message && touched.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-ieee-blue focus:border-ieee-blue'
                            } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                            placeholder="Write your message here..."
                          />
                          <ErrorMessage name="message" component="p" className="mt-2 text-sm text-red-600" />
                        </div>
                        
                        <div>
                          <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-ieee-blue to-blue-700 hover:from-ieee-blue hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ieee-blue transition-all ${
                              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <span className="flex items-center">
                                <FaPaperPlane className="mr-2" /> Send Message
                              </span>
                            )}
                          </motion.button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Map Section */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-1 rounded-full bg-ieee-blue"></div>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Find Us Here</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Visit our campus location at Graphic Era Deemed To Be University
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl shadow-2xl overflow-hidden h-[500px] border-8 border-white"
            >
              {/* Map overlay with gradient */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-ieee-blue to-transparent opacity-10"></div>
              
              {/* Google Maps embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.0080555608126!2d77.9917176!3d30.316494699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b9451ae8dfd%3A0xf39c46d34a152faa!2sGraphic%20Era%20Deemed%20to%20be%20University!5e0!3m2!1sen!2sin!4v1715472580227!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Graphic Era Deemed To Be University Location"
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="px-4 py-24 bg-white">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-1 rounded-full bg-ieee-blue"></div>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Find quick answers to common questions about contacting us
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How quickly will you respond to my inquiry?",
                  answer: "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please contact us directly by phone."
                },
                {
                  question: "Can I visit your office without an appointment?",
                  answer: "We recommend scheduling an appointment in advance to ensure that we can dedicate proper time to address your needs. Please contact us via email or phone to arrange a visit."
                },
                {
                  question: "How can I join your mailing list?",
                  answer: "You can subscribe to our newsletter by filling out the contact form on this page and checking the option to receive updates, or by visiting our homepage and using the newsletter signup form at the bottom of the page."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 border border-gray-100 shadow-lg bg-gradient-to-br from-white to-blue-50 rounded-2xl"
                >
                  <h3 className="flex items-center mb-4 text-xl font-bold text-gray-900">
                    <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm text-white rounded-full bg-ieee-blue">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="ml-12 leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <p className="mb-6 text-lg text-gray-600">
                Didn't find what you were looking for?
              </p>
              <a 
                href="#contact-form"
                className="inline-flex items-center px-8 py-3 font-medium text-white transition-all rounded-full shadow-lg bg-ieee-blue hover:bg-blue-700 hover:shadow-blue-500/30"
              >
                Ask Us Directly <FaArrowRight className="ml-2" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="py-20 text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute w-32 h-32 rounded-full top-10 left-10 bg-white/10 blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 rounded-full bottom-10 right-10 bg-white/5 blur-2xl animate-pulse"></div>
          </div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">Ready to Connect?</h2>
              <p className="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
                Join our community of innovators and technology enthusiasts. Let's build the future together.
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/gallery">
                  <motion.div
                    className="px-8 py-4 text-lg font-bold text-blue-600 transition-all duration-300 bg-white rounded-full shadow-lg cursor-pointer group hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      View Gallery
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.div>
                </Link>
                
                <a href="#contact-form">
                  <motion.div
                    className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white rounded-full cursor-pointer hover:bg-white hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
