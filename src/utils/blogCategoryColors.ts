/**
 * Blog category color mappings with WCAG AA compliant contrast ratios
 * All colors have a minimum contrast ratio of 4.5:1 with white text
 */
type BlogCategoryType =
  | "leyendas"
  | "legends"
  | "lugares-turisticos"
  | "tourist-places"
  | "celebraciones"
  | "celebrations"
  | "gastronomia"
  | "gastronomy"
  | "historia"
  | "history"
  | "tradiciones"
  | "traditions";

const BLOG_CATEGORY_COLORS: Record<BlogCategoryType, string> = {
  leyendas: "#6d28d9", // 7.10:1 AAA
  legends: "#6d28d9", // 7.10:1 AAA
  "lugares-turisticos": "#047857", // 5.48:1 AA
  "tourist-places": "#047857", // 5.48:1 AA
  celebraciones: "#dc2626", // 4.83:1 AA
  celebrations: "#dc2626", // 4.83:1 AA
  gastronomia: "#b45309", // 5.02:1 AA
  gastronomy: "#b45309", // 5.02:1 AA
  historia: "#1e40af", // 8.72:1 AAA
  history: "#1e40af", // 8.72:1 AAA
  tradiciones: "#be185d", // 6.04:1 AA
  traditions: "#be185d", // 6.04:1 AA
};

/**
 * Get the hex color for a given blog category
 * @param category - The blog category (leyendas, tourist-places, etc.)
 * @returns The hex color code for the category, defaults to historia/history blue
 */
export function getBlogCategoryColor(category: string): string {
  if (category in BLOG_CATEGORY_COLORS) {
    return BLOG_CATEGORY_COLORS[category as BlogCategoryType];
  }
  return "#1e40af"; // Default to historia/history blue
}
