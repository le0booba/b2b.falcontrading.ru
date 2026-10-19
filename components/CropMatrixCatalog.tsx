'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  Globe,
  Box,
  FileText,
  Send,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';
import {
  Product,
  PRODUCTS,
  ALL_COUNTRIES,
  getBrixNumericValue,
} from '@/data/products';
import CountryFlag from './CountryFlag';

export type CropCategoryGroup = 'all' | 'fruit' | 'berry' | 'citrus' | 'exotic' | 'vegetable';

export interface CropInfo {
  name: string;
  group: 'fruit' | 'berry' | 'citrus' | 'exotic' | 'vegetable';
  groupLabel: string;
}

export function getProductCrop(productName: string): CropInfo {
  if (!productName || typeof productName !== 'string') {
    return { name: 'Other', group: 'fruit', groupLabel: 'Другие' };
  }

  const n = productName.trim();

  if (n.startsWith('Апельсин')) return { name: 'Апельсин', group: 'citrus', groupLabel: 'Цитрусовые' };
  if (n.startsWith('Лимон')) return { name: 'Лимон', group: 'citrus', groupLabel: 'Цитрусовые' };
  if (n.startsWith('Лайм')) return { name: 'Лайм', group: 'citrus', groupLabel: 'Цитрусовые' };
  if (n.startsWith('Грейпфрут')) return { name: 'Грейпфрут', group: 'citrus', groupLabel: 'Цитрусовые' };
  if (n.startsWith('Мандарин')) return { name: 'Мандарин', group: 'citrus', groupLabel: 'Цитрусовые' };

  if (n.startsWith('Брусника')) return { name: 'Брусника', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Виноград')) return { name: 'Виноград', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Вишня')) return { name: 'Вишня', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Ежевика')) return { name: 'Ежевика', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Клубника')) return { name: 'Клубника', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Клюква')) return { name: 'Клюква', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Малина')) return { name: 'Малина', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Черешня')) return { name: 'Черешня', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Черника')) return { name: 'Черника', group: 'berry', groupLabel: 'Ягоды' };
  if (n.startsWith('Черная смородина') || n.startsWith('Смородина черная')) {
    return { name: 'Черная смородина', group: 'berry', groupLabel: 'Ягоды' };
  }
  if (n.startsWith('Смородина красная') || n.startsWith('Красная смородина')) {
    return { name: 'Красная смородина', group: 'berry', groupLabel: 'Ягоды' };
  }

  if (n.startsWith('Томатная паста')) return { name: 'Томат', group: 'vegetable', groupLabel: 'Овощи' };
  if (n.startsWith('Брокколи')) return { name: 'Брокколи', group: 'vegetable', groupLabel: 'Овощи' };
  if (n.startsWith('Морковь')) return { name: 'Морковь', group: 'vegetable', groupLabel: 'Овощи' };
  if (n.startsWith('Тыква')) return { name: 'Тыква', group: 'vegetable', groupLabel: 'Овощи' };
  if (n.startsWith('Цветная капуста')) return { name: 'Цветная капуста', group: 'vegetable', groupLabel: 'Овощи' };

  if (n.startsWith('Ананас')) return { name: 'Ананас', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Банан')) return { name: 'Банан', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Гуава белая')) return { name: 'Гуава белая', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Гуава розовая')) return { name: 'Гуава розовая', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Гуава')) return { name: 'Гуава', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Канталупа')) return { name: 'Канталупа', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Кокос') || n.startsWith('Кокосовая стружка')) {
    return { name: 'Кокос', group: 'exotic', groupLabel: 'Экзотика' };
  }
  if (n.startsWith('Личи')) return { name: 'Личи', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Манго')) return { name: 'Манго', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Маракуйя')) return { name: 'Маракуйя', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Папайя')) return { name: 'Папайя', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Фейхоа')) return { name: 'Фейхоа', group: 'exotic', groupLabel: 'Экзотика' };
  if (n.startsWith('Гранат')) return { name: 'Гранат', group: 'exotic', groupLabel: 'Экзотика' };

  if (n.startsWith('Абрикос')) return { name: 'Абрикос', group: 'fruit', groupLabel: 'Фрукты' };
  if (n.startsWith('Груша')) return { name: 'Груша', group: 'fruit', groupLabel: 'Фрукты' };
  if (n.startsWith('Нектарин')) return { name: 'Нектарин', group: 'fruit', groupLabel: 'Фрукты' };
  if (n.startsWith('Персик')) return { name: 'Персик', group: 'fruit', groupLabel: 'Фрукты' };
  if (n.startsWith('Слива')) return { name: 'Слива', group: 'fruit', groupLabel: 'Фрукты' };
  if (n.startsWith('Чернослив')) return { name: 'Чернослив', group: 'fruit', groupLabel: 'Фрукты' };
  if (n.startsWith('Яблоко') || n.startsWith('Яблоки')) return { name: 'Яблоко', group: 'fruit', groupLabel: 'Фрукты' };

  const firstWord = n.split(/[\s,(/]/)[0];
  return { name: firstWord, group: 'fruit', groupLabel: 'Фрукты' };
}

