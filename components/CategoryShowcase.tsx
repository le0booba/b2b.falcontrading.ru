'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAll: () => void;
}

const CATEGORY_THEMES: Record<
  string,
  {
    cardBg: string;
    cardBorder: string;
    cardHoverBorder: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    actionText: string;
    actionHover: string;
    imageBorder: string;
  }
> = {
  juice_concentrates: {
    cardBg: 'bg-[#fffaf3]',
    cardBorder: 'border-[#fae5cb]',
    cardHoverBorder: 'hover:border-[#f3d3b0]',
    badgeBg: 'bg-[#fcf5eb]',
    badgeBorder: 'border-[#edd4b8]',
    badgeText: 'text-[#a6601b]',
    actionText: 'text-[#8d5519]',
    actionHover: 'group-hover:text-[#6f4212]',
    imageBorder: 'border-[#f6dfc6]/60',
  },
  fruit_puree: {
    cardBg: 'bg-[#fdf5f7]',
    cardBorder: 'border-[#f9d8df]',
    cardHoverBorder: 'hover:border-[#f1c1cb]',
    badgeBg: 'bg-[#fcf1f4]',
    badgeBorder: 'border-[#f0ccd6]',
    badgeText: 'text-[#9f2e49]',
    actionText: 'text-[#8e2a41]',
    actionHover: 'group-hover:text-[#701e31]',
    imageBorder: 'border-[#f8d8e0]/60',
  },
  candied_snacks: {
    cardBg: 'bg-[#f4f9f6]',
    cardBorder: 'border-[#d3ede0]',
    cardHoverBorder: 'hover:border-[#b8e2cb]',
    badgeBg: 'bg-[#edf7f1]',
    badgeBorder: 'border-[#c5e6d3]',
    badgeText: 'text-[#276741]',
    actionText: 'text-[#235b3a]',
    actionHover: 'group-hover:text-[#174229]',
    imageBorder: 'border-[#d3ede0]/60',
  },
};

export default function CategoryShowcase({
  onSelectCategory,
  onViewAll,
}: CategoryShowcaseProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#15281b] tracking-tight">
          Категории сырья
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
          Концентрированные соки и соки прямого отжима, натуральные пюре, цукаты и фруктовые кусочки
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const theme = CATEGORY_THEMES[cat.id] || {
            cardBg: 'bg-white',
            cardBorder: 'border-stone-200/90',
            cardHoverBorder: 'hover:border-stone-300',
            badgeBg: 'bg-[#f7f0e6]',
            badgeBorder: 'border-[#e6d0ba]',
            badgeText: 'text-[#b85d19]',
            actionText: 'text-stone-600',
            actionHover: 'group-hover:text-stone-950',
            imageBorder: 'border-stone-100',
          };

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group cursor-pointer rounded-2xl ${theme.cardBg} border ${theme.cardBorder} ${theme.cardHoverBorder} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden p-4 sm:p-4.5`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} truncate max-w-[65%]` }
                  >
                    {cat.badge}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${theme.actionText} ${theme.actionHover} flex items-center gap-0.5 transition-colors shrink-0`}
                  >
                    В каталог{' '}
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <h3 className="text-sm sm:text-base lg:text-[17px] font-bold text-stone-900 group-hover:text-black transition-colors mb-1.5 leading-snug break-words">
                  {cat.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 min-h-[36px]">
                  {(() => {
                    const items = cat.previewItems;
                    if (Array.isArray(items)) {
                      return items.join(', ');
                    }
                    if (typeof items === 'string') {
                      return items;
                    }
                    return String(items);
                  })()}
                </p>
              </div>

              <div
                className={`mt-4 relative w-full h-36 rounded-xl overflow-hidden bg-white/40 border ${theme.imageBorder}`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#223329] text-white text-sm font-semibold hover:bg-[#15221b] transition-all shadow-md group cursor-pointer"
        >
          <span>Смотреть весь каталог</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

