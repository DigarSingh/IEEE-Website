import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUsers, FaGavel, FaExclamationTriangle, FaFileContract, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function TermsOfService() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>Terms of Service | IEEE GEU Student Branch</title>
        <meta name="description" content="Terms and conditions for using IEEE GEU Student Branch services and website" />
      </Head>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
            >
              <FaFileContract className="mr-2 text-blue-300" />
              <span className="text-sm font-medium">Legal Documentation</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl"
            >
              Terms of{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Service
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="mb-8 text-xl text-blue-100"
            >
              Please read these terms carefully before using our services
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-200 rounded-full bg-blue-800/30 backdrop-blur-sm"
            >
              <FaCheckCircle className="mr-2" />
              Last updated: {'10 May 2025'}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link href="/">
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition-all bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50">
                  <FaArrowLeft className="mr-2" />
                  Back to Home
                </span>
              </Link>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-4">
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-1"
              >
                <div className="sticky p-6 bg-white border border-gray-200 rounded-2xl top-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Table of Contents</h3>
                  <nav className="space-y-2">
                    {[
                      { id: 'introduction', title: 'Introduction', icon: FaShieldAlt },
                      { id: 'accounts', title: 'User Accounts', icon: FaUsers },
                      { id: 'membership', title: 'Membership Terms', icon: FaCheckCircle },
                      { id: 'intellectual', title: 'Intellectual Property', icon: FaGavel },
                      { id: 'prohibited', title: 'Prohibited Uses', icon: FaExclamationTriangle },
                      { id: 'contact', title: 'Contact Information', icon: FaFileContract }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center p-2 text-sm text-gray-600 transition-colors rounded-lg hover:bg-blue-50 hover:text-blue-600"
                      >
                        <item.icon className="mr-3 text-xs" />
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="p-8 bg-white border border-gray-200 md:p-12 rounded-2xl">
                  <div className="prose prose-lg max-w-none">
                    <section id="introduction" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                          <FaShieldAlt className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Introduction</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl">
                        <p className="mb-0 text-blue-800">
                          Welcome to IEEE GEU Student Branch website. These Terms of Service govern your access to and use of 
                          our website, services, and applications.
                        </p>
                      </div>
                      <p className="text-gray-700">
                        By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
                        you must not access or use our Services.
                      </p>
                    </section>
                    <section id="accounts" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                          <FaUsers className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">User Accounts and Registration</h2>
                      </div>
                      
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">Account Creation</h3>
                      <p className="mb-4 text-gray-700">
                        To access certain features of our Services, you may be required to register for an account. When you register, 
                        you agree to provide accurate, current, and complete information.
                      </p>
                      
                      <div className="p-4 mb-6 border border-yellow-200 bg-yellow-50 rounded-xl">
                        <h4 className="mb-2 font-semibold text-yellow-800">You are responsible for:</h4>
                        <ul className="ml-4 text-yellow-700 list-disc">
                          <li>Maintaining the confidentiality of your account credentials</li>
                          <li>All activities that occur under your account</li>
                          <li>Immediately notifying us of any unauthorized use</li>
                        </ul>
                      </div>

                      <h3 className="mb-4 text-xl font-semibold text-gray-800">Login and Authentication</h3>
                      <p className="mb-4 text-gray-700">
                        Our login system is designed to protect your account information. When using our authentication services:
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          "Never share your password with anyone",
                          "Use a strong, unique password",
                          "Log out from shared computers",
                          "Report suspicious activity immediately"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50">
                            <FaCheckCircle className="mr-3 text-green-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section id="membership" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                          <FaCheckCircle className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Membership Terms</h2>
                      </div>
                      
                      <div className="p-6 border border-purple-200 bg-purple-50 rounded-xl">
                        <p className="mb-4 text-purple-800">If you apply for IEEE GEU membership through our Services:</p>
                        <ul className="ml-4 text-purple-700 list-disc">
                          <li>Membership is subject to eligibility requirements and approval</li>
                          <li>Membership fees, if applicable, are non-refundable unless otherwise stated</li>
                          <li>Members must comply with IEEE code of conduct and policies</li>
                          <li>Membership may be terminated for violation of these Terms or IEEE policies</li>
                        </ul>
                      </div>
                    </section>

                    <section id="intellectual" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-red-500 to-red-600">
                          <FaGavel className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Intellectual Property Rights</h2>
                      </div>
                      
                      <p className="mb-4 text-gray-700">
                        The Services and their entire contents, features, and functionality are owned by IEEE GEU Student Branch, 
                        its licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
                      </p>
                      
                      <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
                        <h4 className="mb-3 font-semibold text-red-800">You may not:</h4>
                        <ul className="ml-4 text-red-700 list-disc">
                          <li>Reproduce, distribute, modify, or create derivative works without written consent</li>
                          <li>Use any illustrations, photographs, or graphics separately from accompanying text</li>
                          <li>Delete or alter any copyright, trademark, or proprietary rights notices</li>
                        </ul>
                      </div>
                    </section>

                    <section id="prohibited" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                          <FaExclamationTriangle className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Prohibited Uses</h2>
                      </div>
                      
                      <div className="p-6 border border-orange-200 bg-orange-50 rounded-xl">
                        <p className="mb-4 text-orange-800">You may use our Services only for lawful purposes. You agree not to:</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {[
                            "Violate any applicable laws or regulations",
                            "Impersonate IEEE GEU or other entities",
                            "Engage in conduct that restricts others' use",
                            "Attempt unauthorized access to our systems",
                            "Attack our Services via denial-of-service",
                            "Use automated means to access or collect data"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                              <FaExclamationTriangle className="mt-1 mr-3 text-orange-500" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section id="contact" className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                          <FaFileContract className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Contact Information</h2>
                      </div>
                      
                      <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl">
                        <p className="mb-4 text-blue-800">Questions about these Terms should be sent to us at:</p>
                        <div className="space-y-2 text-blue-700">
                          <p><strong>Email:</strong> geu.ieee.studentbranch@gmail.com</p>
                          <p><strong>Address:</strong> 566/6, Bell Road, Society Area, Clement Town, Dehradun, Uttarakhand, PIN: 248002</p>
                        </div>
                      </div>
                    </section>

                    {/* Footer Agreement */}
                    <div className="pt-8 mt-8 border-t border-gray-200">
                      <div className="p-6 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <p className="mb-4 text-lg font-semibold text-gray-900">
                          By using our Services, you acknowledge that you have read and understood these Terms.
                        </p>
                        <p className="text-gray-600">
                          For information about how we collect, use, and share your personal data, please see our{' '}
                          <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-800">
                            Privacy Policy
                          </Link>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
