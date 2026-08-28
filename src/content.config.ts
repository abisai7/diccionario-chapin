import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wordsSchema = z.object({
  word: z.string(),
  meaning: z.string(),
  examples: z.array(z.string()),
  publishedDate: z.string(),
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

const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  publishedDate: z.string(),
  updatedDate: z.string().optional(),
  author: z.string().default("Abisai Herrera"),
  category: z.enum([
    "leyendas",
    "lugares-turisticos",
    "celebraciones",
    "gastronomia",
    "historia",
    "tradiciones",
    "legends",
    "tourist-places",
    "celebrations",
    "gastronomy",
    "history",
    "traditions",
  ]),
  image: z.string(),
  imageAlt: z.string(),
  tags: z.array(z.string()).optional(),
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

const blogEsCollection = defineCollection({
  loader: glob({ base: "./src/content/blog-es", pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});

const blogEnCollection = defineCollection({
  loader: glob({ base: "./src/content/blog-en", pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});

export const collections = {
  "words-es": wordsEsCollection,
  "words-en": wordsEnCollection,
  "blog-es": blogEsCollection,
  "blog-en": blogEnCollection,
};
