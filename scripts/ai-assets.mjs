import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const SITE = "https://chapinismos.org";

const CONTENT_ROOTS = {
  es: new URL("../src/content/words-es/", import.meta.url),
  en: new URL("../src/content/words-en/", import.meta.url),
};

const LABELS = {
  es: {
    category: "Categoría",
    region: "Región",
    published: "Publicado",
    examples: "Ejemplos",
    synonyms: "Sinónimos",
    links: "Enlaces",
    viewPage: "Ver en el diccionario",
    otherLang: "Versión en inglés",
    otherLangMd: "Version en inglés (markdown)",
    full: "Diccionario completo (llms-full.txt)",
    indexTitle: "Índice de palabras (Español)",
    words: (n) => `${n} palabras`,
    tagline:
      "Diccionario bilingüe (es/en) de chapinismos guatemaltecos, con definiciones y ejemplos.",
  },
  en: {
    category: "Category",
    region: "Region",
    published: "Published",
    examples: "Examples",
    synonyms: "Synonyms",
    links: "Links",
    viewPage: "View in the dictionary",
    otherLang: "Spanish version",
    otherLangMd: "Spanish version (markdown)",
    full: "Full dictionary (llms-full.txt)",
    indexTitle: "Word index (English)",
    words: (n) => `${n} words`,
    tagline: "Bilingual (es/en) Guatemalan slang dictionary with definitions and examples.",
  },
};

function parseFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };
  const body = source.slice(match[0].length).trim();
  let data = {};
  try {
    data = yaml.load(match[1]) ?? {};
  } catch {
    // Fall back to an empty payload; content validation already passed in the build.
  }
  return { data, body };
}

async function loadCollection(url) {
  const dir = fileURLToPath(url);
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md"));
  const entries = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    entries.push({ id: file.replace(/\.md$/, ""), data, body });
  }
  return entries;
}

function blockquote(text) {
  return text
    .split("\n")
    .map((line) => `> ${line}`.trimEnd())
    .join("\n");
}

function sortWords(entries) {
  return [...entries].sort((a, b) => a.data.word.localeCompare(b.data.word, "es"));
}

function buildWordMarkdown({ lang, entry }) {
  const otherLang = lang === "es" ? "en" : "es";
  const t = LABELS[lang];
  const w = entry.data;
  const lines = [];

  lines.push(`# ${w.word}`, "");
  lines.push(blockquote(w.meaning), "");
  lines.push(`- ${t.category}: ${w.category}`);
  if (w.region) lines.push(`- ${t.region}: ${w.region}`);
  lines.push(`- ${t.published}: ${w.publishedDate}`, "");

  if (entry.body) {
    lines.push(entry.body, "");
  }

  if (w.examples && w.examples.length > 0) {
    lines.push(`## ${t.examples}`, "");
    lines.push(...w.examples.map((ex) => `- "${ex}"`), "");
  }

  if (w.synonyms && w.synonyms.length > 0) {
    lines.push(`## ${t.synonyms}`, "");
    lines.push(...w.synonyms.map((syn) => `- ${syn}`), "");
  }

  lines.push(`## ${t.links}`, "");
  lines.push(`- [${t.viewPage}](${SITE}/${lang}/palabras/${entry.id}/)`);
  lines.push(`- [${t.otherLang}](${SITE}/${otherLang}/palabras/${entry.id}/)`);
  lines.push(`- [${t.otherLangMd}](${SITE}/${otherLang}/palabras/${entry.id}.md)`);
  lines.push(`- [${t.full}](${SITE}/llms-full.txt)`);

  return lines.join("\n");
}

function buildIndexMarkdown({ lang, entries }) {
  const otherLang = lang === "es" ? "en" : "es";
  const t = LABELS[lang];
  const sorted = sortWords(entries);
  const grouped = sorted.reduce((acc, item) => {
    const letter = item.data.word[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  const lines = [
    `# ${t.indexTitle}`,
    "",
    blockquote(
      `${t.tagline} ${t.words(sorted.length)} — [${LABELS[otherLang].indexTitle}](${SITE}/${otherLang}/indice/) · [${t.full}](${SITE}/llms-full.txt)`
    ),
    "",
  ];

  for (const letter of Object.keys(grouped).sort()) {
    lines.push(`## ${letter}`, "");
    for (const entry of grouped[letter]) {
      lines.push(
        `- [${entry.data.word}](${SITE}/${lang}/palabras/${entry.id}/): ${entry.data.meaning} (${entry.data.category})`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildFullText({ es, en }) {
  const lines = [
    "# Diccionario Chapín — Contenido completo / Full content",
    "",
    "> Diccionario bilingüe (es/en) de chapinismos guatemaltecos, con definiciones y ejemplos.",
    "> Bilingual (es/en) Guatemalan slang dictionary with definitions and examples.",
    "",
    `- [Índice de palabras (Español)](${SITE}/es/indice/)`,
    `- [Word index (English)](${SITE}/en/indice/)`,
    `- [llms.txt](${SITE}/llms.txt)`,
    "",
  ];

  for (const [lang, label] of [
    ["es", "Español"],
    ["en", "English"],
  ]) {
    const t = LABELS[lang];
    const otherLang = lang === "es" ? "en" : "es";
    lines.push(`## ${label}`, "");
    lines.push(`${t.words(sortWords(lang === "es" ? es : en).length)}`, "");
    for (const entry of sortWords(lang === "es" ? es : en)) {
      const w = entry.data;
      lines.push(`### ${w.word}`, "");
      lines.push(blockquote(w.meaning), "");
      lines.push(`- ${t.category}: ${w.category}`);
      if (w.region) lines.push(`- ${t.region}: ${w.region}`);
      lines.push(
        `- [${t.viewPage}](${SITE}/${lang}/palabras/${entry.id}/) · [markdown](${SITE}/${lang}/palabras/${entry.id}.md) · [${LABELS[otherLang].viewPage}](${SITE}/${otherLang}/palabras/${entry.id}/)`
      );
      lines.push("");
      if (w.examples && w.examples.length > 0) {
        lines.push(`- ${t.examples}:`);
        for (const ex of w.examples) {
          lines.push(`  - "${ex}"`);
        }
        lines.push("");
      }
      if (w.synonyms && w.synonyms.length > 0) {
        lines.push(`- ${t.synonyms}: ${w.synonyms.join(", ")}`);
        lines.push("");
      }
      if (entry.body) {
        lines.push(entry.body, "");
      }
    }
  }

  return lines.join("\n");
}

async function generate(outDir) {
  const [es, en] = await Promise.all([
    loadCollection(CONTENT_ROOTS.es),
    loadCollection(CONTENT_ROOTS.en),
  ]);
  const byLang = { es, en };

  const tasks = [[path.join(outDir, "llms-full.txt"), buildFullText({ es, en })]];

  for (const lang of ["es", "en"]) {
    tasks.push([
      path.join(outDir, lang, "indice.md"),
      buildIndexMarkdown({ lang, entries: byLang[lang] }),
    ]);
    for (const entry of byLang[lang]) {
      tasks.push([
        path.join(outDir, lang, "palabras", `${entry.id}.md`),
        buildWordMarkdown({ lang, entry }),
      ]);
    }
  }

  for (const [file, content] of tasks) {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, content, "utf8");
  }
}

export default function aiAssets() {
  return {
    name: "ai-assets-generator",
    hooks: {
      "astro:build:generated": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        await generate(outDir);
        logger.info("Generated markdown versions, llms-full.txt and word .md files");
      },
    },
  };
}
