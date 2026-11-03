'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

interface YandexFormEmbedProps {
  formId?: string;
  className?: string;
  minHeight?: string;
  itemValue?: string;
  msgValue?: string;
  telValue?: string;
  mailValue?: string;
  prefillValue?: string;
  cacheKey?: string;
}

export default function YandexFormEmbed({
  formId = '6ac07cfceb6146ba89b065c6',
  className = '',
  minHeight,
  itemValue,
  msgValue,
  telValue,
  mailValue,
  prefillValue = '',
  cacheKey,
}: YandexFormEmbedProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const loadScript = () => {
      const scriptId = 'ya-forms-embed-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://forms.yandex.ru/_static/embed.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(loadScript, { timeout: 2000 });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(idleId);
        }
      };
    } else {
      const scriptTimer = setTimeout(loadScript, 500);
      return () => {
        clearTimeout(scriptTimer);
      };
    }
  }, []);

  const [instanceId] = useState(() => Date.now().toString(36) + Math.random().toString(36).slice(2, 6));

  const baseKey = (cacheKey || 'ftg_feedback').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
  const safeKey = `${baseKey}_${instanceId}`;

  const buildIframeUrl = () => {
    const baseUrl = `https://forms.yandex.ru/u/${formId}/?iframe=1&form:cache_key=${safeKey}`;

    const params: string[] = [];

    if (telValue && typeof telValue === 'string' && telValue.trim().length > 0) {
      params.push(`tel=${encodeURIComponent(telValue.trim())}`);
    } else {
      params.push('tel=');
    }

    if (mailValue && typeof mailValue === 'string' && mailValue.trim().length > 0) {
      params.push(`mail=${encodeURIComponent(mailValue.trim())}`);
    } else {
      params.push('mail=');
    }

    const effectiveItem = (itemValue !== undefined ? itemValue : prefillValue || '').trim();
    if (effectiveItem.length > 0) {
      params.push(`item=${encodeURIComponent(effectiveItem)}`);
    } else {
      params.push('item=');
    }

    if (msgValue && typeof msgValue === 'string' && msgValue.trim().length > 0) {
      params.push(`msg=${encodeURIComponent(msgValue.trim())}`);
    } else {
      params.push('msg=');
    }

    params.push('chkbox=');

    return `${baseUrl}&${params.join('&')}`;
  };

  if (!mounted) {
    return (
      <div
        className={`w-full flex justify-center items-center bg-stone-50 rounded-xl animate-pulse ${className}`}
        style={minHeight ? { minHeight } : { minHeight: '520px' }}
      >
        <span className="text-xs text-stone-400 font-medium">Загрузка формы...</span>
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center items-center overflow-hidden ${className}`}>
      <iframe
        key={safeKey}
        src={buildIframeUrl()}
        frameBorder="0"
        name={`ya-form-${formId}`}
        width="650"
        className="w-full max-w-[650px] rounded-xl border-0 min-h-[440px] sm:min-h-[560px]"
        style={minHeight ? { minHeight } : undefined}
        title="ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»"
      />
    </div>
  );
}
