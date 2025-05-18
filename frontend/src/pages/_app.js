import { useEffect } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // This will run whenever the route changes
  useEffect(() => {
    // Check auth status when component mounts and route changes
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      
      // Check for protected routes that need authentication
      const protectedRoutes = ['/dashboard', '/profile', '/member-area'];
      const isProtectedRoute = protectedRoutes.some(route => 
        router.pathname.startsWith(route)
      );
      
      // If on a protected route and not logged in, redirect to login
      if (isProtectedRoute && !token) {
        router.push('/login');
      }
    };
    
    // Only run on client-side
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, [router.pathname]);
  
  return <Component {...pageProps} />;
}

export default MyApp;
