import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ scrolled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Membership', href: '/membership' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="container flex items-center justify-between px-4 mx-auto">
        <Link href="/" legacyBehavior>
          <a className="relative z-10">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="IEEE Logo" className="w-auto h-10" />
              <span className="ml-2 text-xl font-bold text-ieee-blue"></span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden md:flex">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} legacyBehavior>
                  <a className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(link.href) 
                      ? 'text-ieee-blue' 
                      : 'text-gray-700 hover:text-ieee-blue'
                  }`}>
                    {link.name}
                    {isActive(link.href) && (
                      <motion.div 
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-ieee-blue"
                      />
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* GEU Logo */}
          <div className="flex items-center ml-6">
            <img 
              src="/images/geu_logo.png" 
              alt="GEU Logo" 
              className="w-auto h-10" 
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          {/* GEU Logo (mobile) */}
          <div className="mr-4">
            <img 
              src="/images/geu_logo.png" 
              alt="GEU Logo" 
              className="w-auto h-8" 
            />
          </div>
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-ieee-blue focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-white md:hidden"
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link href={link.href} legacyBehavior key={link.name}>
              <a
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href) 
                    ? 'text-ieee-blue bg-blue-50' 
                    : 'text-gray-700 hover:text-ieee-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;