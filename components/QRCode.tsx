'use client';

import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode } from 'lucide-react';

interface QRCodeProps {
  value: string;
  size?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  bgClassName?: string;
  fgColor?: string;
  bgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  isBlurred?: boolean;
  onToggleBlur?: () => void;
  align?: 'center' | 'left' | 'right';
}

export default function QRCode({
  value,
  size = 44,
  title,
  subtitle,
  className = '',
  bgClassName = 'bg-white p-1 rounded-lg border border-stone-200/90 shadow-2xs',
  fgColor = '#152018',
  bgColor = '#ffffff',
  level = 'M',
  includeMargin = false,
  isBlurred = true,
  onToggleBlur,
  align = 'center',
}: QRCodeProps) {
  useEffect(() => {
    if (!isBlurred && onToggleBlur) {
      const timer = setTimeout(() => {
        onToggleBlur();
      }, 30000);

      const handleOutsideClick = () => {
        onToggleBlur();
      };

      const listenerTimeout = setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 50);

      return () => {
        clearTimeout(timer);
        clearTimeout(listenerTimeout);
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [isBlurred, onToggleBlur]);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0 select-none" style={{ width: size, height: size }}>
        {isBlurred ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleBlur) onToggleBlur();
            }}
            style={{ width: size, height: size }}
            className="flex flex-col items-center justify-center rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 text-stone-500 hover:text-[#223329] transition-all cursor-pointer shadow-2xs group w-full h-full"
            title="Открыть QR-код"
          >
            <QrCode className="w-5 h-5 text-stone-400 group-hover:text-[#223329] transition-colors" />
            <span className="text-[8px] font-bold text-stone-400 group-hover:text-stone-600 mt-0.5 tracking-tight uppercase">QR</span>
          </button>
        ) : (
          <div
            onClick={(e) => {
              if (onToggleBlur) {
                e.stopPropagation();
                onToggleBlur();
              }
            }}
            style={{ width: size, height: size }}
            className={
              align === 'right'
                ? 'absolute top-0 right-0 flex items-center justify-end z-50 cursor-zoom-out'
                : align === 'left'
                ? 'absolute top-0 left-0 flex items-center justify-start z-50 cursor-zoom-out'
                : 'absolute top-0 left-0 flex items-center justify-center z-50 cursor-zoom-out'
            }
          >
            <div
              className={`transform scale-220 sm:scale-240 transition-transform duration-300 shadow-2xl ring-4 ring-white/95 rounded-lg ${bgClassName} ${
                align === 'right' ? 'origin-right' : align === 'left' ? 'origin-left' : 'origin-center'
              }`}
            >
              <QRCodeSVG
                value={value}
                size={size}
                level={level}
                fgColor={fgColor}
                bgColor={bgColor}
                includeMargin={includeMargin}
                className="block"
              />
            </div>
          </div>
        )}
      </div>

      {(title || subtitle) && (
        <div className="min-w-0 flex flex-col justify-center text-left leading-tight">
          {title && (
            <span className="font-bold text-xs truncate text-stone-900">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-[10px] text-stone-500 truncate mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
