import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  setLanguage, 
  getCurrentLanguage, 
  getString, 
  availableLanguages,
  defaultLanguage
} from './LanguageService';

// Create a context for the language
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: { [key: string]: string };
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages
});

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = defaultLanguage 
}) => {
  const [language, setLanguageState] = useState(getCurrentLanguage() || initialLanguage);

  // Set the initial language
  useEffect(() => {
    if (initialLanguage) {
      handleSetLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  // Function to change the language
  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    setLanguageState(lang);
  };

  // Translation function
  const translate = (key: string) => getString(key);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translate,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Standalone hook for simple usage without provider
export const useTranslation = (langCode?: string) => {
  const [language, setLanguageState] = useState(getCurrentLanguage());

  useEffect(() => {
    if (langCode && langCode !== language) {
      setLanguage(langCode);
      setLanguageState(langCode);
    }
  }, [langCode]);

  return {
    language,
    setLanguage: (lang: string) => {
      setLanguage(lang);
      setLanguageState(lang);
    },
    t: getString,
    availableLanguages
  };
};
