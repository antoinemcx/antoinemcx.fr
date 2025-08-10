// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  colorMode: {
    preference: "system",
    fallback: "light",
    storageKey: "app-theme",
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/main.css"],

  i18n: {
    strategy: "no_prefix",
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "fr", iso: "fr-FR", file: "fr.json" },
    ],
    defaultLocale: "en",
  },

  runtimeConfig: {
    discordApiToken: "", // to override
    discordServer: "https://discord.gg/G6WQsMQShZ",
    github: "https://github.com/antoinemcx",
    githubRepo: "https://github.com/antoinemcx/antoinemcx.fr",
  },
  routeRules: {
    "/discord": { redirect: "https://discord.gg/G6WQsMQShZ" },
    "/github": { redirect: "https://github.com/antoinemcx" },
  },
});
