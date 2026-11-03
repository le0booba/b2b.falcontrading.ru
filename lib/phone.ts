/// Файл lib/phone.ts в текущей версии приложения не используется и нигде не импортируется.
/// Что содержит этот файл:
/// В нём находятся вспомогательные функции для валидации и маски ввода российских номеров телефонов:
/// cleanPhoneDigits(raw) — очистка строки от нечисловых символов;
/// isRussianPhoneValid(phone) — валидация номера (10 или 11 цифр, начинающихся с 7, 8 или 9);
/// formatDigits(digits) / handlePhoneInput(...) — автоформатирование номера в формат +7 (XXX) XXX-XX-XX при вводе пользователем.
/// Почему он не используется:
/// Изначально он создавался для кастомных форм обратной связи и модальных окон ввода контактов.
/// Впоследствии все формы сбора заявок (в модальном окне «Расчет стоимости и условий поставки» и в блоке контактов) были переведены на встроенные
// Яндекс Формы (YandexFormEmbed.tsx), где маска ввода и валидация телефона выполняются на стороне самого виджета Яндекс Форм.
/// Файл является вспомогательной утилитой (неиспользуемым кодом). Его можно оставить про запас (если в будущем потребуются собственные
// кастомные поля ввода) или при желании удалить без какого-либо влияния на работу сайта.


export function cleanPhoneDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function isRussianPhoneValid(phone: string): boolean {
  if (!phone || !phone.trim()) return false;
  const digits = cleanPhoneDigits(phone);
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return true;
  }
  if (digits.length === 10 && digits[0] === '9') {
    return true;
  }
  return false;
}

export function formatDigits(digits: string): string {
  if (!digits) return '';

  let normalized = digits;
  if (normalized[0] === '8' || normalized[0] === '7') {
    normalized = '7' + normalized.slice(1);
  } else if (normalized[0] === '9') {
    normalized = '7' + normalized;
  } else {
    normalized = '7' + normalized;
  }

  normalized = normalized.substring(0, 11);

  if (normalized.length <= 1) {
    return '+7';
  }

  let result = '+7 (';

  if (normalized.length > 1) {
    result += normalized.substring(1, Math.min(4, normalized.length));
  }

  if (normalized.length >= 4) {
    result += `) ${normalized.substring(4, Math.min(7, normalized.length))}`;
  }

  if (normalized.length >= 7) {
    result += `-${normalized.substring(7, Math.min(9, normalized.length))}`;
  }

  if (normalized.length >= 9) {
    result += `-${normalized.substring(9, Math.min(11, normalized.length))}`;
  }

  return result;
}

export function handlePhoneInput(
  inputValue: string,
  previousValue: string = ''
): string {
  if (!inputValue || !inputValue.trim()) return '';

  const prevDigits = cleanPhoneDigits(previousValue);
  const currDigits = cleanPhoneDigits(inputValue);

  if (previousValue.length > inputValue.length) {
    if (currDigits.length <= 1) {
      return '';
    }

    if (currDigits.length === prevDigits.length) {
      const trimmedDigits = currDigits.slice(0, -1);
      if (trimmedDigits.length <= 1) {
        return '';
      }
      return formatDigits(trimmedDigits);
    }

    return formatDigits(currDigits);
  }

  if (currDigits.length === 0) return '';
  return formatDigits(currDigits);
}
