/**
 * Category color mappings with WCAG AA compliant contrast ratios
 * All colors have a minimum contrast ratio of 4.5:1 with white text
 */
type CategoryType =
  | "sustantivo"
  | "noun"
  | "verbo"
  | "verb"
  | "adjetivo"
  | "adjective"
  | "adverbio"
  | "adverb"
  | "expresion"
  | "expression"
  | "interjección"
  | "interjection";

const CATEGORY_COLORS: Record<CategoryType, string> = {
  sustantivo: "#047857", // 5.48:1 AA
  noun: "#047857", // 5.48:1 AA
  verbo: "#1e40af", // 8.72:1 AAA
  verb: "#1e40af", // 8.72:1 AAA
  adjetivo: "#b45309", // 5.02:1 AA
  adjective: "#b45309", // 5.02:1 AA
  adverbio: "#6d28d9", // 7.10:1 AAA
  adverb: "#6d28d9", // 7.10:1 AAA
  expresion: "#be185d", // 6.04:1 AA
  expression: "#be185d", // 6.04:1 AA
  interjección: "#dc2626", // 4.83:1 AA
  interjection: "#dc2626", // 4.83:1 AA
};

/**
 * Get the hex color for a given category
 * @param category - The category type (sustantivo, verbo, etc.)
 * @returns The hex color code for the category, defaults to verbo/verb blue
 * @example
 * getCategoryColor("sustantivo") // "#047857"
 */
export function getCategoryColor(category: string): string {
  if (category in CATEGORY_COLORS) {
    return CATEGORY_COLORS[category as CategoryType];
  }
  return "#1e40af"; // Default to verbo/verb blue
}

/**
 * Validate if a category is a known type
 * @param category - The category to validate
 * @returns True if the category is recognized
 */
export function isValidCategory(category: string): category is CategoryType {
  return category in CATEGORY_COLORS;
}

/**
 * Get all available category colors
 * @returns Object with all category colors
 */
export function getAllCategoryColors(): Record<CategoryType, string> {
  return CATEGORY_COLORS;
}
