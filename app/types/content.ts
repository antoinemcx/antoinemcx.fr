import type { Collections } from "@nuxt/content";

export type ProjectsCollectionItem
  = Collections["projects_en"] | Collections["projects_fr"];

export type ExperiencesCollectionItem
  = (Collections["experiences_en"] | Collections["experiences_fr"]) & {
    monthDuration?: number;
  };

export type EducationCollectionItem
  = Collections["education_en"] | Collections["education_fr"];

export enum ProjectStatus {
  NEW = "new",
  SOON = "soon",
  ACTIVE = "active", // active development and/or maintenance
  ARCHIVED = "archived",
  DISCONTINUED = "discontinued",
  // else : under maintenance but no more active development
}
