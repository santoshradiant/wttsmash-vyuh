import React from 'react';
import { useWttStore } from '../../utils/store';
import { getBgColorClass, getTextColorClass, getTextColorFontClass } from './helper';
import { useTranslation } from '../../i18n';

/**
 * CTA component for newsletter subscription
 * Displays a gradient background section with an email input and subscribe button
 */
export function CTA() {


  const settings = useWttStore((state) => state.settings);

  const colorType = settings?.theme?.toString();


  const bgColor = getBgColorClass(colorType ?? '');
  const textColor = getTextColorClass(colorType ?? '');
  const textColorFontMedium = getTextColorFontClass(colorType ?? '');

  const isRTL = settings?.language === 'ar';

  const currentLanguage = settings?.language || 'en';
  const { t } = useTranslation(currentLanguage);


  return (
    <section className="wtt:mt-8 wtt:rounded-lg wtt:bg-[#1a1a1a] wtt:border wtt:border-[#2c2c2c] wtt:p-6 wtt:text-white">
      <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:flex wtt:items-center wtt:justify-between wtt:flex-wrap wtt:gap-4">
        <div className="wtt:flex-1">
          <h3 className="wtt:text-xl wtt:font-extrabold wtt:text-white sm:wtt:text-2xl">
          {t('cta.title')}
          </h3>
          <p className="wtt:mt-1 wtt:text-sm wtt:text-neutral-400">
          {t('cta.description')}
          </p>
        </div>
        <div>
          <button
            type="button"
            className={`${bgColor} wtt:text-white wtt:px-6 wtt:py-2 wtt:rounded-md wtt:text-sm wtt:font-bold hover:wtt:bg-red-700 transition-colors`}
          >
             {t('cta.button')}
          </button>
        </div>
      </div>
    </section>

  );
}