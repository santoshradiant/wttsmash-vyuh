import { useVyuh } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React, { useEffect, useState } from 'react';
import { useWttStore } from '../../utils/store';
import { getBgColorClass, getTextColorClass, getTextColorFontClass } from './helper';


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

  // Use settings.mainNavigation if available, otherwise use default menu items
  const menuItems = settings?.mainNavigation;
  const isArabic = settings?.language === 'ar';


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
              {isArabic ? item.title_arabic : item.title}
            </span>

          </div>


        );
      })}
    </nav>
  );
}
