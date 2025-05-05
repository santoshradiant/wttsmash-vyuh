import { useVyuh } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React, { useEffect, useState } from 'react';
import { useWttStore } from '../../utils/store';
import { getBgColorClass, getTextColorClass, getTextColorFontClass } from './helper';
import { useTranslation } from '../../i18n';


/**
 * MainMenu component that uses settings.mainNavigation data
 */
export function MainMenu() {
  const { plugins } = useVyuh();
  const settings = useWttStore((state) => state.settings);
  const [currentPath, setCurrentPath] = useState('');

  // Get current path on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Get current language and translation function
  const currentLanguage = settings?.language || 'en';
  const { t } = useTranslation(currentLanguage);

  // Define fallback menu items using translations
  const fallbackMenuItems = [
    { title: t('menu.home'), link: '/', iconName: 'Home' },
    { title: t('menu.players'), link: '/players', iconName: 'Users' },
    { title: t('menu.matches'), link: '/matches', iconName: 'Calendar' },
    { title: t('menu.schedule'), link: '/schedule', iconName: 'Clock' },
    { title: t('menu.results'), link: '/results', iconName: 'Trophy' },
    { title: t('menu.venue'), link: '/venue', iconName: 'MapPin' },
    { title: t('menu.tickets'), link: '/tickets', iconName: 'Ticket', isExternal: true },
  ];

  // Use settings.mainNavigation if available, otherwise use fallback menu items
  const menuItems = settings?.mainNavigation || fallbackMenuItems;

  const colorType = settings?.theme?.toString();


  const bgColor = getBgColorClass(colorType ?? '');
  const textColor = getTextColorClass(colorType ?? '');
  const textColorFontMedium = getTextColorFontClass(colorType ?? '');

  return (
    <nav className="wtt:flex wtt:flex-col wtt:w-full">
      {menuItems?.map((item, index) => {
        const isActive = currentPath === item.link ||
          (item.link !== '/' && currentPath.startsWith(item.link));



        return (
          <div
            key={index}
            className={`wtt:p-2 wtt:border-b wtt:border-b-gray-200 wtt:flex wtt:flex-col wtt:items-center wtt:gap-1 wtt:cursor-pointer
              ${isActive ? bgColor : 'wtt:bg-white'}`}
            onClick={() => {
              if (item.isExternal) {
                window.open(item.link, '_blank');
              } else {
                plugins.navigation.push(item.link);
                setCurrentPath(item.link); // Update current path when navigating
              }
            }}
          >
            {item.iconName && <DynamicIcon
              name={item.iconName as IconName}
              className={isActive ? textColor : ''}
            />}
            <span className={isActive ? textColorFontMedium : ''}>
              {currentLanguage === 'ar' && 'title_arabic' in item && item.title_arabic ? item.title_arabic : 
              
              currentLanguage === 'zh' && 'title_chinese' in item && item.title_chinese ? item.title_chinese : item.title}
            </span>

          </div>


        );
      })}
    </nav>
  );
}
