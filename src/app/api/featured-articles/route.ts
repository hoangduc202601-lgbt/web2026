import { NextResponse } from 'next/server'
import { getFeaturedArticles } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const articles = await getFeaturedArticles(4)
    return NextResponse.json(articles)
  } catch (error: any) {
    
    // Provide more helpful error messages
    if (error.code === 'object_not_found') {
      return NextResponse.json(
        { 
          error: 'Database not found. Please make sure: 1) The database ID is correct, 2) The database is shared with your Notion integration.',
          details: error.message 
        },
        { status: 404 }
      )
    }
    
    if (error.message?.includes('NOTION_API_KEY') || error.message?.includes('NOTION_DATABASE_ARTICLES_ID')) {
      return NextResponse.json(
        { 
          error: 'Configuration error',
          details: error.message 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch featured articles',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}

