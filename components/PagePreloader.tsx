'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PagePreloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let fadeTimer: NodeJS.Timeout;
    let removeTimer: NodeJS.Timeout;

    const hideLoader = () => {
      setFading(true);
      removeTimer = setTimeout(() => {
        setVisible(false);
      }, 300);
    };

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready
        .then(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(hideLoader);
          });
        })
        .catch(() => {
          hideLoader();
        });

      fadeTimer = setTimeout(hideLoader, 400);
    } else {
      hideLoader();
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fafbfa] transition-opacity duration-300 ease-out select-none pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center animate-fadeIn">
        <div className="relative w-28 h-22 sm:w-32 sm:h-26 drop-shadow-xs">
          <Image
            src="/logo.jpg"
            alt="Фалкон Трейдинг Груп"
            fill
            sizes="128px"
            className="object-contain"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
