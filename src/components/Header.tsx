'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Current time logic
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format time: HH:MM
      const time = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      // Format date: Thứ X, DD/MM/YYYY
      const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      const dayName = dayNames[now.getDay()];
      const date = `${dayName}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
      
      setCurrentTime(time);
      setCurrentDate(date);
    };

    // Update immediately
    updateDateTime();
    
    // Update every second
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      {/* Header desktop */}
      <div className="container-menu-desktop">
        <div className="topbar">
          <div className="content-topbar container h-100">
            <div className="left-topbar">
              <span className="left-topbar-item">Hà Nội, VN</span>
              <span className="left-topbar-item">
                <i className="fa fa-calendar-alt" style={{ marginRight: '6px', fontSize: '11px' }}></i>
                {currentDate}
              </span>
              <span className="left-topbar-item">
                <i className="fa fa-clock" style={{ marginRight: '6px', fontSize: '11px' }}></i>
                <span style={{ fontFamily: 'monospace' }}>{currentTime}</span>
              </span>
              <a href="#" className="left-topbar-item">Về chúng tôi</a>
              <Link href="/contact" className="left-topbar-item">Liên hệ</Link>
            </div>

            <div className="right-topbar">
              <a href="https://www.tiktok.com/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                <span className="fab fa-facebook-f"></span>
              </a>
              <a href="https://www.youtube.com/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                <span className="fab fa-youtube"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          <div className="logo-mobile-container">
            <div className="logo-mobile">
              <Link href="/" style={{width:'100%',height:'100%'}}>
                <img src="/images/icons/logo.png" alt="IMG-LOGO" />
              </Link>
            </div>
            
            <div className="banner-header-mobile">
              <div className="banner-text-container-mobile">
                <div className="banner-title-mobile">TRANG THÔNG TIN ĐIỆN TỬ</div>
                <div className="banner-main-mobile">
                  <span className="green-text">Nhân tài nhân lực văn hóa sức khỏe cộng đồng</span>
                </div>
                <div className="banner-subtitle-mobile">
                  Chuyên trang ngôn luận của Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`btn-show-menu-mobile hamburger hamburger--squeeze m-r--8 ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className="menu-mobile" style={{ display: mobileMenuOpen ? 'block' : 'none' }}>
          <ul className="topbar-mobile">
            <li className="left-topbar">
              <span className="left-topbar-item">Hà Nội, VN</span>
              <span className="left-topbar-item">
                <i className="fa fa-calendar-alt" style={{ marginRight: '6px', fontSize: '11px' }}></i>
                {currentDate}
              </span>
              <span className="left-topbar-item">
                <i className="fa fa-clock" style={{ marginRight: '6px', fontSize: '11px' }}></i>
                <span style={{ fontFamily: 'monospace' }}>{currentTime}</span>
              </span>
            </li>

            <li className="left-topbar">
                  <a href="#" className="left-topbar-item">Về chúng tôi</a>
                  <Link href="/contact" className="left-topbar-item">Liên hệ</Link>
            </li>

            <li className="left-topbar">
              <a href="https://www.tiktok.com/" className="left-topbar-item" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '0 8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/" className="left-topbar-item" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '0 8px' }}>
                <span className="fab fa-facebook-f" style={{ fontSize: '18px' }}></span>
              </a>
              <a href="https://www.youtube.com/" className="left-topbar-item" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '0 8px' }}>
                <span className="fab fa-youtube" style={{ fontSize: '18px' }}></span>
              </a>
            </li>
          </ul>

          <ul className="main-menu-m">
            <MobileMenuItem title="Tin tức" href="/category/tin-tuc" subItems={[
              { title: 'Chính trị', href: '/category/tin-tuc/chinh-tri' },
              { title: 'Kinh tế', href: '/category/tin-tuc/kinh-te' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Sức khỏe cộng đồng" href="/category/suc-khoe-cong-dong" subItems={[
              { title: 'Tư vấn', href: '/category/suc-khoe-cong-dong/tu-van' },
              { title: 'Sống khỏe', href: '/category/suc-khoe-cong-dong/song-khoe' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Văn hóa" href="/category/van-hoa" onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Xã hội" href="/category/xa-hoi" subItems={[
              { title: 'Pháp luật', href: '/category/xa-hoi/phap-luat' },
              { title: 'An ninh xã hội', href: '/category/xa-hoi/an-ninh-xa-hoi' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Y học cổ truyền" href="/category/y-hoc-co-truyen" subItems={[
              { title: 'Các bài thuốc', href: '/category/y-hoc-co-truyen/cac-bai-thuoc' },
              { title: 'Chân dung nhân vật', href: '/category/y-hoc-co-truyen/chan-dung-nhan-vat' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Khoa học công nghệ" href="/category/khoa-hoc-cong-nghe" onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Hợp tác liên kết" href="/category/hop-tac-lien-ket" subItems={[
              { title: 'Hợp tác liên kết', href: '/category/hop-tac-lien-ket' },
              { title: 'Đào tạo', href: '/category/hop-tac-lien-ket/dao-tao' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Trao đổi" href="/category/trao-doi" subItems={[
              { title: 'Ý kiến hội viên', href: '/category/trao-doi/y-kien-hoi-vien' },
              { title: 'Giới thiệu', href: '/category/trao-doi/gioi-thieu' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Thư viện" href="/category/thu-vien" subItems={[
              { title: 'Thư viện ảnh', href: '/category/thu-vien/thu-vien-anh' },
              { title: 'Thư viện Video', href: '/category/thu-vien/thu-vien-video' },
              { title: 'E-magazine', href: '/category/thu-vien/e-magazine' },
              { title: 'Báo in', href: '/category/thu-vien/bao-in' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
          </ul>
        </div>
        
        {/* Logo and Banner */}
        <div className="wrap-logo container">
          <div className="logo">
            <Link href="/" style={{width:'100%',height:'100%'}}>
              <img src="/images/icons/logo.png" alt="LOGO" />
            </Link>
          </div>
          
          <div className="banner-header">
            <div className="banner-text-container">
              <div className="banner-title">TRANG THÔNG TIN ĐIỆN TỬ</div>
              <div className="banner-main">
                <span className="green-text">Nhân tài nhân lực văn hóa sức khỏe cộng đồng</span>
              </div>
              <div className="banner-subtitle">
                Chuyên trang ngôn luận của Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
          <div className="wrap-main-nav">
            <div className="main-nav">
              <nav className="menu-desktop">
                <Link className="logo-stick" href="/">
                  <img src="/images/icons/logo.png" alt="LOGO" />
                </Link>

                <ul className="main-menu">
                  <DesktopMenuItem title="Tin tức" href="/category/tin-tuc" subItems={[
                    { title: 'Chính trị', href: '/category/tin-tuc/chinh-tri' },
                    { title: 'Kinh tế', href: '/category/tin-tuc/kinh-te' }
                  ]} />
                  <DesktopMenuItem title="Sức khỏe cộng đồng" href="/category/suc-khoe-cong-dong" subItems={[
                    { title: 'Tư vấn', href: '/category/suc-khoe-cong-dong/tu-van' },
                    { title: 'Sống khỏe', href: '/category/suc-khoe-cong-dong/song-khoe' }
                  ]} />
                  <li className="no-dropdown">
                    <Link className="nowarp-text" href="/category/van-hoa">Văn hóa</Link>
                  </li>
                  <DesktopMenuItem title="Xã hội" href="/category/xa-hoi" subItems={[
                    { title: 'Pháp luật', href: '/category/xa-hoi/phap-luat' },
                    { title: 'An ninh xã hội', href: '/category/xa-hoi/an-ninh-xa-hoi' }
                  ]} />
                  <DesktopMenuItem title="Y học cổ truyền" href="/category/y-hoc-co-truyen" subItems={[
                    { title: 'Các bài thuốc', href: '/category/y-hoc-co-truyen/cac-bai-thuoc' },
                    { title: 'Chân dung nhân vật', href: '/category/y-hoc-co-truyen/chan-dung-nhan-vat' }
                  ]} />
                  <li className="no-dropdown">
                    <Link className="nowarp-text" href="/category/khoa-hoc-cong-nghe">Khoa học công nghệ</Link>
                  </li>
                  <DesktopMenuItem title="Hợp tác liên kết" href="/category/hop-tac-lien-ket" subItems={[
                    { title: 'Hợp tác liên kết', href: '/category/hop-tac-lien-ket' },
                    { title: 'Đào tạo', href: '/category/hop-tac-lien-ket/dao-tao' }
                  ]} />
                  <DesktopMenuItem title="Trao đổi" href="/category/trao-doi" subItems={[
                    { title: 'Ý kiến hội viên', href: '/category/trao-doi/y-kien-hoi-vien' },
                    { title: 'Giới thiệu', href: '/category/trao-doi/gioi-thieu' }
                  ]} />
                  <DesktopMenuItem title="Thư viện" href="/category/thu-vien" subItems={[
                    { title: 'Thư viện ảnh', href: '/category/thu-vien/thu-vien-anh' },
                    { title: 'Thư viện Video', href: '/category/thu-vien/thu-vien-video' },
                    { title: 'E-magazine', href: '/category/thu-vien/e-magazine' },
                    { title: 'Báo in', href: '/category/thu-vien/bao-in' }
                  ]} />
                </ul>
              </nav>
            </div>
          </div>
      </div>
    </header>
  );
}

// Desktop Menu Item Component
function DesktopMenuItem({ title, href, subItems }: { 
  title: string; 
  href: string; 
  subItems?: { title: string; href: string }[] 
}) {
  return (
    <li>
      <Link className="nowarp-text" href={href}>{title}</Link>
      {subItems && subItems.length > 0 && (
        <ul className="sub-menu">
          {subItems.map((item, index) => (
            <li key={index}><Link href={item.href}>{item.title}</Link></li>
          ))}
        </ul>
      )}
    </li>
  );
}

// Mobile Menu Item Component
function MobileMenuItem({ title, href, subItems, onLinkClick }: { 
  title: string; 
  href: string; 
  subItems?: { title: string; href: string }[];
  onLinkClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <li>
      <Link href={href} onClick={handleLinkClick}>{title}</Link>
      {subItems && subItems.length > 0 && (
        <>
          <ul className="sub-menu-m" style={{ display: isOpen ? 'block' : 'none' }}>
            {subItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} onClick={handleLinkClick}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <span 
            className={`arrow-main-menu-m ${isOpen ? 'turn-arrow-main-menu-m' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </>
      )}
    </li>
  );
}

