import { defineCollection, z } from 'astro:content';

const tips = defineCollection({
	type: 'content',
	schema: z.object({
		id: z.string(),
		title: z.string(),
		category: z.string(),
		categoryColor: z.string().optional(),
		author: z.string(),
		authorInitials: z.string(),
		authorColor: z.string().optional(),
	}),
});

export const collections = { tips };
