import { useEffect, useState } from 'react';

export const useSmoothScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Enhanced smooth scrolling configuration
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      * {
        scroll-behavior: smooth;
      }
      
      /* Custom easing for webkit browsers */
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        html {
          scroll-behavior: auto;
        }
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  const scrollTo = (target, options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options
    };

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView(defaultOptions);
      }
    } else if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    scrollTo(0);
  };

  const scrollToSection = (sectionId) => {
    scrollTo(`#${sectionId}`);
  };

  return {
    scrollY,
    scrollTo,
    scrollToTop,
    scrollToSection
  };
};

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState({});
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    };

    const observerInstance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      defaultOptions
    );

    setObserver(observerInstance);

    return () => {
      if (observerInstance) {
        observerInstance.disconnect();
      }
    };
  }, []);

  const observeElement = (element) => {
    if (observer && element) {
      observer.observe(element);
    }
  };

  const unobserveElement = (element) => {
    if (observer && element) {
      observer.unobserve(element);
    }
  };

  return {
    isVisible,
    observeElement,
    unobserveElement
  };
};

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return offset;
};
