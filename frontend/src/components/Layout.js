import dynamic from 'next/dynamic';
import Footer from './Footer';

// Import Navbar with SSR disabled to avoid hydration errors
const Navbar = dynamic(() => import('./Navbar'), { ssr: true });

export default function Layout({ children, hideFooter = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
