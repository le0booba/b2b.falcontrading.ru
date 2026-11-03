'use client';

import { useState } from 'react';
import {
  MapPin,
  Map,
  ArrowUpRight,
  Warehouse,
  Building,
  Globe,
} from 'lucide-react';
import QRCode from '@/components/QRCode';
import YandexFormEmbed from '@/components/YandexFormEmbed';

interface ContactsSectionProps {}

export default function ContactsSection({}: ContactsSectionProps = {}) {
  const [activeMapTab, setActiveMapTab] = useState<'ramenskoye' | 'moscow'>('ramenskoye');

  const [activeQrId, setActiveQrId] = useState<string | null>(null);

  const handleToggleQr = (id: string) => {
    setActiveQrId((prev) => (prev === id ? null : id));
  };


  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15281b] tracking-tight font-display">
          Контакты
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-[16px] sm:text-[18px] font-bold text-stone-900 uppercase tracking-tight leading-tight font-display">
                <span className="font-medium mr-1.5">ООО</span>
                <span> «ФАЛКОН ТРЕЙДИНГ ГРУП»</span>
              </h2>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-white space-y-3.5">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="font-normal text-stone-500 text-xs tracking-normal">Телефон:</span>
                  <a
                    href="tel:+74957757255"
                    className="font-bold text-sm sm:text-base text-[#15281b] hover:text-[#223329] transition-colors"
                  >
                    +7 (495) 775–72–55
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="font-normal text-stone-500 text-xs tracking-normal">E-Mail:</span>
                  <a
                    href="mailto:b2b@falcontrading.ru"
                    className="tracking-wide font-bold text-xs sm:text-sm text-[#15281b] hover:text-[#223329] hover:underline transition-colors font-mono"
                  >
                    b2b@falcontrading.ru
                  </a>
                </div>
                <div className="flex items-center shrink-0">
                  <QRCode
                    value="mailto:b2b@falcontrading.ru"
                    size={44}
                    isBlurred={activeQrId !== 'email'}
                    onToggleBlur={() => handleToggleQr('email')}
                    bgClassName="bg-white p-1 rounded-md border border-stone-200 shrink-0"
                    align="right"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-white space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium">
                    <Globe className="w-3.5 h-3.5 text-[#15281b] shrink-0" />
                    <span>Сайт склада:</span>
                  </div>
                  <a
                    href="https://www.складвраменском.рф"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-wide font-bold text-[#15281b] hover:underline inline-flex items-center gap-0.5 text-sm sm:text-[14.5px] break-all leading-tight font-mono"
                  >
                    складвраменском.рф <ArrowUpRight className="w-3.5 h-3.5 text-[#223329] shrink-0" />
                  </a>
                </div>
                
                <div className="flex items-center shrink-0">
                  <QRCode
                    value="https://www.складвраменском.рф"
                    size={44}
                    isBlurred={activeQrId !== 'warehouse_site'}
                    onToggleBlur={() => handleToggleQr('warehouse_site')}
                    align="right"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-medium">
                    <Globe className="w-3.5 h-3.5 text-[#223329] shrink-0" />
                    <span>Другие направления:</span>
                  </div>
                  <a
                    href="https://www.falcontrading.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-wide font-bold text-stone-900 hover:text-[#223329] hover:underline inline-flex items-center gap-0.5 text-sm sm:text-[14.5px] break-all leading-tight font-mono"
                  >
                    falcontrading.ru <ArrowUpRight className="w-3.5 h-3.5 text-[#223329] shrink-0" />
                  </a>
                </div>

                <div className="flex items-center shrink-0">
                  <QRCode
                    value="https://falcontrading.ru"
                    size={44}
                    isBlurred={activeQrId !== 'main_site'}
                    onToggleBlur={() => handleToggleQr('main_site')}
                    align="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 px-1">
              <h2 className="text-base font-bold text-stone-900 uppercase font-display tracking-widest">
                Написать нам
              </h2>
            </div>

            <div className="w-full relative rounded-xl overflow-hidden min-h-[580px]">
              <YandexFormEmbed
                formId="6ac07cfceb6146ba89b065c6"
                cacheKey="ftg_contacts"
                minHeight="580px"
                itemValue=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 w-full sm:w-fit">
          <button
            onClick={() => setActiveMapTab('ramenskoye')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeMapTab === 'ramenskoye'
                ? 'bg-[#223329] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5 shrink-0" />
            <span>Склад (Раменское)</span>
          </button>
          <button
            onClick={() => setActiveMapTab('moscow')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeMapTab === 'moscow'
                ? 'bg-[#223329] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <Building className="w-3.5 h-3.5 shrink-0" />
            <span>Офис компании (Москва)</span>
          </button>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm md:text-[14px] text-stone-800">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <MapPin className="w-4 h-4 text-[#223329] shrink-0" />
              <span className="font-semibold text-stone-900 leading-normal break-words">
                {activeMapTab === 'ramenskoye'
                  ? '140101, Россия, Московская область, г. Раменское, ул. Транспортный проезд, дом 5А'
                  : '129344, Россия, г. Москва, ул. Искры, дом 17А, строение 3'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={
                  activeMapTab === 'ramenskoye'
                    ? 'https://yandex.ru/maps/?text=55.571901,38.263685'
                    : 'https://yandex.ru/maps/?text=Москва+улица+Искры+17Ас3'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-stone-50 hover:bg-stone-100/90 px-3 py-2 rounded-xl border border-stone-200/90 transition-all shadow-2xs group"
                title="Открыть адрес на Яндекс Картах"
              >
                <Map className="w-4 h-4 sm:hidden text-stone-600 group-hover:text-[#223329]" />
                <span className="hidden sm:inline text-xs font-semibold text-stone-700 group-hover:text-[#223329]">Открыть адрес на Яндекс Картах</span>
                <ArrowUpRight className="w-4 h-4 hidden sm:inline text-stone-600 group-hover:text-[#223329]" />
              </a>
              <QRCode
                value={
                  activeMapTab === 'ramenskoye'
                    ? 'https://yandex.ru/maps/?text=55.571901,38.263685'
                    : 'https://yandex.ru/maps/?text=Москва+улица+Искры+17Ас3'
                }
                size={40}
                isBlurred={activeQrId !== activeMapTab}
                onToggleBlur={() => handleToggleQr(activeMapTab)}
                bgClassName="bg-white p-1 rounded-md border border-stone-200 shrink-0"
                align="right"
              />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[260px] sm:h-[290px] rounded-2xl overflow-hidden border border-stone-300 shadow-sm bg-[#e8ece9]">
          <iframe
            key={activeMapTab}
            src={
              activeMapTab === 'ramenskoye'
                ? 'https://yandex.ru/map-widget/v1/?ll=38.263685%2C55.571901&z=16&pt=38.263685,55.571901,pm2rdm'
                : 'https://yandex.ru/map-widget/v1/?ll=37.658994%2C55.862419&z=16&pt=37.658994,55.862419,pm2rdm'
            }
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={activeMapTab === 'ramenskoye' ? 'Карта Склада в Раменском' : 'Карта Офиса в Москве'}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
