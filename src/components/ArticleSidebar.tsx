'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type PopularArticle = {
  id: string;
  title: string;
  slug: string;
};

// Document library data
const documents = [
  {
    title: 'Nghị quyết 282/NQ-CP',
    downloadUrl: '/pdf/doc-01.pdf',
    filename: 'doc-01.pdf'
  },
  {
    title: 'Quyết định về việc bổ nhiệm Phó Viện trưởng Phụ trách Viện Phát triển văn hóa và chăm sóc sức khỏe cộng đồng',
    downloadUrl: '/pdf/doc-02.pdf',
    filename: 'doc-02.pdf'
  },
  {
    title: 'Quyết định ban hành nội dung kiểm tra, đánh giá chất lượng bệnh viện và khảo sát hài lòng người bệnh, nhân viên y tế năm 2024 đối với bệnh viện y học cổ truyền.',
    downloadUrl: '/pdf/doc-03.pdf',
    filename: 'doc-03.pdf'
  }
];

export default function ArticleSidebar() {
  const [email, setEmail] = useState('');
  const [popularArticles, setPopularArticles] = useState<PopularArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/highlighted-articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPopularArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Cảm ơn bạn đã đăng ký nhận tin!');
      setEmail('');
    }
  };

  return (
    <div className="p-l-10 p-rl-0-sr991">
      {/* Bài viết phổ biến */}
      <div className="p-b-30">
        <div className="how2 how2-cl2 flex-s-c m-b-25">
          <h3 className="f1-m-2 cl3 tab01-title">Bài viết phổ biến</h3>
        </div>

        <ul className="p-t-10">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="flex-wr-sb-s p-b-22">
                <div 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#eee',
                    borderRadius: '3px',
                    flexShrink: 0
                  }}
                ></div>
                <div 
                  style={{ 
                    flex: 1, 
                    marginLeft: '15px',
                    height: '40px',
                    backgroundColor: '#eee',
                    borderRadius: '3px'
                  }}
                ></div>
              </li>
            ))
          ) : (
            popularArticles.map((article, index) => (
              <li key={article.id} className="flex-wr-sb-s p-b-22">
                <div 
                  className="flex-c-c borad-3 f1-m-4 cl0 m-b-6"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#666',
                    borderRadius: '3px',
                    flexShrink: 0
                  }}
                >
                  {index + 1}
                </div>
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="f1-s-7 cl3 hov-cl10 trans-03"
                  style={{ 
                    flex: 1, 
                    marginLeft: '15px',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {article.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Banner - Đặc san */}
      <div className="flex-c-s p-b-30">
        <a href="#">
          <img className="max-w-full" src="/images/banner-02.png" alt="IMG" />
        </a>
      </div>

      {/* Đăng ký nhận tin */}
      <div 
        className="p-rl-35 p-t-28 p-b-35 m-b-30"
        style={{ backgroundColor: '#17b978' }}
      >
        <h5 className="f1-m-5 cl0 p-b-10">Đăng ký nhận tin</h5>
        <p className="f1-s-1 cl0 p-b-25">
          Nhận tất cả nội dung mới nhất được gửi đến email của bạn vài lần một tháng.
        </p>
        <form className="size-a-9 pos-relative" onSubmit={handleSubscribe}>
          <input 
            className="s-full f1-m-6 cl6 plh9 p-l-20 p-r-55" 
            type="email" 
            name="email" 
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              height: '45px',
              border: 'none',
              borderRadius: '3px'
            }}
          />
          <button 
            type="submit"
            className="flex-c-c ab-t-r fs-16 cl9 hov-cl10 trans-03"
            style={{
              width: '45px',
              height: '45px',
              position: 'absolute',
              top: 0,
              right: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <i className="fa fa-arrow-right"></i>
          </button>
        </form>
      </div>

      {/* Thư viện văn bản */}
      <div className="p-b-55">
        <div className="how2 how2-cl4 flex-s-c m-b-0 text-library-header">
          <h3 className="f1-m-2 cl3 tab01-title">THƯ VIỆN VĂN BẢN</h3>
        </div>

        <ul className="p-t-0 text-library-list">
          {documents.map((doc, index) => (
            <li 
              key={index} 
              className="text-library-item"
            >
              <a 
                href="#" 
                className="f1-s-7 cl3 hov-cl10 trans-03" 
                style={{ display: 'block', marginBottom: '8px' }}
              >
                {doc.title}
              </a>
              <a 
                href={doc.downloadUrl} 
                download={doc.filename}
                className="f1-s-6 cl10 hov-cl10 trans-03" 
                style={{ color: '#17b978' }}
              >
                <i className="fa fa-download" style={{ marginRight: '5px' }}></i>
                Tải về
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
