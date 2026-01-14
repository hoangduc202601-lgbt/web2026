import { NextResponse } from 'next/server';
import getNotionArticles from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const subCategory = searchParams.get('subCategory') || undefined;
    const limit = parseInt(searchParams.get('limit') || '4', 10);

    const result = await getNotionArticles({
      category,
      subCategory,
      limit,
    });

    return NextResponse.json(result.items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

