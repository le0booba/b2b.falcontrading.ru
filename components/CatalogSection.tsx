'use client';

import { useState, useMemo, useEffect, useRef, useDeferredValue, useLayoutEffect } from 'react';
import Image from 'next/image';
import {
  Home,
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  LayoutList,
  LayoutGrid,
  Globe,
  Box,
  X,
  SlidersHorizontal,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import {
  Product,
  PRODUCTS,
  ALL_COUNTRIES,
  CATEGORY_COUNTS,
  getBrixNumericValue,
} from '@/data/products';
import { FEATURES_CONFIG } from '@/config/features';
import CropMatrixCatalog from './CropMatrixCatalog';
import SeasonalitySection from './SeasonalitySection';
import CountryFlag from './CountryFlag';

interface CatalogSectionProps {
  onBackToHome: () => void;
  onOpenSpec: (product: Product) => void;
  onOpenQuote: (product: Product) => void;
  selectedCategoryFilter?: string;
  initialViewMode?: 'list' | 'grid' | 'matrix' | 'seasonality';
  initialCountryFilter?: string;
}

export function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case 'juice_concentrates':
      return 'bg-[#fff8ee] text-[#9a4b08] border-[#fcdcb0]';
    case 'fruit_puree':
      return 'bg-[#fdf2f5] text-[#9e2746] border-[#f7ccd6]';
    case 'candied_snacks':
      return 'bg-[#f0f8f3] text-[#196b3f] border-[#cbe4d4]';
    default:
      return 'bg-stone-100 text-stone-700 border-stone-200';
  }
}

export function getProductShape(product: Product): string {
  const nameLower = product.name.toLowerCase();
  const descLower = (product.description || '').toLowerCase();
  const brixLower = (product.brix || '').toLowerCase();

  if (nameLower.includes('кубики') || descLower.includes('кубики') || brixLower.includes('кубики') || nameLower.includes('10-10 мм') || nameLower.includes('10*10 мм')) {
    return 'Кубики';
  }
  if (nameLower.includes('цилиндр') || descLower.includes('цилиндр') || brixLower.includes('цилиндр')) {
    return 'Цилиндры';
  }
  if (nameLower.includes('ломтики') || descLower.includes('ломтики') || brixLower.includes('ломтики')) {
    return 'Ломтики';
  }
  if (nameLower.includes('лепестки') || descLower.includes('лепестки') || brixLower.includes('лепестки')) {
    return 'Лепестки';
  }
  if (nameLower.includes('стружка') || descLower.includes('стружка') || brixLower.includes('стружка')) {
    return 'Стружка';
  }
  if (nameLower.includes('снеки') || descLower.includes('снеки')) {
    return 'Снеки';
  }
  if (nameLower.includes('полоски') || descLower.includes('полоски')) {
    return 'Полоски';
  }
  if (nameLower.includes('кусочки') || descLower.includes('кусочки')) {
    return 'Кусочки';
  }
  return 'Кубики';
}

const CATEGORY_BUTTONS = [
  { id: 'all', label: 'Все категории', count: CATEGORY_COUNTS.all },
  {
    id: 'juice_concentrates',
    label: 'Концентрированные соки / Соки прямого отжима',
    count: CATEGORY_COUNTS.juice_concentrates,
  },
  {
    id: 'fruit_puree',
    label: 'Фруктовые / Ягодные / Овощные пюре',
    count: CATEGORY_COUNTS.fruit_puree,
  },
  {
    id: 'candied_snacks',
    label: 'Цукаты / Фруктовые кусочки',
    count: CATEGORY_COUNTS.candied_snacks,
  },
];

