'use client';

import { memo } from 'react';
import * as Flags3x2 from 'country-flag-icons/react/3x2';

export const COUNTRY_TO_ISO: Record<string, string> = {
  'Азербайджан': 'AZ',
  'Аргентина': 'AR',
  'Армения': 'AM',
  'Беларусь': 'BY',
  'Белоруссия': 'BY',
  'Бразилия': 'BR',
  'Вьетнам': 'VN',
  'Гватемала': 'GT',
  'Германия': 'DE',
  'Греция': 'GR',
  'Грузия': 'GE',
  'Египет': 'EG',
  'Израиль': 'IL',
  'Индия': 'IN',
  'Индонезия': 'ID',
  'Иран': 'IR',
  'Испания': 'ES',
  'Италия': 'IT',
  'Казахстан': 'KZ',
  'Киргизия': 'KG',
  'Кыргызстан': 'KG',
  'Китай': 'CN',
  'Колумбия': 'CO',
  'Коста-Рика': 'CR',
  'Мексика': 'MX',
  'Нидерланды': 'NL',
  'Перу': 'PE',
  'Польша': 'PL',
  'Россия': 'RU',
  'РФ': 'RU',
  'Сербия': 'RS',
  'США': 'US',
  'Таиланд': 'TH',
  'Тайланд': 'TH',
  'Турция': 'TR',
  'Узбекистан': 'UZ',
  'Филиппины': 'PH',
  'Франция': 'FR',
  'Чили': 'CL',
  'Эквадор': 'EC',
  'ЮАР': 'ZA',
  'Южная Африка': 'ZA',
};

interface CountryFlagProps {
  country: string;
  className?: string;
  shape?: 'circle' | 'rounded' | 'rect';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

function CountryFlagComponent({
  country,
  className = '',
  size = 'md',
}: CountryFlagProps) {
  const sizeClasses = {
    xs: 'w-4.5 h-3',
    sm: 'w-5.5 h-3.5',
    md: 'w-6.5 h-4.5',
    lg: 'w-8 h-5.5',
  }[size];

  if (!country || typeof country !== 'string') {
    return (
      <span
        className={`inline-flex items-center justify-center bg-stone-200 text-stone-600 text-[10px] font-bold rounded-[2px] ${sizeClasses} ${className}`}
        title="N/A"
      >
        NA
      </span>
    );
  }

  const trimmed = country.trim();
  const isoCode = (COUNTRY_TO_ISO[trimmed] || trimmed).toUpperCase();

  let FlagComponent: React.ComponentType<{ className?: string }> | null = null;
  try {
    const raw = (Flags3x2 as Record<string, unknown>)?.[isoCode];

    if (typeof raw === 'function') {
      FlagComponent = raw as React.ComponentType<{ className?: string }>;
    } else if (raw && typeof (raw as { default?: unknown }).default === 'function') {
      FlagComponent = (raw as { default: React.ComponentType<{ className?: string }> }).default;
    }
  } catch {
    FlagComponent = null;
  }

  if (!FlagComponent) {
    return (
      <span
        className={`inline-flex items-center justify-center bg-stone-200 text-stone-600 text-[10px] font-bold rounded-[2px] ${sizeClasses} ${className}`}
        title={country}
      >
        {isoCode.slice(0, 2)}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-[2px] overflow-hidden shrink-0 border border-stone-300/80 shadow-2xs ${sizeClasses} ${className}`}
      title={country}
    >
      <FlagComponent className="w-full h-full object-cover" />
    </span>
  );
}

const CountryFlag = memo(CountryFlagComponent);
export default CountryFlag;
