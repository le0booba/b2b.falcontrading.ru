'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, FileText, Globe } from 'lucide-react';
import { Product } from '@/data/products';
import CountryFlag from './CountryFlag';

interface ProductSpecModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
}

function renderBrixLines(value?: string) {
  if (!value || typeof value !== 'string' || value.trim() === '' || value === '—' || value.trim() === 'не указан' || value.trim() === 'не указана') return '—';

  const parts = value
    .split(/[,;]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return value;
  }

  return (
    <div className="flex flex-col gap-0.5 whitespace-nowrap">
      {parts.map((part, idx) => (
        <span key={idx} className="block leading-tight">
          {part}
        </span>
      ))}
    </div>
  );
}

function formatSpecValue(val?: string) {
  if (!val || typeof val !== 'string' || val.trim() === '' || val.trim() === 'не указан' || val.trim() === 'не указана' || val === '—') return '—';
  return val.trim();
}

export default function ProductSpecModal({
  product,
  onClose,
  onRequestQuote,
}: ProductSpecModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const countriesData =
    product.countryDetails && product.countryDetails.length > 0
      ? product.countryDetails
      : product.origin.map((c) => ({
          country: c,
          brix: product.brix || '—',
          packaging: product.packaging || '—',
        }));

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-[2px] overflow-y-auto animate-subtleFade cursor-pointer"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="spec-modal-title"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200/90 overflow-hidden my-6 max-h-[90vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-start justify-between p-4 sm:p-6 border-b border-stone-200 bg-[#fbfcfb] pr-12 sm:pr-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {product.image && (
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-none overflow-hidden bg-stone-100 shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 80px, 112px"
                  className="object-cover rounded-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  priority
                  decoding="async"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#223329] text-white shrink-0">
                  Техническая спецификация
                </span>
                <span className="text-xs text-stone-600 font-medium truncate max-w-full">
                  {product.categoryTitle}
                </span>
              </div>
              <h3 id="spec-modal-title" className="text-xl sm:text-2xl font-medium text-stone-900 leading-snug tracking-wide break-words">
                {product.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть окно"
            className="absolute top-3.5 right-3.5 sm:static sm:top-auto sm:right-auto p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 bg-stone-100/70 sm:bg-transparent transition-colors cursor-pointer shrink-0 z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-stone-800 text-xs sm:text-sm">
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#223329]" />
              Доступные страны и характеристики поставок
            </h4>
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f6f8f5] border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Страна происхождения</th>
                    <th className="py-2.5 px-3">
                      {product.category === 'candied_snacks' ? 'Размер' : 'BRIX'}
                    </th>
                    <th className="py-2.5 px-3">Упаковка</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {countriesData.map((cd, idx) => (
                    <tr key={`${cd.country}-${idx}`} className="hover:bg-stone-50/60 transition-colors align-top">
                      <td className="py-3 px-3 font-semibold text-stone-900">
                        <span className="inline-flex items-center gap-1.5">
                          <CountryFlag country={cd.country} size="sm" shape="rect" />
                          <span>{cd.country}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#223329] font-bold">
                        {renderBrixLines(cd.brix || product.brix)}
                      </td>
                      <td className="py-3 px-3 text-stone-600">
                        {formatSpecValue(cd.packaging || product.packaging)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#223329]" />
              Описание продукта
            </h4>
            <div className="bg-[#fbfcfb] p-4 rounded-xl border border-stone-200/80 text-xs sm:text-sm min-h-[56px] flex items-center text-stone-800 font-medium">
              {formatSpecValue(product.description)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end p-4 sm:px-6 bg-stone-50 border-t border-stone-200 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg text-stone-600 hover:bg-stone-200/70 transition-colors cursor-pointer"
          >
            Закрыть
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestQuote(product);
            }}
            className="px-5 py-2.5 text-xs font-bold rounded-lg bg-[#223329] text-white hover:bg-[#15221b] transition-all shadow-xs cursor-pointer"
          >
            Заказать КП
          </button>
        </div>
      </div>
    </div>
  );
}
