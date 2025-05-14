import { useEffect, useState } from 'react';
import '../styles/globals.css';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  
  // This effect runs only on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ErrorBoundary>
      {/* Prevent hydration errors by conditionally rendering components that depend on client-side APIs */}
      {isClient ? <Component {...pageProps} /> : 
        <div style={{ visibility: 'hidden' }}>
          <Component {...pageProps} />
        </div>
      }
    </ErrorBoundary>
  );
}

export default MyApp;
