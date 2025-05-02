import { ImageReference } from "@vyuh/react-core";

// tailwindHelpers.ts
export function getBgColorClass(colorType: string): string {
  switch (colorType) {
    case 'smash.green':
      return 'wtt:bg-green-600';
    case 'contender':
      return 'wtt:bg-red-600';
    case 'smash.blue':
      return 'wtt:bg-blue-600';
    case 'champions':
      return 'wtt:bg-yellow-600';
    default:
      return 'wtt:bg-white';
  }
}

export function getBgColorBaseTextClass(colorType: string): string {
  switch (colorType) {
    case 'smash.green':
      return 'wtt:text-green-500';
    case 'contender':
      return 'wtt:text-red-500';
    case 'smash.blue':
      return 'wtt:text-blue-500';
    case 'champions':
      return 'wtt:text-yellow-500';
    default:
      return 'wtt:text-white';
  }
}

export function getBgColorBorderClass(colorType: string): string {
  switch (colorType) {
    case 'smash.green':
      return 'wtt:border-t-2 wtt:border-green-500';
    case 'contender':
      return 'wtt:border-t-2 wtt:border-red-500';
    case 'smash.blue':
      return 'wtt:border-t-2 wtt:border-blue-500';
    case 'champions':
      return 'wtt:border-t-2 wtt:border-yellow-500';
    default:
      return 'wtt:border-t-2 wtt:border-white-500';
  }
}

// utils/getTextColorClass.ts

export function getTextColorClass(colorType?: string): string {
  switch (colorType) {
    case 'smash.green':
    case 'contender':
    case 'smash.blue':
      return 'wtt:text-white';
    case 'champions':
      return 'wtt:text-black';
    default:
      return 'wtt:text-gray-800';
  }
}

// utils/getTextColorFontClass.ts

export function getTextColorFontClass(colorType?: string): string {
  switch (colorType) {
    case 'smash.green':
    case 'contender':
    case 'smash.blue':
      return 'wtt:text-white wtt:font-medium';
    case 'champions':
      return 'wtt:text-black wtt:font-medium';
    default:
      return 'wtt:text-gray-800 wtt:font-medium';
  }
}

export function getLogoByThemeWise(colorType?: string, siteSettings?: any): ImageReference | undefined {
  switch (colorType) {
    case 'smash.green':
      return siteSettings?.logo;
    case 'contender':
      return siteSettings?.logo_red;
    case 'smash.blue':
      return siteSettings?.logo;
    case 'champions':
      return siteSettings?.logo;
    default:
      return siteSettings?.logo;
  }
}
export function getSidePanelFooterLogoByThemeWise(colorType?: string, siteSettings?: any): ImageReference | undefined {
  switch (colorType) {
    case 'smash.green':
      return siteSettings?.side_panel_footer_logo;
    case 'contender':
      return siteSettings?.side_panel_footer_logo_red;
    case 'smash.blue':
      return siteSettings?.side_panel_footer_logo;
    case 'champions':
      return siteSettings?.side_panel_footer_logo;
    default:
      return siteSettings?.side_panel_footer_logo;
  }
}