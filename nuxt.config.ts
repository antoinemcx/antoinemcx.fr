// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "fr", iso: "fr-FR", file: "fr.json" },
    ],
    defaultLocale: "en",
  },
})