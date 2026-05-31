import { Resend } from "resend";

const MAX_WORD_LENGTH = 80;
const MAX_TEXT_LENGTH = 1200;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;

function normalizeValue(value) {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Allow", "POST, OPTIONS");
  res.end(JSON.stringify(payload));
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === "object") {
      resolve(req.body);
      return;
    }

    if (typeof req.body === "string") {
      try {
        resolve(JSON.parse(req.body));
      } catch {
        reject(new Error("Invalid JSON payload"));
      }
      return;
    }

    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON payload"));
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Allow", "POST, OPTIONS");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTRIBUTIONS_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    sendJson(res, 500, { error: "Email service is not configured" });
    return;
  }

  try {
    const body = await getBody(req);
    const payload = body && typeof body === "object" ? body : {};

    const word = normalizeValue(payload.word);
    const meaning = normalizeValue(payload.meaning);
    const examples = normalizeValue(payload.examples);
    const name = normalizeValue(payload.name);
    const contributorEmail = normalizeValue(payload.email);
    const company = normalizeValue(payload.company);

    if (company) {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (!word || word.length > MAX_WORD_LENGTH) {
      sendJson(res, 400, { error: "Invalid word" });
      return;
    }

    if (meaning.length > MAX_TEXT_LENGTH || examples.length > MAX_TEXT_LENGTH) {
      sendJson(res, 400, { error: "Input is too long" });
      return;
    }

    if (name.length > MAX_NAME_LENGTH || contributorEmail.length > MAX_EMAIL_LENGTH) {
      sendJson(res, 400, { error: "Input is too long" });
      return;
    }

    if (contributorEmail && !isValidEmail(contributorEmail)) {
      sendJson(res, 400, { error: "Invalid email" });
      return;
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
      subject: `[chapinismos.org] Nueva contribucion a revisar: ${word}`,
      text: [
        "Nueva contribucion recibida desde chapinismos.org",
        "",
        `Palabra: ${word}`,
        `Posible significado o correccion: ${meaning || "(sin contenido)"}`,
        `Ejemplos de uso: ${examples || "(sin contenido)"}`,
        `Nombre (opcional): ${name || "(sin contenido)"}`,
        `Correo (opcional): ${contributorEmail || "(sin contenido)"}`,
        `Fecha (UTC): ${submittedAt}`,
      ].join("\n"),
      html: `
        <h2>Nueva contribucion a revisar</h2>
        <p><strong>Palabra:</strong> ${safeWord}</p>
        <p><strong>Posible significado o correccion:</strong><br/>${safeMeaning.replace(/\n/g, "<br/>")}</p>
        <p><strong>Ejemplos de uso:</strong><br/>${safeExamples.replace(/\n/g, "<br/>")}</p>
        <p><strong>Nombre (opcional):</strong> ${safeName}</p>
        <p><strong>Correo (opcional):</strong> ${safeEmail}</p>
        <p><strong>Fecha (UTC):</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    if (emailResult.error) {
      sendJson(res, 500, { error: "Failed to send contribution email" });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { error: "Unable to send contribution" });
  }
}
