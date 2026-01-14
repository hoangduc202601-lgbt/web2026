'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Khi pathname hoặc searchParams thay đổi, tắt loading
    setIsLoading(false);
    
    // Scroll về đầu trang với nhiều cách để đảm bảo hoạt động
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Scroll ngay lập tức
    scrollToTop();
    
    // Scroll sau khi DOM render
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Scroll sau một khoảng thời gian ngắn (đảm bảo sau khi Next.js hoàn tất navigation)
    setTimeout(() => {
      scrollToTop();
    }, 0);
    
    setTimeout(() => {
      scrollToTop();
    }, 100);
    
    setTimeout(() => {
      scrollToTop();
    }, 300);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Lắng nghe click vào các link
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        // Chỉ hiển thị loading cho các link nội bộ (không phải external, anchor, hoặc javascript)
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('javascript:') && 
            !href.startsWith('http') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            !link.getAttribute('download')) {
          
          // Kiểm tra xem href có trùng với pathname hiện tại không
          const currentPath = pathname || window.location.pathname;
          const targetPath = href.split('?')[0]; // Bỏ query string
          
          if (targetPath === currentPath) {
            // Nếu trùng, chỉ scroll về đầu trang, không hiển thị loading
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            // Ngăn chặn navigation mặc định
            e.preventDefault();
            return;
          }
          
          // Nếu khác, hiển thị loading
          setIsLoading(true);
          
          // Scroll về đầu trang ngay khi click
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          // Timeout để tự động tắt loading nếu quá lâu (tránh bị kẹt)
          setTimeout(() => {
            setIsLoading(false);
          }, 10000);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Spinner */}
        <div 
          style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #17b978',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }}
        ></div>
        <p style={{ color: '#17b978', fontSize: '14px', fontWeight: 500 }}>
          Đang tải...
        </p>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

