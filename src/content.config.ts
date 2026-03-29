import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const wordsSchema = z.object({
  word: z.string(),
  meaning: z.string(),
  examples: z.array(z.string()),
  category: z.enum([
    "sustantivo",
    "verbo",
    "adjetivo",
    "adverbio",
    "expresión",
    "interjección",
    "modismo",
    "noun",
    "verb",
    "adjective",
    "adverb",
    "expression",
    "interjection",
    "idiom",
  ]),
  region: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
  relatedWords: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

const wordsEsCollection = defineCollection({
  loader: glob({ base: "./src/content/words-es", pattern: "**/*.{md,mdx}" }),
  schema: wordsSchema,
});

const wordsEnCollection = defineCollection({
  loader: glob({ base: "./src/content/words-en", pattern: "**/*.{md,mdx}" }),
  schema: wordsSchema,
});

export const collections = {
  "words-es": wordsEsCollection,
  "words-en": wordsEnCollection,
};
