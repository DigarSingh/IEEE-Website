import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-12 pb-8 text-white bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Organization Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/images/logo.png" 
                alt="IEEE Logo" 
                className="w-auto h-10 mr-3" 
              />
              <h3 className="text-xl font-bold"> </h3>
            </div>
            <p className="mb-4 text-gray-400">
              Empowering students through technology, innovation, and professional development.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                <FaFacebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                <FaLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                <FaGithub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">Events</span>
                </Link>
              </li>
              <li>
                <Link href="/membership">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">Membership</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                  IEEE Global
                </a>
              </li>
              <li>
                <a href="https://students.ieee.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                  IEEE Students
                </a>
              </li>
              <li>
                <Link href="/resources">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">Learning Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-gray-400 transition-colors cursor-pointer hover:text-white">FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center mb-4">
              <img 
                src="/images/logo.png" 
                alt="IEEE Logo" 
                className="w-auto h-16" 
              />
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="flex-shrink-0 mt-1 mr-3 text-ieee-blue" />
                <span className="text-gray-400">
                  566/6, Bell Road, Society Area,<br />
                  Clement Town,<br />
                  Dehradun, Uttarakhand, PIN : 248002
                </span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="flex-shrink-0 mr-3 text-ieee-blue" />
                <a href="mailto:ieeeclub@university.edu" className="text-gray-400 transition-colors hover:text-white">
                  ieeeclub@university.edu
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="flex-shrink-0 mr-3 text-ieee-blue" />
                <a href="tel:+1234567890" className="text-gray-400 transition-colors hover:text-white">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-700 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {currentYear} IEEE College Club. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <Link href="/privacy">
              <span className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-white">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-white">Terms of Service</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
