'use client';

import { useMemo, memo } from 'react';
import { Calendar } from 'lucide-react';
import {
  SEASONALITY_ITEMS,
  SeasonalityItem,
  MONTH_NAMES_SHORT,
  getBrixSpectrumColor,
} from '@/data/seasonality';
import CountryFlag from './CountryFlag';
import CropIllustration from './CropIllustration';

export default function SeasonalitySection() {
  const juiceItems = useMemo(
    () => SEASONALITY_ITEMS.filter((i) => i.category === 'juices'),
    []
  );
  const pureeItems = useMemo(
    () => SEASONALITY_ITEMS.filter((i) => i.category === 'puree'),
    []
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-[#223329] text-white shadow-2xs">
            <Calendar className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-stone-900 uppercase tracking-tight">
              Сезонность сырья
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Календарь сбора урожая и периоды переработки фруктового и овощного сырья
            </p>
          </div>
        </div>
      </div>

      {juiceItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="bg-[#4d9c57] text-white py-3 px-4 lg:py-8 lg:px-3 flex items-center justify-center shrink-0 border-b lg:border-b-0 lg:border-r border-[#3e8648]">
              <span className="text-xs sm:text-sm lg:text-base font-black tracking-widest uppercase lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap drop-shadow-xs">
                КОНЦЕНТРИРОВАННЫЕ СОКИ
              </span>
            </div>

            <div className="flex-1 divide-y divide-stone-200">
              {juiceItems.map((item) => (
                <SeasonalityRowItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {pureeItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="bg-[#4d9c57] text-white py-3 px-4 lg:py-8 lg:px-3 flex items-center justify-center shrink-0 border-b lg:border-b-0 lg:border-r border-[#3e8648]">
              <span className="text-xs sm:text-sm lg:text-base font-black tracking-widest uppercase lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap drop-shadow-xs">
                КОНЦЕНТРИРОВАННОЕ ПЮРЕ
              </span>
            </div>

            <div className="flex-1 divide-y divide-stone-200">
              {pureeItems.map((item) => (
                <SeasonalityRowItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SeasonalityRowItem = memo(function SeasonalityRowItem({ item }: { item: SeasonalityItem }) {
  const groupedSpecs = useMemo(() => {
    const map = new Map<string, typeof item.brixSpecs>();
    for (const spec of item.brixSpecs) {
      if (!map.has(spec.label)) map.set(spec.label, []);
      map.get(spec.label)!.push(spec);
    }
    return Array.from(map.entries());
  }, [item]);

  return (
    <div className="flex flex-col md:flex-row items-stretch hover:bg-stone-50/50 transition-colors">
      <div className="w-full md:w-[220px] lg:w-[260px] shrink-0 h-36 sm:h-40 border-b md:border-b-0 md:border-r border-stone-200 overflow-hidden relative group">
        <CropIllustration cropName={item.cropName} category={item.category} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 pointer-events-none">
          <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-wider drop-shadow-md leading-tight font-display">
            {item.cropName}
          </h3>
          {item.subTitle && (
            <span className="text-[11px] text-stone-200 font-medium">
              {item.subTitle}
            </span>
          )}
        </div>
      </div>

      <div className="w-full md:w-36 lg:w-40 shrink-0 p-4 sm:p-5 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center border-b md:border-b-0 md:border-r border-stone-200 bg-stone-50/30">
        <div className="space-y-2.5">
          {groupedSpecs.map(([label, specs]) => (
            <div key={label} className="space-y-0.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 block">
                {label}
              </span>
              <div className="space-y-1">
                {specs.map((spec, sIdx) => {
                  const brixColor = getBrixSpectrumColor(spec.value);
                  return (
                    <span
                      key={sIdx}
                      style={{ color: brixColor }}
                      className="text-base sm:text-lg font-black leading-none block drop-shadow-2xs"
                    >
                      {spec.value}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-stone-400 uppercase font-semibold block md:hidden">
          {item.countries.length} страны
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-2">
            Страны происхождения:
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {item.countries.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <CountryFlag country={c.name} shape="rect" size="md" />
                <span className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-tight">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1.5 w-full">
            <span className="text-[11px] text-stone-600 font-bold block">
              {item.harvestDescription}
            </span>
            <div className="sm:hidden space-y-1.5 pt-1">
              <div className="grid grid-cols-6 gap-1 max-w-[88%] mr-auto">
                {MONTH_NAMES_SHORT.slice(0, 6).map((m, idx) => {
                  const monthNum = idx + 1;
                  const isActive = item.seasonMonths.includes(monthNum);
                  return (
                    <span
                      key={m}
                      title={`${m}: ${isActive ? 'Сезон сбора' : 'Вне сезона'}`}
                      className={`text-[9px] py-1 text-center rounded font-bold transition-colors ${
                        isActive
                          ? 'bg-[#223329] text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {m}
                    </span>
                  );
                })}
              </div>
              <div className="grid grid-cols-6 gap-1 max-w-[88%] ml-auto">
                {MONTH_NAMES_SHORT.slice(6, 12).map((m, idx) => {
                  const monthNum = idx + 7;
                  const isActive = item.seasonMonths.includes(monthNum);
                  return (
                    <span
                      key={m}
                      title={`${m}: ${isActive ? 'Сезон сбора' : 'Вне сезона'}`}
                      className={`text-[9px] py-1 text-center rounded font-bold transition-colors ${
                        isActive
                          ? 'bg-[#223329] text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {m}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 pt-0.5">
              {MONTH_NAMES_SHORT.map((m, idx) => {
                const monthNum = idx + 1;
                const isActive = item.seasonMonths.includes(monthNum);
                return (
                  <span
                    key={m}
                    title={`${m}: ${isActive ? 'Сезон сбора' : 'Вне сезона'}`}
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors ${
                      isActive
                        ? 'bg-[#223329] text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {m}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
