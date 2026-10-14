export interface SeasonalityCountry {
  name: string;
  months?: number[];
  notes?: string;
}

export interface SeasonalityItem {
  id: string;
  category: 'juices' | 'puree';
  categoryTitle: string;
  cropName: string;
  subTitle?: string;
  brixSpecs: {
    label: string;
    value: string;
    color?: string;
  }[];
  countries: SeasonalityCountry[];
  image: string;
  harvestDescription: string;
  seasonMonths: number[];
  isAllYearRound?: boolean;
}

export const SEASONALITY_ITEMS: SeasonalityItem[] = [
  {
    id: 's-juice-pomegranate',
    category: 'juices',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ СОКИ',
    cropName: 'ГРАНАТ',
    brixSpecs: [
      { label: 'BRIX', value: '65%', color: 'text-red-700' },
    ],
    countries: [
      { name: 'Азербайджан', months: [10, 11, 12] },
      { name: 'Узбекистан', months: [9, 10, 11] },
      { name: 'Иран', months: [10, 11, 12] },
    ],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Октябрь – Декабрь',
    seasonMonths: [9, 10, 11, 12],
  },
  {
    id: 's-juice-orange',
    category: 'juices',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ СОКИ',
    cropName: 'АПЕЛЬСИН',
    brixSpecs: [
      { label: 'BRIX', value: '65%', color: 'text-amber-600' },
      { label: 'Прям. Отжим', value: '10-13%', color: 'text-orange-500' },
    ],
    countries: [
      { name: 'Бразилия', months: [6, 7, 8, 9, 10, 11] },
      { name: 'Италия', months: [11, 12, 1, 2, 3, 4] },
      { name: 'Испания', months: [11, 12, 1, 2, 3, 4] },
    ],
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Бразилия: Июнь–Ноябрь; Средиземноморье: Ноябрь–Апрель',
    seasonMonths: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 's-juice-pineapple',
    category: 'juices',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ СОКИ',
    cropName: 'АНАНАС',
    brixSpecs: [
      { label: 'BRIX', value: '60%', color: 'text-amber-500' },
    ],
    countries: [
      { name: 'Таиланд', months: [3, 4, 5, 6, 10, 11, 12] },
      { name: 'Коста-Рика', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: 'Италия', months: [4, 5, 6, 7, 8] },
    ],
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Круглогодичный сбор (пиковые периоды: Весна и Осень)',
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    isAllYearRound: true,
  },
  {
    id: 's-juice-apple',
    category: 'juices',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ СОКИ',
    cropName: 'ЯБЛОКО',
    brixSpecs: [
      { label: 'BRIX', value: '70%', color: 'text-red-600' },
    ],
    countries: [
      { name: 'Узбекистан', months: [8, 9, 10, 11] },
      { name: 'Азербайджан', months: [8, 9, 10, 11] },
      { name: 'Иран', months: [8, 9, 10, 11] },
    ],
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Август – Ноябрь',
    seasonMonths: [8, 9, 10, 11],
  },
  {
    id: 's-juice-grape',
    category: 'juices',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ СОКИ',
    cropName: 'ВИНОГРАД',
    subTitle: '(красный/белый)',
    brixSpecs: [
      { label: 'BRIX', value: '65%', color: 'text-rose-900' },
    ],
    countries: [
      { name: 'Узбекистан', months: [8, 9, 10] },
      { name: 'Аргентина', months: [2, 3, 4, 5] },
      { name: 'Испания', months: [8, 9, 10] },
    ],
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Аргентина: Февраль–Май; Узбекистан и Испания: Август–Октябрь',
    seasonMonths: [2, 3, 4, 5, 8, 9, 10],
  },

  {
    id: 's-puree-apple',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'ЯБЛОКО',
    brixSpecs: [
      { label: 'BRIX', value: '30-32%', color: 'text-amber-600' },
      { label: 'BRIX', value: '36-38%', color: 'text-amber-700' },
    ],
    countries: [
      { name: 'Узбекистан', months: [8, 9, 10, 11] },
      { name: 'Армения', months: [8, 9, 10, 11] },
      { name: 'ЮАР', months: [2, 3, 4, 5] },
    ],
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'СНГ: Август–Ноябрь; ЮАР: Февраль–Май',
    seasonMonths: [2, 3, 4, 5, 8, 9, 10, 11],
  },
  {
    id: 's-puree-pear',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'ГРУША',
    brixSpecs: [
      { label: 'BRIX', value: '30-32%', color: 'text-amber-600' },
    ],
    countries: [
      { name: 'ЮАР', months: [1, 2, 3, 4] },
      { name: 'Чили', months: [1, 2, 3, 4] },
      { name: 'Греция', months: [8, 9, 10] },
    ],
    image: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'ЮАР и Чили: Январь–Апрель; Греция: Август–Октябрь',
    seasonMonths: [1, 2, 3, 4, 8, 9, 10],
  },
  {
    id: 's-puree-banana',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'БАНАН',
    brixSpecs: [
      { label: 'BRIX', value: '20-25%', color: 'text-amber-500' },
    ],
    countries: [
      { name: 'Эквадор', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: 'Индия', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: 'Коста-Рика', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    ],
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Круглогодичный сбор свежего банана в экваториальном поясе',
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    isAllYearRound: true,
  },
  {
    id: 's-puree-mango',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'МАНГО',
    brixSpecs: [
      { label: 'BRIX', value: '28-30%', color: 'text-amber-600' },
      { label: 'BRIX', value: '16%', color: 'text-amber-500' },
    ],
    countries: [
      { name: 'Индия', months: [4, 5, 6, 7] },
      { name: 'Бразилия', months: [9, 10, 11, 12] },
      { name: 'Мексика', months: [5, 6, 7, 8] },
    ],
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Индия: Апрель–Июль; Бразилия: Сентябрь–Декабрь; Мексика: Май–Август',
    seasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 's-puree-apricot',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'АБРИКОС',
    brixSpecs: [
      { label: 'BRIX', value: '30-32%', color: 'text-amber-600' },
    ],
    countries: [
      { name: 'Армения', months: [6, 7, 8] },
      { name: 'ЮАР', months: [11, 12, 1] },
      { name: 'Иран', months: [6, 7, 8] },
    ],
    image: 'https://images.unsplash.com/photo-1501746877-14782df58970?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Армения и Иран: Июнь–Август; ЮАР: Ноябрь–Январь',
    seasonMonths: [1, 6, 7, 8, 11, 12],
  },
  {
    id: 's-puree-pumpkin',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'ТЫКВА',
    brixSpecs: [
      { label: 'BRIX', value: '20-22%', color: 'text-orange-600' },
      { label: 'BRIX', value: '12-14%', color: 'text-amber-600' },
    ],
    countries: [
      { name: 'Чили', months: [3, 4, 5] },
      { name: 'Узбекистан', months: [8, 9, 10, 11] },
    ],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Чили: Март–Май; Узбекистан: Август–Ноябрь',
    seasonMonths: [3, 4, 5, 8, 9, 10, 11],
  },
  {
    id: 's-puree-guava',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'РОЗОВАЯ ГУАВА',
    brixSpecs: [
      { label: 'BRIX', value: '18-20%', color: 'text-rose-600' },
    ],
    countries: [
      { name: 'Бразилия', months: [6, 7, 8, 9, 10] },
      { name: 'Индия', months: [8, 9, 10, 11, 12] },
    ],
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Бразилия и Индия: Июнь–Декабрь',
    seasonMonths: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 's-puree-peach',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'ПЕРСИК',
    brixSpecs: [
      { label: 'BRIX', value: '30-32%', color: 'text-rose-600' },
    ],
    countries: [
      { name: 'ЮАР', months: [12, 1, 2] },
      { name: 'Греция', months: [7, 8, 9] },
      { name: 'Армения', months: [7, 8, 9] },
    ],
    image: 'https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'ЮАР: Декабрь–Февраль; Греция и Армения: Июль–Сентябрь',
    seasonMonths: [1, 2, 7, 8, 9, 12],
  },
  {
    id: 's-puree-plum',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'СЛИВА',
    brixSpecs: [
      { label: 'BRIX', value: '30-32%', color: 'text-indigo-900' },
    ],
    countries: [
      { name: 'ЮАР', months: [1, 2, 3] },
      { name: 'Чили', months: [1, 2, 3] },
      { name: 'Турция', months: [8, 9, 10] },
    ],
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'ЮАР и Чили: Январь–Март; Турция: Август–Октябрь',
    seasonMonths: [1, 2, 3, 8, 9, 10],
  },
  {
    id: 's-puree-prune',
    category: 'puree',
    categoryTitle: 'КОНЦЕНТРИРОВАННОЕ ПЮРЕ',
    cropName: 'ЧЕРНОСЛИВ',
    brixSpecs: [
      { label: 'BRIX', value: '30-32%', color: 'text-stone-900' },
    ],
    countries: [
      { name: 'Чили', months: [3, 4, 5] },
      { name: 'Сербия', months: [8, 9, 10] },
    ],
    image: 'https://images.unsplash.com/photo-1596328546171-77e37b5e8b3d?w=600&auto=format&fit=crop&q=80',
    harvestDescription: 'Чили: Март–Май; Сербия: Август–Октябрь',
    seasonMonths: [3, 4, 5, 8, 9, 10],
  },
];

export const MONTH_NAMES_SHORT = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

export function getBrixNumericValue(str: string): number {
  if (!str || typeof str !== 'string') return 30;
  try {
    const matches = str.match(/\d+(\.\d+)?/g);
    if (!matches || matches.length === 0) return 30;
    const numbers = matches.map(Number);
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    return avg;
  } catch (error) {
    console.error('Error in getBrixNumericValue:', error, { str });
    return 30;
  }
}

export function getBrixSpectrumColor(valueStr: string): string {
  const brix = getBrixNumericValue(valueStr);
  const minBrix = 5;
  const maxBrix = 70;
  const clamped = Math.max(minBrix, Math.min(maxBrix, brix));
  const t = (clamped - minBrix) / (maxBrix - minBrix);

  let hue = 46 - t * 54;
  if (hue < 0) hue = 360 + hue;

  const lightness = 44 - t * 16;
  const saturation = 92 + t * 6;

  return `hsl(${hue.toFixed(1)}, ${saturation.toFixed(1)}%, ${lightness.toFixed(1)}%)`;
}
