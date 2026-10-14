import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfa] text-stone-900 px-4 text-center">
      <div className="max-w-md p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xl space-y-4">
        <span className="text-4xl font-black text-[#223329]">404</span>
        <h1 className="text-xl font-bold text-stone-900">Страница не найдена</h1>
        <p className="text-sm text-stone-600">
          Запрашиваемая страница или раздел не существует либо был перемещен.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#223329] text-white text-xs font-bold hover:bg-[#15221b] transition-all shadow-sm"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
