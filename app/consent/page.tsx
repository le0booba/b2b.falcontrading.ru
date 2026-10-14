import type { Metadata } from 'next';
import ConsentContent from '@/components/ConsentContent';

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных (152-ФЗ)',
  description:
    'Порядок и условия согласия на обработку персональных данных пользователей сайта ООО «ФАЛКОН ТРЕЙДИНГ ГРУП» в соответствии с 152-ФЗ.',
  alternates: {
    canonical: '/consent',
  },
};

export default function ConsentPage() {
  return (
    <div className="min-h-screen bg-[#fafbfa] py-10 sm:py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-2xl sm:text-3xl font-black text-[#15281b] tracking-tight font-display mb-8">
          Согласие на обработку персональных данных
        </h1>
        <ConsentContent />
      </div>
    </div>
  );
}
