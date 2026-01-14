'use client';

import { useEffect, useState, useRef } from 'react';

export default function FixedMenuHandler() {
  const [isFixed, setIsFixed] = useState(false);
  const menuPositionRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    
    // Lấy vị trí menu gốc
    const getMenuPosition = () => {
      const wrapMainNav = document.querySelector('.wrap-main-nav') as HTMLElement;
      const mainNav = document.querySelector('.main-nav') as HTMLElement;
      if (wrapMainNav && mainNav) {
        // Vị trí menu gốc + chiều cao của nó
        menuPositionRef.current = wrapMainNav.offsetTop + mainNav.offsetHeight;
      }
    };

    // Đợi DOM ready rồi lấy vị trí
    setTimeout(getMenuPosition, 300);
    
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
          // Hiện menu fixed khi scroll xuống quá vị trí menu gốc
          // Ẩn khi scroll lên gần menu gốc
          const threshold = menuPositionRef.current || 100;
          setIsFixed(scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    setTimeout(() => {
      const threshold = menuPositionRef.current || 100;
      setIsFixed(getScrollPosition() > threshold);
    }, 400);
    
    // Lắng nghe scroll từ nhiều nguồn
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('resize', getMenuPosition, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', getMenuPosition);
    };
  }, []);

  useEffect(() => {
    const menuDesktop = document.querySelector('.container-menu-desktop');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuDesktop && mainNav) {
      if (isFixed) {
        menuDesktop.classList.add('fix-menu-desktop');
        mainNav.classList.add('show-main-nav');
      } else {
        menuDesktop.classList.remove('fix-menu-desktop');
        mainNav.classList.remove('show-main-nav');
      }
    }
  }, [isFixed]);

  return null;
}
