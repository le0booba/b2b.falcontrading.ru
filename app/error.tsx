'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfa] text-stone-900 px-4 text-center">
      <div className="max-w-md p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xl space-y-4">
        <span className="text-4xl font-black text-rose-700">500</span>
        <h1 className="text-xl font-bold text-stone-900">Произошла ошибка</h1>
        <p className="text-sm text-stone-600">
          При загрузке страницы возникла непредвиденная ошибка. Попробуйте обновить страницу.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-[#223329] text-white text-xs font-bold hover:bg-[#15221b] transition-all shadow-sm cursor-pointer"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 transition-all border border-stone-200"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
