import type { Locale } from "vue-i18n";
import { useLocalStorage } from "@vueuse/core";

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
  const storage = useLocalStorage<Locale>("selectedLanguage", "en");
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
