'use client';

import Image from 'next/image';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onGoToCatalog: () => void;
  onOpenQuoteModal: () => void;
}

export default function HeroSection({ onGoToCatalog, onOpenQuoteModal }: HeroSectionProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm min-h-[540px] md:min-h-[580px] flex items-center">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/back.jpg"
            alt="Фалкон Трейдинг Груп — Сельскохозяйственное сырье"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/78 sm:bg-white/82 md:bg-transparent md:bg-gradient-to-r md:from-white/98 md:via-white/92 md:to-white/10 md:w-4/5" />
        </div>

        <div className="relative z-10 p-5 sm:p-8 md:p-14 max-w-2xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#243528] uppercase bg-white/60 px-2 py-0.5 rounded backdrop-blur-xs">
              ◊ ГРУППА КОМПАНИЙ
            </span>
          </div>

          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-black text-[#15281b] tracking-tight mb-4 sm:mb-5 uppercase font-display leading-[1.15]">
            ФАЛКОН<br />
            ТРЕЙДИНГ ГРУП
          </h1>

          <div className="space-y-3 sm:space-y-3.5 text-[13.5px] sm:text-[14px] md:text-[15px] text-stone-900 leading-relaxed font-normal">
            <p>
              — это динамично развивающаяся Компания на рынке России и стран СНГ. Компания работает более 30 лет и является надежным партнером. Основной деятельностью Компании является торговля концентрированными соками, фруктовыми, овощными пюре и ингредиентами для кондитерской промышленности. Поставщики расположены в Америке, Европе, Азии и Африке. Наши партнеры - известные производители с большим опытом в производстве  сырья для соковой и кондитерской промышленности, а также сырья для Детского Питания. География наших поставок охватывает рынки СНГ, включая Россию, Беларусь, Армению, Казахстан, Киргизию, Узбекистан и Грузию.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-5 sm:pt-6">
            <button
              onClick={onGoToCatalog}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#223329] text-white text-sm font-semibold hover:bg-[#15221b] transition-all shadow-md group cursor-pointer"
            >
              <span>Ознакомиться с продукцией</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/95 hover:bg-white text-stone-900 border border-stone-300 text-sm font-semibold transition-all shadow-xs group cursor-pointer"
            >
              <span>Запросить расчет цен</span>
              <ArrowUpRight className="w-4 h-4 text-stone-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
