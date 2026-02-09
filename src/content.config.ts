import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
    series: z.string().optional(),
    issue: z.number().optional(),
    substack: z.boolean().default(false),
    substack_id: z.number().optional(),
    audience: z.enum(['everyone', 'paid', 'free']).default('everyone'),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { posts };
