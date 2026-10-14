export default function ConsentContent() {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Федеральный закон № 152-ФЗ «О персональных данных»
        </span>
        <h4 className="text-sm sm:text-base font-extrabold text-stone-900">
          Согласие на обработку персональных данных
        </h4>
        <p className="text-[11px] text-stone-600">
          Действует в отношении пользователей сайта{' '}
          <a
            href="https://falcontrading.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#223329] font-semibold underline"
          >
            https://falcontrading.ru
          </a>{' '}
          (и всех его поддоменов и зеркал, включая{' '}
          <a
            href="https://b2b.falcontrading.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#223329] font-semibold underline"
          >
            https://b2b.falcontrading.ru
          </a>
          ).
        </p>
      </div>

      <p>
        Настоящим я, действуя своей волей и в своем интересе, при отправке формы обратной
        связи (заявки) на сайте https://falcontrading.ru / https://b2b.falcontrading.ru (далее —
        Сайт), даю свое согласие:
      </p>

      <div className="p-3.5 rounded-xl bg-[#fbfcfb] border border-stone-200/90 text-xs space-y-1">
        <p className="font-bold text-stone-900">Оператор персональных данных:</p>
        <p className="font-semibold text-stone-800">ООО «ФАЛКОН ТРЕЙДИНГ ГРУП»</p>
        <p><strong>ОГРН:</strong> 1085040003410</p>
        <p><strong>ИНН / КПП:</strong> 5040084180 / 502901001</p>
        <p><strong>Юридический адрес:</strong> 141008, Россия, Московская область, г.о. Мытищи, г. Мытищи, пр-кт Астрахова, д. 12А, офис 3, ком. 4.</p>
        <p><strong>E-mail для обращений:</strong> b2b@falcontrading.ru</p>
        <p className="pt-1 text-stone-600 italic">на обработку моих персональных данных на следующих условиях:</p>
      </div>

      <div className="space-y-4 pt-1">
        <div>
          <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
            Перечень обрабатываемых персональных данных:
          </h5>
          <ul className="list-disc pl-6 space-y-1 text-stone-600">
            <li>Фамилия, имя, отчество;</li>
            <li>Номер контактного телефона;</li>
            <li>Адрес электронной почты (e-mail);</li>
            <li>Текст обращения / сообщения (включая любые содержащиеся в нем персональные данные);</li>
            <li>Пользовательские данные (IP-адрес, данные cookie-файлов, информация о типе браузера и операционной системе, время доступа).</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
            Цели обработки персональных данных:
          </h5>
          <ul className="list-disc pl-6 space-y-1 text-stone-600">
            <li>Обработка входящего запроса (обращения/заявки), поступившего через форму на Сайте;</li>
            <li>Предоставление консультаций, информации об услугах и товарах Оператора;</li>
            <li>Осуществление обратной связи с пользователем посредством телефонного звонка или отправки электронного письма;</li>
            <li>Подготовка коммерческих предложений (при необходимости).</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
            Перечень действий с персональными данными:
          </h5>
          <p className="text-stone-600 pl-6">
            Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ лицам, обеспечивающим функционирование Сайта и обработку обращений), блокирование, удаление, уничтожение персональных данных.
          </p>
          <p className="text-stone-600 pl-6 pt-1.5">
            Обработка осуществляется с использованием средств автоматизации (автоматизированная обработка) и без их использования (смешанная обработка). Базы данных Оператора размещены на территории Российской Федерации.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0">4</span>
            Срок действия согласия:
          </h5>
          <p className="text-stone-600 pl-6">
            Настоящее согласие действует с момента отправки формы на Сайте до момента достижения целей обработки данных либо до момента его отзыва Пользователем, но не более 3 (трех) лет с даты последнего взаимодействия.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0">5</span>
            Порядок отзыва согласия:
          </h5>
          <p className="text-stone-600 pl-6">
            Согласие может быть отозвано Пользователем или его законным представителем в любой момент путем направления письменного заявления:
          </p>
          <ul className="list-disc pl-11 space-y-1 text-stone-600 pt-1">
            <li>на электронную почту: <strong>b2b@falcontrading.ru</strong>;</li>
            <li>либо заказным письмом по юридическому адресу Оператора: <strong>141008, Россия, Московская область, г.о. Мытищи, г. Мытищи, пр-кт Астрахова, д. 12А, офис 3, ком. 4.</strong></li>
          </ul>
          <p className="text-stone-600 pl-6 pt-1.5">
            Оператор прекращает обработку данных и уничтожает их в срок, не превышающий 30 (тридцати) дней с даты поступления указанного отзыва, за исключением случаев, предусмотренных законодательством РФ.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0">6</span>
            Подтверждение согласия:
          </h5>
          <p className="text-stone-600 pl-6">
            Заполнение формы обратной связи на Сайте и отправка формы является однозначным и безоговорочным подтверждением согласия Пользователя с условиями настоящего Согласия.
          </p>
        </div>
      </div>
    </div>
  );
}
