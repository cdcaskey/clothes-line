import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnchorScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Wait a bit for the page to render
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else if (location.pathname === '/') {
      // If we're on the home page without a hash, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [location.hash, location.pathname]);
}; 