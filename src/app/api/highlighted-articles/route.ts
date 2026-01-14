import { NextResponse } from 'next/server';
import { getHighlightedArticles } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const articles = await getHighlightedArticles(5);
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch highlighted articles' },
      { status: 500 }
    );
  }
}

