/**
 * Utilities for optimizing Unsplash image delivery.
 *
 * Unsplash CDN supports these query parameters on `urls.raw`:
 *   fm=webp|jpg|avif  — output format
 *   w=NNN             — width in pixels
 *   q=NN              — quality (0–100)
 *   fit=max           — scale down to fit, never upscale
 *   auto=format       — (alternative) auto-negotiate format (not used here; we prefer explicit)
 */

export type UnsplashFormat = "webp" | "jpg" | "avif";

/**
 * Append or replace Unsplash CDN parameters on a raw or regular Unsplash URL.
 * Strips existing `fm`, `w`, and `q` params and sets the provided values.
 */
export function buildUnsplashUrl(
  rawUrl: string,
  width: number,
  format: UnsplashFormat = "webp",
  quality = 75
): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("fm", format);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality));
    url.searchParams.set("fit", "max");
    // Remove conflicting params that may have come from `urls.regular`
    url.searchParams.delete("cs");
    url.searchParams.delete("auto");
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * Build a `srcset` string for a given Unsplash URL at multiple widths.
 *
 * @param rawUrl   - `urls.raw` (or `urls.regular`) from the Unsplash API
 * @param widths   - Array of pixel widths, e.g. [480, 800, 1280]
 * @param format   - Target format; defaults to "webp"
 * @param quality  - Compression quality (0–100); defaults to 75
 * @returns        A valid `srcset` attribute value string
 */
export function buildUnsplashSrcset(
  rawUrl: string,
  widths: number[],
  format: UnsplashFormat = "webp",
  quality = 75
): string {
  return widths.map((w) => `${buildUnsplashUrl(rawUrl, w, format, quality)} ${w}w`).join(", ");
}
