import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const MAX_WORD_LENGTH = 80;
const MAX_TEXT_LENGTH = 1200;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;

function normalizeValue(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST, OPTIONS",
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
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
  const toEmail = import.meta.env.CONTRIBUTIONS_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    return jsonResponse({ error: "Email service is not configured" }, 500);
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

    if (company) {
      return jsonResponse({ ok: true }, 200);
    }

    if (!word || word.length > MAX_WORD_LENGTH) {
      return jsonResponse({ error: "Invalid word" }, 400);
    }

    if (meaning.length > MAX_TEXT_LENGTH || examples.length > MAX_TEXT_LENGTH) {
      return jsonResponse({ error: "Input is too long" }, 400);
    }

    if (name.length > MAX_NAME_LENGTH || contributorEmail.length > MAX_EMAIL_LENGTH) {
      return jsonResponse({ error: "Input is too long" }, 400);
    }

    if (contributorEmail && !isValidEmail(contributorEmail)) {
      return jsonResponse({ error: "Invalid email" }, 400);
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
      return jsonResponse({ error: "Failed to send contribution email" }, 500);
    }

    return jsonResponse({ ok: true }, 200);
  } catch {
    return jsonResponse({ error: "Unable to send contribution" }, 500);
  }
};
