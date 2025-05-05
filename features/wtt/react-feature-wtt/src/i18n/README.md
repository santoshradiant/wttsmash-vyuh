# Internationalization (i18n) System

This directory contains the internationalization (i18n) system for the WTT Smash application. The system allows for easy translation of text content across the application.

## Structure

- `index.ts` - Main entry point with utility functions
- `LanguageService.ts` - Core service for managing languages
- `useLanguage.tsx` - React hooks for using the language system
- `locales/` - Directory containing language JSON files
  - `en.json` - English language strings
  - `ar.json` - Arabic language strings
  - Additional language files can be added as needed

## How to Use

### 1. Import the translation hook

```tsx
import { useTranslation } from '../i18n';
```

### 2. Initialize the translation function

```tsx
const { t, language, setLanguage } = useTranslation(settings?.language || 'en');
```

### 3. Use the translation function to get localized strings

```tsx
// Simple usage
<h1>{t('common.getTickets')}</h1>

// With nested keys
<p>{t('player.worldRanking')}</p>
```

### 4. Change the language

```tsx
// Change the language
setLanguage('ar');
```

## Adding New Strings

1. Add the new string to all language JSON files (`locales/en.json`, `locales/ar.json`, etc.)
2. Use a consistent key structure (e.g., `section.key`)
3. Group related strings together

Example:
```json
// In locales/en.json
{
  "newSection": {
    "key1": "English text",
    "key2": "More English text"
  }
}

// In locales/ar.json
{
  "newSection": {
    "key1": "Arabic text",
    "key2": "More Arabic text"
  }
}
```

## Adding a New Language

1. Create a new JSON file for the language (e.g., `locales/fr.json` for French)
2. Copy the structure from an existing language file
3. Translate all strings
4. Import the new language file in `LanguageService.ts`
5. Add the language to the `languageFiles` object in `LanguageService.ts`
6. Add the language to the `availableLanguages` object in `LanguageService.ts`

Example for adding French:
```ts
// In LanguageService.ts
import enStrings from './locales/en.json';
import arStrings from './locales/ar.json';
import frStrings from './locales/fr.json'; // Add this line

// Available languages
export const availableLanguages = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français' // Add this line
};

// Language files mapping
const languageFiles: { [key: string]: LanguageData } = {
  en: enStrings,
  ar: arStrings,
  fr: frStrings // Add this line
};
```

## Handling Language Change

When a user changes the language, the system:

1. Updates the language in the LanguageService
2. Stores the language preference in localStorage
3. Updates the UI to reflect the new language

The `handleLanguageChange` function in `SmashLayout.tsx` demonstrates this:

```tsx
const handleLanguageChange = (langCode: string) => {
  // Update language in our language service
  changeLanguage(langCode);
  
  // Update language in store
  useWttStore.setState({
    settings: {
      ...settings as SiteSettings,
      language: langCode
    }
  });
  
  setShowLanguageMenu(false);
};
```

## Best Practices

1. Always use the translation system for user-facing text
2. Keep translation keys descriptive and organized
3. Use nested objects to group related strings
4. Ensure all languages have the same keys
5. Test the application in all supported languages
6. Use JSON files for easier maintenance and integration with translation tools
