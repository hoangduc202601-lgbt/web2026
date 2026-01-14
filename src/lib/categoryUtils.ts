// Mapping từ slug sang tên tiếng Việt có dấu
const categoryMap: Record<string, string> = {
  // Categories chính
  'tin-tuc': 'Tin tức',
  'suc-khoe-cong-dong': 'Sức khỏe cộng đồng',
  'van-hoa': 'Văn hóa',
  'xa-hoi': 'Xã hội',
  'y-hoc-co-truyen': 'Y học cổ truyền',
  'khoa-hoc-cong-nghe': 'Khoa học công nghệ',
  'hop-tac-lien-ket': 'Hợp tác liên kết',
  'trao-doi': 'Trao đổi',
  'thu-vien': 'Thư viện',

  // Subcategories
  'chinh-tri': 'Chính trị',
  'kinh-te': 'Kinh tế',
  'tu-van': 'Tư vấn',
  'song-khoe': 'Sống khỏe',
  'phap-luat': 'Pháp luật',
  'an-ninh-xa-hoi': 'An ninh xã hội',
  'cac-bai-thuoc': 'Các bài thuốc',
  'chan-dung-nhan-vat': 'Chân dung nhân vật',
  'dao-tao': 'Đào tạo',
  'y-kien-hoi-vien': 'Ý kiến hội viên',
  'gioi-thieu': 'Giới thiệu',
  'thu-vien-anh': 'Thư viện ảnh',
  'thu-vien-video': 'Thư viện Video',
  'e-magazine': 'E-magazine',
  'bao-in': 'Báo in',
}

/**
 * Convert category/subcategory slug sang tên tiếng Việt có dấu
 * @param slug - Slug cần convert (vd: "suc-khoe-cong-dong")
 * @returns Tên tiếng Việt có dấu (vd: "Sức khỏe cộng đồng")
 */
export function getCategoryName(slug: string | undefined | null): string {
  if (!slug) return ''
  return categoryMap[slug.toLowerCase()] ?? slug
}

/**
 * Lấy tên hiển thị ưu tiên subCategory, nếu không có thì dùng category
 * @param category - Category slug
 * @param subCategory - SubCategory slug
 * @param fallback - Giá trị mặc định nếu cả hai đều không có
 */
export function getDisplayCategory(
  category?: string | null,
  subCategory?: string | null,
  fallback = ''
): string {
  if (subCategory) {
    return getCategoryName(subCategory)
  }
  if (category) {
    return getCategoryName(category)
  }
  return fallback
}

/**
 * Tạo URL category từ category và subCategory
 * @param category - Category slug
 * @param subCategory - SubCategory slug (optional)
 * @returns URL category (vd: "/category/suc-khoe-cong-dong/tu-van")
 */
export function getCategoryUrl(
  category?: string | null,
  subCategory?: string | null
): string {
  if (subCategory && category) {
    return `/category/${category}/${subCategory}`
  }
  if (category) {
    return `/category/${category}`
  }
  return '#'
}

