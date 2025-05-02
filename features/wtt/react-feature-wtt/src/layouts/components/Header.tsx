import { useVyuh } from '@vyuh/react-core';
import React, { useState } from 'react';
import { useWttStore } from '../../utils/store';
import { ChevronDown } from 'lucide-react';
import { SiteSettings } from 'src/utils/types';
import { getBgColorClass, getLogoByThemeWise, getTextColorClass, getTextColorFontClass } from './helper';

/**
 * Header component for the SmashLayout
 */
export function Header() {
  const { plugins } = useVyuh();
  const settings = useWttStore((state) => state.settings);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }
  ];

  // Get current language or default to English
  const currentLanguage = (settings as any)?.language || 'en';

  const colorType = settings?.theme?.toString();
  const bgColor = getBgColorClass(colorType ?? '');
  const textColor = getTextColorClass(colorType ?? '');
  const textColorFontMedium = getTextColorFontClass(colorType ?? '');

  const logo = getLogoByThemeWise(colorType ?? '', settings);


  // Get current language name
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.name : 'English';
  };

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    // Update language in store
    useWttStore.setState({
      settings: {
        ...settings as SiteSettings,
        language: langCode
      }
    });
    setShowLanguageMenu(false);
  };

  return (
    <header className="wtt:shadow-md wtt:h-16 wtt:w-full wtt:flex-shrink-0 wtt:bg-white wtt:z-10">
      <div  className=" wtt:bg-black wtt:w-full wtt:flex wtt:h-full wtt:items-center wtt:justify-between wtt:px-4">
        <div className="wtt:flex wtt:items-center wtt:gap-2">
          {logo && (
            <img
              src={plugins.content.provider.image(logo, {
                width: 48,
                height: 48,
              })}
              alt={settings?.title || 'Logo'}
              className="wtt:h-[48px] wtt:w-auto wtt:fill-white"
            />
          )}

          {/* <h1 className="wtt:text-2xl wtt:text-black">{settings?.title}</h1> */}
        </div>

        <div className="wtt:flex wtt:items-center wtt:gap-4">
          {/* GET TICKETS NOW button */}
          <a
            href="#"
            className={`${bgColor} wtt:text-white wtt:font-bold wtt:px-6 wtt:py-1 wtt:rounded-md wtt:uppercase wtt:text-center wtt:no-underline wtt:tracking-wide wtt:font-medium`}
            // style={{ backgroundColor: '#00A651' }}
          >
            {getCurrentLanguageName() === 'English' ? 'GET TICKETS NOW' : 'تذاكر'}
          </a>

          {/* Language Selector */}
          <div className="wtt:relative">
            <button
              className={`${bgColor} wtt:flex wtt:items-center wtt:justify-between wtt:gap-2 wtt:px-3 wtt:py-1 wtt:rounded-md wtt:text-white wtt:font-medium wtt:w-[120px]`}
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              aria-expanded={showLanguageMenu}
              aria-haspopup="true"
              // style={{ backgroundColor: '#00A651' }}
            >
              <span>{getCurrentLanguageName()}</span>
              <ChevronDown size={16} />
            </button>

            {showLanguageMenu && (
              <div className="wtt:absolute wtt:right-0 wtt:mt-1 wtt:w-[150px] wtt:bg-white wtt:rounded-md wtt:shadow-lg wtt:z-20 wtt:py-1 wtt:border wtt:border-gray-200">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`wtt:block wtt:w-full wtt:text-left wtt:px-4 wtt:py-2 hover:wtt:bg-gray-100 ${currentLanguage === language.code ? 'wtt:font-bold wtt:bg-gray-50' : ''
                      }`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}