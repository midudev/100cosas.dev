import { defineCollection, z } from 'astro:content';

const authors = defineCollection({
	type: 'data',
	schema: z.object({
		id: z.string(),
		name: z.string(),
		initials: z.string(),
		color: z.string().optional(),
		bio: z.record(z.string()),
		x: z.string().optional(),
		github: z.string().optional(),
	}),
});

const tips = defineCollection({
	type: 'content',
	schema: z.object({
		id: z.string(),
		title: z.string(),
		category: z.string(),
		categoryColor: z.string().optional(),
		author: z.string(),
	}),
});

export const collections = { tips, authors };
