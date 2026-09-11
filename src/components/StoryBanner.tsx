import React from 'react';
import { Sparkles, Wand2, Calendar, Music, Gift, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface StoryBannerProps {
  language: Language;
  onOpenTarot: () => void;
  onScrollToSection: (id: string) => void;
}

export const StoryBanner: React.FC<StoryBannerProps> = ({
  language,
  onOpenTarot,
  onScrollToSection
}) => {
  const t = translations[language];
  const isKo = language === 'ko';

  return (
    <section
      id="hero-section"
      className="relative z-10 pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Floating Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isKo ? '제33대 총동아리연합회 개화 동아리밤' : '33rd Club Association Gaehwa Club Night'}</span>
          </div>

          <div className="bg-slate-900/80 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>2026. 09. 17 (THU)</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center space-y-3.5 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.2]">
            <span className="block text-slate-300 text-base sm:text-xl font-light mb-1.5 tracking-wider font-sans">
              {isKo ? '달빛이 깃든 마법학교 축제' : 'Enchanted Moonlit Magic Academy'}
            </span>
            <span className="text-white font-pyeongchang tracking-normal inline-flex items-center justify-center">
              {isKo ? (
                <>
                  <span className="relative inline-block mr-[1px]">
                    {/* Cute Wizard Hat on '2' with midnight indigo-purple gradient, golden buckle belt, floating animation & glowing pulse star */}
                    <span className="absolute -top-4 -left-2.5 sm:-top-7 sm:-left-4 w-7 sm:w-11 h-7 sm:h-11 pointer-events-none transform -rotate-[14deg] drop-shadow-[0_4px_10px_rgba(251,191,36,0.45)] select-none animate-float-slow">
                      <svg
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        {/* Magic Sparkle Star at tip */}
                        <polygon
                          points="9,2 11,6 15,7 12,10 13,14 9,11 5,14 6,10 3,7 7,6"
                          fill="#FDE047"
                          className="animate-pulse"
                        />
                        <circle cx="9" cy="8" r="1.5" fill="#FFFBEB" />

                        {/* Cone Body with Indigo-Purple Gradient */}
                        <path
                          d="M9 7 C 8 14 5 23 4 27 C 15 29 25 29 35 27 C 31 22 22 13 9 7 Z"
                          fill="url(#wizard-hat-title-grad)"
                          stroke="#6366F1"
                          strokeWidth="0.8"
                        />

                        {/* Mini Gold Stars on cone */}
                        <polygon points="16,15 17,17 19,17 17.5,18.5 18,20.5 16,19 14,20.5 14.5,18.5 13,17 15,17" fill="#FDE047" opacity="0.85" />
                        <circle cx="23" cy="20" r="0.9" fill="#FDE047" opacity="0.9" />

                        {/* Golden Ribbon Belt */}
                        <path
                          d="M 4.5 25 C 14 27 25 27 34.5 25 L 35 27 C 25 29 15 29 4 27 Z"
                          fill="#F59E0B"
                        />
                        
                        {/* Golden Buckle */}
                        <rect
                          x="16.5"
                          y="23.5"
                          width="6"
                          height="4.5"
                          rx="1"
                          fill="#FEF08A"
                          stroke="#B45309"
                          strokeWidth="0.8"
                        />
                        <rect
                          x="18"
                          y="24.5"
                          width="3"
                          height="2.5"
                          rx="0.5"
                          fill="#312E81"
                        />

                        {/* Hat Brim */}
                        <ellipse
                          cx="19.5"
                          cy="28.5"
                          rx="17.5"
                          ry="4.5"
                          fill="#1E1B4B"
                          stroke="#818CF8"
                          strokeWidth="0.9"
                        />
                        <ellipse
                          cx="19.5"
                          cy="27.5"
                          rx="14.5"
                          ry="3"
                          fill="#312E81"
                        />

                        <defs>
                          <linearGradient id="wizard-hat-title-grad" x1="9" y1="7" x2="22" y2="28" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="50%" stopColor="#3730A3" />
                            <stop offset="100%" stopColor="#1E1B4B" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <span>2</span>
                  </span>
                  <span>026 동아리밤</span>
                </>
              ) : (
                '2026 CLUB NIGHT'
              )}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto font-light">
            {isKo
              ? '달빛 아래 펼쳐지는 신비로운 마법학교 축제. 낮 부스 체험부터 밤의 10팀 라이브 무대와 경품 추첨까지 동아리밤의 모든 순간을 안내합니다.'
              : 'Welcome to the Enchanted Magic Academy Festival. Explore day and night campus booths, 10 live stage shows, and the grand prize draw.'}
          </p>
        </div>

        {/* Festival Highlights Card */}
        <div className="bg-[#0e1424] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isKo ? '2026 동아리밤 주요 안내' : '2026 Festival Highlights'}</span>
            </div>
          </div>

          {/* 3 Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-[#090e1d] rounded-2xl p-4 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm font-serif-magic">
                <Compass className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{isKo ? '낮/밤 테마 부스' : 'Day & Night Booths'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {isKo
                  ? '낮(10:00~17:30)과 밤(18:00~23:00) 체험 프로그램과 다양한 야식 부스 운영'
                  : 'Day (10:00~17:30) and Night (18:00~23:00) craft, games, and food stalls.'}
              </p>
            </div>

            <div className="bg-[#090e1d] rounded-2xl p-4 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm font-serif-magic">
                <Music className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{isKo ? '10팀 특설무대 공연' : '10 Live Stage Acts'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {isKo
                  ? '18:20 개회사부터 오케스트라, 밴드, 댄스, 태권도 등 10팀의 릴레이 라이브'
                  : 'Passionate performances from orchestra, bands, street dance to Taekwondo.'}
              </p>
            </div>

            <div className="bg-[#090e1d] rounded-2xl p-4 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm font-serif-magic">
                <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{isKo ? '23:00 대망의 상품추첨' : '23:00 Grand Lucky Draw'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {isKo
                  ? '축제 피날레를 장식할 푸짐하고 두근두근한 경품 추첨 이벤트'
                  : 'Exciting and bountiful lucky draw raffle before the finale.'}
              </p>
            </div>
          </div>

          {/* Mascot Spotlight */}
          <div className="bg-[#090e1d] rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-amber-400/30 shadow bg-slate-900 flex-shrink-0">
              <img
                src="/131.png"
                alt="공식 마스코트 깜냥이"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('131.png')) {
                    target.src = '/131.png';
                  }
                }}
              />
            </div>
            
            <div className="text-center sm:text-left space-y-0.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-white text-sm">
                  {isKo ? '축제 마스코트 깜냥이' : 'Festival Mascot Kkamnyangi'}
                </span>
                <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded-full">
                  {isKo ? '안내 도우미' : 'Guide'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {isKo
                  ? '우측 하단의 깜냥이를 클릭하면 실시간 축제 꿀팁과 오늘의 타로 뽑기를 이용할 수 있습니다.'
                  : 'Click Kkamnyangi in the bottom-right for live festival tips and today’s tarot draw.'}
              </p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenTarot}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all cursor-pointer hover:scale-[1.01]"
            >
              <Wand2 className="w-4 h-4 text-slate-950" />
              <span>{isKo ? '오늘의 타로 뽑기' : 'Draw Today’s Tarot'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
