'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Extend window type for custom functions
declare global {
  interface Window {
    jQuery: any;
    $: any;
    initMainJS?: () => void;
    reinitMainJS?: () => void;
    initHomePageJS?: () => void;
    refreshWeather?: () => void;
  }
}

export default function ClientInit() {
  const pathname = usePathname();

  // Hide loading immediately on mount
  useEffect(() => {
    // Immediately hide loading and show content for Next.js
    const hideLoadingImmediately = () => {
      // Hide loading screen
      const loadingEl = document.querySelector('.animsition-loading-1');
      if (loadingEl) {
        loadingEl.classList.add('hide-loading');
        setTimeout(() => loadingEl.remove(), 600);
      }
      
      // Show content
      document.body.classList.add('page-loaded');
      const animsitionEl = document.querySelector('.animsition');
      if (animsitionEl) {
        animsitionEl.classList.add('animsition-loaded');
        (animsitionEl as HTMLElement).style.opacity = '1';
        }
      };

    // Run immediately
    hideLoadingImmediately();

    // Also run after a small delay as backup
    const timeout1 = setTimeout(hideLoadingImmediately, 100);
    const timeout2 = setTimeout(hideLoadingImmediately, 500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  useEffect(() => {
    // Wait for jQuery and custom scripts to load
    const waitForScripts = () => {
      return new Promise<void>((resolve) => {
        const checkScripts = () => {
          if (typeof window !== 'undefined' && window.jQuery && window.initMainJS) {
            resolve();
          } else {
            setTimeout(checkScripts, 100);
          }
        };
        checkScripts();
      });
    };

    // Initialize all scripts
    const initScripts = async () => {
      try {
        await waitForScripts();
        
        // Initialize main.js functions
        if (window.initMainJS) {
          window.initMainJS();
              }

      } catch (error) {
        // Error initializing scripts
      }
    };

    // Delay initialization to ensure DOM is ready
    const timeout = setTimeout(initScripts, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Re-initialize on route change (for Next.js navigation)
  useEffect(() => {
    // Scroll to top on route change
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Scroll immediately
    scrollToTop();
    
    // Scroll after render
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Scroll after delays to ensure it works
    const timeouts = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200),
      setTimeout(scrollToTop, 300),
    ];
    
    if (typeof window !== 'undefined' && window.reinitMainJS) {
      // Small delay to ensure new page content is rendered
      const timeout = setTimeout(() => {
        window.reinitMainJS?.();
      }, 100);
      timeouts.push(timeout);
    }
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}

