import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Efraim Church'),
    description: z.string(),
    image: z.string().optional(),
    category: z.enum(['Missioni', 'Iniziative', 'Comunità', 'Testimonianze', 'Novità']).default('Novità').optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const eventi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventi' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.preprocess(
      (v) => (v === '' || v === null || v === undefined ? undefined : v),
      z.coerce.date().optional()
    ),
    time: z.string().optional(),
    location: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    link: z.string().nullish().transform(v => (!v || v === '') ? undefined : v),
    recurring: z.enum(['none', 'settimanale']).default('none'),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string().optional(),
    bio: z.string().optional(),
    order: z.number().default(0),
  }),
});

const missioni = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/missioni' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    mission: z.enum(['kenya', 'india']),
    description: z.string(),
    images: z.array(z.string()).optional(),
  }),
});

const galleria = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galleria' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    caption: z.string().optional(),
    category: z.enum(['kenya', 'india', 'chiesa', 'eventi']),
    date: z.coerce.date().optional(),
    visible: z.boolean().default(true),
  }),
});

export const collections = { blog, eventi, team, missioni, galleria };
