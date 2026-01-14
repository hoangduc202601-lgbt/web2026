'use client';

// Back to top button functionality
export function initBackToTop() {
  if (typeof window === 'undefined') return;

  const btnTop = document.querySelector('.btn-back-to-top');
  if (!btnTop) return;

  // Toggle visibility based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 600) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Scroll to top when clicked
  btnTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return () => window.removeEventListener('scroll', handleScroll);
}

// Fixed header functionality
export function initFixedHeader() {
  if (typeof window === 'undefined') return;

  const header = document.querySelector('.container-menu-header') as HTMLElement;
  const headerFixed = document.querySelector('.header-fixed') as HTMLElement;
  
  if (!header || !headerFixed) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      headerFixed.classList.add('show-header-fixed');
    } else {
      headerFixed.classList.remove('show-header-fixed');
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}

// Mobile menu toggle
export function initMobileMenu() {
  if (typeof window === 'undefined') return;

  const hamburger = document.querySelector('.btn-show-menu-mobile');
  const mobileMenu = document.querySelector('.menu-mobile');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('show');
  });
}

// Mobile submenu toggle
export function initMobileSubmenu() {
  if (typeof window === 'undefined') return;

  const arrows = document.querySelectorAll('.arrow-main-menu-m');
  
  arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
      const parent = (e.currentTarget as HTMLElement).parentElement;
      if (!parent) return;
      
      const submenu = parent.querySelector('.sub-menu-m');
      if (submenu) {
        submenu.classList.toggle('show');
        arrow.classList.toggle('turn-arrow-main-menu-m');
      }
    });
  });
}

// Tab functionality for news categories
export function initTabs() {
  if (typeof window === 'undefined') return;

  const tabContainers = document.querySelectorAll('.tab01');
  
  tabContainers.forEach((container) => {
    const tabs = container.querySelectorAll('.tab01-head a');
    const contents = container.querySelectorAll('.tab01-body .tab01-content');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked tab
        tab.classList.add('active');
        if (contents[index]) {
          contents[index].classList.add('active');
        }
      });
    });
  });
}

// Mega menu hover
export function initMegaMenu() {
  if (typeof window === 'undefined') return;

  const megaMenus = document.querySelectorAll('.mega-menu');
  
  megaMenus.forEach((menu) => {
    const tabs = menu.querySelectorAll('.mega-menu-headline');
    const contents = menu.querySelectorAll('.mega-menu-content');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('mouseenter', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        if (contents[index]) {
          contents[index].classList.add('active');
        }
      });
    });
  });
}

// Trending text slider
export function initTrendingSlider() {
  if (typeof window === 'undefined') return;

  const containers = document.querySelectorAll('.slide100-txt');
  
  containers.forEach((container) => {
    const items = container.querySelectorAll('li');
    if (items.length === 0) return;

    let currentIndex = 0;

    const showNext = () => {
      items.forEach((item) => item.classList.remove('active'));
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].classList.add('active');
    };

    // Show first item
    items[0].classList.add('active');

    // Rotate every 3 seconds
    const interval = setInterval(showNext, 3000);
    
    return () => clearInterval(interval);
  });
}

// Initialize all animations
export function initAllAnimations() {
  const cleanups: ((() => void) | undefined)[] = [];
  
  cleanups.push(initBackToTop());
  cleanups.push(initFixedHeader());
  initMobileMenu();
  initMobileSubmenu();
  initTabs();
  initMegaMenu();
  initTrendingSlider();
  
  return () => {
    cleanups.forEach(cleanup => cleanup?.());
  };
}

