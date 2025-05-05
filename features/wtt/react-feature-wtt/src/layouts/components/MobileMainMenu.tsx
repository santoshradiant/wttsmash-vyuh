import { useVyuh } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React, { useEffect, useState } from 'react';
import { useWttStore } from '../../utils/store';
import { getBgColorClass, getTextColorClass } from './helper';

/**
 * MobileMainMenu component for mobile view
 * Displays full-width menu items with icons and text in a drawer-like layout
 */
export function MobileMainMenu({ onClose }: { onClose: () => void }) {
  const { plugins } = useVyuh();
  const settings = useWttStore((state) => state.settings);
  const [currentPath, setCurrentPath] = useState('');

  // Get current path on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const menuItems = settings?.mainNavigation;
  const isArabic = settings?.language === 'ar';
  const isMandarin = settings?.language === 'zh';
  const isRTL = settings?.language === 'ar';

  const handleNavigation = (item: any) => {
    if (item.isExternal) {
      window.open(item.link, '_blank');
    } else {
      plugins.navigation.push(item.link);
      setCurrentPath(item.link);
      onClose(); // Close the menu after navigation
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:flex wtt:flex-col wtt:w-full wtt:h-full wtt:bg-black wtt:overflow-y-auto">
      {/* Menu items */}
      <nav className="wtt:flex wtt:flex-col wtt:w-full">
        {menuItems?.map((item, index) => {
          const isActive = currentPath === item.link ||
            (item.link !== '/' && currentPath.startsWith(item.link));

          return (
            <div
              key={index}
              className={`wtt:py-4 wtt:px-6 wtt:flex wtt:items-center wtt:gap-4 wtt:cursor-pointer wtt:border-b wtt:border-gray-800
                ${isActive ? 'wtt:bg-red-600' : 'wtt:bg-black hover:wtt:bg-gray-900'}`}
              onClick={() => handleNavigation(item)}
            >
              {item.iconName && (
                <DynamicIcon
                  name={item.iconName as IconName}
                  className="wtt:h-6 wtt:w-6 wtt:text-white"
                />
              )}
              <span className="wtt:text-base wtt:font-medium wtt:text-white">
                {isArabic ? item.title_arabic : isMandarin ? item.title_chinese : item.title}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
