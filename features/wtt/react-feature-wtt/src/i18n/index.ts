// Export everything from the language service
export * from './LanguageService';

// Export the hooks
export { LanguageProvider, useLanguage, useTranslation } from './useLanguage';

// Export language options in the format expected by the UI
export const languageOptions = Object.entries({
  en: 'English',
  ar: 'العربية',
  zh: '中文'
}).map(([code, name]) => ({ code, name }));