export type ProductTypeId = 'all' | 'juice_concentrate' | 'nfc' | 'puree' | 'candied';

export const PRODUCT_TYPES: { id: ProductTypeId; label: string; short: string }[] = [
  { id: 'all', label: 'Все типы изделий', short: 'Все типы' },
  { id: 'juice_concentrate', label: 'Концентрированные соки', short: 'Конц. сок' },
  { id: 'nfc', label: 'Соки прямого отжима', short: 'Прямой отжим' },
  { id: 'puree', label: 'Фруктовые / ягодные / овощные пюре и пасты', short: 'Пюре / пасты' },
  { id: 'candied', label: 'Цукаты / Кусочки фруктов', short: 'Цукаты' },
];

export function getProductType(product: Product): { id: ProductTypeId; label: string } {
  if (product.category === 'candied_snacks') {
    return { id: 'candied', label: 'Цукаты / Кусочки фруктов' };
  }
  if (product.category === 'fruit_puree') {
    return { id: 'puree', label: 'Фруктовые / Ягодные / Овощные пюре' };
  }
  const numericBrix = getBrixNumericValue(product.brix);
  if (numericBrix > 0 && numericBrix <= 15) {
    return { id: 'nfc', label: 'Сок прямого отжима' };
  }
  return { id: 'juice_concentrate', label: 'Концентрированный сок' };
}

interface CropMatrixCatalogProps {
  onOpenSpec: (product: Product) => void;
  onOpenQuote: (product: Product) => void;
  initialCountry?: string;
}

