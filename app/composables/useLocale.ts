import type { Locale } from "vue-i18n";

export interface LanguageConfig {
  code: "en" | "fr";
  name: string;
  flag: string;
}

export function useLanguage() {
  const { setLocale } = useI18n();

  const languages: LanguageConfig[] = [
    { code: "en", name: "English", flag: "circle-flags:us" },
    { code: "fr", name: "Français", flag: "circle-flags:fr" },
  ];

  /* Handle language storage */
  const storage = useCookie<Locale>("selectedLanguage", {
    default: () => "en",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // one year to guarantee persistence
  });
  watch(storage, (newValue) => {
    setLocale(newValue);
  }, { immediate: true });

  const currentLanguage = computed(() =>
    languages.find(lang => lang.code === storage.value) || languages[0],
  );

  function switchToNextLanguage() {
    const currentIndex = languages.findIndex(lang => lang.code === storage.value);
    const nextIndex = (currentIndex + 1) % languages.length;
    storage.value = languages[nextIndex]!.code;
  }

  return { languages, currentLanguage, switchToNextLanguage };
}
