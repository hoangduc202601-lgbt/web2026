import { marked } from 'marked';
import { Client } from '@notionhq/client';
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';

// ============================================
// NOTION CLIENT
// ============================================

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ============================================
// TYPES
// ============================================

type NotionBlockWithChildren = BlockObjectResponse & {
  children?: NotionBlockWithChildren[];
  [key: string]: any;
};

// ============================================
// CONFIGURE MARKED
// ============================================

// Cấu hình marked để render đẹp hơn
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Kiểm tra block có phải là full block
 */
function isFullBlock(block: BlockObjectResponse | PartialBlockObjectResponse): block is BlockObjectResponse {
  return 'type' in block;
}

/**
 * Lấy tất cả blocks của page (đệ quy với children)
 */
async function getBlocksWithChildren(blockId: string): Promise<NotionBlockWithChildren[]> {
  const blocks: NotionBlockWithChildren[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const response: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: startCursor,
      page_size: 100,
    });

    for (const block of response.results) {
      if (!isFullBlock(block)) continue;

      // Cast to our extended type
      const blockWithChildren = block as unknown as NotionBlockWithChildren;

      // Lấy children nếu có
      if (block.has_children) {
        blockWithChildren.children = await getBlocksWithChildren(block.id);
      }

      blocks.push(blockWithChildren);
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return blocks;
}

/**
 * Chuyển rich text thành markdown
 */
function richTextToMarkdown(richText: RichTextItemResponse[]): string {
  return richText.map((text) => {
    let content = text.plain_text;
    const annotations = text.annotations;

    // Xử lý formatting - thứ tự quan trọng!
    if (annotations.code) {
      content = `\`${content}\``;
    }
    if (annotations.bold && annotations.italic) {
      content = `***${content}***`;
    } else if (annotations.bold) {
      content = `**${content}**`;
    } else if (annotations.italic) {
      content = `*${content}*`;
    }
    if (annotations.strikethrough) {
      content = `~~${content}~~`;
    }
    if (annotations.underline) {
      content = `<u>${content}</u>`;
    }

    // Xử lý link
    if (text.href) {
      content = `[${content}](${text.href})`;
    }

    return content;
  }).join('');
}

/**
 * Lấy URL từ file object của Notion
 */
function getFileUrl(file: { type: 'external' | 'file'; external?: { url: string }; file?: { url: string } }): string {
  if (file.type === 'external') {
    return file.external?.url || '';
  }
  return file.file?.url || '';
}

// ============================================
// BLOCK TO MARKDOWN CONVERTERS
// ============================================

/**
 * Chuyển một block thành markdown
 */
