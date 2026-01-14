import { NextRequest, NextResponse } from 'next/server';
import getNotionArticles from '@/lib/notion';

// Normalize Vietnamese text for better search
function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim();
}

// Search with multiple strategies
function matchesSearch(title: string, query: string): boolean {
  const titleLower = title.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Strategy 1: Direct match (with Vietnamese diacritics)
  if (titleLower.includes(queryLower)) {
    return true;
  }
  
  // Strategy 2: Normalized match (without diacritics)
  const titleNormalized = normalizeVietnamese(title);
  const queryNormalized = normalizeVietnamese(query);
  if (titleNormalized.includes(queryNormalized)) {
    return true;
  }
  
  // Strategy 3: Match each word in query
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
  if (queryWords.length > 1) {
    const allWordsMatch = queryWords.every(word => 
      titleLower.includes(word) || normalizeVietnamese(title).includes(normalizeVietnamese(word))
    );
    if (allWordsMatch) {
      return true;
    }
  }
  
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    if (!query.trim()) {
      // If no query, return all articles with pagination
      let allItems: any[] = [];
      let cursor: string | undefined = undefined;
      let hasMore = true;
      const maxFetch = 1000; // Limit total fetch to prevent timeout

      // Fetch all articles
      while (hasMore && allItems.length < maxFetch) {
        const result = await getNotionArticles({
          limit: 100, // Fetch in batches of 100
          cursor,
        });

        allItems = [...allItems, ...result.items];
        cursor = result.nextCursor || undefined;
        hasMore = result.hasMore;

        if (result.items.length < 100) {
          hasMore = false;
        }
      }

      // Calculate pagination
      const totalItems = allItems.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedItems = allItems.slice(startIndex, endIndex);

      return NextResponse.json({
        items: paginatedItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          limit,
          hasMore: page < totalPages,
        },
      });
    }

    // Get all articles for search (fetch more for better search results)
    let allItems: any[] = [];
    let cursor: string | undefined = undefined;
    let hasMore = true;
    const maxFetch = 1000; // Limit total fetch to prevent timeout

    // Fetch all articles
    while (hasMore && allItems.length < maxFetch) {
      const result = await getNotionArticles({
        limit: 100, // Fetch in batches of 100
        cursor,
      });

      allItems = [...allItems, ...result.items];
      cursor = result.nextCursor || undefined;
      hasMore = result.hasMore;

      if (result.items.length < 100) {
        hasMore = false;
      }
    }
    
    // Filter articles by title using multiple search strategies
    const filteredArticles = allItems.filter(article => 
      matchesSearch(article.title, query.trim())
    );

    // Calculate pagination for filtered results
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredArticles.slice(startIndex, endIndex);

    return NextResponse.json({
      items: paginatedItems,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({
      items: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        limit: 10,
        hasMore: false,
      },
    });
  }
}

