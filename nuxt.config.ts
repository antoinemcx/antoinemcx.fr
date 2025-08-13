// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/content",
  ],

  app: { // seo data
    head: {
      title: "Antoine M.",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.ico" },
      ],
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storage: "cookie", // using cookie will force reseting to system after session
    storageKey: "app-theme",
  },
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
    public: {
      discordServer: "https://discord.gg/G6WQsMQShZ",
      github: "https://github.com/antoinemcx",
      githubRepo: "https://github.com/antoinemcx/antoinemcx.fr",
    },
  },
  routeRules: {
    "/discord": { redirect: "https://discord.gg/G6WQsMQShZ" },
    "/github": { redirect: "https://github.com/antoinemcx" },
  },
});
