'use client';

import { useEffect, useState } from 'react';

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
  const [mounted, setMounted] = useState(false);
  const [sessionKey, setSessionKey] = useState('');

  useEffect(() => {
    const randomSuffix = `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;

    const timer = setTimeout(() => {
      setSessionKey(`s_${randomSuffix}`);
      setMounted(true);
    }, 0);

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
        clearTimeout(timer);
        if ('cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(idleId);
        }
      };
    } else {
      const scriptTimer = setTimeout(loadScript, 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(scriptTimer);
      };
    }
  }, []);

  const buildIframeUrl = () => {
    const activeKey = cacheKey || sessionKey || 'fresh_session';
    const baseUrl = `https://forms.yandex.ru/u/${formId}/?iframe=1&form:cache_key=${activeKey}`;

    const params: string[] = [];

    const effectiveItem = (itemValue !== undefined ? itemValue : prefillValue || '').trim();
    if (effectiveItem.length > 0) {
      params.push(`item=${encodeURIComponent(effectiveItem)}`);
      params.push(`vopros=${encodeURIComponent(effectiveItem)}`);
      params.push(`question=${encodeURIComponent(effectiveItem)}`);
    } else {
      params.push('item=');
    }

    if (msgValue && typeof msgValue === 'string' && msgValue.trim().length > 0) {
      params.push(`msg=${encodeURIComponent(msgValue.trim())}`);
    } else {
      params.push('msg=');
    }

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

    return `${baseUrl}&${params.join('&')}`;
  };

  return (
    <div className={`w-full flex justify-center items-center overflow-hidden ${className}`}>
      <iframe
        key={cacheKey || (mounted ? sessionKey : 'ssr')}
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
