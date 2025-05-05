import React from 'react';
import { useWttStore } from '../../utils/store';

const categoryNames: Record<string, string> = {
  all_players: 'ALL PLAYERS',
  mens_singles: "MEN'S SINGLES",
  womens_singles: "WOMEN'S SINGLES",
  mens_doubles: "MEN'S DOUBLES",
  womens_doubles: "WOMEN'S DOUBLES",
  mixed_doubles: 'MIXED DOUBLES',
};

interface CategorySelectionProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  bgColor: string;
  textColor: string;
  textColorFontMedium: string;
  textColorBase: string;
}

export function CategorySelection({
  categories,
  selectedCategory,
  onCategoryChange,
  bgColor,
  textColor,
  textColorFontMedium,
  textColorBase,
}: CategorySelectionProps) {
  const getCategoryName = (categoryId: string): string => {
    return categoryNames[categoryId] || categoryId;
  };

  const settings = useWttStore((state) => state.settings);
  const isRTL = settings?.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="wtt:flex wtt:items-center wtt:space-x-4 wtt:overflow-x-auto">
      {categories.map((category, index) => (
        <React.Fragment key={category}>
          <button
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`wtt:text-sm wtt:uppercase wtt:font-semibold wtt:transition-colors
              ${selectedCategory === category ? `${textColorBase}` : 'wtt:text-white'}
            `}
          >
            {getCategoryName(category)}
          </button>

          {/* Add separator if not last item */}
          {index < categories.length - 1 && (
            <span className="wtt:text-white wtt:px-1">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
