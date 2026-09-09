import React, { useState, useRef } from 'react';
import { Sparkles, Heart, Wand2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface MascotProps {
  language: Language;
  onOpenTarot: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  drift: number;
  rot: number;
  size: number;
  color: string;
}

const HEART_COLORS = ['#f472b6', '#fb7185', '#f43f5e', '#fbbf24', '#c084fc', '#38bdf8'];

const CAT_TIPS_KO = [
  '개화 부스에서 마지 페이스페인팅도 받아요!',
  '2026 마법학교 동아리밤에 오신 것을 환영합니다! 🐾',
  '18:20 개회사를 시작으로 10팀의 멋진 무대가 펼쳐집니다 ✨',
  '오늘 나에게 어울리는 행운의 타로 카드를 뽑아보세요 🔮',
  '23:10에 경품 추첨이 진행됩니다 🎁',
  '낮에는 중앙 잔디밭 체험 부스, 밤에는 맛있는 야식 부스를 즐겨보세요 🍢'
];

const CAT_TIPS_EN = [
  'Get a Maji face painting at the Gaehwa booth!',
  'Welcome to the 2026 Magic Academy Club Night! 🐾',
  '10 live performances kick off at 18:20 on the main stage ✨',
  'Draw your lucky tarot card and tailored booth recommendation 🔮',
  'Lucky draw takes place at 23:10 🎁',
  'Enjoy interactive daytime booths and tasty midnight snack stalls 🍢'
];

export const MascotKkamnyangi: React.FC<MascotProps> = ({ language, onOpenTarot }) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [isWandSwinging, setIsWandSwinging] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const heartCounterRef = useRef(0);

  const isKo = language === 'ko';
  const tips = isKo ? CAT_TIPS_KO : CAT_TIPS_EN;

  const handleNextTip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTipIndex((prev) => (prev + 1) % tips.length);
    setIsBubbleOpen(true);
  };

  const spawnSingleHeart = () => {
    heartCounterRef.current += 1;
    const heartId = heartCounterRef.current;
    
    // Spread horizontally across mascot avatar
    const startX = (Math.random() - 0.5) * 44; // -22px ~ +22px
    const drift = (Math.random() - 0.5) * 36;  // -18px ~ +18px
    const rot = (Math.random() - 0.5) * 40;    // -20deg ~ +20deg
    const size = Math.floor(Math.random() * 8) + 14; // 14px ~ 22px
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

    const heart: FloatingHeart = {
      id: heartId,
      x: startX,
      drift,
      rot,
      size,
      color
    };

    setHearts((prev) => [...prev.slice(-10), heart]);

    // Auto cleanup after animation ends (1000ms)
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 1000);
  };

  const handleCatClick = () => {
    setIsWandSwinging(true);
    setTipIndex((prev) => (prev + 1) % tips.length);
    setIsBubbleOpen(true);

    // Spawn 1 to 2 hearts with slight staggering
    spawnSingleHeart();
    setTimeout(() => {
      spawnSingleHeart();
    }, 120);

    try {
      confetti({
        particleCount: 16,
        spread: 40,
        origin: { x: 0.9, y: 0.88 },
        colors: ['#fbbf24', '#38bdf8', '#c084fc']
      });
    } catch {
      // safe
    }

    setTimeout(() => {
      setIsWandSwinging(false);
    }, 500);
  };

  return (
    <div id="mascot-kkamnyangi-container" className="fixed bottom-9 sm:bottom-10 md:bottom-10 right-4 sm:right-6 md:right-8 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Speech Bubble */}
      {isBubbleOpen && (
        <div className="mb-2.5 max-w-[260px] md:max-w-xs bg-[#0e1424] border border-amber-400/25 rounded-2xl p-3.5 shadow-xl text-slate-100 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setIsBubbleOpen(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-1.5 font-semibold text-amber-300 text-xs mb-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{isKo ? '마스코트 마지' : 'Mascot Maji'}</span>
          </div>

          <p className="text-slate-200 leading-relaxed font-light cursor-pointer text-xs pr-4" onClick={handleNextTip}>
            {tips[tipIndex]}
          </p>

          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
            <button
              onClick={handleNextTip}
              className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {isKo ? '다음 팁' : 'Next tip'}
            </button>
            <button
              onClick={onOpenTarot}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>{isKo ? '타로 뽑기' : 'Draw Tarot'}</span>
            </button>
          </div>

          {/* Tail */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0e1424] border-r border-b border-amber-400/25 rotate-45" />
        </div>
      )}

      {/* Floating Hearts Container */}
      <div className="relative w-14 flex justify-center pointer-events-none">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute -top-3 animate-float-heart pointer-events-none drop-shadow-md"
            style={{
              ['--heart-x' as string]: `${h.x}px`,
              ['--heart-drift' as string]: `${h.drift}px`,
              ['--heart-rot' as string]: `${h.rot}deg`,
              color: h.color
            }}
          >
            <Heart
              style={{ width: `${h.size}px`, height: `${h.size}px`, fill: h.color }}
            />
          </span>
        ))}
      </div>

      {/* Interactive Mascot Avatar Button */}
      <button
        onClick={handleCatClick}
        className="relative group bg-[#0e1424] p-1.5 rounded-full border border-amber-400/30 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer mt-1"
        title={isKo ? '마지 쓰다듬기' : 'Pet Maji'}
      >
        <div className="w-12 h-12 md:w-13 md:h-13 rounded-full overflow-hidden border border-amber-400/50 bg-slate-900 flex items-center justify-center">
          <img
            src="/131.png"
            alt="마지 마스코트"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('131.png')) {
                target.src = '/131.png';
              }
            }}
          />
        </div>

        {/* Small Wand indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 text-amber-300 bg-[#0e1424] p-1 rounded-full border border-amber-400/40 shadow">
          <Wand2 className={`w-3 h-3 ${isWandSwinging ? 'rotate-45' : ''} transition-transform`} />
        </div>
      </button>
    </div>
  );
};
