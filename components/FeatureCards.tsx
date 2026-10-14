'use client';

import { useState } from 'react';
import { Globe, ShieldCheck, Percent, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import SupplyWorldMap from './SupplyWorldMap';

const FEATURES = [
  {
    id: 'quality',
    icon: ShieldCheck,
    title: 'Международный контроль качества',
    description:
      'Вся поставляемая продукция сертифицирована по международными стандартам качества, безопасности применения и санитарно - гигиеническим свойствам пищевых продуктов.',
  },
  {
    id: 'geography',
    icon: Globe,
    title: 'Мировая география поставок',
    description:
      'Поставщиками являются известные компании из Китая, Таиланда, Греции, Италии, Испании, Чили, Аргентины, США, Франции и ЮАР. Также мы активно сотрудничаем с производителями из Узбекистана, Казахстана и Армении.',
  },
  {
    id: 'terms',
    icon: Percent,
    title: 'Индивидуальные условия для Клиентов',
    description:
      'Применяем гибкую ценовую политику, скидки на объемы, фиксирование контрактных цен, возможность отсрочки платежа, возможность хранения товара и поставки по плану.',
  },
];

export default function FeatureCards() {
  const [mapExpanded, setMapExpanded] = useState(false);

  const toggleMap = () => {
    setMapExpanded((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          const el = document.getElementById('supply-map-container');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {FEATURES.map((item) => {
          const IconComponent = item.icon;
          const isGeographyCard = item.id === 'geography';

          return (
            <div
              key={item.id}
              className={`rounded-2xl bg-white border transition-all flex flex-col justify-between overflow-hidden ${
                isGeographyCard && mapExpanded
                  ? 'border-[#4ea060] ring-2 ring-[#4ea060]/20 shadow-md'
                  : 'border-stone-200/80 shadow-xs hover:shadow-sm'
              }`}
            >
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f3ee] flex items-center justify-center text-[#223329] shrink-0 mt-0.5">
                    <IconComponent className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#1c1917] tracking-[-0.015em] leading-[1.375] font-sans">
                      {item.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] font-normal text-[#57534e] leading-[1.625] font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {isGeographyCard && (
                <button
                  onClick={toggleMap}
                  type="button"
                  className={`w-full px-4 py-3 border-t text-xs font-bold flex items-center justify-between transition-all cursor-pointer select-none group ${
                    mapExpanded
                      ? 'bg-[#4ea060] hover:bg-[#408c52] text-white border-[#408c52] shadow-inner'
                      : 'bg-emerald-50/80 hover:bg-[#4ea060] hover:text-white text-emerald-950 border-emerald-100'
                  }`}
                  aria-expanded={mapExpanded}
                  aria-label="Карта поставок"
                >
                  <div className="flex items-center gap-2">
                    <MapPin
                      className={`w-4 h-4 transition-transform ${
                        mapExpanded ? 'text-emerald-100' : 'text-emerald-700 group-hover:text-white group-hover:scale-110'
                      }`}
                    />
                    <span className="uppercase tracking-wider font-extrabold">Карта поставок</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[11px] opacity-90">
                      {mapExpanded ? 'Свернуть карту' : 'Посмотреть карту'}
                    </span>
                    {mapExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    )}
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </section>

      {mapExpanded && (
        <div id="supply-map-container" className="pt-2 animate-slideUp scroll-mt-24 sm:scroll-mt-28">
          <SupplyWorldMap />
        </div>
      )}
    </div>
  );
}