export default function CropMatrixCatalog({
  onOpenSpec,
  onOpenQuote,
  initialCountry = 'all',
}: CropMatrixCatalogProps) {
  const [selectedCropGroup, setSelectedCropGroup] = useState<CropCategoryGroup>('all');
  const [selectedProductType, setSelectedProductType] = useState<ProductTypeId>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [cropSearchQuery, setCropSearchQuery] = useState<string>('');
  const [expandedCrops, setExpandedCrops] = useState<Record<string, boolean>>({});

  const handleResetFilters = () => {
    setSelectedCropGroup('all');
    setSelectedProductType('all');
    setSelectedCountry('all');
    setCropSearchQuery('');
  };

  const isAnyFilterActive =
    selectedCropGroup !== 'all' ||
    selectedProductType !== 'all' ||
    selectedCountry !== 'all' ||
    cropSearchQuery && typeof cropSearchQuery === 'string' && cropSearchQuery.trim().length > 0;

  const cropResults = useMemo(() => {
    const cropsMap = new Map<
      string,
      {
        cropInfo: CropInfo;
        allProductsForCrop: Product[];
        matchedProducts: Product[];
      }
    >();

    PRODUCTS.forEach((p) => {
      const crop = getProductCrop(p.name);
      if (!cropsMap.has(crop.name)) {
        cropsMap.set(crop.name, {
          cropInfo: crop,
          allProductsForCrop: [],
          matchedProducts: [],
        });
      }
      const entry = cropsMap.get(crop.name)!;
      entry.allProductsForCrop.push(p);

      if (selectedCropGroup !== 'all' && crop.group !== selectedCropGroup) {
        return;
      }
      if (selectedProductType !== 'all') {
        const type = getProductType(p);
        if (type.id !== selectedProductType) {
          return;
        }
      }
      if (selectedCountry !== 'all') {
        if (!p.origin.includes(selectedCountry)) {
          return;
        }
      }
      if (cropSearchQuery && typeof cropSearchQuery === 'string' && cropSearchQuery.trim()) {
        const q = cropSearchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCrop = crop.name.toLowerCase().includes(q);
        const matchesCountry = p.origin.some((c) => c.toLowerCase().includes(q));
        const matchesDesc = p.description ? p.description.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesCrop && !matchesCountry && !matchesDesc) {
          return;
        }
      }

      entry.matchedProducts.push(p);
    });

    const list = Array.from(cropsMap.entries())
      .filter(([_, data]) => data.matchedProducts.length > 0)
      .map(([cropName, data]) => {
        const matched = data.matchedProducts;

        const availableTypesMap = new Map<string, { label: string; count: number }>();
        matched.forEach((p) => {
          const t = getProductType(p);
          if (!availableTypesMap.has(t.label)) {
            availableTypesMap.set(t.label, { label: t.label, count: 0 });
          }
          availableTypesMap.get(t.label)!.count += 1;
        });

        const countrySet = new Set<string>();
        matched.forEach((p) => {
          p.origin.forEach((c) => countrySet.add(c));
        });
        const availableCountries = Array.from(countrySet).sort((a, b) =>
          a.localeCompare(b, 'ru')
        );

        const brixSet = new Set<string>();
        const packagingSet = new Set<string>();
        matched.forEach((p) => {
          if (p.brix) brixSet.add(p.brix);
          if (p.packaging && typeof p.packaging === 'string' && p.packaging.trim() && p.packaging !== '—') {
            packagingSet.add(p.packaging);
          }
        });

        return {
          cropName,
          cropInfo: data.cropInfo,
          products: matched,
          allTypes: Array.from(availableTypesMap.values()),
          allCountries: availableCountries,
          allBrix: Array.from(brixSet),
          allPackaging: Array.from(packagingSet),
        };
      })
      .sort((a, b) => a.cropName.localeCompare(b.cropName, 'ru'));

    return list;
  }, [
    selectedCropGroup,
    selectedProductType,
    selectedCountry,
    cropSearchQuery,
  ]);

  const toggleExpand = (cropName: string) => {
    setExpandedCrops((prev) => ({
      ...prev,
      [cropName]: !prev[cropName],
    }));
  };

  const totalMatchedItems = useMemo(() => {
    return cropResults.reduce((sum, item) => sum + item.products.length, 0);
  }, [cropResults]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-6 space-y-4">
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#223329]" />
              <span>1. Фрукт / Овощ / Ягода:</span>
            </span>

            <div className="flex items-center gap-2">
              {isAnyFilterActive && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                  <span>Сбросить фильтры</span>
                </button>
              )}

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={cropSearchQuery}
                  onChange={(e) => setCropSearchQuery(e.target.value)}
                  placeholder="Поиск по культуре или названию..."
                  className="w-full pl-8 pr-7 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#223329] focus:bg-white"
                />
                {cropSearchQuery && (
                  <button
                    onClick={() => setCropSearchQuery('')}
                    className="absolute right-2 top-2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'all', label: 'Все группы' },
              { id: 'fruit', label: 'Фрукты' },
              { id: 'berry', label: 'Ягоды' },
              { id: 'citrus', label: 'Цитрусовые' },
              { id: 'exotic', label: 'Экзотика' },
              { id: 'vegetable', label: 'Овощи' },
            ].map((grp) => (
              <button
                key={grp.id}
                onClick={() => setSelectedCropGroup(grp.id as CropCategoryGroup)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCropGroup === grp.id
                    ? 'bg-[#223329] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
              >
                {grp.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-600 block">
              2. Тип изделия:
            </label>
            <div className="relative">
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value as ProductTypeId)}
                className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#223329] cursor-pointer shadow-2xs"
              >
                {PRODUCT_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
            {selectedProductType === 'all' && (
              <p className="text-[10px] text-stone-600 italic">
                В карточках отображаются все доступные типы
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-stone-600 block">
              3. Страна происхождения:
            </label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#223329] cursor-pointer shadow-2xs"
              >
                <option value="all">Все страны происхождения</option>
                {ALL_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
            {selectedCountry === 'all' && (
              <p className="text-[10px] text-stone-600 italic">
                В карточках отображаются все страны-поставщики
              </p>
            )}
          </div>
        </div>

        <div className="p-3 bg-[#f6f8f5] rounded-xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-stone-700">Активный набор:</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-800 font-semibold">
              Группа:{' '}
              {
                [
                  { id: 'all', label: 'Все группы' },
                  { id: 'fruit', label: 'Фрукты' },
                  { id: 'berry', label: 'Ягоды' },
                  { id: 'citrus', label: 'Цитрусовые' },
                  { id: 'exotic', label: 'Экзотика' },
                  { id: 'vegetable', label: 'Овощи' },
                ].find((g) => g.id === selectedCropGroup)?.label
              }
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-800 font-semibold">
              Тип:{' '}
              {PRODUCT_TYPES.find((t) => t.id === selectedProductType)?.short || 'Все'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-800 font-semibold">
              Страна: {selectedCountry === 'all' ? 'Все страны' : selectedCountry}
            </span>
          </div>

          <div className="text-xs font-bold text-stone-600">
            Найдено культур:{' '}
            <span className="text-[#223329] font-black">{cropResults.length}</span> (позиций:{' '}
            <span className="text-[#223329] font-black">{totalMatchedItems}</span>)
          </div>
        </div>
      </div>

      {cropResults.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
          <p className="text-base font-bold text-stone-800">
            По выбранным параметрам ничего не найдено
          </p>
          <p className="text-xs text-stone-500">
            Попробуйте выбрать «Все типы» или «Все страны»
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#223329] text-white text-xs font-bold hover:bg-[#15221b] transition-colors cursor-pointer"
          >
            Сбросить все параметры
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cropResults.map((cropEntry) => {
            const isExpanded = cropResults.length === 1 || Boolean(expandedCrops[cropEntry.cropName]);

            return (
              <div
                key={cropEntry.cropName}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:border-stone-300"
              >
                <div
                  onClick={() => toggleExpand(cropEntry.cropName)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer bg-gradient-to-r from-stone-50/50 to-white hover:bg-stone-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0 shadow-2xs">
                      <Image
                        src={cropEntry.products[0]?.image || '/crops/apple.jpg'}
                        alt={cropEntry.cropName}
                        fill
                        sizes="(max-width: 640px) 72px, 96px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#223329] text-white shrink-0">
                          {cropEntry.cropInfo.groupLabel}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                          {cropEntry.cropName}
                        </h3>
                        <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
                          {cropEntry.products.length}{' '}
                          {cropEntry.products.length === 1
                            ? 'позиция'
                            : cropEntry.products.length < 5
                              ? 'позиции'
                              : 'позиций'}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-1">
                        {cropEntry.products.map((p) => p.name).join(' • ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>{isExpanded ? 'Свернуть позиции' : 'Смотреть позиции'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-stone-600" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-stone-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="px-4 sm:px-5 py-3.5 bg-[#fbfcfb] border-t border-b border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  <div className="space-y-1 bg-white p-3 rounded-xl border border-stone-200/70">
                    <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                      <span>Типы изделий:</span>
                      {selectedProductType === 'all' ? (
                        <span className="text-[10px] text-[#223329] font-black uppercase">
                          Все доступные ({cropEntry.allTypes.length})
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-700 font-bold">Фильтр применен</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cropEntry.allTypes.map((typeObj) => (
                        <span
                          key={typeObj.label}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eef3ef] text-[#223329] text-[11px] font-semibold"
                        >
                          <span>{typeObj.label}</span>
                          <span className="text-[9px] bg-white/60 px-1 rounded-sm font-bold text-[#223329]">
                            {typeObj.count}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 bg-white p-3 rounded-xl border border-stone-200/70">
                    <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                      <span>Страны происхождения:</span>
                      {selectedCountry === 'all' ? (
                        <span className="text-[10px] text-[#223329] font-black uppercase">
                          Все страны ({cropEntry.allCountries.length})
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-700 font-bold">Фильтр применен</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cropEntry.allCountries.map((country) => (
                        <span
                          key={country}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#f0f4f8] text-[#1e2e3e] text-[11px] font-semibold"
                        >
                          <CountryFlag country={country} size="sm" shape="rect" />
                          <span>{country}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white divide-y divide-stone-100">
                    <div className="text-xs font-black uppercase tracking-wider text-stone-500 pb-2">
                      Товарные позиции ({cropEntry.products.length}):
                    </div>
                    {cropEntry.products.map((product) => {
                      const hasPackaging = Boolean(
                        product.packaging &&
                        typeof product.packaging === 'string' &&
                        product.packaging.trim() &&
                        product.packaging !== '—' &&
                        product.packaging !== 'не указана'
                      );

                      return (
                        <div
                          key={product.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-stone-50/70 rounded-xl transition-colors group overflow-hidden border border-stone-200/80 bg-white"
                        >
                          <div
                            onClick={() => onOpenSpec(product)}
                            className="flex items-start md:items-center gap-3.5 sm:gap-4 flex-1 min-w-0 cursor-pointer group/matitem"
                          >
                            <div
                              className="relative w-22 h-22 sm:w-26 sm:h-26 lg:w-28 lg:h-28 rounded-none overflow-hidden bg-stone-100 shrink-0 self-start md:self-stretch"
                            >
                              <Image
                                src={product.image || '/crops/apple.jpg'}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 88px, 112px"
                                className="object-cover rounded-none"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>

                            <div className="py-2.5 sm:py-3 pr-3 md:pr-0 space-y-1.5 flex-1 min-w-0">
                              <div className="text-left font-medium text-stone-900 group-hover/matitem:text-[#223329] group-hover/matitem:underline text-sm sm:text-[15px] block transition-colors tracking-wide">
                                {product.name}
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase font-bold">
                                <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                                  {product.categoryTitle}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-[#eef3ef] text-[#223329]">
                                  {product.category === 'candied_snacks' ? `Размер: ${product.brix}` : `BRIX: ${product.brix}`}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f0f4f8] text-[#1e2e3e]">
                                  <Globe className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                                  <span className={product.origin.length > 2 ? "grid grid-cols-2 gap-1" : "inline-flex items-center gap-1 flex-wrap"}>
                                    {product.origin.map((c) => (
                                      <span key={c} className="inline-flex items-center gap-1">
                                        <CountryFlag country={c} size="sm" shape="rect" />
                                        <span>{c}</span>
                                      </span>
                                    ))}
                                  </span>
                                </span>
                                {hasPackaging && (
                                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 flex items-center gap-1.5 max-w-[180px] xs:max-w-xs">
                                    <Box className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                                    <span className="whitespace-normal break-words leading-tight text-left">{product.packaging}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 p-3 pt-0 md:p-0 md:pr-4">
                            <button
                              onClick={() => onOpenSpec(product)}
                              className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-stone-500" />
                              <span className="hidden sm:inline">Спецификация</span>
                            </button>
                            <button
                              onClick={() => onOpenQuote(product)}
                              className="px-3 py-1.5 rounded-xl bg-[#223329] text-white hover:bg-[#15221b] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Send className="w-3.5 h-3.5 text-white/80" />
                              <span>Запрос КП</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
