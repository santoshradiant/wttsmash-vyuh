import enStrings from './locales/en.json';
import arStrings from './locales/ar.json';
import zhStrings from './locales/zh.json';

// Define the structure of our language data
export interface LanguageData {
  [key: string]: string | LanguageData;
}

// Available languages
export const availableLanguages = {
  en: 'English',
  ar: 'العربية',
  zh: '中文'
};

// Language files mapping
const languageFiles: { [key: string]: LanguageData } = {
  en: enStrings,
  ar: arStrings,
  zh: zhStrings
};

// Default language
export const defaultLanguage = 'en';

// Current language
let currentLanguage = defaultLanguage;

/**
 * Set the current language
 * @param langCode Language code to set
 */
export function setLanguage(langCode: string): void {
  if (languageFiles[langCode]) {
    currentLanguage = langCode;
    // Store the language preference in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('wtt-language', langCode);
    }
  } else {
    console.warn(`Language ${langCode} not found, using default language ${defaultLanguage}`);
    currentLanguage = defaultLanguage;
  }
}

/**
 * Get the current language code
 * @returns Current language code
 */
export function getCurrentLanguage(): string {
  return currentLanguage;
}

/**
 * Initialize the language service
 * Tries to load the language from localStorage or uses the default
 */
export function initLanguage(): void {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('wtt-language');
    if (savedLanguage && languageFiles[savedLanguage]) {
      currentLanguage = savedLanguage;
    }
  }
}

/**
 * Get a string from the current language
 * @param key Dot notation path to the string (e.g., 'common.getTickets')
 * @returns The localized string or the key if not found
 */
export function getString(key: string): string {
  return getStringForLanguage(key, currentLanguage);
}

/**
 * Get a string for a specific language
 * @param key Dot notation path to the string (e.g., 'common.getTickets')
 * @param langCode Language code
 * @returns The localized string or the key if not found
 */
export function getStringForLanguage(key: string, langCode: string): string {
  // Use the specified language or fall back to default
  const language = languageFiles[langCode] || languageFiles[defaultLanguage];

  // Split the key by dots to navigate the object
  const parts = key.split('.');
  let value: any = language;

  // Navigate through the object
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      // Return the key if the path is not found
      return key;
    }
  }

  return value;
}

// Initialize the language service
initLanguage();

// Export a simple t function for convenience
export const t = getString;
