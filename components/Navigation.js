"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' }
  ];
  
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center">
              <span className="font-bold text-xl">IEEE</span>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.href}>
                    {isActive ? (
                      // If already on this page, use a span instead of a link
                      <span className="px-3 py-2 text-blue-700 font-medium">
                        {item.label}
                      </span>
                    ) : (
                      // Otherwise use a link
                      <Link 
                        href={item.href}
                        className="px-3 py-2 text-gray-500 hover:text-blue-700"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
