'use client';

interface CropIllustrationProps {
  cropName: string;
  category: 'juices' | 'puree';
  className?: string;
}

export default function CropIllustration({ cropName, category, className = '' }: CropIllustrationProps) {
  if (!cropName || typeof cropName !== 'string') {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.25)_0%,transparent_70%)]" />
        <span className="text-white text-sm font-bold">Unknown</span>
      </div>
    );
  }

  const name = cropName.toUpperCase().trim();

  if (name.includes('ГРАНАТ')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-rose-950 via-red-900 to-rose-900 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.25)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M52 28L46 16L58 24L60 14L62 24L74 16L68 28Z" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
          <circle cx="60" cy="66" r="38" fill="#BE123C" stroke="#881337" strokeWidth="3" />
          <path d="M42 46 C60 40, 80 50, 84 72 C88 90, 68 100, 48 96 C32 90, 28 66, 42 46 Z" fill="#9F1239" stroke="#E11D48" strokeWidth="1.5" />
          <circle cx="48" cy="58" r="4.5" fill="#FB7185" />
          <circle cx="62" cy="54" r="5" fill="#FDA4AF" />
          <circle cx="74" cy="62" r="4" fill="#FB7185" />
          <circle cx="52" cy="72" r="5" fill="#FDA4AF" />
          <circle cx="66" cy="74" r="4.5" fill="#FB7185" />
          <circle cx="58" cy="84" r="4" fill="#FDA4AF" />
          <path d="M34 52 A28 28 0 0 1 54 36" stroke="#FFE4E6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (name.includes('АПЕЛЬСИН')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,215,170,0.3)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M68 20 C85 10, 95 25, 80 35 C68 35, 62 25, 68 20 Z" fill="#15803D" stroke="#166534" strokeWidth="2" />
          <circle cx="60" cy="65" r="38" fill="#EA580C" stroke="#C2410C" strokeWidth="3" />
          <circle cx="60" cy="65" r="32" fill="#FFEDD5" />
          <circle cx="60" cy="65" r="28" fill="#F97316" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="65"
              x2={60 + 27 * Math.cos((deg * Math.PI) / 180)}
              y2={65 + 27 * Math.sin((deg * Math.PI) / 180)}
              stroke="#FFEDD5"
              strokeWidth="2.5"
            />
          ))}
          <circle cx="60" cy="65" r="4" fill="#FFEDD5" />
        </svg>
      </div>
    );
  }

  if (name.includes('АНАНАС')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,240,138,0.25)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 12 L50 38 L60 32 L70 38 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />
          <path d="M45 18 L42 42 L52 36 L45 18 Z" fill="#166534" />
          <path d="M75 18 L78 42 L68 36 L75 18 Z" fill="#166534" />
          <path d="M34 26 L38 48 L48 40 L34 26 Z" fill="#22C55E" />
          <path d="M86 26 L82 48 L72 40 L86 26 Z" fill="#22C55E" />

          <ellipse cx="60" cy="72" rx="30" ry="38" fill="#CA8A04" stroke="#854D0E" strokeWidth="3" />
          <path d="M38 52 L82 92 M34 68 L78 104 M46 42 L86 80" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 52 L38 92 M86 68 L42 104 M74 42 L34 80" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="72" r="3" fill="#FEF08A" />
          <circle cx="48" cy="62" r="2.5" fill="#FEF08A" />
          <circle cx="72" cy="62" r="2.5" fill="#FEF08A" />
          <circle cx="48" cy="82" r="2.5" fill="#FEF08A" />
          <circle cx="72" cy="82" r="2.5" fill="#FEF08A" />
        </svg>
      </div>
    );
  }

  if (name.includes('ЯБЛОКО')) {
    const isPuree = category === 'puree';
    const bgGrad = isPuree
      ? 'from-amber-600 via-yellow-600 to-amber-700'
      : 'from-emerald-800 via-green-700 to-emerald-900';
    const appleFill = isPuree ? '#EAB308' : '#22C55E';
    const appleStroke = isPuree ? '#A16207' : '#15803D';

    return (
      <div className={`w-full h-full bg-gradient-to-br ${bgGrad} flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 38 C60 25, 66 18, 70 14" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M64 22 C78 14, 86 24, 76 30 C66 30, 62 24, 64 22 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />

          <path
            d="M60 42 C40 34, 22 52, 26 76 C30 98, 48 104, 60 94 C72 104, 90 98, 94 76 C98 52, 80 34, 60 42 Z"
            fill={appleFill}
            stroke={appleStroke}
            strokeWidth="3.5"
          />
          <path d="M52 40 C56 44, 64 44, 68 40" stroke={appleStroke} strokeWidth="2.5" fill="none" />
          <path d="M38 54 A22 22 0 0 1 54 44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (name.includes('ВИНОГРАД')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-purple-950 via-indigo-900 to-violet-950 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.25)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 16 L60 32 M52 24 L68 24" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M60 22 C44 14, 38 26, 48 32 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />

          <circle cx="44" cy="40" r="11" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="60" cy="38" r="11" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="76" cy="40" r="11" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="36" cy="56" r="11" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="52" cy="54" r="11" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="68" cy="54" r="11" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="84" cy="56" r="11" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="44" cy="72" r="11" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="60" cy="70" r="11" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="76" cy="72" r="11" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="52" cy="86" r="10" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="68" cy="86" r="10" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="60" cy="98" r="9" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />

          <circle cx="50" cy="51" r="3" fill="#E9D5FF" opacity="0.8" />
          <circle cx="58" cy="67" r="3" fill="#E9D5FF" opacity="0.8" />
        </svg>
      </div>
    );
  }

  if (name.includes('ГРУША')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-lime-800 via-yellow-700 to-amber-800 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.25)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 30 C60 18, 65 14, 68 10" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M63 18 C75 12, 82 20, 73 25 C64 25, 62 20, 63 18 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />

          <path
            d="M60 32 C48 32, 42 46, 42 60 C32 70, 28 84, 38 98 C48 108, 72 108, 82 98 C92 84, 88 70, 78 60 C78 46, 72 32, 60 32 Z"
            fill="#84CC16"
            stroke="#4D7C0F"
            strokeWidth="3.5"
          />
          <path d="M46 64 C42 74, 42 88, 50 96" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (name.includes('БАНАН')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-800 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,240,138,0.35)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M42 22 C44 14, 58 14, 62 20 L58 32 C50 32, 44 30, 42 22 Z" fill="#451A03" stroke="#270F02" strokeWidth="1.5" />
          <path d="M44 20 C48 16, 56 16, 58 20" stroke="#65A30D" strokeWidth="2.5" fill="none" />

          <path
            d="M52 28 C68 44, 82 66, 76 90 C72 102, 60 106, 54 100 C48 94, 58 82, 58 68 C58 54, 48 38, 52 28 Z"
            fill="#EAB308"
            stroke="#CA8A04"
            strokeWidth="2.5"
          />

          <path
            d="M48 26 C26 40, 20 68, 38 94 C48 108, 68 106, 78 96 C86 88, 70 82, 54 74 C38 66, 36 46, 48 26 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3"
          />
          <path
            d="M48 26 C32 46, 32 72, 70 98"
            stroke="#A16207"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M45 35 C35 48, 34 62, 42 78"
            stroke="#FEF08A"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
            fill="none"
          />

          <path d="M78 96 L84 100 L80 104 Z" fill="#451A03" />
          <path d="M76 90 L80 94" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (name.includes('МАНГО')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-600 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.3)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path
            d="M60 22 C84 22, 98 42, 96 68 C94 92, 68 106, 44 98 C24 90, 22 64, 32 42 C40 26, 48 22, 60 22 Z"
            fill="#F97316"
            stroke="#C2410C"
            strokeWidth="3.5"
          />
          <path d="M60 22 C78 22, 94 36, 92 58 C90 76, 72 88, 60 88 C60 48, 60 22, 60 22 Z" fill="#EF4444" opacity="0.4" />
          <path d="M60 22 L62 14" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="56" cy="60" r="16" fill="#FDE047" stroke="#EA580C" strokeWidth="2" />
          <line x1="40" y1="60" x2="72" y2="60" stroke="#EA580C" strokeWidth="1.5" />
          <line x1="56" y1="44" x2="56" y2="76" stroke="#EA580C" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (name.includes('АБРИКОС')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,215,170,0.3)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 28 L62 18" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="65" r="36" fill="#F97316" stroke="#C2410C" strokeWidth="3.5" />
          <path d="M60 29 C52 45, 52 85, 60 101" stroke="#9A3412" strokeWidth="2.5" fill="none" />
          <circle cx="48" cy="55" r="18" fill="#EF4444" opacity="0.35" />
          <ellipse cx="68" cy="65" rx="8" ry="14" fill="#78350F" stroke="#451A03" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (name.includes('ТЫКВА')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,215,170,0.25)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 38 C58 24, 68 18, 64 12 L56 14 C58 22, 52 28, 54 38 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />

          <ellipse cx="38" cy="68" rx="22" ry="28" fill="#EA580C" stroke="#C2410C" strokeWidth="2.5" />
          <ellipse cx="82" cy="68" rx="22" ry="28" fill="#EA580C" stroke="#C2410C" strokeWidth="2.5" />
          <ellipse cx="48" cy="68" rx="20" ry="31" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
          <ellipse cx="72" cy="68" rx="20" ry="31" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
          <ellipse cx="60" cy="68" rx="18" ry="33" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  if (name.includes('ГУАВА')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-rose-900 via-pink-700 to-rose-800 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,113,133,0.3)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <circle cx="60" cy="65" r="38" fill="#65A30D" stroke="#3F6212" strokeWidth="3.5" />
          <circle cx="60" cy="65" r="32" fill="#FEF08A" />
          <circle cx="60" cy="65" r="28" fill="#F43F5E" />
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => (
            <circle
              key={deg}
              cx={60 + 16 * Math.cos((deg * Math.PI) / 180)}
              cy={65 + 16 * Math.sin((deg * Math.PI) / 180)}
              r="2.5"
              fill="#FFF1F2"
            />
          ))}
        </svg>
      </div>
    );
  }

  if (name.includes('ПЕРСИК')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-rose-600 via-orange-400 to-amber-500 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,164,175,0.3)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <path d="M60 26 L62 16" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M63 18 C78 10, 86 20, 74 26 C64 26, 62 20, 63 18 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />

          <path
            d="M60 28 C42 28, 26 44, 28 66 C30 88, 48 100, 60 98 C72 100, 90 88, 92 66 C94 44, 78 28, 60 28 Z"
            fill="#FB923C"
            stroke="#EA580C"
            strokeWidth="3.5"
          />
          <path
            d="M60 28 C48 28, 32 38, 30 58 C28 78, 44 94, 60 98 C60 62, 60 28, 60 28 Z"
            fill="#F43F5E"
            opacity="0.4"
          />
          <path d="M60 28 C54 48, 54 78, 60 98" stroke="#9F1239" strokeWidth="2.5" fill="none" />
        </svg>
      </div>
    );
  }

  if (name.includes('ЧЕРНОСЛИВ')) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-stone-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2)_0%,transparent_70%)]" />
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
          <ellipse cx="60" cy="65" rx="34" ry="26" fill="#312E81" stroke="#1E1B4B" strokeWidth="3.5" />
          <path d="M38 52 C48 58, 62 56, 78 50" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 65 C50 72, 70 70, 84 62" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 78 C54 82, 68 80, 80 74" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.25)_0%,transparent_70%)]" />
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg relative z-10" fill="none">
        <path d="M60 28 L62 18" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="60" cy="65" rx="34" ry="38" fill="#581C87" stroke="#3B0764" strokeWidth="3.5" />
        <path d="M60 28 C52 48, 52 82, 60 103" stroke="#2E1065" strokeWidth="2.5" fill="none" />
        <path d="M40 50 A24 24 0 0 1 54 38" stroke="#E9D5FF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}
