'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import TrendingNews from '@/components/TrendingNews';
import SearchBox from '@/components/SearchBox';
import { getDisplayCategory, getCategoryUrl } from '@/lib/categoryUtils';

type FeaturedArticle = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  category: string;
  subCategory: string;
  createdAt: string;
}

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/featured-articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <>
      {/* Headline */}
      <div className="container search-container">
        <div className="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          {/* Phần Trending Now */}
          <div className="f2-s-1 p-r-30 m-tb-6 trending-now-section" style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <span className="text-uppercase cl2 p-r-8" style={{ whiteSpace: 'nowrap' }}>Tin nổi bật:</span>
            <TrendingNews titles={featuredArticles.map(article => article.title)} />
          </div>

          {/* Phần Tìm kiếm */}
          <SearchBox />
        </div>
      </div>
        
      {/* Feature post */}
      <section className="bg0">
        <div className="container">
          <div className="row m-rl--1">
            <div className="col-md-6 p-rl-1 p-b-2">
              {isLoading ? (
                <div className="size-a-3" style={{ backgroundColor: '#f5f5f5' }}></div>
              ) : (
                <div 
                  className="bg-img1 size-a-3 how1 pos-relative" 
                  style={{ backgroundImage: `url(${featuredArticles[0]?.cover || '/images/post-01.jpg'})` }}
                >
                  <Link href={`/articles/${featuredArticles[0]?.slug || ''}`} className="dis-block how1-child1 trans-03"></Link>
                  <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <Link 
                      href={getCategoryUrl(featuredArticles[0]?.category, featuredArticles[0]?.subCategory)}
                      className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                    >
                      {getDisplayCategory(featuredArticles[0]?.category, featuredArticles[0]?.subCategory, 'Sống khỏe')}
                    </Link>
                    <h3 className="how1-child2 m-t-14 m-b-10">
                      <Link href={`/articles/${featuredArticles[0]?.slug || ''}`} className="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03">
                        {featuredArticles[0]?.title || 'Đang tải...'}
                      </Link>
                    </h3>
                    <span className="how1-child2">
                      <span className="f1-s-3 cl11">{featuredArticles[0]?.createdAt ? formatDate(featuredArticles[0].createdAt) : ''}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-6 p-rl-1">
              <div className="row m-rl--1">
                <div className="col-12 p-rl-1 p-b-2">
                  {isLoading ? (
                    <div className="size-a-4" style={{ backgroundColor: '#f5f5f5' }}></div>
                  ) : (
                    <div 
                      className="bg-img1 size-a-4 how1 pos-relative" 
                      style={{ backgroundImage: `url(${featuredArticles[1]?.cover || '/images/post-02.jpg'})` }}
                    >
                      <Link href={`/articles/${featuredArticles[1]?.slug || ''}`} className="dis-block how1-child1 trans-03"></Link>
                      <div className="flex-col-e-s s-full p-rl-25 p-tb-24">
                        <Link 
                          href={getCategoryUrl(featuredArticles[1]?.category, featuredArticles[1]?.subCategory)}
                          className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                        >
                          {getDisplayCategory(featuredArticles[1]?.category, featuredArticles[1]?.subCategory, 'Tư vấn')}
                        </Link>
                        <h3 className="how1-child2 m-t-14">
                          <Link href={`/articles/${featuredArticles[1]?.slug || ''}`} className="how-txt1 size-a-7 f1-l-2 cl0 hov-cl10 trans-03">
                            {featuredArticles[1]?.title || 'Đang tải...'}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-sm-6 p-rl-1 p-b-2">
                  {isLoading ? (
                    <div className="size-a-5" style={{ backgroundColor: '#f5f5f5' }}></div>
                  ) : (
                    <div 
                      className="bg-img1 size-a-5 how1 pos-relative" 
                      style={{ backgroundImage: `url(${featuredArticles[2]?.cover || '/images/post-03.jpg'})` }}
                    >
                      <Link href={`/articles/${featuredArticles[2]?.slug || ''}`} className="dis-block how1-child1 trans-03"></Link>
                      <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                        <Link 
                          href={getCategoryUrl(featuredArticles[2]?.category, featuredArticles[2]?.subCategory)}
                          className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                        >
                          {getDisplayCategory(featuredArticles[2]?.category, featuredArticles[2]?.subCategory, 'Doanh nghiệp')}
                        </Link>
                        <h3 className="how1-child2 m-t-14">
                          <Link href={`/articles/${featuredArticles[2]?.slug || ''}`} className="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
                            {featuredArticles[2]?.title || 'Đang tải...'}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-sm-6 p-rl-1 p-b-2">
                  {isLoading ? (
                    <div className="size-a-5" style={{ backgroundColor: '#f5f5f5' }}></div>
                  ) : (
                    <div 
                      className="bg-img1 size-a-5 how1 pos-relative" 
                      style={{ backgroundImage: `url(${featuredArticles[3]?.cover || '/images/post-04.jpg'})` }}
                    >
                      <Link href={`/articles/${featuredArticles[3]?.slug || ''}`} className="dis-block how1-child1 trans-03"></Link>
                      <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                        <Link 
                          href={getCategoryUrl(featuredArticles[3]?.category, featuredArticles[3]?.subCategory)}
                          className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                        >
                          {getDisplayCategory(featuredArticles[3]?.category, featuredArticles[3]?.subCategory, 'Sống khỏe')}
                        </Link>
                        <h3 className="how1-child2 m-t-14">
                          <Link href={`/articles/${featuredArticles[3]?.slug || ''}`} className="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
                            {featuredArticles[3]?.title || 'Đang tải...'}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post sections */}
      <section className="bg0 p-t-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="p-b-20">
                {/* Tin tức Tab */}
                <NewsTab />

                {/* Sức khỏe cộng đồng Tab */}
                <EconomyTab />

                {/* Xã hội Tab */}
                <CultureTab />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="container">
        <div className="flex-c-c">
          <a href="#">
            <img className="max-w-full" src="/images/banner-01.jpg" alt="IMG" />
          </a>
        </div>
      </div>

      {/* Latest Posts */}
      <LatestPosts />
    </>
  );
}

// News Tab Component
function NewsTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1-1');
  const [allArticles, setAllArticles] = useState<FeaturedArticle[]>([]);
  const [politicsArticles, setPoliticsArticles] = useState<FeaturedArticle[]>([]);
  const [economyArticles, setEconomyArticles] = useState<FeaturedArticle[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [isLoadingPolitics, setIsLoadingPolitics] = useState(true);
  const [isLoadingEconomy, setIsLoadingEconomy] = useState(true);

  // Fetch all articles (category: tin-tuc)
  useEffect(() => {
    fetch('/api/news-articles?category=tin-tuc&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingAll(false));
  }, []);

  // Fetch politics articles (subCategory: chinh-tri)
  useEffect(() => {
    fetch('/api/news-articles?subCategory=chinh-tri&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPoliticsArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingPolitics(false));
  }, []);

  // Fetch economy articles (subCategory: kinh-te)
  useEffect(() => {
    fetch('/api/news-articles?subCategory=kinh-te&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEconomyArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingEconomy(false));
  }, []);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="tab01 p-b-20">
      <div className="tab01-head how2 how2-cl1 bocl12 flex-s-c m-r-10 m-r-0-sr991 tab-section-news">
        <h3 className="f1-m-2 cl12 tab01-title">Tin tức</h3>
        <div className="tab-nav-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'tab1-1' ? 'active' : ''}`} 
                data-toggle="tab" 
                href="#tab1-1" 
                role="tab"
                onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab1-1') setActiveTab('tab1-1'); }}
              >
                Tất cả
              </a>
          </li>
            <li className="nav-item mobile-hidden">
              <a 
                className={`nav-link ${activeTab === 'tab1-2' ? 'active' : ''}`} 
                data-toggle="tab" 
                href="#tab1-2" 
                role="tab"
                onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab1-2') setActiveTab('tab1-2'); }}
              >
                Chính trị
              </a>
          </li>
            <li className="nav-item mobile-hidden">
              <a 
                className={`nav-link ${activeTab === 'tab1-3' ? 'active' : ''}`} 
                data-toggle="tab" 
                href="#tab1-3" 
                role="tab"
                onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab1-3') setActiveTab('tab1-3'); }}
              >
                Kinh tế
              </a>
          </li>
        </ul>
          {/* Dropdown button cho mobile */}
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '5px 8px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="mobile-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '120px',
                marginTop: '5px'
              }}
            >
              <a
                className="dropdown-item"
                href="#tab1-2"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab1-2');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Chính trị
              </a>
              <a
                className="dropdown-item"
                href="#tab1-3"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab1-3');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Kinh tế
              </a>
            </div>
          )}
        </div>
        <Link 
          href={
            activeTab === 'tab1-1' 
              ? '/category/tin-tuc' 
              : activeTab === 'tab1-2' 
              ? '/category/tin-tuc/chinh-tri' 
              : '/category/tin-tuc/kinh-te'
          }
          className="tab01-link f1-s-1 cl9 hov-cl10 trans-03"
        >
          Xem tất cả
          <i className="fs-12 m-l-5 fa fa-caret-right"></i>
        </Link>
      </div>

      <div className="tab-content p-t-35">
        {/* Tab Tất cả - category: tin-tuc */}
        <div className={`tab-pane fade ${activeTab === 'tab1-1' ? 'show active' : ''}`} id="tab1-1" role="tabpanel">
          {isLoadingAll ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : allArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={allArticles[0]?.cover || '/images/post-05.jpg'}
                  title={allArticles[0]?.title || ''}
                  category={getDisplayCategory(allArticles[0]?.category, allArticles[0]?.subCategory, 'Tin tức')}
                  categoryUrl={getCategoryUrl(allArticles[0]?.category, allArticles[0]?.subCategory)}
                  date={allArticles[0]?.createdAt ? formatDate(allArticles[0].createdAt) : ''}
                  slug={allArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {allArticles.slice(1, 4).map((article, index) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-06.jpg'}
                    title={article.title}
                    category={getDisplayCategory(article.category, article.subCategory, 'Tin tức')}
                    categoryUrl={getCategoryUrl(article.category, article.subCategory)}
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Tab Chính trị - subCategory: chinh-tri */}
        <div className={`tab-pane fade ${activeTab === 'tab1-2' ? 'show active' : ''}`} id="tab1-2" role="tabpanel">
          {isLoadingPolitics ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : politicsArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={politicsArticles[0]?.cover || '/images/post-05.jpg'}
                  title={politicsArticles[0]?.title || ''}
                  category="Chính trị"
                  categoryUrl="/category/tin-tuc/chinh-tri"
                  date={politicsArticles[0]?.createdAt ? formatDate(politicsArticles[0].createdAt) : ''}
                  slug={politicsArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {politicsArticles.slice(1, 4).map((article, index) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-06.jpg'}
                    title={article.title}
                    category="Chính trị"
                    categoryUrl="/category/tin-tuc/chinh-tri"
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Tab Kinh tế - subCategory: kinh-te */}
        <div className={`tab-pane fade ${activeTab === 'tab1-3' ? 'show active' : ''}`} id="tab1-3" role="tabpanel">
          {isLoadingEconomy ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : economyArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={economyArticles[0]?.cover || '/images/post-07.jpg'}
                  title={economyArticles[0]?.title || ''}
                  category="Kinh tế"
                  categoryUrl="/category/tin-tuc/kinh-te"
                  date={economyArticles[0]?.createdAt ? formatDate(economyArticles[0].createdAt) : ''}
                  slug={economyArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {economyArticles.slice(1, 4).map((article, index) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-08.jpg'}
                    title={article.title}
                    category="Kinh tế"
                    categoryUrl="/category/tin-tuc/kinh-te"
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Economy Tab Component
function EconomyTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab2-1');
  const [allArticles, setAllArticles] = useState<FeaturedArticle[]>([]);
  const [tuVanArticles, setTuVanArticles] = useState<FeaturedArticle[]>([]);
  const [songKhoeArticles, setSongKhoeArticles] = useState<FeaturedArticle[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [isLoadingTuVan, setIsLoadingTuVan] = useState(true);
  const [isLoadingSongKhoe, setIsLoadingSongKhoe] = useState(true);

  // Fetch all articles (category: suc-khoe-cong-dong)
  useEffect(() => {
    fetch('/api/news-articles?category=suc-khoe-cong-dong&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingAll(false));
  }, []);

  // Fetch tu-van articles (subCategory: tu-van)
  useEffect(() => {
    fetch('/api/news-articles?subCategory=tu-van&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTuVanArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingTuVan(false));
  }, []);

  // Fetch song-khoe articles (subCategory: song-khoe)
  useEffect(() => {
    fetch('/api/news-articles?subCategory=song-khoe&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSongKhoeArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingSongKhoe(false));
  }, []);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="tab01 p-b-20">
      <div className="tab01-head how2 how2-cl3 bocl12 flex-s-c m-r-10 m-r-0-sr991 tab-section-economy">
        <h3 className="f1-m-2 cl14 tab01-title">Sức khỏe cộng đồng</h3>
        <div className="tab-nav-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'tab2-1' ? 'active' : ''}`} 
              data-toggle="tab" 
              href="#tab2-1" 
              role="tab"
              onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab2-1') setActiveTab('tab2-1'); }}
            >
              Tất cả
            </a>
          </li>
            <li className="nav-item mobile-hidden">
            <a 
              className={`nav-link ${activeTab === 'tab2-2' ? 'active' : ''}`} 
              data-toggle="tab" 
              href="#tab2-2" 
              role="tab"
              onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab2-2') setActiveTab('tab2-2'); }}
            >
              Tư vấn
            </a>
          </li>
            <li className="nav-item mobile-hidden">
            <a 
              className={`nav-link ${activeTab === 'tab2-3' ? 'active' : ''}`} 
              data-toggle="tab" 
              href="#tab2-3" 
              role="tab"
              onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab2-3') setActiveTab('tab2-3'); }}
            >
              Sống khỏe
            </a>
          </li>
        </ul>
          {/* Dropdown button cho mobile */}
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '5px 8px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="mobile-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '150px',
                marginTop: '5px'
              }}
            >
              <a
                className="dropdown-item"
                href="#tab2-2"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab2-2');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Tư vấn
              </a>
              <a
                className="dropdown-item"
                href="#tab2-3"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab2-3');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Sống khỏe
              </a>
            </div>
          )}
        </div>
        <Link 
          href={
            activeTab === 'tab2-1' 
              ? '/category/suc-khoe-cong-dong' 
              : activeTab === 'tab2-2' 
              ? '/category/suc-khoe-cong-dong/tu-van' 
              : '/category/suc-khoe-cong-dong/song-khoe'
          }
          className="tab01-link f1-s-1 cl9 hov-cl10 trans-03"
        >
          Xem tất cả
          <i className="fs-12 m-l-5 fa fa-caret-right"></i>
        </Link>
      </div>

      <div className="tab-content p-t-35">
        {/* Tab Tất cả - category: suc-khoe-cong-dong */}
        <div className={`tab-pane fade ${activeTab === 'tab2-1' ? 'show active' : ''}`} id="tab2-1" role="tabpanel">
          {isLoadingAll ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : allArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={allArticles[0]?.cover || '/images/post-10.jpg'}
                  title={allArticles[0]?.title || ''}
                  category={getDisplayCategory(allArticles[0]?.category, allArticles[0]?.subCategory, 'Sức khỏe cộng đồng')}
                  categoryUrl={getCategoryUrl(allArticles[0]?.category, allArticles[0]?.subCategory)}
                  date={allArticles[0]?.createdAt ? formatDate(allArticles[0].createdAt) : ''}
                  slug={allArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {allArticles.slice(1, 4).map((article) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-11.jpg'}
                    title={article.title}
                    category={getDisplayCategory(article.category, article.subCategory, 'Sức khỏe cộng đồng')}
                    categoryUrl={getCategoryUrl(article.category, article.subCategory)}
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Tab Tư vấn - subCategory: tu-van */}
        <div className={`tab-pane fade ${activeTab === 'tab2-2' ? 'show active' : ''}`} id="tab2-2" role="tabpanel">
          {isLoadingTuVan ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : tuVanArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={tuVanArticles[0]?.cover || '/images/post-10.jpg'}
                  title={tuVanArticles[0]?.title || ''}
                  category="Tư vấn"
                  categoryUrl="/category/suc-khoe-cong-dong/tu-van"
                  date={tuVanArticles[0]?.createdAt ? formatDate(tuVanArticles[0].createdAt) : ''}
                  slug={tuVanArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {tuVanArticles.slice(1, 4).map((article) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-11.jpg'}
                    title={article.title}
                    category="Tư vấn"
                    categoryUrl="/category/suc-khoe-cong-dong/tu-van"
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Tab Sống khỏe - subCategory: song-khoe */}
        <div className={`tab-pane fade ${activeTab === 'tab2-3' ? 'show active' : ''}`} id="tab2-3" role="tabpanel">
          {isLoadingSongKhoe ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : songKhoeArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={songKhoeArticles[0]?.cover || '/images/post-10.jpg'}
                  title={songKhoeArticles[0]?.title || ''}
                  category="Sống khỏe"
                  categoryUrl="/category/suc-khoe-cong-dong/song-khoe"
                  date={songKhoeArticles[0]?.createdAt ? formatDate(songKhoeArticles[0].createdAt) : ''}
                  slug={songKhoeArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {songKhoeArticles.slice(1, 4).map((article) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-11.jpg'}
                    title={article.title}
                    category="Sống khỏe"
                    categoryUrl="/category/suc-khoe-cong-dong/song-khoe"
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Culture Tab Component
function CultureTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab3-1');
  const [allArticles, setAllArticles] = useState<FeaturedArticle[]>([]);
  const [phapLuatArticles, setPhapLuatArticles] = useState<FeaturedArticle[]>([]);
  const [anNinhXaHoiArticles, setAnNinhXaHoiArticles] = useState<FeaturedArticle[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [isLoadingPhapLuat, setIsLoadingPhapLuat] = useState(true);
  const [isLoadingAnNinhXaHoi, setIsLoadingAnNinhXaHoi] = useState(true);

  // Fetch all articles (category: xa-hoi)
  useEffect(() => {
    fetch('/api/news-articles?category=xa-hoi&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingAll(false));
  }, []);

  // Fetch phap-luat articles (subCategory: phap-luat)
  useEffect(() => {
    fetch('/api/news-articles?subCategory=phap-luat&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPhapLuatArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingPhapLuat(false));
  }, []);

  // Fetch an-ninh-xa-hoi articles (subCategory: an-ninh-xa-hoi)
  useEffect(() => {
    fetch('/api/news-articles?subCategory=an-ninh-xa-hoi&limit=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAnNinhXaHoiArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingAnNinhXaHoi(false));
  }, []);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="tab01 p-b-20">
      <div className="tab01-head how2 how2-cl5 bocl12 flex-s-c m-r-10 m-r-0-sr991 tab-section-culture">
        <h3 className="f1-m-2 cl17 tab01-title">Xã hội</h3>
        <div className="tab-nav-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'tab3-1' ? 'active' : ''}`} 
              data-toggle="tab" 
              href="#tab3-1" 
              role="tab"
              onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab3-1') setActiveTab('tab3-1'); }}
            >
              Tất cả
            </a>
          </li>
            <li className="nav-item mobile-hidden">
            <a 
              className={`nav-link ${activeTab === 'tab3-2' ? 'active' : ''}`} 
              data-toggle="tab" 
              href="#tab3-2" 
              role="tab"
              onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab3-2') setActiveTab('tab3-2'); }}
            >
              Pháp luật
            </a>
          </li>
            <li className="nav-item mobile-hidden">
            <a 
              className={`nav-link ${activeTab === 'tab3-3' ? 'active' : ''}`} 
              data-toggle="tab" 
              href="#tab3-3" 
              role="tab"
              onClick={(e) => { e.preventDefault(); if (activeTab !== 'tab3-3') setActiveTab('tab3-3'); }}
            >
              An ninh xã hội
            </a>
          </li>
        </ul>
          {/* Dropdown button cho mobile */}
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '5px 8px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="mobile-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '120px',
                marginTop: '5px'
              }}
            >
              <a
                className="dropdown-item"
                href="#tab3-2"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab3-2');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Pháp luật
              </a>
              <a
                className="dropdown-item"
                href="#tab3-3"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab3-3');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                An ninh xã hội
              </a>
            </div>
          )}
        </div>
        <Link 
          href={
            activeTab === 'tab3-1' 
              ? '/category/xa-hoi' 
              : activeTab === 'tab3-2' 
              ? '/category/xa-hoi/phap-luat' 
              : '/category/xa-hoi/an-ninh-xa-hoi'
          }
          className="tab01-link f1-s-1 cl9 hov-cl10 trans-03"
        >
          Xem tất cả
          <i className="fs-12 m-l-5 fa fa-caret-right"></i>
        </Link>
      </div>

      <div className="tab-content p-t-35">
        {/* Tab Tất cả - category: xa-hoi */}
        <div className={`tab-pane fade ${activeTab === 'tab3-1' ? 'show active' : ''}`} id="tab3-1" role="tabpanel">
          {isLoadingAll ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : allArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={allArticles[0]?.cover || '/images/post-14.jpg'}
                  title={allArticles[0]?.title || ''}
                  category={getDisplayCategory(allArticles[0]?.category, allArticles[0]?.subCategory, 'Xã hội')}
                  categoryUrl={getCategoryUrl(allArticles[0]?.category, allArticles[0]?.subCategory)}
                  date={allArticles[0]?.createdAt ? formatDate(allArticles[0].createdAt) : ''}
                  slug={allArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {allArticles.slice(1, 4).map((article) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-15.jpg'}
                    title={article.title}
                    category={getDisplayCategory(article.category, article.subCategory, 'Xã hội')}
                    categoryUrl={getCategoryUrl(article.category, article.subCategory)}
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Tab Pháp luật - subCategory: phap-luat */}
        <div className={`tab-pane fade ${activeTab === 'tab3-2' ? 'show active' : ''}`} id="tab3-2" role="tabpanel">
          {isLoadingPhapLuat ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : phapLuatArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={phapLuatArticles[0]?.cover || '/images/post-14.jpg'}
                  title={phapLuatArticles[0]?.title || ''}
                  category="Pháp luật"
                  categoryUrl="/category/xa-hoi/phap-luat"
                  date={phapLuatArticles[0]?.createdAt ? formatDate(phapLuatArticles[0].createdAt) : ''}
                  slug={phapLuatArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {phapLuatArticles.slice(1, 4).map((article) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-15.jpg'}
                    title={article.title}
                    category="Pháp luật"
                    categoryUrl="/category/xa-hoi/phap-luat"
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Tab An ninh xã hội - subCategory: an-ninh-xa-hoi */}
        <div className={`tab-pane fade ${activeTab === 'tab3-3' ? 'show active' : ''}`} id="tab3-3" role="tabpanel">
          {isLoadingAnNinhXaHoi ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '300px', borderRadius: '3px' }}></div>
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px', marginBottom: '20px' }}></div>
                <div style={{ backgroundColor: '#f5f5f5', height: '80px', borderRadius: '3px' }}></div>
              </div>
            </div>
          ) : anNinhXaHoiArticles.length > 0 ? (
            <div className="row">
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                <PostItem 
                  image={anNinhXaHoiArticles[0]?.cover || '/images/post-14.jpg'}
                  title={anNinhXaHoiArticles[0]?.title || ''}
                  category="An ninh xã hội"
                  categoryUrl="/category/xa-hoi/an-ninh-xa-hoi"
                  date={anNinhXaHoiArticles[0]?.createdAt ? formatDate(anNinhXaHoiArticles[0].createdAt) : ''}
                  slug={anNinhXaHoiArticles[0]?.slug}
                  large
                />
              </div>
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {anNinhXaHoiArticles.slice(1, 4).map((article) => (
                  <PostItemSmall 
                    key={article.id}
                    image={article.cover || '/images/post-15.jpg'}
                    title={article.title}
                    category="An ninh xã hội"
                    categoryUrl="/category/xa-hoi/an-ninh-xa-hoi"
                    date={formatDate(article.createdAt)}
                    slug={article.slug}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-tb-50 text-center">
              <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  const [popularArticles, setPopularArticles] = useState<{id: string, title: string, slug: string}[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);

  useEffect(() => {
    fetch('/api/highlighted-articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPopularArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingPopular(false));
  }, []);

  return (
    <div className="p-l-10 p-rl-0-sr991 p-b-20">
      {/* Popular Posts */}
      <div>
        <div className="how2 how2-cl4 flex-s-c">
          <h3 className="f1-m-2 cl3 tab01-title">Bài viết phổ biến</h3>
        </div>

        <ul className="p-t-35">
          {isLoadingPopular ? (
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
                <div className="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
                  {index + 1}
                </div>
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="size-w-3 f1-s-7 cl3 hov-cl10 trans-03"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.5'
                  }}
                >
                  {article.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Banner */}
      <div className="flex-c-s p-t-8">
        <a href="#">
          <img className="max-w-full" src="/images/banner-02.png" alt="IMG" />
        </a>
      </div>

      {/* Social Follow */}
      <div className="p-t-50">
        <div className="how2 how2-cl4 flex-s-c">
          <h3 className="f1-m-2 cl3 tab01-title">Kết nối với chúng tôi</h3>
        </div>

        <ul className="p-t-35">
          <li className="flex-wr-sb-c p-b-20">
            <a href="#" className="size-a-8 flex-c-c borad-3 size-a-8 bg-facebook fs-16 cl0 hov-cl0">
              <span className="fab fa-facebook-f"></span>
            </a>
            <div className="size-w-3 flex-wr-sb-c">
              <span className="f1-s-8 cl3 p-r-20">6879 Người theo dõi</span>
              <a href="#" className="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">Thích</a>
            </div>
          </li>
          <li className="flex-wr-sb-c p-b-20">
            <a href="https://www.tiktok.com/" className="size-a-8 flex-c-c borad-3 fs-16 cl0 hov-cl0" style={{ backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <div className="size-w-3 flex-wr-sb-c">
              <span className="f1-s-8 cl3 p-r-20">568 Người theo dõi</span>
              <a href="#" className="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">Theo dõi</a>
            </div>
          </li>
          <li className="flex-wr-sb-c p-b-20">
            <a href="#" className="size-a-8 flex-c-c borad-3 size-a-8 bg-youtube fs-16 cl0 hov-cl0">
              <span className="fab fa-youtube"></span>
            </a>
            <div className="size-w-3 flex-wr-sb-c">
              <span className="f1-s-8 cl3 p-r-20">5039 Người đăng ký</span>
              <a href="#" className="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">Đăng ký</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Latest Posts Section
function LatestPosts() {
  const [posts, setPosts] = useState<FeaturedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch 6 latest articles (no filter, sorted by creation date)
    fetch('/api/news-articles?limit=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' });
  };

  return (
    <section className="bg0 p-t-60 p-b-35">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 p-b-20">
            <div className="tab01-head how2 how2-cl4 flex-s-c m-r-10 m-r-0-sr991">
              <h3 className="f1-m-2 cl3 tab01-title">Bài viết mới nhất</h3>
              <Link 
                href="/search"
                className="tab01-link f1-s-1 cl9 hov-cl10 trans-03"
              >
                Xem tất cả
                <i className="fs-12 m-l-5 fa fa-caret-right"></i>
              </Link>
            </div>

            <div className="row p-t-35">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="col-sm-6 p-r-25 p-r-15-sr991">
                    <div className="m-b-45">
                      <div style={{ backgroundColor: '#f5f5f5', height: '200px', borderRadius: '3px', marginBottom: '16px' }}></div>
                      <div style={{ backgroundColor: '#f5f5f5', height: '20px', borderRadius: '3px', marginBottom: '10px' }}></div>
                      <div style={{ backgroundColor: '#f5f5f5', height: '15px', borderRadius: '3px', width: '60%' }}></div>
                    </div>
                  </div>
                ))
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="col-sm-6 p-r-25 p-r-15-sr991">
                    <div className="m-b-45">
                      <Link href={`/articles/${post.slug}`} className="wrap-pic-w hov1 trans-03">
                        <img 
                          src={post.cover || '/images/latest-01.jpg'} 
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '3px'
                          }}
                        />
                      </Link>
                      <div className="p-t-16">
                        <h5 className="p-b-5">
                          <Link href={`/articles/${post.slug}`} className="f1-m-3 cl2 hov-cl10 trans-03">
                            {post.title}
                          </Link>
                        </h5>
                        <span className="cl8">
                          <Link 
                            href={getCategoryUrl(post.category, post.subCategory)} 
                            className="f1-s-4 cl8 hov-cl10"
                          >
                            {getDisplayCategory(post.category, post.subCategory)}
                          </Link>
                          <span className="f1-s-3 m-rl-3">-</span>
                          <span className="f1-s-3">{formatDate(post.createdAt)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 p-tb-50 text-center">
                  <p className="f1-s-1 cl6">Chưa có bài viết nào.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Video & Subscribe */}
          <div className="col-md-10 col-lg-4">
            <div className="p-l-10 p-rl-0-sr991 p-b-20">
              {/* Video */}
              <div className="p-b-55">
                <div className="how2 how2-cl4 flex-s-c m-b-35">
                  <h3 className="f1-m-2 cl3 tab01-title">Video nổi bật</h3>
                </div>

                <div>
                  <div className="wrap-pic-w pos-relative">
                    <img 
                      src="https://img.youtube.com/vi/y-1dOubitUE/maxresdefault.jpg" 
                      alt="Hội nghị khoa học toàn quốc Kết hợp Đông - Tây y trong chẩn đoán, điều trị Bệnh trào ngược dạ dày"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                    <button className="s-full ab-t-l flex-c-c fs-32 cl0 hov-cl10 trans-03" data-toggle="modal" data-target="#modal-video-01">
                      <span className="fab fa-youtube"></span>
                    </button>
                  </div>
                  <div className="p-tb-16 p-rl-25 bg3">
                    <h5 className="p-b-5">
                      <a href="#" className="f1-m-3 cl0 hov-cl10 trans-03">
                        Hội nghị khoa học toàn quốc Kết hợp Đông - Tây y trong chẩn đoán, điều trị Bệnh trào ngược dạ dày
                      </a>
                    </h5>
                    <span className="cl15">
                      <span className="f1-s-4 cl8">
                        bởi Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscribe */}
              <div className="bg10 p-rl-35 p-t-28 p-b-35 m-b-55">
                <h5 className="f1-m-5 cl0 p-b-10">Đăng ký nhận tin</h5>
                <p className="f1-s-1 cl0 p-b-25">
                  Nhận tất cả nội dung mới nhất được gửi đến email của bạn vài lần một tháng.
                </p>
                <form className="size-a-9 pos-relative">
                  <input className="s-full f1-m-6 cl6 plh9 p-l-20 p-r-55" type="text" name="email" placeholder="Nhập email của bạn" />
                  <button className="size-a-10 flex-c-c ab-t-r fs-16 cl9 hov-cl10 trans-03">
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </form>
              </div>

              {/* Text Library */}
              <div className="p-b-55">
                <div className="how2 how2-cl4 flex-s-c m-b-0 text-library-header">
                  <h3 className="f1-m-2 cl3 tab01-title">THƯ VIỆN VĂN BẢN</h3>
                </div>

                <ul className="p-t-0 text-library-list">
                  {[
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
                  ].map((doc, index) => (
                    <li key={index} className="text-library-item">
                      <a href="#" className="f1-s-7 cl3 hov-cl10 trans-03" style={{ display: 'block', marginBottom: '8px' }}>
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
          </div>
        </div>
      </div>
    </section>
  );
}

// Post Item Components
function PostItem({ image, title, category, categoryUrl, date, large, slug }: { 
  image: string; 
  title: string; 
  category: string;
  categoryUrl?: string;
  date: string;
  large?: boolean;
  slug?: string;
}) {
  const articleUrl = slug ? `/articles/${slug}` : '/articles';
  return (
    <div className="m-b-30">
      <Link href={articleUrl} className="wrap-pic-w hov1 trans-03">
        <img src={image} alt="IMG" />
      </Link>
      <div className="p-t-20">
        <h5 className="p-b-5">
          <Link href={articleUrl} className={`${large ? 'f1-m-3' : 'f1-s-5'} cl2 hov-cl10 trans-03`}>
            {title}
          </Link>
        </h5>
        <span className="cl8">
          <Link href={categoryUrl || '#'} className={`${large ? 'f1-s-4' : 'f1-s-6'} cl8 hov-cl10 trans-03`}>
            {category}
          </Link>
          <span className="f1-s-3 m-rl-3">-</span>
          <span className="f1-s-3">{date}</span>
        </span>
      </div>
    </div>
  );
}

function PostItemSmall({ image, title, category, categoryUrl, date, slug }: { 
  image: string; 
  title: string; 
  category: string;
  categoryUrl?: string;
  date: string;
  slug?: string;
}) {
  const articleUrl = slug ? `/articles/${slug}` : '/articles';
  return (
    <div className="flex-wr-sb-s m-b-30">
      <Link href={articleUrl} className="size-w-1 wrap-pic-w hov1 trans-03">
        <img src={image} alt="IMG" />
      </Link>
      <div className="size-w-2">
        <h5 className="p-b-5">
          <Link href={articleUrl} className="f1-s-5 cl3 hov-cl10 trans-03">
            {title}
          </Link>
        </h5>
        <span className="cl8">
          <Link href={categoryUrl || '#'} className="f1-s-6 cl8 hov-cl10 trans-03">
            {category}
          </Link>
          <span className="f1-s-3 m-rl-3">-</span>
          <span className="f1-s-3">{date}</span>
        </span>
      </div>
    </div>
  );
}

