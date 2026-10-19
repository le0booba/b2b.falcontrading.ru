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

    const minDisplayTime = 500;
    const startTime = Date.now();

    const scheduleHide = () => {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, minDisplayTime - elapsed);
      fadeTimer = setTimeout(hideLoader, delay);
    };

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready
        .then(() => {
          requestAnimationFrame(scheduleHide);
        })
        .catch(() => {
          scheduleHide();
        });

      fadeTimer = setTimeout(scheduleHide, 1000);
    } else {
      scheduleHide();
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
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fafbfa] transition-opacity duration-300 ease-out select-none pointer-events-none ${fading ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <div className="flex flex-col items-center justify-center animate-fadeIn">
        <div className="relative w-32 h-22 sm:w-36 sm:h-25">
          <Image
            src="/logo.png"
            alt="Фалкон Трейдинг Груп"
            fill
            sizes="(max-width: 640px) 128px, 144px"
            className="object-contain"
            priority
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 py-0.5" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full bg-[#223329] preloader-dot-1" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#223329] preloader-dot-2" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#223329] preloader-dot-3" />
        </div>
      </div>
    </div>
  );
}

