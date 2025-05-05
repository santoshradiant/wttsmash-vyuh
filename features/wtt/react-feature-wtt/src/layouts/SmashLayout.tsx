import {
  ContentItem,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import { Region, Route } from '@vyuh/react-feature-system';
import React, { Fragment, ReactNode, useState, useEffect } from 'react';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { useWttStore } from '../utils/store';
import { getBgColorBaseTextClass, getBgColorBorderClass, getBgColorClass, getLogoByThemeWise, getSidePanelFooterLogoByThemeWise, getTextColorClass, getTextColorFontClass } from './components/helper';
import { ChevronDown } from 'lucide-react';
import { SiteSettings } from '../utils/types';

/**
 * Smash Layout for routes that display content with a menu, sidebar, header, and body
 *
 * This layout provides:
 * - A fixed, full-height menu on the left-hand side
 * - A fixed, full-height sidebar on the right-hand side
 * - A full-width header on top
 * - A scrollable body content in between
 * - Options for controlling the gap between content items
 * - Options for showing or hiding the route title
 */
export class SmashLayout extends LayoutConfiguration<Route> {
  static readonly schemaName: string = `wtt.route.layout.smash`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: SmashLayout.schemaName,
      title: 'Smash Layout',
    });
  }

  /**
   * Renders the route with the smash layout
   */
  render(content: Route): React.ReactNode {
    return <SmashLayoutComponent route={content} />;
  }
}

/**
 * Component that renders a route with the smash layout
 */
