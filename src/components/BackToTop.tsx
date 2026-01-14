'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    let threshold = 300; // Mặc định
    
    // Lấy vị trí menu gốc để đồng bộ với FixedMenuHandler
    const getThreshold = () => {
      const wrapMainNav = document.querySelector('.wrap-main-nav') as HTMLElement;
      const mainNav = document.querySelector('.main-nav') as HTMLElement;
      if (wrapMainNav && mainNav) {
        threshold = wrapMainNav.offsetTop + mainNav.offsetHeight;
      }
    };
    
    setTimeout(getThreshold, 300);
    
    const getScrollPosition = () => {
      // Lấy scroll position từ tất cả sources
      const windowScroll = window.scrollY || window.pageYOffset || 0;
      const docElementScroll = document.documentElement.scrollTop || 0;
      const bodyScroll = document.body.scrollTop || 0;
      return Math.max(windowScroll, docElementScroll, bodyScroll);
    };
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = getScrollPosition();
          setShow(scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    setTimeout(() => {
      setShow(getScrollPosition() > threshold);
    }, 400);
    
    // Lắng nghe scroll từ nhiều nguồn
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('resize', getThreshold, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('resize', getThreshold);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Tìm tất cả các scroll positions có thể
    const windowScroll = window.scrollY || window.pageYOffset || 0;
    const docElementScroll = document.documentElement.scrollTop || 0;
    const bodyScroll = document.body.scrollTop || 0;
    
    // Lấy scroll position lớn nhất
    const scrollStart = Math.max(windowScroll, docElementScroll, bodyScroll);
    
    // Custom smooth scroll - trượt từ từ lên đầu trang
    const scrollDuration = 800; // 800ms
    const startTime = performance.now();
    
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      const easeProgress = easeOutCubic(progress);
      const newPosition = Math.round(scrollStart * (1 - easeProgress));
      
      // Scroll tất cả các elements có thể
      window.scrollTo({ top: newPosition, behavior: 'auto' });
      document.documentElement.scrollTop = newPosition;
      document.body.scrollTop = newPosition;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Đảm bảo scroll về 0
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };
    
    if (scrollStart > 0) {
      requestAnimationFrame(animateScroll);
    } else {
      // Nếu tất cả đều = 0, thử scroll trực tiếp
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onMouseDown={scrollToTop}
      className="back-to-top-btn"
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '30px',
        width: '35px',
        height: '35px',
        backgroundColor: '#6BC9A8',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        boxShadow: '0 2px 6px rgba(107, 201, 168, 0.4)',
        transition: 'transform 0.3s ease',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: 'none' }}
      >
        <path
          d="M7 14L12 9L17 14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
