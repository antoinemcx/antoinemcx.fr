import 'server-only';
import type { Locale } from '@/root/i18n.config';

const languages = {
    fr: () => import('@/languages/fr.json').then((module) => module.default),
    en: () => import('@/languages/en.json').then((module) => module.default),
};

export const getLanguage = async (locale: Locale) => languages[locale]();
