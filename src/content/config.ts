import { defineCollection, z } from "astro:content";

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
  type: "content",
  schema: wordsSchema,
});

const wordsEnCollection = defineCollection({
  type: "content",
  schema: wordsSchema,
});

export const collections = {
  "words-es": wordsEsCollection,
  "words-en": wordsEnCollection,
};
