import type { Metadata, Viewport } from 'next';
import { Golos_Text } from 'next/font/google';
import PagePreloader from '@/components/PagePreloader';
import './globals.css';

const golos = Golos_Text({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'block',
  variable: '--font-golos',
});

const SITE_URL = 'https://falcontrading.ru';

export const viewport: Viewport = {
  themeColor: '#223329',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Фалкон Трейдинг Груп — Пищевое сырье оптом: Соки, Пюре, Цукаты | FTG',
    template: '%s | Фалкон Трейдинг Груп • FTG',
  },
  description:
    'Прямой импортер и поставщик пищевого сырья: соковые концентраты, соки прямого отжима NFC, асептические пюре и цукаты в бочках 200–250 л со склада в РФ. Быстрый расчет КП.',
  applicationName: 'Фалкон Трейдинг Груп • FTG',
  category: 'Сельскохозяйственное и пищевое сырье оптом',
  classification: 'B2B поставки сырья для пищевой, соковой, молочной и кондитерской промышленности',
  keywords: [
    'пищевое сырье оптом',
    'концентрированные соки оптом',
    'концентрированный сок в бочках',
    'сок прямого отжима NFC оптом',
    'фруктовое пюре асептическое',
    'ягодное пюре оптом',
    'овощное пюре оптом',
    'томатная паста в бочках оптом',
    'томатная паста 36-38 brix',
    'цукаты оптом',
    'фруктовые кусочки для кондитерских производств',
    'сырье для соковой промышленности',
    'сырье для кондитерских производств',
    'сырье для молочной промышленности',
    'сырье для детского питания',
    'импортер пищевого сырья РФ',
    'поставщик сырья в бочках 200 литров',
    'асептические мешки бочки 220 250 кг',
    'Brix соков и пюре',
    'Фалкон Трейдинг Груп',
    'Falcon Trading Group',
    'FTG Раменское',
    'склад пищевого сырья Раменское',
    'оптовые поставки пищевых ингредиентов',
  ],
  authors: [{ name: 'ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»', url: SITE_URL }],
  creator: 'ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»',
  publisher: 'ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Фалкон Трейдинг Груп — Пищевое сырье оптом в РФ и СНГ',
    description:
      'Прямой импорт и оптовая продажа пищевого сырья: соковые концентраты, соки прямого отжима NFC, асептические пюре, томатная паста, цукаты. Склад в Раменском, бочки 200–250 л.',
    url: SITE_URL,
    siteName: 'Фалкон Трейдинг Груп • FTG',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/back.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Фалкон Трейдинг Груп — Оптовые поставки пищевого сырья',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фалкон Трейдинг Груп — Пищевое сырье оптом | FTG',
    description:
      'Импортные поставки соковых концентратов, соков NFC, пюре и цукатов со склада в Раменском (бочки 200–250 л). Доставка по РФ и СНГ.',
    images: ['/back.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WholesaleStore',
    name: 'ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»',
    alternateName: ['FTG', 'Falcon Trading Group', 'Фалкон Трейдинг Груп'],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}/back.jpg`,
    description:
      'Прямой импортер и оптовый поставщик сырья для пищевой промышленности: концентрированные соки, соки прямого отжима NFC, фруктовые, ягодные и овощные пюре, цукаты.',
    telephone: '+74957757255',
    email: 'b2b@falcontrading.ru',
    taxID: '5040084180',
    vatID: '502901001',
    priceRange: '₽₽₽',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Искры, дом 17А, строение 3',
      addressLocality: 'Москва',
      postalCode: '129344',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.861759,
      longitude: 37.66258,
    },
    location: {
      '@type': 'Place',
      name: 'Складской комплекс Раменское',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Транспортный проезд, дом 5 А',
        addressLocality: 'Раменское',
        addressRegion: 'Московская область',
        postalCode: '140101',
        addressCountry: 'RU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 55.571408,
        longitude: 38.204648,
      },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+74957757255',
      contactType: 'sales',
      areaServed: ['RU', 'BY', 'KZ', 'AM', 'KG', 'UZ'],
      availableLanguage: ['Russian', 'English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Каталог сырья для пищевой промышленности',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Концентрированные соки и соки NFC',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Фруктовые, ягодные и овощные пюре',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Цукаты / Кусочки фруктов',
        },
      ],
    },
    sameAs: ['https://falcontrading.ru', 'https://www.складраменском.рф'],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Фалкон Трейдинг Груп',
    url: SITE_URL,
    description: 'Оптовые поставки пищевого сырья в металлических бочках 200–250 литров со склада в РФ.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Каталог пищевого сырья Фалкон Трейдинг Груп',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Концентрированные соки и соки прямого отжима NFC (яблочный, апельсиновый, виноградный, гранатовый, лимонный)',
        url: `${SITE_URL}/?category=juice_concentrates`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Фруктовые, ягодные и овощные пюре, томатная паста в асептических бочках',
        url: `${SITE_URL}/?category=fruit_puree`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Цукаты / Кусочки фруктов (ананас, папайя, манго, дыня, кокос)',
        url: `${SITE_URL}/?category=candied_snacks`,
      },
    ],
  };

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Какая минимальная партия сырья доступна для заказа?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Минимальная партия поставки пищевого сырья — от 1 металлической бочки (200–250 кг / литров) с нашего собственного склада в Раменском (Московская область). Для крупных производств осуществляем прямые контейнерные и автотранспортные поставки.',
        },
      },
      {
        '@type': 'Question',
        name: 'В какой таре поставляются концентрированные соки и фруктовые пюре?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Сырье поставляется в металлических конических и цилиндрических бочках объемом 200–250 литров с герметичными асептическими мешками-вкладышами, обеспечивающими стерильность и сохранение естественного вкуса и аромата.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие сертификаты качества предоставляются на продукцию?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'На каждую партию поставляемой продукции предоставляются декларации соответствия ЕАЭС, протоколы испытаний, паспорта качества производителей, сертификаты ISO/HACCP и полные технические спецификации.',
        },
      },
      {
        '@type': 'Question',
        name: 'В какие регионы осуществляется доставка пищевого сырья?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'География поставок охватывает все регионы Российской Федерации и страны ЕАЭС и СНГ (Беларусь, Казахстан, Армения, Кыргызстан, Узбекистан, Грузия). Доставка осуществляется ведущими транспортными компаниями либо самовывозом со склада.',
        },
      },
      {
        '@type': 'Question',
        name: 'Каковы качественные характеристики концентрированных соков (Brix)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Концентрированные соки поставляются с содержанием растворимых сухих веществ (Brix) от 65% до 70%, соки прямого отжима (NFC) — 6–15% Brix в строгом соответствии с требованиями ТР ТС 023/2011 на соковую продукцию.',
        },
      },
    ],
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Каталог продукции',
        item: `${SITE_URL}/#catalog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Контакты и склад',
        item: `${SITE_URL}/#contacts`,
      },
    ],
  };

  return (
    <html lang="ru" className={golos.variable}>
      <body
        className={`${golos.className} bg-[#fcfdfa] text-stone-900 antialiased font-sans selection:bg-[#223329] selection:text-white`}
        suppressHydrationWarning
      >
        <PagePreloader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
