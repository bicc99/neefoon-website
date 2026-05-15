// This file holds only non-component exports (context, types, hook) so that
// React Fast Refresh can hot-reload it without warnings. The LanguageProvider
// component lives in LanguageProvider.tsx, which exports only components.
import { createContext, useContext } from 'react';
import type { TranslationKey } from './en';

// The two supported language codes.
export type Lang = 'en' | 'th';

// Captured once at module load — the timezone never changes during a session.
export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// What every consumer of this context receives.
export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  // t() looks up a translation key and returns the string for the active language.
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

// Custom hook — throws a clear error if used outside LanguageProvider,
// which is much easier to debug than "cannot read property of null".
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
