import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Only run on client-side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Only render full navbar when mounted to prevent hydration errors */}
      {isMounted ? (
        <Navbar scrolled={scrolled} />
      ) : (
        // Render a placeholder with the same height to prevent layout shift
        <div className="h-16 md:h-20"></div>
      )}
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
