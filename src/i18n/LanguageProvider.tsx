// This file exports only the LanguageProvider component, satisfying React Fast
// Refresh's requirement that a file export only components.
import { useEffect, useState, type ReactNode } from 'react';
import { en, type Translations } from './en';
import { th } from './th';
import { LanguageContext, timezone, type Lang } from './LanguageContext';

// Map each language code to its translation object so we can swap in one lookup.
const translations: Record<Lang, Translations> = { en, th };

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Read from localStorage on first render so the user's choice survives page reloads.
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'th' || saved === 'en') return saved;

    // No saved preference — infer from browser locale and timezone.
    // navigator.language is a BCP 47 tag like "th", "th-TH", "en-US", etc.
    const browserIsThai = navigator.language.startsWith('th');
    // Thailand has one timezone. Treat it as a strong Thai signal even when
    // the user's browser is set to English (common on expat/developer machines).
    const timezoneIsThai = timezone === 'Asia/Bangkok';

    return browserIsThai || timezoneIsThai ? 'th' : 'en';
  });

  // Sync both localStorage and <html lang="..."> whenever the language changes.
  // The CSS uses `html[lang="th"]` selectors to animate the toggle knob, and
  // screen readers use the lang attribute to pick the correct voice.
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function t(key: keyof Translations): string {
    return translations[lang][key];
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