function SmashLayoutComponent({ route }: { route: Route }) {
  const { plugins } = useVyuh();
  const settings = useWttStore((state) => state.settings);
  const isRTL = settings?.language === 'ar';
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChampions, setShowChampions] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const colorType = settings?.theme?.toString();

  const bgColor = getBgColorClass(colorType ?? '');
  const textColor = getTextColorClass(colorType ?? '');
  const textColorFontMedium = getTextColorFontClass(colorType ?? '');
  const textColorBase = getBgColorBaseTextClass(colorType ?? '');
  const bgColorBorder = getBgColorBorderClass(colorType ?? '');
  const logo = getLogoByThemeWise(colorType ?? '', settings);
  const sidePanelFooterLogo = getSidePanelFooterLogoByThemeWise(colorType ?? '', settings);

  // Helper function to render content items from a region
  const renderRegionItems = (region: Region): ReactNode => {
    return region.items.map((item: ContentItem, itemIndex: number) => (
      <Fragment key={itemIndex}>{plugins.content.render(item)}</Fragment>
    ));
  };

  // Find specific regions by their identifiers
  const bodyRegion = route.regions.filter((r) => r.identifier === 'body');

  const renderMainView = () => (
    <main className={`${bgColorBorder} wtt:bg-black wtt:flex-1 wtt:p-4 md:wtt:p-6 wtt:overflow-y-auto`}>
      {bodyRegion.map((region) => (
        <Fragment key={region.identifier}>
          {renderRegionItems(region)}
        </Fragment>
      ))}
      <CTA />
      <Footer />
    </main>
  );

  const renderChampionsAside = () => (
    <aside className={`${isMobile ? 'wtt:fixed wtt:inset-0 wtt:z-50 wtt:w-full' : 'wtt:w-70 wtt:flex-shrink-0'} 
      wtt:overflow-y-auto wtt:border-l wtt:border-gray-200 wtt:bg-white
      ${isMobile && !showChampions ? 'wtt:hidden' : ''}`}>
      {isMobile && (
        <div className="wtt:flex wtt:justify-end wtt:p-2">
          <button 
            className="wtt:p-2 wtt:rounded-full wtt:bg-gray-200"
            onClick={() => setShowChampions(false)}
          >
            
            <span className="wtt:sr-only">Close</span>
            <svg className="wtt:h-6 wtt:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="wtt:flex wtt:flex-col wtt:h-full">
        {/* Champions 2024 Header */}
        <div className="wtt:p-4 wtt:text-center wtt:border-gray-200">
          <div className="wtt:flex wtt:justify-center wtt:mb-2">
            {logo && <img
              src={plugins.content.provider.image(logo, {
                width: 128,
                height: 128,
              })}
              alt="Champions Logo"
              className="wtt:h-20 wtt:w-auto"
            />}
          </div>
          <h2 className="wtt:text-2xl wtt:font-bold wtt:text-gray-800">CHAMPIONS 2024</h2>
        </div>

        {/* Champions List */}
        <div className="wtt:flex-1 wtt:flex wtt:flex-col wtt:justify-center wtt:overflow-y-auto">
          {/* Men's Singles */}
          <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:p-4 wtt:flex wtt:items-center wtt:justify-between">
            <div className="wtt:flex-shrink-0">
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Wang Chuqin" className="wtt:h-20 wtt:w-auto" />
            </div>

            <div className="wtt:flex wtt:flex-col wtt:items-end">
              <span className={`wtt:font-medium ${textColorBase}`}>Men's Singles</span>
              <span className="wtt:font-medium wtt:text-gray-900">WANG CHUQIN</span>
            </div>

          </div>
          <hr className={`${bgColorBorder} wtt:w-3/4 wtt:ml-0 wtt:mr-auto wtt:border-t wtt:border-t-[0.9px] wtt:-mt-3 wtt:border-t-[0.5px]`} />

          {/* Women's Singles */}
          <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:p-4  wtt:border-gray-200 wtt:flex wtt:items-center wtt:justify-between">
            <div className="wtt:flex wtt:flex-col wtt:items-start">
              <span className={`wtt:font-medium ${textColorBase}`}>Women's Singles</span>
              <span className="wtt:font-medium wtt:text-gray-900">CHEN MENG</span>
            </div>
            <div className="wtt:flex-shrink-0">
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Chen Meng" className="wtt:h-20 wtt:w-auto" />
            </div>
          </div>
          <hr className={`${bgColorBorder} wtt:w-3/4 wtt:ml-auto wtt:mr-0 wtt:border-t wtt:border-t-[0.9px] wtt:-mt-3 wtt:border-t-[0.5px]`} />

          {/* Men's Doubles */}
          <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:p-4  wtt:border-gray-200 wtt:flex wtt:items-center wtt:justify-between">
            <div className="wtt:flex-shrink-0 wtt:flex wtt:flex-row wtt:gap-2">
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Ma Long & Wang Chuqin" className="wtt:h-20 wtt:w-auto" />
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Ma Long & Wang Chuqin" className="wtt:h-20 wtt:w-auto" />
            </div>

            <div className="wtt:flex wtt:flex-col wtt:items-end">
              <span className={`wtt:font-medium ${textColorBase}`}>Men's Doubles</span>
              <span className="wtt:font-medium wtt:text-gray-900">MA LONG</span>
              <span className="wtt:font-medium wtt:text-gray-900">WANG CHUQIN</span>
            </div>

          </div>
          <hr className={`${bgColorBorder} wtt:w-3/4 wtt:ml-0 wtt:mr-auto wtt:border-t wtt:border-t-[0.9px] wtt:-mt-3 wtt:border-t-[0.5px]`} />

          {/* Women's Doubles */}
          <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:p-4  wtt:border-gray-200 wtt:flex wtt:items-center wtt:justify-between">
            <div className="wtt:flex wtt:flex-col wtt:items-start">
              <span className={`wtt:font-medium ${textColorBase}`}>Women's Doubles</span>
              <span className="wtt:font-medium wtt:text-gray-900">CHEN MENG</span>
              <span className="wtt:font-medium wtt:text-gray-900">WANG MANYU</span>
            </div>
            <div className="wtt:flex-shrink-0">
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Chen Meng & Wang Manyu" className="wtt:h-20 wtt:w-auto" />
            </div>
          </div>
          <hr className={`${bgColorBorder} wtt:w-3/4 wtt:ml-auto wtt:mr-0 wtt:border-t wtt:border-t-[0.9px] wtt:-mt-3 wtt:border-t-[0.5px]`} />
          {/* Mixed Doubles */}
          <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:p-4 wtt:border-gray-200 wtt:flex wtt:items-center wtt:justify-between">
            <div className="wtt:flex-shrink-0 wtt:flex wtt:flex-row wtt:gap-2">
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Wang Chuqin & Sun Yingsha" className="wtt:h-20 wtt:w-auto" />
              <img src="https://wttsimfiles.blob.core.windows.net/wtt-media/photos/400px/105649_Headshot_R_MA_Long.png" alt="Wang Chuqin & Sun Yingsha" className="wtt:h-20 wtt:w-auto" />
            </div>

            <div className="wtt:flex wtt:flex-col wtt:items-end">
              <span className={`wtt:font-medium ${textColorBase}`}>Mixed Doubles</span>
              <span className="wtt:font-medium wtt:text-gray-900">WANG CHUQIN</span>
              <span className="wtt:font-medium wtt:text-gray-900">SUN YINGSHA</span>
            </div>

          </div>
          <hr className={`${bgColorBorder} wtt:w-3/4 wtt:ml-0 wtt:mr-auto wtt:border-t wtt:border-t-[0.9px] wtt:-mt-3 wtt:border-t-[0.5px]`} />
        </div>

        {/* Saudi Smash Logo */}
        <div className="wtt:p-4 wtt:pb-10 wtt:text-center wtt:mt-auto">
          {sidePanelFooterLogo && (<img
            src={plugins.content.provider.image(sidePanelFooterLogo, {
              width: 128,
              height: 128,
            })}
            alt="Saudi Smash Logo"
            className="wtt:h-16 wtt:mx-auto"
          />)}
        </div>
      </div>
    </aside>
  )
  const renderSideMenu = () => (
    <aside className={`${isMobile ? 'wtt:fixed wtt:top-16 wtt:left-0 wtt:z-50 wtt:w-full wtt:transition-transform wtt:duration-300 wtt:ease-in-out' : 'wtt:w-24 wtt:flex-shrink-0'} 
      wtt:overflow-y-auto wtt:border-r wtt:border-gray-200 wtt:bg-black
      wtt:flex wtt:flex-col wtt:justify-between wtt:items-center wtt:pb-15
      ${isMobile && !showSidebar ? 'wtt:transform wtt:-translate-x-full' : 'wtt:transform wtt:translate-x-0'}`}>
      {/* {isMobile && (
        <div className="wtt:flex wtt:justify-end wtt:p-2 wtt:w-full">
          <button 
            className="wtt:p-2 wtt:rounded-full wtt:bg-gray-800 wtt:text-white"
            onClick={() => setShowSidebar(false)}
          >
            <span className="wtt:sr-only">Close</span>
            <svg className="wtt:h-6 wtt:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )} */}
      <div className="wtt:w-full">
        <MainMenu />
      </div>
    </aside>
  );

  // Mobile menu toggle buttons
  const renderMobileMenuButtons = () => (
    <div className="wtt:fixed wtt:bottom-0 wtt:left-0 wtt:right-0 wtt:bg-white wtt:border-t wtt:border-gray-200 wtt:flex wtt:justify-around wtt:p-2 wtt:z-40">
      <button 
        className="wtt:p-2 wtt:rounded-md wtt:bg-gray-100 wtt:flex wtt:flex-col wtt:items-center"
        onClick={() => setShowSidebar(true)}
      >
        <svg className="wtt:h-6 wtt:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="wtt:text-xs">Menu</span>
      </button>
      
      <button 
        className="wtt:p-2 wtt:rounded-md wtt:bg-gray-100 wtt:flex wtt:flex-col wtt:items-center"
        onClick={() => setShowChampions(true)}
      >
        <svg className="wtt:h-6 wtt:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="wtt:text-xs">Champions</span>
      </button>
    </div>
  );

  // Update the header to include menu toggle for mobile
  const renderHeader = () => (
    <header className="wtt:shadow-md wtt:h-16 wtt:w-full wtt:flex-shrink-0 wtt:bg-white wtt:z-10">
      <div className="wtt:bg-black wtt:w-full wtt:flex wtt:h-full wtt:items-center wtt:justify-between wtt:px-4">
        {isMobile && (
          <button 
            className="wtt:mr-2"
            onClick={() => setShowSidebar(!showSidebar)}
            // onClick={() => setShowSidebar(true)}
          >
            <svg className="wtt:h-6 wtt:w-6 wtt:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
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
        </div>

        <div className="wtt:flex wtt:items-center wtt:gap-4">
          {/* GET TICKETS NOW button */}
          <a
            href="#"
            className={`${bgColor} wtt:text-white wtt:font-bold wtt:px-6 wtt:py-1 wtt:rounded-md wtt:uppercase wtt:text-center wtt:no-underline wtt:tracking-wide wtt:font-medium`}
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
            >
              <span>{getCurrentLanguageName()}</span>
              <ChevronDown size={16} />
            </button>

            {showLanguageMenu && (
              <div className="wtt:absolute wtt:right-0 wtt:mt-1 wtt:w-[150px] wtt:bg-white wtt:rounded-md wtt:shadow-lg wtt:z-20 wtt:py-1 wtt:border wtt:border-gray-200">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`wtt:block wtt:w-full wtt:text-left wtt:px-4 wtt:py-2 hover:wtt:bg-gray-100 ${settings?.language === language.code ? 'wtt:font-bold wtt:bg-gray-50' : ''}`}
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

  // Add these helper functions inside SmashLayoutComponent
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }
  ];

  // Get current language name
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === settings?.language);
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
    <div className="wtt:flex wtt:h-screen wtt:w-full wtt:flex-col wtt:overflow-hidden">
      {/* Custom header with menu button */}
      {renderHeader()}

      {/* Main content area with menu, body, and sidebar */}
      <div className="wtt:flex wtt:flex-1 wtt:w-full wtt:overflow-hidden">
        {/* Always render the side menu, but control its visibility with CSS */}
        {/* {renderSideMenu()} */}
        
        {isMobile ? (
          <>
           {renderSideMenu()}
            {renderMainView()}
            {renderChampionsAside()}
          </>
        ) : isRTL ? (
          <>
            {renderChampionsAside()}
            {renderMainView()}
            {renderSideMenu()}
          </>
        ) : (
          <>
           {renderSideMenu()}
            {renderMainView()}
            {renderChampionsAside()}
          </>
        )}
      </div>
      
      {/* Mobile menu toggle buttons at bottom */}
      {/* {isMobile && renderMobileMenuButtons()} */}
    </div>
  );
}
