import Link from 'next/link';

export const metadata = {
  title: 'Liên hệ - Viện văn hóa và chăm sóc sức khỏe cộng đồng',
  description: 'Liên hệ với chúng tôi',
};

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="container search-container">
        <div className="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          <div className="f2-s-1 p-r-30 m-tb-6 flex-wr-s-c" style={{ fontSize: '13px' }}>
            <Link
              href="/"
              className="hov-cl10 trans-03"
              style={{ color: '#999' }}
            >
              Trang chủ
            </Link>
            <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
            <span style={{ color: '#999' }}>Liên hệ</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="p-r-10 p-r-0-sr991">
                {/* Contact Form */}
                <div>
                  <h2 className="f1-l-1 cl2 p-b-20" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    Liên hệ
                  </h2>

                  <form>
                    {/* Name */}
                    <div className="p-b-20">
                      <label className="f1-s-1 cl2 p-b-10" style={{ display: 'block', marginBottom: '8px' }}>
                        Họ tên <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="f1-s-1 cl6 plh9 s-full"
                        type="text"
                        name="name"
                        placeholder="Nhập họ tên của bạn"
                        required
                        style={{
                          width: '100%',
                          border: '1px solid #e6e6e6',
                          borderRadius: '3px',
                          padding: '12px 15px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div className="p-b-20">
                      <label className="f1-s-1 cl2 p-b-10" style={{ display: 'block', marginBottom: '8px' }}>
                        Email <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="f1-s-1 cl6 plh9 s-full"
                        type="email"
                        name="email"
                        placeholder="Nhập email của bạn"
                        required
                        style={{
                          width: '100%',
                          border: '1px solid #e6e6e6',
                          borderRadius: '3px',
                          padding: '12px 15px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div className="p-b-20">
                      <label className="f1-s-1 cl2 p-b-10" style={{ display: 'block', marginBottom: '8px' }}>
                        Số điện thoại
                      </label>
                      <input
                        className="f1-s-1 cl6 plh9 s-full"
                        type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại của bạn"
                        style={{
                          width: '100%',
                          border: '1px solid #e6e6e6',
                          borderRadius: '3px',
                          padding: '12px 15px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div className="p-b-30">
                      <label className="f1-s-1 cl2 p-b-10" style={{ display: 'block', marginBottom: '8px' }}>
                        Tin nhắn của bạn
                      </label>
                      <textarea
                        className="f1-s-1 cl6 plh9 s-full"
                        name="message"
                        placeholder="Nhập tin nhắn của bạn"
                        rows={8}
                        style={{
                          width: '100%',
                          border: '1px solid #e6e6e6',
                          borderRadius: '3px',
                          resize: 'vertical',
                          padding: '12px 15px',
                          fontSize: '14px'
                        }}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      className="f1-s-1 cl0"
                      style={{
                        backgroundColor: '#222',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'default',
                        padding: '12px 40px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

