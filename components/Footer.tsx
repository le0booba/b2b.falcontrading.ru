'use client';

import Image from 'next/image';

interface FooterProps {}

export default function Footer({}: FooterProps) {
  return (
    <footer className="bg-[#151e18] text-stone-300 pt-10 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="pb-8 border-b border-stone-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="relative w-22 sm:w-26 h-16 sm:h-18 bg-white p-1.5 rounded-xl shrink-0 shadow-xs">
              <Image
                src="/logo.jpg"
                alt="Фалкон Трейдинг Груп"
                fill
                sizes="104px"
                className="object-contain p-0.5"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tight">
                ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»
              </h3>
              <p className="text-[11px] text-stone-400 font-bold tracking-wider uppercase mt-0.5">
                ГРУППА КОМПАНИЙ F.T.G.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 space-y-1 font-mono md:text-right shrink-0">
            <p>ИНН: 5040084180 • КПП: 502901001</p>
            <p>ОГРН: 1085040003410</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 ООО «ФАЛКОН ТРЕЙДИНГ ГРУП». Все права защищены.</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="/consent"
              className="hover:text-stone-300 underline transition-colors cursor-pointer"
            >
              Согласие на обработку данных (152-ФЗ)
            </a>
            <a
              href="/privacy"
              className="hover:text-stone-300 underline transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
