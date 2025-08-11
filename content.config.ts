import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const commonProjectSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  logo: z.string().url(),
  banner: z.string().url().optional(),
  github: z.string().url().optional(),
  links: z.array(
    z.object({
      name: z.string().nonempty(), // for screen readers
      icon: z.string().nonempty(),
      link: z.string().url(),
    }),
  ),
  release: z.string().nonempty(),
  startYear: z.string().nonempty(),
  endYear: z.string().optional(),
  isFeatured: z.boolean().optional(), // displays on home page
  isCollaborator: z.boolean().optional(),
  tags: z.array(z.string().nonempty()),
});

export default defineContentConfig({
  collections: {
    /* Projects */
    projects_en: defineCollection({
      type: "page",
      source: "projects/en/*.md",
      schema: commonProjectSchema,
    }),
    projects_fr: defineCollection({
      type: "page",
      source: "projects/fr/*.md",
      schema: commonProjectSchema,
    }),
  },
});
