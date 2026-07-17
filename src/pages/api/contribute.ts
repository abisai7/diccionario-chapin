import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const MAX_WORD_LENGTH = 80;
const MAX_TEXT_LENGTH = 1200;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const GENERIC_VALIDATION_ERROR = "Please review your submission and try again.";
const GENERIC_SERVER_ERROR = "We could not send your contribution. Please try again shortly.";
const RATE_LIMIT_ERROR = "Too many submissions from your location. Please wait a few minutes.";

type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimits.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function pruneExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) {
      rateLimits.delete(key);
    }
  }
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin requests (form post, no preflight) don't always send Origin.
    // Allow when the Sec-Fetch-Site header indicates same-origin or none.
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (secFetchSite === "same-origin" || secFetchSite === "none") {
      return true;
    }
    return false;
  }

  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}

function normalizeValue(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(
  payload: Record<string, unknown>,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST, OPTIONS",
      ...extraHeaders,
    },
  });
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: GENERIC_VALIDATION_ERROR }, 403);
  }

  const clientKey = getClientKey(request);
  pruneExpiredEntries();
  const limit = checkRateLimit(clientKey);
  if (!limit.allowed) {
    return jsonResponse({ error: RATE_LIMIT_ERROR }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
  const toEmail = import.meta.env.CONTRIBUTIONS_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    console.error("[contribute] Email service is not configured");
    return jsonResponse({ error: GENERIC_SERVER_ERROR }, 500);
  }

  try {
    const rawBody = await request.json();
    const payload = rawBody && typeof rawBody === "object" ? rawBody : {};

    const word = normalizeValue((payload as Record<string, unknown>).word);
    const meaning = normalizeValue((payload as Record<string, unknown>).meaning);
    const examples = normalizeValue((payload as Record<string, unknown>).examples);
    const name = normalizeValue((payload as Record<string, unknown>).name);
    const contributorEmail = normalizeValue((payload as Record<string, unknown>).email);
    const company = normalizeValue((payload as Record<string, unknown>).company);

    // Honeypot — accept silently to avoid signaling bots.
    if (company) {
      return jsonResponse({ ok: true }, 200);
    }

    if (!word || word.length > MAX_WORD_LENGTH) {
      return jsonResponse({ error: GENERIC_VALIDATION_ERROR }, 400);
    }

    if (meaning.length > MAX_TEXT_LENGTH || examples.length > MAX_TEXT_LENGTH) {
      return jsonResponse({ error: GENERIC_VALIDATION_ERROR }, 400);
    }

    if (name.length > MAX_NAME_LENGTH || contributorEmail.length > MAX_EMAIL_LENGTH) {
      return jsonResponse({ error: GENERIC_VALIDATION_ERROR }, 400);
    }

    if (contributorEmail && !isValidEmail(contributorEmail)) {
      return jsonResponse({ error: GENERIC_VALIDATION_ERROR }, 400);
    }

    // Require *some* substance for a real review.
    if (!meaning && !examples) {
      return jsonResponse(
        { error: "Add a meaning or at least one usage example so we can review this." },
        400
      );
    }

    const resend = new Resend(resendApiKey);

    const safeWord = escapeHtml(word);
    const safeMeaning = meaning ? escapeHtml(meaning) : "(sin contenido)";
    const safeExamples = examples ? escapeHtml(examples) : "(sin contenido)";
    const safeName = name ? escapeHtml(name) : "(sin contenido)";
    const safeEmail = contributorEmail ? escapeHtml(contributorEmail) : "(sin contenido)";
    const submittedAt = new Date().toISOString();

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[chapinismos.org] Nueva contribución a revisar: ${word}`,
      text: [
        "Nueva contribución recibida desde diccionario-chapin.org",
        "",
        `Palabra: ${word}`,
        `Posible significado o correccion: ${meaning || "(sin contenido)"}`,
        `Ejemplos de uso: ${examples || "(sin contenido)"}`,
        `Nombre (opcional): ${name || "(sin contenido)"}`,
        `Correo (opcional): ${contributorEmail || "(sin contenido)"}`,
        `Fecha (UTC): ${submittedAt}`,
      ].join("\n"),
      html: `
        <h2>Nueva contribución a revisar</h2>
        <p><strong>Palabra:</strong> ${safeWord}</p>
        <p><strong>Posible significado o correccion:</strong><br/>${safeMeaning.replace(/\n/g, "<br/>")}</p>
        <p><strong>Ejemplos de uso:</strong><br/>${safeExamples.replace(/\n/g, "<br/>")}</p>
        <p><strong>Nombre (opcional):</strong> ${safeName}</p>
        <p><strong>Correo (opcional):</strong> ${safeEmail}</p>
        <p><strong>Fecha (UTC):</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    if (emailResult.error) {
      console.error("[contribute] Resend error:", emailResult.error);
      return jsonResponse({ error: GENERIC_SERVER_ERROR }, 500);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    console.error("[contribute] Unexpected error:", error);
    return jsonResponse({ error: GENERIC_SERVER_ERROR }, 500);
  }
};
