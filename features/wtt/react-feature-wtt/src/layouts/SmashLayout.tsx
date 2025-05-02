import {
  ContentItem,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import { Region, Route } from '@vyuh/react-feature-system';
import React, { Fragment, ReactNode } from 'react';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { useWttStore } from '../utils/store';
import { getBgColorBaseTextClass, getBgColorBorderClass, getBgColorClass, getLogoByThemeWise, getSidePanelFooterLogoByThemeWise, getTextColorClass, getTextColorFontClass } from './components/helper';

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
    <main className={`${bgColorBorder} wtt:bg-black wtt:flex-1 wtt:p-6 wtt:overflow-y-auto`}>
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
    <aside className="wtt:w-70 wtt:flex-shrink-0 wtt:overflow-y-auto wtt:border-l wtt:border-gray-200 wtt:bg-white">
      <div className="wtt:flex wtt:flex-col wtt:h-full">
        {/* Champions 2024 Header */}
        <div className="wtt:p-4 wtt:text-center wtt:border-gray-200 ">
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
  const loginButton = () => (
    <button
      className={`${bgColor} wtt:mt-[25px]wtt:mx-0 wtt:text-white wtt:font-medium wtt:py-2 wtt:px-6 wtt:rounded-sm wtt:w-full wtt:flex wtt:justify-center wtt:items-center`}
      onClick={() => plugins.navigation.push('/login')}
    >
      Login
    </button>

  )

  const renderSideMenu = () => (
    <aside className="wtt:w-24 wtt:flex-shrink-0 wtt:overflow-y-auto wtt:border-r wtt:border-gray-200 wtt:bg-gray-100
    wtt:flex wtt:flex-col wtt:justify-between wtt:items-center wtt:pb-15">
      <div>
        <MainMenu />
      </div>
      <div>
        {loginButton()}
      </div>
    </aside>

  )

  return (
    <div className="wtt:flex wtt:h-screen wtt:w-full wtt:flex-col wtt:overflow-hidden">
      {/* Header - fixed at top, full width */}
      <Header />

      {/* Main content area with menu, body, and sidebar */}
      <div className="wtt:flex wtt:flex-1 wtt:w-full wtt:overflow-hidden">
        {/* Left menu - fixed, full height */}
        {
          isRTL ? (
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

          )
        }
      </div>
    </div>
  );
}
