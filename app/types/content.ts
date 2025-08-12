import type { Collections } from "@nuxt/content";

export type ProjectsCollectionItem
= Collections["projects_en"] | Collections["projects_fr"];

export enum ProjectStatus {
  SOON = "soon",
  ACTIVE = "active", // supposedly default
  ARCHIVED = "archived",
  DISCONTINUED = "discontinued",
}
