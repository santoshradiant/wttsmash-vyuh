import { useVyuh } from '@vyuh/react-core';
import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaTwitch,
  FaLink,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useWttStore } from '../../utils/store';
import { getBgColorBorderClass } from './helper';
import { useTranslation } from '../../i18n';

/**
 * Footer component for the SmashLayout
 * Displays copyright information and social links
 */
export function Footer() {
  const { plugins } = useVyuh();
  const settings = useWttStore((state) => state.settings);
  const currentYear = new Date().getFullYear();

  const colorType = settings?.theme?.toString();
  const bgColorBorder = getBgColorBorderClass(colorType ?? '');

  // Get current language and translation function
  const currentLanguage = settings?.language || 'en';
  const { t } = useTranslation(currentLanguage);

  const isRTL = currentLanguage === 'ar';



  // Map platform names to React Icons components
  const getIconComponent = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FaFacebook />;
      case 'twitter':
        return <FaXTwitter />;
      case 'instagram':
        return <FaInstagram />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'youtube':
        return <FaYoutube />;
      case 'tiktok':
        return <FaTiktok />;
      case 'discord':
        return <FaDiscord />;
      case 'twitch':
        return <FaTwitch />;
      default:
        return <FaLink />;
    }
  };

  return (
    <footer className={` ${bgColorBorder} wtt:mt-12 wtt:pt-6 wtt:border-t`}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:flex wtt:justify-between wtt:items-center">
        <div className="wtt:text-white">
          <p>© {currentYear} {t('footer.copyright')}</p>
        </div>

        <div className="wtt:flex wtt:items-center wtt:gap-4">

          <div className="wtt:flex wtt:items-center">
            <img
              src="/wtt_logo.png"
              alt={t('footer.wttLogoAlt')}
              className="wtt:h-8 wtt:w-auto"
            />
            <span className="wtt:text-sm wtt:font-bold">{t('footer.wttText')}</span>
          </div>


          {settings?.socialLinks?.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="wtt:text-gray-500 hover:wtt:text-gray-700 wtt:transition-colors"
              aria-label={`${t('footer.visitSocialPage')} ${social.platform}`}
            >
              {social?.icon ? (
                <img
                  src={plugins.content.provider.image(social.icon, {
                    width: 24,
                    height: 24,
                  })}
                  alt={social.platform}
                  className="wtt:w-6 wtt:h-6 wtt:object-contain"
                />
              ) : (
                <span className="wtt:w-6 wtt:h-6 wtt:flex wtt:items-center wtt:justify-center
                  wtt:filter wtt:invert wtt:brightness-0 wtt:contrast-100">
                  {getIconComponent(social.platform)}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
