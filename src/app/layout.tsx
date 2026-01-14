import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientInit from '@/components/ClientInit';
import BackToTop from '@/components/BackToTop';
import FixedMenuHandler from '@/components/FixedMenuHandler';
import LoadingIndicator from '@/components/LoadingIndicator';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nhân tài nhân lực văn hóa sức khỏe cộng đồng',
  description: 'Trang thông tin điện tử - Nhân tài nhân lực văn hóa sức khỏe cộng đồng',
  icons: {
    icon: '/images/icons/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/images/icons/favicon.png" />
        
        {/* Bootstrap CSS */}
        <link rel="stylesheet" type="text/css" href="/vendor/bootstrap/css/bootstrap.min.css" />
        
        {/* Font Awesome */}
        <link rel="stylesheet" type="text/css" href="/fonts/fontawesome-5.0.8/css/fontawesome-all.min.css" />
        
        {/* Material Design Iconic Font */}
        <link rel="stylesheet" type="text/css" href="/fonts/iconic/css/material-design-iconic-font.min.css" />
        
        {/* Animate CSS */}
        <link rel="stylesheet" type="text/css" href="/vendor/animate/animate.css" />
        
        {/* Hamburgers CSS */}
        <link rel="stylesheet" type="text/css" href="/vendor/css-hamburgers/hamburgers.min.css" />
        
        {/* Animsition CSS */}
        <link rel="stylesheet" type="text/css" href="/vendor/animsition/css/animsition.min.css" />
        
        {/* Main CSS */}
        <link rel="stylesheet" type="text/css" href="/css/util.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/main.css" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700;900&display=swap" rel="stylesheet" />
        
        {/* Critical CSS - Force page visibility for Next.js */}
        <style dangerouslySetInnerHTML={{ __html: `
          .animsition { opacity: 1 !important; }
          .animsition-loading-1 { display: none !important; }
        `}} />
        
        {/* Suppress ALL console output */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var noop = function() {};
            console.log = noop;
            console.info = noop;
            console.warn = noop;
            console.debug = noop;
            console.trace = noop;
          })();
        `}} />
        
        {/* Disable scroll restoration and ensure scroll to top */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
          }
        `}} />
      </head>
      <body className="animsition page-loaded">
        {/* Loading indicator */}
        <Suspense fallback={null}>
          <LoadingIndicator />
        </Suspense>
        
        {/* Client-side initialization */}
        <ClientInit />
        
        {/* Fixed menu handler */}
        <FixedMenuHandler />
        
        {/* Header */}
        <Header />

        {/* Content */}
        {children}

        {/* Footer */}
        <Footer />

        {/* Back to top button */}
        <BackToTop />

        {/* Modal Video */}
        <VideoModal />

        {/* Scripts */}
        <Script src="/vendor/jquery/jquery-3.2.1.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/animsition/js/animsition.min.js" strategy="afterInteractive" />
        <Script src="/vendor/bootstrap/js/popper.js" strategy="afterInteractive" />
        <Script src="/vendor/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
        
        {/* Main JS */}
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/homePage/homePage.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

// Back to top component is now imported from @/components/BackToTop

// Video modal component
function VideoModal() {
  return (
    <div className="modal fade" id="modal-video-01" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document" data-dismiss="modal">
        <div className="close-mo-video-01 trans-0-4" data-dismiss="modal" aria-label="Close">&times;</div>
        <div className="wrap-video-mo-01">
          <div className="video-mo-01">
            <iframe src="https://www.youtube.com/embed/y-1dOubitUE?rel=0" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

