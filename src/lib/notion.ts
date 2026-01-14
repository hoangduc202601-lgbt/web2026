import { Client, LogLevel } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not set in environment variables');
}

if (!process.env.NOTION_DATABASE_ARTICLES_ID) {
  throw new Error('NOTION_DATABASE_ARTICLES_ID is not set in environment variables');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Format database ID (remove dashes if present, Notion accepts both formats)
function formatDatabaseId(id: string): string {
  return id.replace(/-/g, '');
}

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  category: string;
  subCategory: string;
  createdAt: string;
}

type GetArticlesParams = {
  category?: string
  subCategory?: string
  limit?: number
  cursor?: string
}

type PaginatedResult<T> = {
  items: T[]
  nextCursor: string | null
  hasMore: boolean
}

export default async function getNotionArticles({
  category,
  subCategory,
  limit = 10,
  cursor,
}: GetArticlesParams): Promise<PaginatedResult<Article>> {
  const filters: any[] = [];

  if (category) {
    filters.push({
      property: 'category',
      select: { equals: category },
    })
  }

  if (subCategory) {
    filters.push({
      property: 'subcategory',
      select: { equals: subCategory },
    })
  }

  const response = await notion.databases.query({
    database_id: formatDatabaseId(process.env.NOTION_DATABASE_ARTICLES_ID!),
    ...(filters.length > 0 && { filter: { and: filters } }),
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: limit,
    ...(cursor && { start_cursor: cursor }),
  })

  return {
    items: response.results.map(mapArticle),
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  }
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const response = await notion.databases.query({
    database_id: formatDatabaseId(process.env.NOTION_DATABASE_ARTICLES_ID!),
    filter: {
      property: 'highlight',
      checkbox: { equals: true },
    },
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: limit,
  })

  return response.results.map(mapArticle)
}

export async function getHighlightedArticles(limit = 5): Promise<Article[]> {
  const response = await notion.databases.query({
    database_id: formatDatabaseId(process.env.NOTION_DATABASE_ARTICLES_ID!),
    filter: {
      property: 'highlight',
      checkbox: { equals: true },
    },
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: limit,
  })

  return response.results.map(mapArticle)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await notion.databases.query({
    database_id: formatDatabaseId(process.env.NOTION_DATABASE_ARTICLES_ID!),
    filter: {
      or: [
        {
          property: 'slug',
          rich_text: { equals: slug },
        },
        {
          property: 'slug',
          formula: { string: { equals: slug } },
        },
      ],
    },
    page_size: 1,
  })

  if (response.results.length === 0) {
    return null
  }

  return mapArticle(response.results[0])
}

function mapArticle(page: any): Article {
  const props = page.properties
  return {
    id: page.id,
    title: props.title?.title?.[0]?.plain_text ?? '',
    slug: props.slug?.rich_text?.[0]?.plain_text ?? props.slug?.formula?.string ?? '',
    category: props.category?.select?.name ?? '',
    subCategory: props.subcategory?.select?.name ?? '',
    cover: props.cover?.files?.[0]?.file?.url ?? props.cover?.files?.[0]?.external?.url ?? '',
    summary: props.summary?.rich_text?.[0]?.plain_text ?? '',
    createdAt: page.created_time,
  }
}