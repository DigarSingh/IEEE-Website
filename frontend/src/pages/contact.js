import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaArrowRight,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";
import Layout from "@/components/Layout";
import ParticleBackground from "@/components/ParticleBackground";

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  return (
    <Layout>
      <div className="min-h-screen overflow-hidden bg-white">
        <Head>
          <title>Contact Us - IEEE Club</title>
          <meta
            name="description"
            content="Get in touch with the IEEE Club. We'd love to hear from you!"
          />
        </Head>

        {/* Enhanced Hero Section with IEEE Branding */}
        <section className="relative flex items-center min-h-screen overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/30"></div>
          
          {/* Particle Background */}
          <ParticleBackground />

          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="container relative z-10 px-6 mx-auto lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                >
                  <FaEnvelope className="mr-2" />
                  Get In Touch
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-6 text-5xl font-bold leading-tight lg:text-7xl"
                >
                  Let's{' '}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                    Connect
                  </span>
                  <br />
                  and{' '}
                  <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                    Collaborate
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="max-w-lg mb-8 text-xl leading-relaxed text-blue-100"
                >
                  Have questions about IEEE membership? Want to collaborate on innovative projects? 
                  We're here to help you advance your engineering career and make meaningful connections.
                </motion.p>

                

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.a
                    href="#contact-form"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-blue-500/25"
                  >
                    Send Message
                    <FaArrowRight className="text-sm" />
                  </motion.a>
                  <motion.a
                    href="tel:+917668410473"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 font-semibold transition-all border bg-white/10 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white/20"
                  >
                    <FaPhone />
                    Call Now
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Content - Interactive Contact Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="p-8 border shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/20">
                  <h3 className="mb-6 text-2xl font-bold text-white">Quick Contact</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center gap-4 p-4 cursor-pointer bg-white/10 rounded-xl"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <FaEnvelope className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Email Us</p>
                        <p className="font-medium text-white">geu.ieee.studentbranch@gmail.com</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-4 p-4 cursor-pointer bg-white/10 rounded-xl"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                        <FaPhone className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Call Us</p>
                        <p className="font-medium text-white">+91 7668410473</p>
                      </div>
                    </motion.div>
                    <motion.a 
                      href="https://www.instagram.com/ieee.geu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 cursor-pointer bg-white/10 rounded-xl"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600">
                        <FaInstagram className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Follow Us</p>
                        <p className="font-medium text-white">@ieee.geu</p>
                      </div>
                    </motion.a>
                    <motion.div 
                      className="flex items-center gap-4 p-4 cursor-pointer bg-white/10 rounded-xl"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                        <FaMapMarkerAlt className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Visit Us</p>
                        <p className="font-medium text-white">GEU Campus, Dehradun</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute transform -translate-x-1/2 bottom-1 left-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center w-6 h-10 border-2 rounded-full cursor-pointer border-white/30"
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 mt-2 rounded-full bg-white/50"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Contact Form & Info Section */}
        <section
          id="contact-form"
          className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 bg-blue-200 rounded-full w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 bg-purple-200 rounded-full w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bg-pink-200 rounded-full -bottom-32 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                <FaPaperPlane className="mr-2" />
                Contact Form
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                Send Us a{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
                  Message
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours. 
                Our team is here to help with any questions or collaboration opportunities.
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-5">
              {/* Enhanced Contact Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative lg:col-span-2"
              >
                <div className="relative p-8 overflow-hidden text-white shadow-2xl rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 -mb-16 -ml-16 bg-blue-300 rounded-full"></div>
                    <div className="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 left-1/2 border-white/20"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-3 mr-4 bg-white/20 rounded-xl backdrop-blur-sm">
                        <FaEnvelope className="text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Contact Information</h2>
                        <p className="text-blue-100">Let's start a conversation</p>
                      </div>
                    </div>
                    
                    <p className="mb-8 leading-relaxed text-blue-100">
                      Fill out the form and our team will get back to you within 24 hours. 
                      We're here to help you with any questions about IEEE membership, events, or collaboration opportunities.
                    </p>

                    <div className="space-y-6">
                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 transition-all rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-400">
                          <FaMapMarkerAlt className="text-xl text-white" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">Our Location</h3>
                          <address className="not-italic leading-relaxed text-blue-100">
                            566/6, Bell Road, Society Area,<br />
                            Clement Town,<br />
                            Dehradun, Uttarakhand, PIN : 248002
                          </address>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 transition-all rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 group-hover:from-purple-300 group-hover:to-purple-400">
                          <FaEnvelope className="text-xl text-white" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">Email Address</h3>
                          <a
                            href="mailto:geu.ieee.studenbranch@gmail.com"
                            className="text-blue-100 break-all transition-colors hover:text-white hover:underline"
                          >
                            geu.ieee.studentbranch@gmail.com
                          </a>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-4 transition-all rounded-xl bg-gradient-to-br from-green-400 to-green-500 group-hover:from-green-300 group-hover:to-green-400">
                          <FaPhone className="text-xl text-white" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">Phone Number</h3>
                          <a
                            href="tel:+917668410473"
                            className="text-blue-100 transition-colors hover:text-white hover:underline"
                          >
                            +91 7668410473
                          </a>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                      </motion.div>
                    </div>

                    {/* Enhanced Social Links */}
                    <div className="pt-8 mt-8 border-t border-white/20">
                      <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                        Connect With Us
                      </h3>
                      <div className="grid grid-cols-5 gap-3">
                        {[
                          { icon: <FaTwitter />, url: "https://www.instagram.com/ieee.geu/", color: "bg-[#1DA1F2]", name: "Twitter" },
                          { icon: <FaInstagram />, url: "https://www.instagram.com/ieee.geu/", color: "bg-[#E4405F]", name: "Instagram" },
                          { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/geu-ieee-student-branch/", color: "bg-[#0A66C2]", name: "LinkedIn" },
                        ].map((social, index) => (
                          <motion.a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative group flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:${social.color} transition-all duration-300`}
                            whileHover={{ y: -4, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={social.name}
                          >
                            <span className="text-lg transition-transform group-hover:scale-110">
                              {social.icon}
                            </span>
                            <div className="absolute px-2 py-1 text-xs text-white transition-opacity transform -translate-x-1/2 rounded opacity-0 -bottom-8 left-1/2 bg-black/80 group-hover:opacity-100 whitespace-nowrap">
                              {social.name}
                            </div>
                          </motion.a>
                        ))}
                      </div>
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
                className="relative lg:col-span-3"
              >
                <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-xl border-white/20 rounded-3xl">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl"></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 rounded-full bg-gradient-to-br from-pink-400/10 to-yellow-400/10"></div>

                  <div className="relative z-10">
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                          <FaPaperPlane className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                          <p className="text-gray-600">We'd love to hear from you</p>
                        </div>
                      </div>
                    </div>

                    {/* Success message with enhanced animation */}
                    <AnimatePresence>
                      {formSuccess && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.9 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="mb-8 overflow-hidden"
                        >
                          <div className="flex items-center p-6 border-l-4 border-green-500 shadow-lg rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                            <motion.div 
                              className="flex-shrink-0 mr-4"
                              initial={{ rotate: 0 }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                            >
                              <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-green-400 to-green-500">
                                <svg
                                  className="w-6 h-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </motion.div>
                            <div>
                              <h3 className="mb-1 text-lg font-semibold text-green-800">
                                Message Sent Successfully!
                              </h3>
                              <p className="text-green-700">
                                Thank you for reaching out. We'll get back to you within 24 hours.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error message */}
                    <AnimatePresence>
                      {formError && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.9 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="mb-8 overflow-hidden"
                        >
                          <div className="flex items-center p-6 border-l-4 border-red-500 shadow-lg rounded-xl bg-gradient-to-r from-red-50 to-rose-50">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-red-400 to-red-500">
                                <svg
                                  className="w-6 h-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-lg font-semibold text-red-800">
                                Failed to Send Message
                              </h3>
                              <p className="text-red-700">
                                {formError}
                              </p>
                            </div>
                            <button
                              onClick={() => setFormError("")}
                              className="ml-auto text-red-400 transition-colors hover:text-red-600"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      }}
                      validationSchema={Yup.object({
                        name: Yup.string().required("Name is required"),
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Email is required"),
                        subject: Yup.string().required("Subject is required"),
                        message: Yup.string()
                          .required("Message is required")
                          .min(10, "Message must be at least 10 characters"),
                      })}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                          // Clear any previous errors
                          setFormError("");
                          
                          console.log("Submitting form with values:", values);
                          
                          const response = await fetch("/api/contact", {
                            method: "POST",
                            headers: { 
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                          });
                          
                          console.log("Response status:", response.status);
                          const data = await response.json();
                          console.log("Response data:", data);
                          
                          if (!response.ok || !data.success) {
                            throw new Error(data.message || "Failed to send message.");
                          }
                          
                          setFormSuccess(true);
                          resetForm();
                          setTimeout(() => setFormSuccess(false), 5000);
                        } catch (error) {
                          console.error("Error submitting form:", error);
                          setFormError(error.message || "Failed to send message. Please try again.");
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6">
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Enhanced Name Field */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              viewport={{ once: true }}
                            >
                              <label
                                htmlFor="name"
                                className="block mb-3 text-sm font-semibold text-gray-700"
                              >
                                Your Name *
                              </label>
                              <div className="relative group">
                                <Field
                                  id="name"
                                  name="name"
                                  type="text"
                                  className={`appearance-none block w-full px-5 py-4 border-2 ${
                                    errors.name && touched.name
                                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                      : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 group-hover:border-gray-300"
                                  } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                                  placeholder="Enter your full name"
                                />
                                {errors.name && touched.name ? (
                                  <motion.div 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </motion.div>
                                ) : null}
                              </div>
                              <ErrorMessage name="name" component="p" className="mt-2 text-sm font-medium text-red-600" />
                            </motion.div>

                            {/* Enhanced Email Field */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              viewport={{ once: true }}
                            >
                              <label
                                htmlFor="email"
                                className="block mb-3 text-sm font-semibold text-gray-700"
                              >
                                Your Email *
                              </label>
                              <div className="relative group">
                                <Field
                                  id="email"
                                  name="email"
                                  type="email"
                                  className={`appearance-none block w-full px-5 py-4 border-2 ${
                                    errors.email && touched.email
                                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                      : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 group-hover:border-gray-300"
                                  } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                                  placeholder="your.email@example.com"
                                />
                                {errors.email && touched.email ? (
                                  <motion.div 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </motion.div>
                                ) : null}
                              </div>
                              <ErrorMessage name="email" component="p" className="mt-2 text-sm font-medium text-red-600" />
                            </motion.div>
                          </div>

                          {/* Enhanced Subject Field */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <label
                              htmlFor="subject"
                              className="block mb-3 text-sm font-semibold text-gray-700"
                            >
                              Subject *
                            </label>
                            <Field
                              id="subject"
                              name="subject"
                              type="text"
                              className={`appearance-none block w-full px-5 py-4 border-2 ${
                                errors.subject && touched.subject
                                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300"
                              } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                              placeholder="What's this about?"
                            />
                            <ErrorMessage name="subject" component="p" className="mt-2 text-sm font-medium text-red-600" />
                          </motion.div>

                          {/* Enhanced Message Field */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <label
                              htmlFor="message"
                              className="block mb-3 text-sm font-semibold text-gray-700"
                            >
                              Your Message *
                            </label>
                            <Field
                              as="textarea"
                              id="message"
                              name="message"
                              rows={6}
                              className={`appearance-none block w-full px-5 py-4 border-2 ${
                                errors.message && touched.message
                                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300"
                              } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm`}
                              placeholder="Tell us more about your inquiry..."
                            />
                            <ErrorMessage name="message" component="p" className="mt-2 text-sm font-medium text-red-600" />
                          </motion.div>

                          {/* Enhanced Submit Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 font-semibold text-lg ${
                                isSubmitting
                                  ? "opacity-70 cursor-not-allowed"
                                  : "hover:shadow-blue-500/25"
                              }`}
                            >
                              {/* Background shine effect */}
                              <div className="absolute inset-0 transition-transform duration-1000 transform -translate-x-full -skew-x-12 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full"></div>
                              
                              {isSubmitting ? (
                                <>
                                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Sending Message...
                                </>
                              ) : (
                                <span className="relative z-10 flex items-center">
                                  <FaPaperPlane className="mr-3" />
                                  Send Message
                                  <FaArrowRight className="ml-2 opacity-70" />
                                </span>
                              )}
                            </motion.button>
                          </motion.div>
                        </Form>
                      )}
                    </Formik>
                  </div>
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
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Find Us Here
              </h2>
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
        <section className="relative py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-64 h-64 bg-blue-200 rounded-full top-20 right-10 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bg-purple-200 rounded-full bottom-20 left-10 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container relative z-10 max-w-5xl px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-800 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
                Frequently Asked Questions
              </div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                Got{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
                  Questions?
                </span>
                <br />
                We've Got Answers
              </h2>
              <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
                Find quick answers to common questions about contacting us, IEEE membership, and collaboration opportunities
              </p>
            </motion.div>

            <div className="grid gap-8 lg:gap-6">
              {[
                {
                  question: "How quickly will you respond to my inquiry?",
                  answer: "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please contact us directly by phone at +91 7668410473.",
                  icon: "⚡",
                  gradient: "from-yellow-400 to-orange-500"
                },
                {
                  question: "Can I visit your office without an appointment?",
                  answer: "We recommend scheduling an appointment in advance to ensure that we can dedicate proper time to address your needs. Please contact us via email or phone to arrange a visit to our GEU campus location.",
                  icon: "🏢",
                  gradient: "from-blue-400 to-purple-500"
                },
                {
                  question: "How can I join IEEE and what are the benefits?",
                  answer: "IEEE membership offers access to cutting-edge research, networking opportunities, professional development resources, and industry standards. Contact us to learn about student membership benefits and how to apply.",
                  icon: "🎓",
                  gradient: "from-green-400 to-teal-500"
                },
                {
                  question: "Do you offer collaboration opportunities for students?",
                  answer: "Yes! We actively seek collaboration with students, researchers, and industry professionals. We offer project partnerships, internship opportunities, research collaborations, and technical workshops.",
                  icon: "🤝",
                  gradient: "from-pink-400 to-rose-500"
                },
                {
                  question: "What events and workshops do you organize?",
                  answer: "We organize regular technical workshops, hackathons, guest lectures, industry visits, and networking events. Check our events page or contact us to stay updated on upcoming activities.",
                  icon: "🎯",
                  gradient: "from-indigo-400 to-blue-500"
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="relative p-8 overflow-hidden transition-all duration-300 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl">
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${faq.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    {/* Question header */}
                    <div className="flex items-start mb-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${faq.gradient} text-white text-xl font-bold mr-4 flex-shrink-0 shadow-lg`}>
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Answer */}
                    <div className="ml-16">
                      <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                        {faq.answer}
                      </p>
                    </div>

                    {/* Hover effect indicator */}
                    <div className="absolute transition-opacity duration-300 opacity-0 bottom-4 right-4 group-hover:opacity-100">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${faq.gradient} flex items-center justify-center`}>
                        <FaArrowRight className="text-xs text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg"></div>
                <div className="relative p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
                  <p className="mb-6 text-lg text-gray-600">
                    Still have questions? We're here to help!
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <motion.a
                      href="#contact-form"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-blue-500/25"
                    >
                      Ask Us Directly
                      <FaArrowRight className="ml-2" />
                    </motion.a>
                    <motion.a
                      href="tel:+917668410473"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-8 py-4 font-semibold text-blue-600 transition-all border-2 border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 hover:border-blue-300"
                    >
                      <FaPhone className="mr-2" />
                      Call Now
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}