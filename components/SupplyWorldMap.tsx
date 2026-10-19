'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function SupplyWorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const posRef = useRef({ startX: 0, startY: 0, isDown: false });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !containerRef.current) return;
    posRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      isDown: true,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const centerMap = () => {
      if (containerRef.current) {
        const el = containerRef.current;
        if (el.scrollWidth > el.clientWidth) {
          el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        }
      }
    };

    centerMap();
    const timer = setTimeout(centerMap, 100);

    const handleMouseMove = (e: MouseEvent) => {
      if (!posRef.current.isDown || !containerRef.current) return;
      const dx = e.clientX - posRef.current.startX;
      const dy = e.clientY - posRef.current.startY;

      if (dx !== 0) {
        containerRef.current.scrollLeft -= dx;
      }

      if (dy !== 0) {
        window.scrollBy({ top: -dy, behavior: 'instant' });
      }

      posRef.current.startX = e.clientX;
      posRef.current.startY = e.clientY;
    };

    const handleMouseUp = () => {
      if (posRef.current.isDown) {
        posRef.current.isDown = false;
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-4 sm:p-6 transition-all animate-fadeIn">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className={`w-full overflow-x-auto scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent rounded-2xl border border-stone-200/80 shadow-xs select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <div className="relative aspect-[1.9/1] min-w-[700px] md:min-w-0 w-[180%] md:w-full min-h-[340px] sm:min-h-[460px] bg-white">
          <Image
            src="/map.jpg"
            alt="Карта географии поставок Фалкон Трейдинг Груп"
            fill
            className="object-contain p-2 sm:p-4 select-none pointer-events-none"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 1200px, 100vw"
            referrerPolicy="no-referrer"
            draggable={false}
          />
        </div>
      </div>

      <p className="text-center text-[10px] sm:text-[11px] text-stone-400 font-medium mt-2.5">
        ← Листайте карту влево-вправо, листайте вверх-вниз для прокрутки страницы →
      </p>
    </div>
  );
}
