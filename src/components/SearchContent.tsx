'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getDisplayCategory, getCategoryUrl } from '@/lib/categoryUtils';

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  category: string;
  subCategory: string;
  createdAt: string;
};

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasMore: boolean;
};

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
    hasMore: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get page and limit from URL params
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = parseInt(searchParams.get('limit') || '10', 10);

  // Update URL params
  const updateParams = useCallback((updates: { page?: number; limit?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.page !== undefined) {
      if (updates.page === 1) {
        params.delete('page');
      } else {
        params.set('page', updates.page.toString());
      }
    }
    
    if (updates.limit !== undefined) {
      params.set('limit', updates.limit.toString());
      // Reset to page 1 when changing limit
      params.delete('page');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  // Fetch articles
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      ...(query && { q: query }),
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    });

    fetch(`/api/search?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setArticles(data.items);
          setPagination(data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            limit: itemsPerPage,
            hasMore: false,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      })
      .finally(() => setIsLoading(false));
  }, [query, currentPage, itemsPerPage]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long' });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      updateParams({ page });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (limit: number) => {
    updateParams({ limit });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const totalPages = pagination.totalPages;
    const current = pagination.currentPage;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      {/* Search Header */}
      <div className="how2 how2-cl2 flex-s-c m-b-30">
        <h3 className="f1-m-2 cl3 tab01-title">
          {query ? 'Kết quả tìm kiếm' : 'Tất cả bài viết'}
        </h3>
      </div>

      {/* Search Info */}
      <div className="flex-wr-sb-c m-b-30 p-rl-15 bo-b-1 bocl11 p-b-30">
        <div className="f1-s-1 cl8">
          {query ? (
            <>
              Từ khóa: <span className="cl2 f1-m-1">&quot;{query}&quot;</span>
              {!isLoading && (
                <span className="m-l-15">Tìm thấy: <span className="cl2">{pagination.totalItems}</span> bài viết</span>
              )}
            </>
          ) : (
            !isLoading && (
              <>Tổng số: <span className="cl2">{pagination.totalItems}</span> bài viết</>
            )
          )}
        </div>
        {/* Items per page selector */}
        {!isLoading && pagination.totalItems > 0 && (
          <div className="flex-wr-c-c" style={{ gap: '8px' }}>
            <span className="f1-s-3 cl6">Hiển thị:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value, 10))}
              className="f1-s-3"
              style={{
                padding: '4px 8px',
                border: '1px solid #ddd',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="f1-s-3 cl6">bài/trang</span>
          </div>
        )}
      </div>

      {/* Articles List */}
      {isLoading ? (
        <div className="p-tb-50 text-center">
          <p className="f1-s-1 cl6">Đang tìm kiếm...</p>
        </div>
      ) : articles.length > 0 ? (
        <>
          {articles.map((article) => (
            <div key={article.id} className="flex-wr-sb-s bo-b-1 bocl11 p-b-20 m-b-20">
              <Link 
                href={`/articles/${article.slug}`}
                className="size-w-8 wrap-pic-w hov1 trans-03 m-r-20 m-b-10"
              >
                <img 
                  src={article.cover || '/images/post-39.jpg'} 
                  alt={article.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
              </Link>

              <div className="size-w-9">
                <h5 className="p-b-10">
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="f1-m-3 cl2 hov-cl10 trans-03"
                  >
                    {article.title}
                  </Link>
                </h5>

                <span className="f1-s-3 cl8">
                  {formatDate(article.createdAt)}
                  {(article.category || article.subCategory) && (
                    <>
                      <span className="m-rl-3">-</span>
                      <Link 
                        href={getCategoryUrl(article.category, article.subCategory)}
                        className="cl10 hov-cl10"
                      >
                        {getDisplayCategory(article.category, article.subCategory)}
                      </Link>
                    </>
                  )}
                </span>
                {article.summary && (
                  <p className="f1-s-1 cl6 p-t-10 how-txt4">
                    {article.summary}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex-wr-c-c p-t-15">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex-c-c pagi-item hov-btn1 trans-03 m-all-5"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid #17b978',
                  borderRadius: '3px',
                  color: '#17b978',
                  backgroundColor: 'transparent',
                  cursor: pagination.currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: pagination.currentPage === 1 ? 0.5 : 1,
                }}
              >
                <i className="fa fa-angle-left"></i>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="flex-c-c m-all-5"
                      style={{
                        width: '36px',
                        height: '36px',
                        color: '#666',
                      }}
                    >
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                const isActive = pageNum === pagination.currentPage;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className="flex-c-c pagi-item trans-03 m-all-5"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: isActive ? '#17b978' : 'transparent',
                      border: `1px solid ${isActive ? '#17b978' : '#ddd'}`,
                      borderRadius: '3px',
                      color: isActive ? '#fff' : '#666',
                      cursor: 'pointer',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
                className="flex-c-c pagi-item hov-btn1 trans-03 m-all-5"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid #17b978',
                  borderRadius: '3px',
                  color: '#17b978',
                  backgroundColor: 'transparent',
                  cursor: pagination.currentPage >= pagination.totalPages ? 'not-allowed' : 'pointer',
                  opacity: pagination.currentPage >= pagination.totalPages ? 0.5 : 1,
                }}
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="p-tb-50 text-center">
          <p className="f1-s-1 cl6">
            {query 
              ? `Không tìm thấy bài viết nào với từ khóa "${query}"`
              : 'Chưa có bài viết nào.'
            }
          </p>
        </div>
      )}
    </>
  );
}


