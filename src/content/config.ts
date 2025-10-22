import { defineCollection, z } from "astro:content";

const wordsCollection = defineCollection({
    type: "content",
    schema: z.object({
        word: z.string(),
        meaning: z.string(),
        examples: z.array(z.string()),
        category: z.enum(["sustantivo", "verbo", "adjetivo", "expresión", "modismo"]).optional(),
        region: z.string().optional(),
        synonyms: z.array(z.string()).optional(),
        relatedWords: z.array(z.string()).optional(),
    }),
});

export const collections = {
    words: wordsCollection,
};
