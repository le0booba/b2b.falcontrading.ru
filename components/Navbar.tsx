'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Phone, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'catalog' | 'contacts';
  setActiveTab: (tab: 'home' | 'catalog' | 'contacts') => void;
  onOpenQuoteModal?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleNavClick = (tab: 'home' | 'catalog' | 'contacts') => {
    if (tab === 'home' && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs relative"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-22 sm:h-24">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 text-left group focus:outline-none cursor-pointer py-1"
            >
              <div className="relative w-20 sm:w-24 h-16 sm:h-18 shrink-0 drop-shadow-xs">
                <Image
                  src="/logo.png"
                  alt="Фалкон Трейдинг Груп"
                  fill
                  sizes="96px"
                  className="object-contain"
                  priority
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-2xl sm:text-3xl tracking-widest text-[#1a261e] leading-none">
                    FTG
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2e4033] hidden sm:inline">
                    ФАЛКОН ТРЕЙДИНГ ГРУП
                  </span>
                </div>
                <span className="text-[9px] font-semibold tracking-widest text-[#5c6e61] uppercase">
                  ГРУППА КОМПАНИЙ
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center p-1.5 bg-[#f0f2ee] rounded-full border border-stone-200/80 shadow-inner">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-[#223329] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => handleNavClick('catalog')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'bg-[#223329] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                Продукция
              </button>
              <button
                onClick={() => handleNavClick('contacts')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'bg-[#223329] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                Контакты
              </button>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+74957757255"
                className="flex items-center gap-2 text-xs font-semibold text-[#223329] hover:text-[#18231c] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#f0f2ee] flex items-center justify-center text-[#223329]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+7 (495) 775-72-55</span>
              </a>
              {onOpenQuoteModal && (
                <button
                  onClick={onOpenQuoteModal}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#223329] text-white hover:bg-[#18231c] transition-all shadow-xs cursor-pointer"
                >
                  Запросить КП
                </button>
              )}
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-stone-100 text-stone-800 hover:bg-stone-200 focus:outline-none cursor-pointer"
                aria-label="Меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-stone-200/90 shadow-xl px-6 py-4 space-y-2 animate-fadeIn z-50">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#223329] text-white'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-[#223329] text-white'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Продукция
            </button>
            <button
              onClick={() => handleNavClick('contacts')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-[#223329] text-white'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Контакты
            </button>
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2 px-2">
              <a
                href="tel:+74957757255"
                className="flex items-center gap-2 text-sm font-semibold text-stone-800 py-1 hover:text-[#223329]"
              >
                <Phone className="w-4 h-4 text-[#223329]" />
                +7 (495) 775-72-55
              </a>
              <a
                href="mailto:b2b@falcontrading.ru"
                className="flex items-center gap-2 text-sm text-stone-600 py-1 hover:text-stone-900"
              >
                <Mail className="w-4 h-4 text-[#223329]" />
                b2b@falcontrading.ru
              </a>
            </div>
          </div>
        )}
      </header>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-22 sm:top-24 z-30 bg-stone-950/40 backdrop-blur-2xs md:hidden animate-fadeIn"
          aria-hidden="true"
        />
      )}
    </>
  );
}
