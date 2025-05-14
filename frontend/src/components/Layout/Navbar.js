import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ isScrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center flex-shrink-0 cursor-pointer">
                <img 
                  className="w-auto h-12" 
                  src="/images/logo.png" 
                  alt="IEEE Logo" 
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden md:flex">
            <div className="flex items-baseline ml-10 space-x-4">
              {navItems.map(item => (
                <Link href={item.path} key={item.name}>
                  <span className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    router.pathname === item.path ? 
                    'text-ieee-blue bg-ieee-light' : 
                    'text-gray-700 hover:text-ieee-blue'
                  } cursor-pointer`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* GEU Logo */}
            <div className="flex items-center ml-6">
              <img 
                className="w-auto h-10" 
                src="/images/geu_logo.png" 
                alt="GEU Logo" 
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* GEU Logo (mobile) */}
            <div className="mr-4">
              <img 
                className="w-auto h-8" 
                src="/images/geu_logo.png" 
                alt="GEU Logo" 
              />
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-ieee-blue focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-white md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => (
              <Link href={item.path} key={item.name}>
                <span 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === item.path ? 
                    'text-ieee-blue bg-ieee-light' : 
                    'text-gray-700 hover:text-ieee-blue'
                  } cursor-pointer`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
