
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUserShield, FaDatabase, FaShareAlt, FaLock, FaUserCheck, FaSyncAlt, FaFileContract, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
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
        <meta name="description" content="Privacy Policy for IEEE GEU Student Branch website" />
      </Head>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900">
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
              <FaFileContract className="mr-2 text-green-300" />
              <span className="text-sm font-medium">Privacy Statement</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl"
            >
              Privacy <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">Policy</span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="mb-8 text-xl text-green-100"
            >
              Learn how we collect, use, and protect your information
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-200 rounded-full bg-green-800/30 backdrop-blur-sm"
            >
              <FaCheckCircle className="mr-2" />
              Last updated: 10 May 2025
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
                      { id: 'info', title: 'Information We Collect', icon: FaUserShield },
                      { id: 'use', title: 'How We Use Information', icon: FaDatabase },
                      { id: 'sharing', title: 'Information Sharing', icon: FaShareAlt },
                      { id: 'security', title: 'Data Security', icon: FaLock },
                      { id: 'rights', title: 'Your Rights', icon: FaUserCheck },
                      { id: 'updates', title: 'Policy Updates', icon: FaSyncAlt },
                      { id: 'contact', title: 'Contact Us', icon: FaFileContract }
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
                    <section id="info" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                          <FaUserShield className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Information We Collect</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
                        <p className="mb-0 text-green-800">
                          We collect information you provide directly to us, such as when you create an account, register for events, or contact us. This may include:
                        </p>
                      </div>
                      <ul className="pl-6 text-gray-700 list-disc">
                        <li>Name and contact information</li>
                        <li>Student ID and academic information</li>
                        <li>Event registration details</li>
                        <li>Profile information and preferences</li>
                      </ul>
                    </section>

                    <section id="use" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                          <FaDatabase className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">How We Use Information</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl">
                        <p className="mb-0 text-blue-800">
                          We use the information we collect to:
                        </p>
                      </div>
                      <ul className="pl-6 text-gray-700 list-disc">
                        <li>Provide and maintain our services</li>
                        <li>Process event registrations and certificates</li>
                        <li>Send you important updates and notifications</li>
                        <li>Improve our website and services</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </section>

                    <section id="sharing" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                          <FaShareAlt className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Information Sharing</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-purple-500 bg-purple-50 rounded-r-xl">
                        <p className="mb-0 text-purple-800">
                          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                        </p>
                      </div>
                    </section>

                    <section id="security" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600">
                          <FaLock className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Data Security</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-xl">
                        <p className="mb-0 text-yellow-800">
                          We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                      </div>
                    </section>

                    <section id="rights" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-pink-500 to-pink-600">
                          <FaUserCheck className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Your Rights</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-pink-500 bg-pink-50 rounded-r-xl">
                        <p className="mb-0 text-pink-800">You have the right to:</p>
                      </div>
                      <ul className="pl-6 text-gray-700 list-disc">
                        <li>Access your personal information</li>
                        <li>Update or correct your information</li>
                        <li>Request deletion of your information</li>
                        <li>Opt-out of certain communications</li>
                      </ul>
                    </section>

                    <section id="updates" className="mb-12">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600">
                          <FaSyncAlt className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Policy Updates</h2>
                      </div>
                      <div className="p-6 mb-6 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-xl">
                        <p className="mb-0 text-indigo-800">
                          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          <strong>Last Updated:</strong> 10 May 2025
                        </p>
                      </div>
                    </section>

                    <section id="contact" className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="p-3 mr-4 text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                          <FaFileContract className="text-xl" />
                        </div>
                        <h2 className="mb-0 text-3xl font-bold text-gray-900">Contact Us</h2>
                      </div>
                      <div className="p-6 border border-blue-200 bg-blue-50 rounded-xl">
                        <p className="mb-4 text-blue-800">If you have any questions about this Privacy Policy, please contact us at:</p>
                        <div className="space-y-2 text-blue-700">
                          <p><strong>Email:</strong> geu.ieee.studentbranch@gmail.com</p>
                          <p><strong>Address:</strong> 566/6, Bell Road, Society Area, Clement Town, Dehradun, Uttarakhand, PIN: 248002</p>
                        </div>
                      </div>
                    </section>

                    {/* Footer Agreement */}
                    <div className="pt-8 mt-8 border-t border-gray-200">
                      <div className="p-6 text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                        <p className="mb-4 text-lg font-semibold text-gray-900">
                          By using our Services, you acknowledge that you have read and understood this Privacy Policy.
                        </p>
                        <p className="text-gray-600">
                          For terms and conditions, please see our{' '}
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
