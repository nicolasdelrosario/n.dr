import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ title: z.string(), description: z.string(), date: z.coerce.date(), language: z.enum(['es', 'en']), alternate: z.string() }),
});
export const collections = { blog };
