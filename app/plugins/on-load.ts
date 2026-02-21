export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.hook("app:created", () => {
    if (config.public.environment === "development") {
      console.warn("⚠️ The application is running in development mode.\n"
        + "You should not see this message in production.");
    }
  });
});