export default function CatalogSection({
  onBackToHome,
  onOpenSpec,
  onOpenQuote,
  selectedCategoryFilter = 'all',
  initialViewMode = 'list',
  initialCountryFilter = 'all',
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedCountry, setSelectedCountry] = useState(initialCountryFilter);
  const [sortBy, setSortBy] = useState<'alpha-asc' | 'alpha-desc' | 'brix-asc' | 'brix-desc' | 'brix'>('alpha-asc');
  const isGridAvailable = FEATURES_CONFIG.showGridView !== false;
  const initialMode = !isGridAvailable && initialViewMode === 'grid' ? 'list' : initialViewMode;
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'matrix' | 'seasonality'>(initialMode);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filterDrawerOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [filterDrawerOpen]);



  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      if (selectedCountry !== 'all' && !p.origin.includes(selectedCountry)) {
        return false;
      }
      if (deferredSearchQuery && typeof deferredSearchQuery === 'string' && deferredSearchQuery.trim()) {
        const q = deferredSearchQuery.toLowerCase().trim();
        const terms = q.split(/\s+/).filter(Boolean);

        const textParts: string[] = [
          p.name,
          p.categoryTitle,
          p.description || '',
          p.brix || '',
          p.packaging || '',
          ...p.origin,
          p.specs?.color || '',
          p.specs?.size || '',
        ];

        if (p.countryDetails && p.countryDetails.length > 0) {
          p.countryDetails.forEach((cd) => {
            textParts.push(cd.country, cd.brix || '', cd.packaging || '');
          });
        }

        const fullProductText = textParts.join(' ').toLowerCase();

        const matchesAll = fullProductText.includes(q) || terms.every((term) => fullProductText.includes(term));
        if (!matchesAll) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'alpha-asc') {
        return a.name.localeCompare(b.name, 'ru');
      } else if (sortBy === 'alpha-desc') {
        return b.name.localeCompare(a.name, 'ru');
      } else if (sortBy === 'brix-asc') {
        const valA = getBrixNumericValue(a.brix);
        const valB = getBrixNumericValue(b.brix);
        if (valA === 0 && valB > 0) return 1;
        if (valB === 0 && valA > 0) return -1;
        if (valA !== valB) return valA - valB;
        return a.name.localeCompare(b.name, 'ru');
      } else if (sortBy === 'brix-desc' || sortBy === 'brix') {
        const valA = getBrixNumericValue(a.brix);
        const valB = getBrixNumericValue(b.brix);
        if (valA === 0 && valB > 0) return 1;
        if (valB === 0 && valA > 0) return -1;
        if (valA !== valB) return valB - valA;
        return a.name.localeCompare(b.name, 'ru');
      }
      return 0;
    });
  }, [activeCategory, selectedCountry, deferredSearchQuery, sortBy]);

  useLayoutEffect(() => {
    const equalizeHeights = () => {
      if (window.innerWidth < 768) {
        document.querySelectorAll('.catalog-product-card').forEach((card) => {
          (card as HTMLElement).style.height = 'auto';
        });
        return;
      }

      const cards = document.querySelectorAll('.catalog-product-card');
      if (cards.length === 0) return;

      cards.forEach((card) => {
        (card as HTMLElement).style.height = 'auto';
      });

      let maxHeight = 0;
      cards.forEach((card) => {
        const h = (card as HTMLElement).offsetHeight;
        if (h > maxHeight) maxHeight = h;
      });

      if (maxHeight > 0) {
        cards.forEach((card) => {
          (card as HTMLElement).style.height = `${maxHeight}px`;
        });
      }
    };

    equalizeHeights();
    window.addEventListener('resize', equalizeHeights);

    return () => {
      window.removeEventListener('resize', equalizeHeights);
    };
  }, [filteredProducts, viewMode]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Главная</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-stone-800">Каталог продукции</span>
        </div>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 font-semibold text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться на главную</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Каталог продукции
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Концентрированные соки, соки прямого отжима, натуральные пюре, цукаты и фруктовые кусочки
          </p>
        </div>

        {viewMode !== 'matrix' && viewMode !== 'seasonality' && (
          <div className="hidden sm:flex items-center gap-2.5 self-start md:self-auto">
            <div className="relative">
              <select
                value={sortBy === 'brix' ? 'brix-desc' : sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#223329] cursor-pointer shadow-2xs"
              >
                <option value="alpha-asc">По алфавиту (А–Я)</option>
                <option value="alpha-desc">По алфавиту (Я–А)</option>
                <option value="brix-asc">По Brix (по возр.)</option>
                <option value="brix-desc">По Brix (по убыв.)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {FEATURES_CONFIG.showGridView && (
              <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${viewMode === 'list'
                    ? 'bg-[#223329] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                    }`}
                  title="Режим списка"
                >
                  <LayoutList className="w-3.5 h-3.5" />
                  <span>Списком</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${viewMode === 'grid'
                    ? 'bg-[#223329] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                    }`}
                  title="Режим сетки"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Сеткой</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200/90 w-full min-h-[46px]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (viewMode === 'matrix' || viewMode === 'seasonality') setViewMode('list');
              }}
              className={`flex-1 sm:flex-none h-[38px] px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${viewMode !== 'matrix' && viewMode !== 'seasonality'
                ? 'bg-[#223329] text-white border-[#223329] shadow-xs'
                : 'text-stone-600 hover:text-stone-950 bg-transparent border-transparent'
                }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Классический каталог</span>
            </button>

            {FEATURES_CONFIG.showParametricSelection && (
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex-1 sm:flex-none h-[38px] px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${viewMode === 'matrix'
                  ? 'bg-[#223329] text-white border-[#223329] shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 bg-transparent border-transparent'
                  }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Подбор по параметрам</span>
              </button>
            )}

            {FEATURES_CONFIG.showSeasonality && (
              <button
                onClick={() => setViewMode('seasonality')}
                className={`flex-1 sm:flex-none h-[38px] px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${viewMode === 'seasonality'
                  ? 'bg-[#223329] text-white border-[#223329] shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 bg-transparent border-transparent'
                  }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Сезонность</span>
              </button>
            )}
          </div>

          {viewMode !== 'matrix' && viewMode !== 'seasonality' && (
            <button
              onClick={() => {
                setFilterDrawerOpen(!filterDrawerOpen);
              }}
              className={`hidden sm:flex h-[38px] px-4 text-xs font-bold rounded-xl items-center gap-2 transition-colors cursor-pointer shrink-0 border ${filterDrawerOpen || searchQuery || selectedCountry !== 'all'
                ? 'bg-[#223329] text-white border-[#223329] shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Поиск и фильтр</span>
              {filterDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {viewMode !== 'matrix' && viewMode !== 'seasonality' && (
          <div className="flex sm:hidden items-center gap-1.5 mt-2">
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`flex-1 min-w-0 h-[38px] px-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${filterDrawerOpen || searchQuery || selectedCountry !== 'all'
                ? 'bg-[#223329] text-white border-[#223329] shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Поиск {(searchQuery || selectedCountry !== 'all') && '•'}</span>
            </button>

            <div className="relative flex-[1.2] min-w-0">
              <select
                value={sortBy === 'brix' ? 'brix-desc' : sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full h-[38px] appearance-none pl-2.5 pr-6 rounded-xl bg-white border border-stone-200 text-[11px] font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#223329] cursor-pointer shadow-2xs truncate"
              >
                <option value="alpha-asc">А–Я</option>
                <option value="alpha-desc">Я–А</option>
                <option value="brix-asc">Brix (по возр.)</option>
                <option value="brix-desc">Brix (по убыв.)</option>
              </select>
              <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-3 pointer-events-none" />
            </div>

            {FEATURES_CONFIG.showGridView && (
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                className="h-[38px] w-[38px] rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs shrink-0 cursor-pointer flex items-center justify-center"
                title={viewMode === 'list' ? "Показать сеткой" : "Показать списком"}
              >
                {viewMode === 'list' ? (
                  <LayoutGrid className="w-4 h-4" />
                ) : (
                  <LayoutList className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        )}

        {viewMode !== 'matrix' && viewMode !== 'seasonality' && filterDrawerOpen && (
          <div className="w-full mt-3 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center animate-fadeIn">
            <div className="w-full md:flex-1 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по всему описанию, названию, стране, Brix или типу упаковки..."
                className="w-full pl-10 pr-8 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#223329] bg-stone-50/50 font-medium text-stone-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                  title="Очистить строку поиска"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="w-full md:w-auto flex items-center gap-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="flex-1 md:w-60 px-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#223329] bg-white text-stone-800 font-bold cursor-pointer"
              >
                <option value="all">Все страны происхождения</option>
                {ALL_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('all');
                }}
                title="Сбросить поиск и фильтры"
                className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shrink-0 flex items-center justify-center h-[38px] w-[38px]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {viewMode === 'seasonality' && FEATURES_CONFIG.showSeasonality ? (
        <SeasonalitySection />
      ) : viewMode === 'matrix' && FEATURES_CONFIG.showParametricSelection ? (
        <CropMatrixCatalog
          onOpenSpec={onOpenSpec}
          onOpenQuote={onOpenQuote}
          initialCountry={selectedCountry}
        />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_BUTTONS.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.id)}
                  className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors border-2 shrink sm:shrink-0 max-w-full ${isActive
                    ? 'bg-[#223329] text-white border-[#15221b]'
                    : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                >
                  <span className="whitespace-normal break-words text-left">{item.label}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 text-[10px] font-bold rounded-full border transition-colors shrink-0 ${isActive
                      ? 'bg-white/20 text-white border-transparent'
                      : 'bg-stone-100 text-stone-700 border-stone-300/60'
                      }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <div>
              Показано позиций: <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong>
            </div>
            <div>
              Сортировка:{' '}
              <span className="font-bold text-stone-800">
                {sortBy === 'alpha-asc' && 'По алфавиту (А–Я)'}
                {sortBy === 'alpha-desc' && 'По алфавиту (Я–А)'}
                {sortBy === 'brix-asc' && 'Brix (по возр.)'}
                {(sortBy === 'brix-desc' || sortBy === 'brix') && 'Brix (по убыв.)'}
              </span>
            </div>
          </div>

          {viewMode === 'list' || !FEATURES_CONFIG.showGridView ? (
            <div className="space-y-3 sm:space-y-3.5">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 shadow-2xs">
                  <p className="text-base font-bold text-stone-800">
                    По вашему запросу ничего не найдено
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Попробуйте изменить категорию или очистить параметры поискового фильтра.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedCountry('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-5 py-2.5 bg-[#223329] text-white rounded-xl text-xs font-bold hover:bg-[#15221b] transition-colors cursor-pointer"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="catalog-product-card group rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#223329] hover:ring-1.5 hover:ring-[#223329]/40 hover:shadow-2xs transition-all flex flex-col md:flex-row md:items-stretch justify-between overflow-hidden"
                  >
                    <div
                      onClick={() => onOpenSpec(product)}
                      className="flex items-start md:items-stretch gap-3.5 sm:gap-4 flex-1 min-w-0 cursor-pointer group/iteminfo"
                    >
                      <div
                        className="relative w-28 h-36 sm:w-28 sm:h-28 lg:w-32 lg:h-full rounded-none rounded-br-xl md:rounded-none overflow-hidden bg-stone-100 shrink-0 self-start md:self-stretch"
                      >
                        <Image
                          src={product.image || '/cat_puree.jpg'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 112px, (max-width: 1024px) 112px, 128px"
                          className="object-cover rounded-none rounded-br-xl md:rounded-none"
                          referrerPolicy="no-referrer"
                          loading={idx < 4 ? 'eager' : 'lazy'}
                          priority={idx < 2}
                          decoding="async"
                        />
                      </div>

                      <div className="py-2.5 sm:py-3.5 md:py-3.5 pr-4 md:pr-0 min-w-0 flex-1 flex flex-col justify-start">
                        <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start md:gap-1.5 md:min-h-[54px]">
                          <h3
                            className="text-[15px] sm:text-base font-medium text-stone-900 group-hover/iteminfo:text-[#183a24] group-hover/iteminfo:underline transition-colors tracking-wide leading-snug"
                          >
                            {product.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-semibold tracking-wide border shadow-2xs whitespace-normal break-words max-w-full ${getCategoryBadgeClass(product.category)}`}
                          >
                            {product.categoryTitle}
                          </span>
                        </div>

                        <div className="hidden md:block h-4 w-full" aria-hidden="true" />

                        <div className="flex flex-col items-end text-[11px] w-full mt-2 md:mt-0 md:flex-row md:items-start md:justify-start md:gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-stone-400 uppercase tracking-wider mb-1 md:mb-0 shrink-0 pt-0.5">
                            <Globe className="w-3 h-3 text-stone-400 shrink-0" />
                            <span>Страны:</span>
                          </span>
                          <div className={product.origin.length >= 2 ? "grid grid-cols-2 md:grid-cols-2 gap-1.5 justify-items-end md:justify-items-start w-fit" : "flex flex-wrap gap-1.5 justify-end md:justify-start w-fit"}>
                            {product.origin.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-[#f4f5f4] text-stone-700 border-stone-200/60 max-w-full"
                              >
                                <CountryFlag country={c} size="sm" shape="rect" />
                                <span className="truncate text-[10px] sm:text-[11px]">{c}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {Boolean(product.packaging && typeof product.packaging === 'string' && product.packaging.trim() && product.packaging !== '—' && product.packaging !== 'не указана') && (
                          <div className="md:hidden flex items-center gap-1.5 text-[11px] mt-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#f4f5f4] text-stone-600 text-[10.5px] font-medium border border-stone-200/60 max-w-full">
                              <Box className="w-3 h-3 text-stone-400 shrink-0" />
                              <span className="whitespace-normal break-words leading-tight text-left">{product.packaging}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-end gap-3 sm:gap-4 lg:gap-6 shrink-0 border-t md:border-t-0 p-3 sm:p-3.5 md:p-0 md:pr-5 lg:pr-6 md:pl-4 border-stone-100">
                      <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
                        {product.category === 'candied_snacks' ? (
                          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                            <div className="w-auto md:w-28 lg:w-32 flex flex-row md:flex-col items-baseline md:items-start gap-1.5 md:gap-0.5 justify-center">
                              <span className="text-[10px] font-bold uppercase text-stone-500 tracking-wider shrink-0">
                                ФОРМА:
                              </span>
                              <span className="text-xs sm:text-[12.5px] font-semibold text-stone-800 leading-tight uppercase block">
                                {getProductShape(product)}
                              </span>
                            </div>

                            <div className="w-auto md:w-20 lg:w-24 flex flex-row md:flex-col items-baseline md:items-start gap-1.5 md:gap-0.5 justify-center">
                              <span className="text-[10px] font-bold uppercase text-stone-500 tracking-wider shrink-0">
                                РАЗМЕР:
                              </span>
                              <span className="text-xs sm:text-[12.5px] font-semibold text-stone-800 leading-tight uppercase block">
                                {product.brix || '—'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-auto md:w-28 lg:w-32 flex flex-row md:flex-col items-baseline md:items-start gap-1.5 md:gap-0.5 justify-center">
                            <span className="text-[10px] font-bold uppercase text-stone-500 tracking-wider shrink-0">
                              BRIX:
                            </span>
                            <span className="text-xs sm:text-[12.5px] font-semibold text-stone-800 leading-tight uppercase block">
                              {product.brix || '—'}
                            </span>
                          </div>
                        )}

                        <div className="hidden md:flex min-w-[150px] lg:min-w-[200px] flex-col justify-center">
                          <span className="text-[10px] font-semibold uppercase text-[#9ca3af] tracking-wider block mb-0.5">
                            УПАКОВКА
                          </span>
                          {(() => {
                            const rawValue = product.packaging;
                            const value = (!rawValue || typeof rawValue !== 'string' || rawValue.trim() === '' || rawValue.trim() === 'не указан' || rawValue.trim() === 'не указана' || rawValue === '—') ? '—' : rawValue.trim();
                            if (value === '—') {
                              return (
                                <span className="text-xs sm:text-[12.5px] font-semibold text-stone-400 block">
                                  —
                                </span>
                              );
                            }
                            if (value === 'Асептический пакет в металлической бочке') {
                              return (
                                <span
                                  className="text-[10px] sm:text-[10.5px] font-semibold text-stone-800 leading-[1.25] uppercase block whitespace-normal"
                                  title={value}
                                >
                                  Асептический пакет<br />в металлической бочке
                                </span>
                              );
                            }
                            return (
                              <span
                                className="text-xs sm:text-[12.5px] font-semibold text-stone-800 leading-tight uppercase block whitespace-normal"
                                title={value}
                              >
                                {value}
                              </span>
                            );
                          })()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 justify-end">
                        <button
                          onClick={() => onOpenSpec(product)}
                          className="flex-1 md:flex-none px-3.5 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-colors cursor-pointer text-center whitespace-nowrap"
                        >
                          Спецификация
                        </button>
                        <button
                          onClick={() => onOpenQuote(product)}
                          className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-[#1e2e23] hover:bg-[#15221b] text-white text-xs font-bold transition-all cursor-pointer text-center whitespace-nowrap shadow-xs"
                        >
                          Заказать КП
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="catalog-product-card group rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#223329] hover:ring-1.5 hover:ring-[#223329]/40 hover:shadow-2xs transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div
                      onClick={() => onOpenSpec(product)}
                      className="relative w-full h-84 sm:h-64 lg:h-72 rounded-none rounded-br-xl md:rounded-none overflow-hidden bg-stone-100 cursor-pointer"
                    >
                      <Image
                        src={product.image || '/cat_puree.jpg'}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover rounded-none rounded-br-xl md:rounded-none"
                        referrerPolicy="no-referrer"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        priority={idx < 2}
                        decoding="async"
                      />
                      {Boolean(product.packaging && typeof product.packaging === 'string' && product.packaging.trim() && product.packaging !== '—' && product.packaging !== 'не указана') && (
                        <div className="absolute top-2.5 right-2.5 max-w-[85%] px-2.5 py-1 rounded-lg bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider whitespace-normal break-words leading-tight text-right">
                          {product.packaging}
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 pb-0">
                      <div
                        onClick={() => onOpenSpec(product)}
                        className="cursor-pointer group/cardname space-y-2"
                      >
                        <div>
                          <h3
                            className="text-[15px] sm:text-base font-medium text-stone-900 leading-snug line-clamp-1 group-hover/cardname:text-[#183a24] group-hover/cardname:underline transition-colors tracking-wide"
                          >
                            {product.name}
                          </h3>
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border shadow-2xs whitespace-normal break-words max-w-full ${getCategoryBadgeClass(product.category)}`}
                            >
                              {product.categoryTitle}
                            </span>
                          </div>
                        </div>

                        <div className="h-3 w-full" aria-hidden="true" />

                        <div className="flex items-start gap-1.5 text-[10.5px] pt-0.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider mr-0.5 shrink-0 pt-0.5">
                            <Globe className="w-3 h-3 text-stone-400 shrink-0" />
                            <span>Страны:</span>
                          </span>
                          <div className={product.origin.length >= 2 ? "grid grid-cols-2 gap-1.5 w-fit" : "flex flex-wrap gap-1.5 w-fit"}>
                            {product.origin.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10.5px] font-medium border bg-stone-100 text-stone-700 border-stone-200/60 max-w-full"
                              >
                                <CountryFlag country={c} size="sm" shape="rect" />
                                <span className="truncate text-[9.5px] sm:text-[10.5px]">{c}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 text-[10.5px] font-bold uppercase tracking-wider shrink-0">
                            {product.category === 'candied_snacks' ? 'Размер:' : 'BRIX:'}
                          </span>
                          <span className="font-bold text-stone-900 text-right text-[12.5px] sm:text-[13px]">
                            {product.brix || '—'}
                          </span>
                        </div>
                        {product.category === 'candied_snacks' && (
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-stone-400 text-[11px] font-bold uppercase shrink-0 pt-0.5">
                              Форма:
                            </span>
                            <span className="font-bold text-stone-900 text-right uppercase text-xs block">
                              {getProductShape(product)}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-start gap-2">
                          <span className="text-stone-400 text-[11px] font-bold uppercase shrink-0 pt-0.5">
                            Упаковка:
                          </span>
                          {(() => {
                            const rawVal = product.packaging;
                            const val = (!rawVal || typeof rawVal !== 'string' || rawVal.trim() === '' || rawVal.trim() === 'не указан' || rawVal.trim() === 'не указана' || rawVal === '—') ? '—' : rawVal.trim();
                            if (val === '—') {
                              return (
                                <span className="font-semibold text-stone-400 text-right text-xs">
                                  —
                                </span>
                              );
                            }
                            return (
                              <span className="font-bold text-stone-900 text-right uppercase text-[10px] sm:text-[10.5px] leading-snug whitespace-normal break-words block">
                                {val}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
                      <button
                        onClick={() => onOpenSpec(product)}
                        className="px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold text-center transition-colors cursor-pointer"
                      >
                        Спецификация
                      </button>
                      <button
                        onClick={() => onOpenQuote(product)}
                        className="px-3 py-2 rounded-xl bg-[#223329] hover:bg-[#15221b] text-white text-xs font-black text-center transition-all shadow-xs cursor-pointer"
                      >
                        Заказать КП
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
