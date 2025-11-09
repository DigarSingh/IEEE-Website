
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp, FaUsers, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-50 p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: showScrollTop ? 0 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowUp size={20} />
      </motion.button>

      <div className="relative">

        {/* Main Footer Content */}
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Enhanced Organization Info */}
            <motion.div
              className="lg:col-span-1"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <motion.div
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img
                      src="/images/logo.png"
                      alt="IEEE Logo"
                      className="h-22 w-22"
                    />

                  </div>

                </motion.div>
                <p className="mb-6 leading-relaxed text-gray-300">
                  Empowering students through technology, innovation, and professional development.
                  Join us in shaping the future of engineering and technology.
                </p>

                {/*Social Links */}
                <div className="flex space-x-4">
                  {[
                    { icon: FaInstagram, href: "https://www.instagram.com/ieee.geu/", color: "from-pink-500 to-purple-600" },
                    { icon: FaLinkedin, href: "https://www.linkedin.com/company/geu-ieee-student-branch/", color: "from-blue-500 to-blue-700" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 rounded-xl bg-gradient-to-r ${social.color} text-white transition-all hover:shadow-lg hover:shadow-blue-500/25`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={18} />
                      <span className="sr-only">{social.href}</span>
                      <div className="absolute inset-0 transition-opacity opacity-0 rounded-xl bg-white/20 group-hover:opacity-100"></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Quick Links */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Us" },
                  { href: "/events", label: "Events" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={link.href}>
                      <span className="relative cursor-pointer group">
                        <span className="text-gray-400 transition-all group-hover:text-white group-hover:pl-2">
                          {link.label}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:w-full"></span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            {/*Resources */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-xl font-bold text-white">Resources</h3>
              <ul className="space-y-4">
                {[
                  { href: "https://www.ieee.org/", label: "IEEE Global", external: true },
                  { href: "https://students.ieee.org/", label: "IEEE Students", external: true },
                  { href: "/resources", label: "Learning Resources", external: false },
                  { href: "/faq", label: "FAQ", external: false }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative cursor-pointer group"
                      >
                        <span className="text-gray-400 transition-all group-hover:text-white group-hover:pl-2">
                          {link.label}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:w-full"></span>
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span className="relative cursor-pointer group">
                          <span className="text-gray-400 transition-all group-hover:text-white group-hover:pl-2">
                            {link.label}
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:w-full"></span>
                        </span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            {/* Enhanced Contact Section */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-xl font-bold text-white">Contact Us</h3>

              <ul className="space-y-4">
                <motion.li
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 transition-all rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700">
                    <FaMapMarkerAlt className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 transition-colors group-hover:text-white">
                    566/6, Bell Road, Society Area,<br />
                    Clement Town,<br />
                    Dehradun, Uttarakhand, PIN: 248002
                  </span>
                </motion.li>

                <motion.li
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 transition-all rounded-lg bg-gradient-to-r from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700">
                    <FaEnvelope className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href="mailto:geu.ieee.studentbranch@gmail.com"
                    className="text-gray-300 break-all transition-colors group-hover:text-white"
                  >
                    geu.ieee.studentbranch@gmail.com
                  </a>
                </motion.li>

                <motion.li
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 transition-all rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700">
                    <FaPhone className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href="tel:+917668410473"
                    className="text-gray-300 transition-colors group-hover:text-white"
                  >
                    +91 7668410473
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/*Bottom Section */}
        <motion.div
          className="pt-4 mt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <motion.div
              className="flex items-center space-x-2 text-sm text-gray-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span>© {currentYear} IEEE GEU Student Branch. All rights reserved.</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 text-base text-gray-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-medium">Developed with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span className="font-medium">by <span className="font-bold text-blue-400 text-lg">Digar</span></span>
            </motion.div>

            <div className="flex space-x-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/privacy">
                  <span className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-white">
                    Privacy Policy
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/terms">
                  <span className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-white">
                    Terms of Service
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
