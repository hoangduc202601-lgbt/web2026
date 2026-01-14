import { NextResponse } from 'next/server';
import getNotionArticles from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const subCategory = searchParams.get('subCategory') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // For efficient pagination, we'll fetch all articles and paginate server-side
    // This works well for moderate numbers of articles
    // For better performance with large datasets, consider implementing cursor-based pagination with caching
    let allItems: any[] = [];
    let cursor: string | undefined = undefined;
    let hasMore = true;
    const maxFetch = 1000; // Limit total fetch to prevent timeout

    // Fetch all articles for the category
    while (hasMore && allItems.length < maxFetch) {
      const result = await getNotionArticles({
        category,
        subCategory,
        limit: 100, // Fetch in batches of 100
        cursor,
      });

      allItems = [...allItems, ...result.items];
      cursor = result.nextCursor || undefined;
      hasMore = result.hasMore;

      // If we got less than requested, we've reached the end
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
  } catch (error) {
    console.error('Error fetching category articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category articles' },
      { status: 500 }
    );
  }
}

