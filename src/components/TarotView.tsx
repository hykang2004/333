import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  RefreshCw, 
  ArrowRight, 
  Moon, 
  Compass, 
  Check, 
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MagicElement, Language } from '../types';
import { MAGIC_ELEMENTS } from '../data/festivalData';
import { translations } from '../data/translations';

interface TarotViewProps {
  language: Language;
  onBackToHome: () => void;
  onNavigateToBooth: (boothId: string) => void;
}

// Helper function to get true cryptographic random item
function getTrulyRandomTarot(excludeId: string | null): MagicElement {
  const pool = MAGIC_ELEMENTS.filter((el) => MAGIC_ELEMENTS.length <= 1 || el.id !== excludeId);
  
  let randomIndex = 0;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    randomIndex = randomArray[0] % pool.length;
  } else {
    randomIndex = Math.floor(Math.random() * pool.length);
  }
  return pool[randomIndex];
}

export const TarotView: React.FC<TarotViewProps> = ({
  language,
  onBackToHome,
  onNavigateToBooth
}) => {
  const t = translations[language];
  const isKo = language === 'ko';

  // Draw States: 'idle' | 'drawing' | 'revealed'
  const [drawState, setDrawState] = useState<'idle' | 'drawing' | 'revealed'>('idle');
  const [selectedElement, setSelectedElement] = useState<MagicElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const lastDrawnIdRef = React.useRef<string | null>(null);

  // Trigger card draw animation with cryptographic true random
  const handleDrawCard = (cardIdx: number = 1) => {
    if (drawState === 'drawing') return;

    setActiveCardIndex(cardIdx);
    setDrawState('drawing');
    setCopied(false);

    setTimeout(() => {
      const chosen = getTrulyRandomTarot(lastDrawnIdRef.current);
      lastDrawnIdRef.current = chosen.id;
      setSelectedElement(chosen);
      setDrawState('revealed');

      try {
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#38bdf8', '#c084fc', '#f59e0b', '#e2e8f0']
        });
      } catch {
        // safe
      }
    }, 850);
  };

  // Reset to draw again
  const handleResetDraw = () => {
    setDrawState('idle');
    setSelectedElement(null);
    setActiveCardIndex(null);
  };

  // Copy fortune text
  const handleCopyFortune = () => {
    if (!selectedElement) return;
    const text = isKo
      ? `[2026 동아리밤 오늘의 타로 운세]\n✨ ${selectedElement.nameKo}\n운세: ${selectedElement.fortuneKo}\n깜냥이의 조언: "${selectedElement.catCommentKo}"\n추천 부스: ${selectedElement.boothReasonKo}`
      : `[2026 Club Night Tarot Fortune]\n✨ ${selectedElement.nameEn}\nFortune: ${selectedElement.fortuneEn}\nKkamnyangi's note: "${selectedElement.catCommentEn}"\nRecommended booth: ${selectedElement.boothReasonEn}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 relative z-10 pb-20">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-end mb-6 pb-3 border-b border-indigo-900/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
          <Moon className="w-3.5 h-3.5 fill-amber-300/80 text-amber-300" />
          <span>{isKo ? '오늘의 마법 타로' : 'Today Tarot'}</span>
        </div>
      </div>

      <div className="relative bg-[#0e1424] rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100 overflow-hidden border border-amber-400/20">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif-magic">
            {isKo ? '오늘의 타로 뽑기' : 'Draw Today’s Tarot'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-sans font-light">
            {isKo 
              ? '달빛 아래 3장의 신비한 카드 중 마음이 이끄는 카드를 선택해보세요.' 
              : 'Listen to your intuition and choose one of the 3 mystical cards below.'}
          </p>
        </div>

        {/* Center Stage: Mysterious 3-Card Tarot Spread or Revealed Card */}
        <div className="relative min-h-[250px] sm:min-h-[300px] flex flex-col items-center justify-center my-1 select-none">
          {drawState !== 'revealed' ? (
            /* 1. 3-CARD TAROT SPREAD (Interactive Choice) */
            <div className="flex flex-col items-center text-center space-y-4 py-1 w-full">
              {/* 3 Face-Down Cards */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-md px-0.5">
                {[
                  { id: 0, roman: 'I', labelKo: '첫 번째 카드', labelEn: 'Card I' },
                  { id: 1, roman: 'II', labelKo: '두 번째 카드', labelEn: 'Card II' },
                  { id: 2, roman: 'III', labelKo: '세 번째 카드', labelEn: 'Card III' }
                ].map((card) => {
                  const isThisSelected = activeCardIndex === card.id;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleDrawCard(card.id)}
                      className={`relative h-36 sm:h-52 rounded-2xl cursor-pointer group transition-all duration-300 transform ${
                        drawState === 'drawing'
                          ? isThisSelected
                            ? 'scale-105 -translate-y-2 border-amber-400 shadow-lg shadow-amber-500/30'
                            : 'scale-90 opacity-40 blur-[1px]'
                          : 'hover:scale-[1.04] hover:-translate-y-1 active:scale-95'
                      }`}
                      title={isKo ? `${card.labelKo} 선택하기` : `Choose ${card.labelEn}`}
                    >
                      {/* Celestial Card Body */}
                      <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#141b2d] to-[#0a0f1d] border border-amber-400/40 p-2 sm:p-3 shadow-xl flex flex-col items-center justify-between relative overflow-hidden group-hover:border-amber-400/80 transition-colors">
                        {/* Subtle Card Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent animate-shimmer pointer-events-none" />

                        {/* Inner Gold Foil Frame */}
                        <div className="absolute inset-1 sm:inset-1.5 rounded-xl border border-amber-400/20 pointer-events-none" />
                        
                        {/* Card Top Symbol */}
                        <div className="flex items-center justify-between w-full relative z-10 px-0.5">
                          <span className="text-[9px] sm:text-[10px] tabular-nums text-amber-300/80 tracking-wider">
                            {card.roman}
                          </span>
                          <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300/80 fill-amber-300/40" />
                        </div>

                        {/* Center Mystic Sigil */}
                        <div className="relative z-10 flex flex-col items-center justify-center space-y-1 sm:space-y-1.5 my-auto">
                          <div className={`w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner group-hover:border-amber-400/70 transition-all ${
                            drawState === 'drawing' && isThisSelected ? 'animate-bounce border-amber-400' : ''
                          }`}>
                            <Sparkles className={`w-4.5 h-4.5 sm:w-6 sm:h-6 text-amber-400 ${
                              drawState === 'drawing' ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'
                            }`} />
                          </div>
                          <span className="text-[10px] sm:text-xs font-serif-magic text-amber-200/90 tracking-wide font-semibold text-center leading-tight">
                            {isKo ? card.labelKo : card.labelEn}
                          </span>
                        </div>

                        {/* Card Bottom Hint */}
                        <div className="relative z-10 pb-0.5">
                          <span className="text-[8px] sm:text-[9px] text-slate-400 group-hover:text-amber-300 transition-colors font-sans flex items-center gap-0.5">
                            <span>{isKo ? '터치' : 'Pick'}</span>
                            <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button: Quick Shuffle & Draw */}
              <div className="pt-1.5 w-full max-w-xs">
                <button
                  onClick={() => handleDrawCard(1)}
                  disabled={drawState === 'drawing'}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  <Wand2 className={`w-4 h-4 ${drawState === 'drawing' ? 'animate-spin' : ''}`} />
                  <span>
                    {drawState === 'drawing'
                      ? (isKo ? '타로 카드 섞는 중...' : 'Shuffling Deck...')
                      : (isKo ? '랜덤 타로 카드 섞고 뽑기' : 'Shuffle & Draw Tarot')}
                  </span>
                </button>
              </div>
            </div>
          ) : selectedElement ? (
            /* 2. REVEALED ELEMENT CARD */
            <div className="w-full space-y-3 sm:space-y-4 animate-card-flip font-sans">
              <div className="bg-[#0b101e] rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 relative overflow-hidden border border-amber-400/30 shadow-xl">
                {/* Top Banner: Symbol & Name */}
                <div className="flex items-center gap-3 sm:gap-4 border-b border-white/5 pb-3 sm:pb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#141b2d] border border-amber-400/30 flex-shrink-0 flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
                    {selectedElement.symbol}
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-2xl font-bold text-white font-serif-magic">
                      {isKo ? selectedElement.nameKo : selectedElement.nameEn}
                    </h4>
                  </div>
                </div>

                {/* Fortune Text */}
                <div className="bg-[#121829] border border-white/5 rounded-xl p-3 sm:p-4 space-y-1 sm:space-y-1.5">
                  <h5 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.tarot.fortuneTitle}</span>
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    {isKo ? selectedElement.fortuneKo : selectedElement.fortuneEn}
                  </p>
                </div>

                {/* Recommended Booth Match */}
                <div className="bg-[#121829] border border-indigo-900/30 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.tarot.recommendedBoothTitle}</span>
                    </h5>
                    <span className="text-[10px] text-amber-300/90 bg-[#0a0f1d] px-2 py-0.5 rounded-md border border-white/5">
                      {isKo ? '추천 부스' : 'Recommended'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed break-keep">
                    {isKo ? selectedElement.boothReasonKo : selectedElement.boothReasonEn}
                  </p>
                  <button
                    onClick={() => onNavigateToBooth(selectedElement.recommendedBoothId)}
                    className="w-full py-2.5 px-3 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1 break-keep text-center"
                  >
                    <span className="break-keep leading-snug">
                      {isKo ? (
                        <>
                          <span className="inline-block">추천 부스 바로가기</span>{' '}
                          <span className="inline-block text-[11px] sm:text-xs text-amber-300/80 font-normal">
                            (부스 화면으로 이동)
                          </span>
                        </>
                      ) : (
                        'Go to Recommended Booth'
                      )}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  </button>
                </div>

                {/* Mascot Advice */}
                <div className="flex items-center gap-3 text-xs bg-[#0a0f1d] p-3 sm:p-3.5 rounded-xl border border-white/5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-amber-400/30 flex-shrink-0 bg-slate-900">
                    <img
                      src="/1313/1313.png"
                      alt="깜냥이"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('131.png')) {
                          target.src = '/131.png';
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-amber-400/90 font-medium block">
                      {isKo ? '깜냥이의 한마디' : "Kkamnyangi's Note"}
                    </span>
                    <p className="text-slate-300 font-light leading-snug mt-0.5">
                      "{isKo ? selectedElement.catCommentKo : selectedElement.catCommentEn}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Actions */}
        {drawState === 'revealed' && (
          <div className="flex items-center gap-3 pt-5 mt-3 border-t border-white/5 font-sans relative z-10">
            <button
              onClick={handleResetDraw}
              className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isKo ? '다시 뽑기' : 'Draw Again'}</span>
            </button>

            <button
              onClick={handleCopyFortune}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
              title={isKo ? '결과 복사' : 'Copy result'}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? (isKo ? '복사됨' : 'Copied') : (isKo ? '결과 복사' : 'Copy')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
