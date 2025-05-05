import React from 'react';
import { useWttStore } from '../../utils/store';
import { useTranslation } from '../../i18n';

// Category IDs to translation keys mapping
const categoryTranslationKeys: Record<string, string> = {
  all_players: 'playerCategories.allPlayers',
  mens_singles: 'playerCategories.mensSingles',
  womens_singles: 'playerCategories.womensSingles',
  mens_doubles: 'playerCategories.mensDoubles',
  womens_doubles: 'playerCategories.womensDoubles',
  mixed_doubles: 'playerCategories.mixedDoubles',
};

interface CategorySelectionProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  textColorBase: string;
}

export function CategorySelection({
  categories,
  selectedCategory,
  onCategoryChange,
  textColorBase,
}: CategorySelectionProps) {
  const settings = useWttStore((state) => state.settings);
  const currentLanguage = settings?.language || 'en';
  const { t } = useTranslation(currentLanguage);
  const isRTL = currentLanguage === 'ar';

  const getCategoryName = (categoryId: string): string => {
    const translationKey = categoryTranslationKeys[categoryId];
    return translationKey ? t(translationKey) : categoryId;
  };

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
