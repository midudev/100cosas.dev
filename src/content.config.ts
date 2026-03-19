import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    initials: z.string(),
    bio: z.record(z.string(), z.string()),
    x: z.string().optional(),
    github: z.string().optional(),
  }),
});

const tips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tips' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    categoryColor: z.string().optional(),
    author: z.string(),
  }),
});

export const collections = { tips, authors };
