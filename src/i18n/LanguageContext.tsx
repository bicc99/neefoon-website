import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { en, type Translations, type TranslationKey } from './en';
import { th } from './th';

// The two supported language codes.
export type Lang = 'en' | 'th';

// What every consumer of this context receives.
interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  // t() looks up a translation key and returns the string for the active language.
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Map each language code to its translation object so we can swap in one lookup.
const translations: Record<Lang, Translations> = { en, th };

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Read from localStorage on first render so the user's choice survives page reloads.
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return saved === 'th' ? 'th' : 'en';
  });

  // Sync both localStorage and <html lang="..."> whenever the language changes.
  // The CSS uses `html[lang="th"]` selectors to animate the toggle knob, and
  // screen readers use the lang attribute to pick the correct voice.
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function t(key: TranslationKey): string {
    return translations[lang][key];
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook — throws a clear error if used outside LanguageProvider,
// which is much easier to debug than "cannot read property of null".
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
