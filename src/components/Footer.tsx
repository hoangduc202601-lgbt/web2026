'use client';

export default function Footer() {
  return (
    <footer>
      <div className="bg2 p-t-40 p-b-25">
        <div className="container">
          <div className="row">
            {/* Phần bên trái: Logo và thông tin viện */}
            <div className="col-lg-8 p-b-20">
              <div className="row">
                {/* Logo */}
                <div className="col-md-3 p-b-20">
                  <div className="size-h-3 flex-s-c">
                    <img className="max-s-full" src="/images/icons/logo.png" alt="LOGO" style={{ maxWidth: '150px' }} />
                  </div>
                  <p className="f1-s-1 cl11 p-t-10" style={{ fontSize: '10px', color: '#999' }}>
                    INSTITUTION FOR CULTURAL DEVELOPMENT AND COMMUNITY HEALTHCARE
                  </p>
                </div>
                
                {/* Thông tin viện */}
                <div className="col-md-9 p-b-20">
                  <h3 className="f1-m-7 cl0 p-b-10" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    VIỆN PHÁT TRIỂN VĂN HÓA VÀ CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG
                  </h3>
                  
                  <div className="f1-s-1 cl11 p-b-8" style={{ lineHeight: 1.8 }}>
                    <p className="p-b-5">
                      <strong>Chủ tịch Hội đồng Quản lý Viện:</strong> Nhà báo Lê Thị Tuyết (Bút Danh: Lê Hà)
                    </p>
                    <p className="p-b-5">
                      <strong>Chịu trách nhiệm Quản lý nội dung:</strong> Phó Viện trưởng, Nhà báo Lại Đức Hồng
                    </p>
                    <p className="p-b-5">
                      <strong>Chủ tịch Hội đồng cố vấn Biên tập:</strong> Nguyễn Tuấn Anh, Đại biểu Quốc hội khoá XV
                    </p>
                    <p className="p-b-5">
                      <strong>Phó Chủ tịch Hội đồng Biên tập:</strong> GS.TS. Bác sĩ Nguyễn Duy Cương
                    </p>
                    <p className="p-b-5">
                      Giấy phép số 34/GP-TTĐT do Cục PT-TH - Bộ Thông tin và Truyền thông cấp ngày 21 tháng 03 năm 2023
                    </p>
                  </div>
                  
                  <div className="f1-s-1 cl11 p-t-10" style={{ lineHeight: 1.8, display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
                    <span>
                      <i className="fas fa-map-marker-alt m-r-5"></i>
                      <strong>Địa chỉ:</strong> Tầng 2 số 162 Khuất Duy Tiến, phường Nhân Chính, quận Thanh Xuân, Hà Nội
                    </span>
                    <span>
                      <i className="fas fa-phone m-r-5"></i>
                      <strong>Điện thoại:</strong> 0123456789
                    </span>
                    <span>
                      <strong>Email:</strong> ..............@gmail.com
                    </span>
                    <span>
                      <i className="fas fa-globe m-r-5"></i>
                      <strong>Website:</strong> Xxxxxxxxxxxxxxx.vn
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phần bên phải: Liên hệ, mạng xã hội */}
            <div className="col-lg-4 p-b-20">
              {/* Box Liên hệ phát hành và quảng cáo */}
              <div className="p-b-20" style={{ backgroundColor: '#17b978', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                <h4 className="f1-m-7 cl0 p-b-10" style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                  Liên hệ phát hành và quảng cáo
                </h4>
                <div className="f1-s-1 cl0" style={{ lineHeight: 1.8, color: '#fff' }}>
                  <p className="p-b-5">
                    <i className="fas fa-phone m-r-5"></i>
                    Điện thoại: 0123456789 – 0123456789
                  </p>
                  <p className="p-b-5">
                    <i className="fas fa-envelope m-r-5"></i>
                    Email: .................@gmail.com
                  </p>
                </div>
              </div>
              
              {/* THEO DÕI CHÚNG TÔI */}
              <div className="p-b-20">
                <h4 className="f1-m-7 cl0 p-b-10" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  THEO DÕI CHÚNG TÔI
                </h4>
                <div className="p-t-10" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <a href="https://www.tiktok.com/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', color: '#17b978' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', color: '#17b978' }}>
                    <span className="fab fa-facebook-f" style={{ fontSize: '24px' }}></span>
                  </a>
                  <a href="https://www.youtube.com/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', color: '#17b978' }}>
                    <span className="fab fa-youtube" style={{ fontSize: '24px' }}></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg11">
        <div className="container size-h-4 flex-c-c p-tb-15">
          <span className="f1-s-1 cl0 txt-center">
            © {new Date().getFullYear()} Bản quyền thuộc VIỆN PHÁT TRIỂN VĂN HÓA VÀ CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG. Thiết kế website – Team Đ&H
          </span>
        </div>
      </div>
    </footer>
  );
}

