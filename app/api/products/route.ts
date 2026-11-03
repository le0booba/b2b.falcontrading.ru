/// 2. Где используется файл app/api/products/route.ts?
/// Внутри самого интерфейса сайта этот эндпоинт не вызывается (клиентские компоненты получают данные каталога
// напрямую импортом из data/products.ts без лишних сетевых запросов).
/// Данный файл представляет собой внешний REST API эндпоинт (GET /api/products). Он предназначен для:
/// Внешних интеграций (например, выгрузка каталога в CRM, ERP, 1С, мобильные приложения или партнерские сервисы);
/// Запросов по URL с параметрами фильтрации: ?category=..., ?id=..., ?search=....


import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES, ALL_COUNTRIES, CATEGORY_COUNTS, ProductCategory } from '@/data/products';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const id = searchParams.get('id');
  const search = searchParams.get('search')?.toLowerCase().trim();

  if (id) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  let filtered = PRODUCTS;

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === (category as ProductCategory));
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.origin.some((c) => c.toLowerCase().includes(search)) ||
        p.categoryTitle.toLowerCase().includes(search) ||
        (p.description ? p.description.toLowerCase().includes(search) : false)
    );
  }

  return NextResponse.json(
    {
      total: filtered.length,
      categories: CATEGORIES,
      counts: CATEGORY_COUNTS,
      countries: ALL_COUNTRIES,
      products: filtered,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
