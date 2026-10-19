import productsJson from '@/data/products.json';

export type ProductCategory = 'juice_concentrates' | 'fruit_puree' | 'candied_snacks';

export interface CountryDetail {
  country: string;
  brix?: string;
  packaging?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryTitle: string;
  origin: string[];
  packaging: string;
  brix: string;
  description: string;
  image?: string;
  specs?: {
    color?: string;
    size?: string;
  };
  countryDetails?: CountryDetail[];
}

export interface CategoryInfo {
  id: 'all' | ProductCategory;
  title: string;
  badge: string;
  count: number;
  image: string;
  previewItems: string | string[];
}

export interface CatalogData {
  categories: CategoryInfo[];
  products: Product[];
}

export const CATALOG_DATA: CatalogData = productsJson as unknown as CatalogData;

export const PRODUCTS: Product[] = CATALOG_DATA.products;
export const CATEGORIES: CategoryInfo[] = CATALOG_DATA.categories;

export function getBrixNumericValue(str?: string): number {
  if (!str || typeof str !== 'string') return 0;
  if (str.includes('мм')) return 0;
  try {
    const matches = str.match(/\d+(\.\d+)?/g);
    if (!matches || matches.length === 0) return 0;
    const numbers = matches.map(Number);
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  } catch (error) {
    console.error('Error in getBrixNumericValue:', error, { str });
    return 0;
  }
}

export const ALL_COUNTRIES: string[] = (() => {
  const set = new Set<string>();
  PRODUCTS.forEach((p) => {
    p.origin.forEach((c) => set.add(c));
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'));
})();

export const CATEGORY_COUNTS = {
  all: PRODUCTS.length,
  juice_concentrates: PRODUCTS.filter((p) => p.category === 'juice_concentrates').length,
  fruit_puree: PRODUCTS.filter((p) => p.category === 'fruit_puree').length,
  candied_snacks: PRODUCTS.filter((p) => p.category === 'candied_snacks').length,
} as const;
