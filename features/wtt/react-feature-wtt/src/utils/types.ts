import { ImageReference } from '@vyuh/react-core';

export type SiteSettings = {
  title: string;
  description?: string;
  identifier: {
    current: string;
  };
  logo?: ImageReference;
  logo_red?: ImageReference;
  side_panel_footer_logo?: ImageReference;
  side_panel_footer_logo_red?: ImageReference;
  logoAlt?: ImageReference;
  favicon?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  coverImage?: ImageReference;
  theme?: 'contender' | 'smash.green' | 'smash.blue' | 'champions';
  language?: string;

  // Navigation
  mainNavigation?: Array<{
    title: string;
    title_arabic?: string;
    title_chinese?: string;
    link: string;
    iconName?: string;
    isExternal?: boolean;
    colorType?: 'green' | 'red' | 'blue' | 'yellow';
    subMenu?: Array<{
      title: string;
      link: string;
      isExternal?: boolean;
    }>;
  }>;

  footerNavigation?: Array<{
    title: string;
    links?: Array<{
      title: string;
      link: string;
      isExternal?: boolean;
    }>;
  }>;

  legalLinks?: Array<{
    title: string;
    link: string;
  }>;

  // Social
  socialLinks?: Array<{
    platform:
      | 'facebook'
      | 'twitter'
      | 'instagram'
      | 'linkedin'
      | 'youtube'
      | 'tiktok'
      | 'discord'
      | 'twitch'
      | 'other';
    url: string;
    icon?: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
  }>;

  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };

  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: ImageReference;
  };

  // Advanced
  cookieConsent?: {
    enabled?: boolean;
    message?: string;
    acceptButtonText?: string;
    declineButtonText?: string;
    cookiePolicyLink?: string;
  };

  analytics?: {
    googleAnalyticsId?: string;
    enableIPAnonymization?: boolean;
  };

  maintenance?: {
    enabled?: boolean;
    message?: string;
    allowedIPs?: string[];
  };
};
