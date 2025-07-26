import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaDatabase, FaCookie, FaUserShield, FaLock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
        <title>Privacy Policy | IEEE GEU Student Branch</title>
        <meta name="description" content="Privacy policy for IEEE GEU Student Branch website and services" />
      </Head>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
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
              <FaUserShield className="mr-2 text-green-300" />
              <span className="text-sm font-medium">Data Protection</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl"
            >
              Privacy{' '}
              <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                Policy
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="mb-8 text-xl text-green-100"
            >
              Your privacy is important to us. Learn how we protect your personal information.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-200 bg-green-800/30 rounded-full backdrop-blur-sm"
            >
              <FaCheckCircle className="mr-2" />
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 transition-all bg-white border border-green-200 rounded-lg cursor-pointer hover:bg-green-50">
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
                      { id: 'overview', title: 'Overview', icon: FaShieldAlt },
                      { id: 'collection', title: 'Data Collection', icon: FaDatabase },
                      { id: 'usage', title: 'How We Use Data', icon: FaUserShield },
                      { id: 'sharing', title: 'Data Sharing', icon: FaLock },
                      { id: 'cookies', title: 'Cookies & Tracking', icon: FaCookie },
                      { id: 'rights', title: 'Your Rights', icon: FaCheckCircle },
                      { id: 'contact', title: 'Contact Us', icon: FaShieldAlt }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center p-2 text-sm text-gray-600 transition-colors rounded-lg hover:bg-green-50 hover:text-green-600"
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
                    <section id="overview" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                          <FaShieldAlt className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Overview</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
                        <p className="mb-0 text-green-800">
                          IEEE GEU Student Branch is committed to protecting your privacy and ensuring the security of your personal information.
                        </p>
                      </div>
                      <p className="text-gray-700">
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                        or use our services. Please read this policy carefully.
                      </p>
                    </section>

                    <section id="collection" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                          <FaDatabase className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Information We Collect</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl">
                          <h3 className="mb-4 text-xl font-semibold text-blue-800">Personal Information</h3>
                          <div className="grid gap-3 md:grid-cols-2">
                            {[
                              "Name and contact information",
                              "Email address",
                              "Student ID and academic details",
                              "IEEE membership information",
                              "Event registration data",
                              "Communication preferences"
                            ].map((item, index) => (
                              <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                                <FaCheckCircle className="mr-3 text-blue-500" />
                                <span className="text-sm text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 border border-purple-200 bg-purple-50 rounded-xl">
                          <h3 className="mb-4 text-xl font-semibold text-purple-800">Automatically Collected Information</h3>
                          <ul className="ml-4 text-purple-700 list-disc">
                            <li>IP address and location data</li>
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Website usage statistics</li>
                            <li>Pages visited and time spent</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section id="usage" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                          <FaUserShield className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          {
                            title: "Service Provision",
                            items: ["Account management", "Event registration", "Communication", "Support services"]
                          },
                          {
                            title: "Improvement & Analytics",
                            items: ["Website optimization", "User experience enhancement", "Performance monitoring", "Feature development"]
                          }
                        ].map((category, index) => (
                          <div key={index} className="p-6 border border-gray-200 bg-gray-50 rounded-xl">
                            <h3 className="mb-3 text-lg font-semibold text-gray-800">{category.title}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600">
                                  <FaCheckCircle className="mr-2 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section id="sharing" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-red-500 to-red-600">
                          <FaLock className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Information Sharing</h2>
                      </div>
                      
                      <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
                        <div className="flex items-start mb-4">
                          <FaExclamationTriangle className="mt-1 mr-3 text-red-500" />
                          <div>
                            <h3 className="mb-2 text-lg font-semibold text-red-800">We do NOT sell your personal information</h3>
                            <p className="text-red-700">Your privacy is our priority. We only share information in these limited circumstances:</p>
                          </div>
                        </div>
                        <ul className="ml-6 text-red-700 list-disc">
                          <li>With your explicit consent</li>
                          <li>To comply with legal obligations</li>
                          <li>To protect our rights and safety</li>
                          <li>With trusted service providers (under strict confidentiality)</li>
                          <li>For legitimate IEEE organizational purposes</li>
                        </ul>
                      </div>
                    </section>

                    <section id="cookies" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                          <FaCookie className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Cookies & Tracking Technologies</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.
                        </p>
                        
                        <div className="grid gap-4 md:grid-cols-3">
                          {[
                            {
                              type: "Essential Cookies",
                              description: "Required for basic website functionality",
                              color: "green"
                            },
                            {
                              type: "Analytics Cookies",
                              description: "Help us understand how you use our site",
                              color: "blue"
                            },
                            {
                              type: "Preference Cookies",
                              description: "Remember your settings and preferences",
                              color: "purple"
                            }
                          ].map((cookie, index) => (
                            <div key={index} className={`p-4 border border-${cookie.color}-200 bg-${cookie.color}-50 rounded-lg`}>
                              <h4 className={`font-semibold text-${cookie.color}-800 mb-2`}>{cookie.type}</h4>
                              <p className={`text-sm text-${cookie.color}-700`}>{cookie.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section id="rights" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-teal-500 to-teal-600">
                          <FaCheckCircle className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
                      </div>
                      
                      <div className="p-6 border border-teal-200 bg-teal-50 rounded-xl">
                        <p className="mb-4 text-teal-800">You have the right to:</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {[
                            "Access your personal information",
                            "Correct inaccurate data",
                            "Delete your information",
                            "Restrict data processing",
                            "Data portability",
                            "Withdraw consent",
                            "Object to processing",
                            "File complaints with authorities"
                          ].map((right, index) => (
                            <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                              <FaCheckCircle className="mr-3 text-teal-500" />
                              <span className="text-sm text-gray-700">{right}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section id="contact" className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-gray-600 to-gray-700">
                          <FaShieldAlt className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Contact Us</h2>
                      </div>
                      
                      <div className="p-6 border border-gray-200 bg-gray-50 rounded-xl">
                        <p className="mb-4 text-gray-800">For any privacy-related questions or concerns, please contact us:</p>
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Email:</strong> geu.ieee.studentbranch@gmail.com</p>
                          <p><strong>Subject Line:</strong> Privacy Policy Inquiry</p>
                          <p><strong>Address:</strong> 566/6, Bell Road, Society Area, Clement Town, Dehradun, Uttarakhand, PIN: 248002</p>
                        </div>
                      </div>
                    </section>

                    {/* Footer Agreement */}
                    <div className="pt-8 mt-8 border-t border-gray-200">
                      <div className="p-6 text-center bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                        <p className="mb-4 text-lg font-semibold text-gray-900">
                          We are committed to protecting your privacy and will continue to update this policy as needed.
                        </p>
                        <p className="text-gray-600">
                          For our terms and conditions, please see our{' '}
                          <Link href="/terms" className="font-medium text-green-600 hover:text-green-800">
                            Terms of Service
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