function blockToMarkdown(block: NotionBlockWithChildren, indent: number = 0): string {
  const indentStr = '  '.repeat(indent);
  const blockData = block[block.type as keyof typeof block] as any;

  // Xử lý children
  const childrenMd = block.children
    ? block.children.map(child => blockToMarkdown(child, indent + 1)).join('\n')
    : '';

  switch (block.type) {
    // ========== TEXT BLOCKS ==========
    case 'paragraph': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      return text ? `${indentStr}${text}\n` : '\n';
    }

    case 'heading_1': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      return `\n# ${text}\n`;
    }

    case 'heading_2': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      return `\n## ${text}\n`;
    }

    case 'heading_3': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      return `\n### ${text}\n`;
    }

    // ========== LIST BLOCKS ==========
    case 'bulleted_list_item': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      const children = childrenMd ? `\n${childrenMd}` : '';
      return `${indentStr}- ${text}${children}`;
    }

    case 'numbered_list_item': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      const children = childrenMd ? `\n${childrenMd}` : '';
      return `${indentStr}1. ${text}${children}`;
    }

    case 'to_do': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      const checked = blockData.checked ? 'x' : ' ';
      const children = childrenMd ? `\n${childrenMd}` : '';
      return `${indentStr}- [${checked}] ${text}${children}`;
    }

    // ========== QUOTE & CODE ==========
    case 'quote': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      const lines = text.split('\n').map(line => `> ${line}`).join('\n');
      return `\n${lines}\n${childrenMd ? childrenMd : ''}`;
    }

    case 'code': {
      const code = blockData.rich_text?.map((t: RichTextItemResponse) => t.plain_text).join('') || '';
      const language = blockData.language || '';
      const caption = blockData.caption ? richTextToMarkdown(blockData.caption) : '';
      return `\n\`\`\`${language}\n${code}\n\`\`\`${caption ? `\n*${caption}*` : ''}\n`;
    }

    // ========== DIVIDER ==========
    case 'divider': {
      return '\n---\n';
    }

    // ========== MEDIA BLOCKS ==========
    case 'image': {
      const url = getFileUrl(blockData);
      const caption = blockData.caption ? richTextToMarkdown(blockData.caption) : 'Image';
      return `\n![${caption}](${url})\n`;
    }

    case 'video': {
      const url = getFileUrl(blockData);
      const caption = blockData.caption ? richTextToMarkdown(blockData.caption) : '';
      // Check if YouTube
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url);
        return `\n<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>${caption ? `\n*${caption}*` : ''}\n`;
      }
      return `\n<video src="${url}" controls></video>${caption ? `\n*${caption}*` : ''}\n`;
    }

    case 'embed': {
      const url = blockData.url || '';
      const caption = blockData.caption ? richTextToMarkdown(blockData.caption) : '';
      return `\n<iframe src="${url}" width="100%" height="400" frameborder="0"></iframe>${caption ? `\n*${caption}*` : ''}\n`;
    }

    case 'bookmark': {
      const url = blockData.url || '';
      const caption = blockData.caption ? richTextToMarkdown(blockData.caption) : url;
      return `\n[${caption}](${url})\n`;
    }

    case 'pdf':
    case 'file': {
      const url = getFileUrl(blockData);
      const caption = blockData.caption ? richTextToMarkdown(blockData.caption) : 'Download file';
      return `\n[📎 ${caption}](${url})\n`;
    }

    // ========== CALLOUT ==========
    case 'callout': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      const icon = blockData.icon?.emoji || '💡';
      const color = blockData.color || 'default';
      return `\n<div class="callout callout-${color}"><span class="callout-icon">${icon}</span><div class="callout-content">\n\n${text}\n\n${childrenMd}</div></div>\n`;
    }

    // ========== TOGGLE ==========
    case 'toggle': {
      const text = richTextToMarkdown(blockData.rich_text || []);
      return `\n<details>\n<summary>${text}</summary>\n\n${childrenMd}\n</details>\n`;
    }

    // ========== TABLE ==========
    case 'table': {
      if (!block.children || block.children.length === 0) return '';
      
      const rows: string[][] = [];
      for (const row of block.children) {
        if (row.type === 'table_row') {
          const rowData = (row as any).table_row;
          if (rowData?.cells) {
            const cells = rowData.cells.map((cell: RichTextItemResponse[]) => richTextToMarkdown(cell));
            rows.push(cells);
          }
        }
      }

      if (rows.length === 0) return '';

      // Build markdown table
      const headerRow = rows[0];
      const separator = headerRow.map(() => '---');
      const dataRows = rows.slice(1);

      let table = `\n| ${headerRow.join(' | ')} |\n`;
      table += `| ${separator.join(' | ')} |\n`;
      for (const row of dataRows) {
        table += `| ${row.join(' | ')} |\n`;
      }

      return table;
    }

    case 'table_row': {
      // Handled by parent table block
      return '';
    }

    // ========== COLUMNS ==========
    case 'column_list': {
      // Render as div container
      return `\n<div class="column-list">\n${childrenMd}\n</div>\n`;
    }

    case 'column': {
      return `<div class="column">\n\n${childrenMd}\n</div>`;
    }

    // ========== SPECIAL BLOCKS ==========
    case 'synced_block': {
      return childrenMd;
    }

    case 'template': {
      return childrenMd;
    }

    case 'child_page': {
      const title = blockData.title || 'Untitled';
      return `\n📄 **${title}**\n`;
    }

    case 'child_database': {
      const title = blockData.title || 'Untitled Database';
      return `\n📊 **${title}**\n`;
    }

    case 'table_of_contents': {
      return '\n*[Table of Contents]*\n';
    }

    case 'breadcrumb': {
      return '';
    }

    case 'equation': {
      const expression = blockData.expression || '';
      return `\n$$${expression}$$\n`;
    }

    case 'link_to_page': {
      return '\n🔗 *Link to page*\n';
    }

    case 'link_preview': {
      const url = blockData.url || '';
      return `\n[${url}](${url})\n`;
    }

    default:
      return '';
  }
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : '';
}

// ============================================
// MAIN EXPORT FUNCTIONS
// ============================================

/**
 * Lấy nội dung page dưới dạng Markdown
 */
export async function getPageAsMarkdown(pageId: string): Promise<string> {
  try {
    const blocks = await getBlocksWithChildren(pageId);
    
    const markdownParts: string[] = [];
    
    for (const block of blocks) {
      const md = blockToMarkdown(block);
      if (md) {
        markdownParts.push(md);
      }
    }

    return markdownParts.join('\n');
  } catch (error) {
    throw error;
  }
}

/**
 * Lấy nội dung page dưới dạng HTML (qua Markdown)
 */
export async function getPageAsHtml(pageId: string): Promise<string> {
  const markdown = await getPageAsMarkdown(pageId);
  const html = await marked.parse(markdown);
  return html;
}

/**
 * Convert markdown string sang HTML
 */
export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown) as string;
}

/**
 * Lấy thông tin page kèm content HTML
 */
export async function getNotionPageWithContent(pageId: string): Promise<{
  id: string;
  title: string;
  icon: string | null;
  cover: string | null;
  createdTime: string;
  lastEditedTime: string;
  markdown: string;
  html: string;
} | null> {
  try {
    // Lấy page info
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!('properties' in page)) {
      return null;
    }

    // Lấy title
    let title = 'Untitled';
    const titleProp = Object.values(page.properties).find(
      (prop) => prop.type === 'title'
    );
    if (titleProp && titleProp.type === 'title' && titleProp.title.length > 0) {
      title = titleProp.title.map((t) => t.plain_text).join('');
    }

    // Lấy icon
    let icon: string | null = null;
    if (page.icon) {
      if (page.icon.type === 'emoji') {
        icon = page.icon.emoji;
      } else if (page.icon.type === 'external') {
        icon = page.icon.external.url;
      } else if (page.icon.type === 'file') {
        icon = page.icon.file.url;
      }
    }

    // Lấy cover
    let cover: string | null = null;
    if (page.cover) {
      if (page.cover.type === 'external') {
        cover = page.cover.external.url;
      } else if (page.cover.type === 'file') {
        cover = page.cover.file.url;
      }
    }

    // Lấy content
    const markdown = await getPageAsMarkdown(pageId);
    const html = await marked.parse(markdown);

    return {
      id: page.id,
      title,
      icon,
      cover,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      markdown,
      html,
    };
  } catch (error) {
    return null;
  }
}

