import { defineCollection, z } from 'astro:content';
const blog = defineCollection({ type: 'content', schema: z.object({ title: z.string(), description: z.string(), date: z.coerce.date(), language: z.enum(['es', 'en']), alternate: z.string() }) });
export const collections = { blog };
