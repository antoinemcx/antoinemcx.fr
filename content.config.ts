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

const commonExperienceSchema = z.object({
  title: z.string().nonempty(),
  contract: z.string().nonempty().optional(),
  company: z.string().nonempty(),
  companyWebsite: z.string().url().optional(),
  companyLogo: z.string().url(),
  location: z.string().nonempty(),
  startDate: z.string().nonempty(),
  endDate: z.string().optional(),
  description: z.array(z.string().nonempty()),
  skills: z.array(z.string().nonempty()).optional(),
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
    /* Experiences */
    experiences_en: defineCollection({
      type: "data",
      source: "experiences/en/*.json",
      schema: commonExperienceSchema,
    }),
    experiences_fr: defineCollection({
      type: "data",
      source: "experiences/fr/*.json",
      schema: commonExperienceSchema,
    }),
    /* Education */
    education_en: defineCollection({
      type: "data",
      source: "education/en/*.json",
      schema: commonExperienceSchema,
    }),
    education_fr: defineCollection({
      type: "data",
      source: "education/fr/*.json",
      schema: commonExperienceSchema,
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
