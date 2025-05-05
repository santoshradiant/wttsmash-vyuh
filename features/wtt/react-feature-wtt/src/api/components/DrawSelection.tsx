import React from 'react';
import { useWttStore } from '../../utils/store';
import { useTranslation } from '../../i18n';

interface DrawSelectionProps {
  selectedDraw: string;
  onDrawChange: (draw: string) => void;
  availableDraws: string[];
  textColorBase: string;
}

export function DrawSelection({
  selectedDraw,
  onDrawChange,
  availableDraws,
  textColorBase,
}: DrawSelectionProps) {

  const settings = useWttStore((state) => state.settings);
  const currentLanguage = settings?.language || 'en';
  const { t } = useTranslation(currentLanguage);
  const isRTL = currentLanguage === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:flex wtt:items-center wtt:space-x-4 wtt:overflow-x-auto">
      {availableDraws.map((draw, index) => (
        <React.Fragment key={draw}>
          <button
            type="button"
            onClick={() => onDrawChange(draw)}
            className={`
              wtt:text-sm wtt:uppercase wtt:transition-colors wtt:font-semibold
              ${selectedDraw === draw ? `${textColorBase}` : 'wtt:text-white'}
            `}
            aria-pressed={selectedDraw === draw}
          >
            {draw}
          </button>

          {/* Add vertical separator except after the last item */}
          {index < availableDraws.length - 1 && (
            <span className="wtt:text-white wtt:px-1">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
