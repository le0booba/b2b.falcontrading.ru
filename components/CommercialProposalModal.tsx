'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Product } from '@/data/products';
import YandexFormEmbed from '@/components/YandexFormEmbed';

interface CommercialProposalModalProps {
  initialProduct?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  sessionId?: number;
}

export function getProductFullSpecString(product: Product): string {
  const parts: string[] = [];

  if (product.brix && typeof product.brix === 'string' && product.brix.trim() && product.brix !== '—') {
    if (product.category === 'candied_snacks') {
      parts.push(`размер: ${product.brix.trim()}`);
    } else {
      parts.push(`Brix: ${product.brix.trim()}`);
    }
  }

  if (product.origin && product.origin.length > 0) {
    parts.push(`происхождение: ${product.origin.join(', ')}`);
  }

  if (
    product.packaging &&
    typeof product.packaging === 'string' &&
    product.packaging.trim() &&
    product.packaging !== '—' &&
    product.packaging !== 'не указана'
  ) {
    parts.push(`упаковка: ${product.packaging.trim()}`);
  }

  if (parts.length > 0) {
    return `${product.name} (${parts.join(', ')})`;
  }
  return product.name;
}

export default function CommercialProposalModal({
  initialProduct,
  isOpen,
  onClose,
  sessionId = 0,
}: CommercialProposalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/40 backdrop-blur-[2px] overflow-y-auto animate-subtleFade cursor-pointer"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="relative w-full max-w-xl md:max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-xl border border-stone-200/90 overflow-hidden my-auto sm:my-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-3.5 sm:p-5 md:p-6 border-b border-stone-200 bg-[#fbfcfb]">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest uppercase px-1.5 sm:px-2 py-0.5 rounded bg-[#223329] text-white">
                Запрос коммерческого предложения
              </span>
            </div>
            <h3 id="quote-modal-title" className="text-[15px] sm:text-lg md:text-xl font-bold sm:font-black text-stone-900 leading-tight sm:leading-snug font-display">
              Расчет стоимости и условий поставки
            </h3>
            {initialProduct && (
              <p className="text-[11px] sm:text-xs text-emerald-800 font-semibold mt-0.5 sm:mt-1">
                Выбранная позиция: {initialProduct.name}
                {initialProduct.brix && initialProduct.brix.trim()
                  ? ` (${initialProduct.brix.trim()})`
                  : ''}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-2 sm:p-4 md:p-5 max-h-[76vh] sm:max-h-[82vh] overflow-y-auto">
          <div className="w-full relative rounded-xl overflow-hidden min-h-[500px]">
            <YandexFormEmbed
              key={`quote_${sessionId}_${initialProduct?.id || 'none'}`}
              cacheKey={`ftg_${sessionId}_${initialProduct?.id || 'general'}`}
              formId="6ac07cfceb6146ba89b065c6"
              itemValue={initialProduct ? getProductFullSpecString(initialProduct) : ''}
            />
          </div>
        </div>

        <div className="flex items-center justify-end py-2 px-3 sm:py-3.5 sm:px-6 bg-stone-50 border-t border-stone-200">
          <button
            onClick={onClose}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg border border-stone-300/80 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors shadow-2xs cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
