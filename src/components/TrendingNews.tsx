'use client';

import { useState, useEffect } from 'react';

type TrendingNewsProps = {
  titles?: string[];
};

export default function TrendingNews({ titles }: TrendingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'visible' | 'fadeOut' | 'fadeIn'>('visible');

  // Default titles nếu không có props
  const trendingItems = titles && titles.length > 0 
    ? titles 
    : ['Đang tải tin tức...'];

  useEffect(() => {
    if (trendingItems.length <= 1) return;

    const interval = setInterval(() => {
      // Bắt đầu fade out - trượt lên
      setAnimationState('fadeOut');
      
      // Sau khi fade out xong, đổi text và chuẩn bị fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % trendingItems.length);
        setAnimationState('fadeIn');
        
        // Sau một chút, chuyển sang visible
        setTimeout(() => {
          setAnimationState('visible');
        }, 50);
      }, 600); // Đợi animation fade out
      
    }, 4000); // Đổi mỗi 4 giây

    return () => clearInterval(interval);
  }, [trendingItems.length]);

  const getStyles = () => {
    switch (animationState) {
      case 'fadeOut':
        return {
          opacity: 0,
          transform: 'translateY(-20px)',
        };
      case 'fadeIn':
        return {
          opacity: 0,
          transform: 'translateY(20px)',
        };
      case 'visible':
      default:
        return {
          opacity: 1,
          transform: 'translateY(0)',
        };
    }
  };

  return (
    <span 
      className="cl6 trending-text"
      style={{
        ...getStyles(),
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1,
        minWidth: 0
      }}
    >
      {trendingItems[currentIndex]}
    </span>
  );
}
