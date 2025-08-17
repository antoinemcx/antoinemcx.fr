import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { ProjectStatus } from "./app/types/content";

const commonProjectSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  logo: z.string().url(),
  banner: z.string().url().optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
  discord: z.string().url().optional(),
  otherLinks: z.array(
    z.object({
      name: z.string().nonempty(),
      link: z.string().url(),
    }),
  ).optional(),
  startYear: z.string().nonempty(),
  endYear: z.string().optional(),
  isFeatured: z.boolean().optional(), // displays on home page
  isContributor: z.boolean().optional(),
  status: z.nativeEnum(ProjectStatus).optional(), // active default
  technologies: z.array(z.string().nonempty()),
  tags: z.array(z.string().nonempty()).optional(),
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
    /* Technologies */
    technologies: defineCollection({
      type: "data",
      source: "technologies.json",
      schema: z.object({
        items: z.array(z.object({
          name: z.string().nonempty(),
          icon: z.string().url(),
          link: z.string().url(),
        })),
      }),
    }),
  },
});
