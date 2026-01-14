'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ArticleSidebar from '@/components/ArticleSidebar';
import SearchBox from '@/components/SearchBox';
import SearchContent from '@/components/SearchContent';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <>
      {/* Breadcrumb + Search */}
      <div className="container search-container">
        <div className="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          {/* Breadcrumb */}
          <div className="f2-s-1 p-r-30 m-tb-6 flex-wr-s-c" style={{ fontSize: '13px' }}>
            <Link 
              href="/" 
              className="hov-cl10 trans-03"
              style={{ color: '#999' }}
            >
              Trang chủ
            </Link>
            <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
            <span style={{ color: '#999' }}>
              {query ? 'Tìm kiếm' : 'Tất cả bài viết'}
            </span>
          </div>

          {/* Phần Tìm kiếm */}
          <SearchBox />
        </div>
      </div>

      {/* Search Results */}
      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                <SearchContent />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              <ArticleSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container p-t-70 p-b-140 text-center">
        <p className="f1-s-1 cl6">Đang tải...</p>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
