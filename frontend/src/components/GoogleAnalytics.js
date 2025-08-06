import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    // Google Analytics 4 (GA4) tracking code
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

    if (!GA_TRACKING_ID) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Track page views on route change
    const handleRouteChange = (url) => {
      gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default GoogleAnalytics; 