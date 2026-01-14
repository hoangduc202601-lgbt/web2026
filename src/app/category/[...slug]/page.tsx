import Link from 'next/link'
import { Suspense } from 'react'
import { getCategoryName } from '@/lib/categoryUtils'
import ArticleSidebar from '@/components/ArticleSidebar'
import SearchBox from '@/components/SearchBox'
import CategoryContent from '@/components/CategoryContent'

// Generate metadata động
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const category = slug?.[0] || ''
  const subCategory = slug?.[1] || ''
  
  const categoryName = getCategoryName(category)
  const subCategoryName = subCategory ? getCategoryName(subCategory) : ''
  
  const title = subCategoryName 
    ? `${subCategoryName} - ${categoryName}` 
    : categoryName
  
  return {
    title: `${title} - Viện văn hóa và chăm sóc sức khỏe cộng đồng`,
    description: `Danh sách bài viết trong chuyên mục ${title}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  // Parse slug: /category/[category] hoặc /category/[category]/[subCategory]
  const category = slug?.[0] || ''
  const subCategory = slug?.[1] || ''
  
  // Lấy tên tiếng Việt
  const categoryName = getCategoryName(category)
  const subCategoryName = subCategory ? getCategoryName(subCategory) : ''

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
            <Link 
              href={`/category/${category}`}
              className="hov-cl10 trans-03"
              style={{ color: '#999' }}
            >
              {categoryName}
            </Link>
            {subCategory && subCategoryName && (
              <>
                <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
                <span style={{ color: '#999' }}>
                  {subCategoryName}
                </span>
              </>
            )}
          </div>

          {/* Phần Tìm kiếm */}
          <SearchBox />
        </div>
      </div>

      {/* Category Content */}
      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            {/* Main content */}
            <div className="col-md-10 col-lg-8 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                <Suspense fallback={
                  <div className="p-tb-50 text-center">
                    <p className="f1-s-1 cl6">Đang tải...</p>
                  </div>
                }>
                  <CategoryContent
                    category={category}
                    subCategory={subCategory}
                    categoryName={categoryName}
                    subCategoryName={subCategoryName}
                  />
                </Suspense>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              {/* Article Sidebar - Popular, Subscribe, Documents */}
              <ArticleSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
