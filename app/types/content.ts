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
  SOON = "soon",
  ACTIVE = "active", // supposedly default
  ARCHIVED = "archived",
  DISCONTINUED = "discontinued",
}
