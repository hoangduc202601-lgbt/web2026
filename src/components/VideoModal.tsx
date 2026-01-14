'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const VIDEO_ID = 'y-1dOubitUE';
const VIDEO_URL = `https://www.youtube.com/embed/${VIDEO_ID}?rel=0&enablejsapi=1`;

export default function VideoModal() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const preloadTriggeredRef = useRef(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Chỉ preload video khi ở trang home
    if (!isHomePage) {
      // Nếu không ở trang home, xóa src để không load video
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
      return;
    }

    // Preload video ngay lập tức khi component mount (không delay)
    const preloadVideo = () => {
      if (iframeRef.current && !preloadTriggeredRef.current) {
        // Set iframe src để preload video ngay lập tức
        // YouTube sẽ bắt đầu load video player trong background
        iframeRef.current.src = VIDEO_URL;
        preloadTriggeredRef.current = true;
      }
    };

    // Load ngay lập tức khi component mount
    preloadVideo();

    // Backup: Nếu iframe chưa sẵn sàng, thử lại ngay lập tức
    if (!iframeRef.current) {
      // Sử dụng requestAnimationFrame để đảm bảo DOM đã sẵn sàng
      requestAnimationFrame(() => {
        preloadVideo();
      });
    }
  }, [pathname, isHomePage]);

  return (
    <div className="modal fade" id="modal-video-01" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document" data-dismiss="modal">
        <div className="close-mo-video-01 trans-0-4" data-dismiss="modal" aria-label="Close">&times;</div>
        <div className="wrap-video-mo-01">
          <div className="video-mo-01">
            <iframe 
              ref={iframeRef}
              src={isHomePage ? VIDEO_URL : ''}
              allowFullScreen
              loading="eager"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

