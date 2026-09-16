import React from 'react';
import { 
  Sparkles, 
  Music, 
  Store, 
  ArrowRight, 
  Wand2,
  Gift
} from 'lucide-react';
import { Language } from '../types';

interface HomeViewProps {
  language: Language;
  onNavigate: (view: 'tarot' | 'timeline' | 'booth' | 'goods') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onNavigate
}) => {
  const isKo = language === 'ko';

  return (
    <div className="max-w-xl sm:max-w-2xl mx-auto px-4 pt-4 sm:pt-6 pb-8 sm:pb-12 space-y-5 sm:space-y-6 relative z-10 font-sans">
      
      {/* 1. 메인 동영상 (uuu 파일) */}
      <div 
        id="section-main-video"
        className="w-full relative rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl shadow-amber-500/10 bg-[#0a0f1d]"
      >
        <div className="w-full aspect-video relative overflow-hidden flex items-center justify-center bg-black">
          <video
            id="main-festival-video"
            key="festival-main-video-uuu"
            src="/uuu/uuu.mp4"
            poster="/uuu_poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover object-center scale-[1.005] transform-gpu"
          >
            <source src="/uuu/uuu.mp4" type="video/mp4" />
            <source src="/uuu.mp4" type="video/mp4" />
            <source src="/festival_main.mp4" type="video/mp4" />
            <source src="/asd/festival_main.mp4" type="video/mp4" />
            <source src="/_talkv_dJMcaAbk4Jr_VilqCrOSRnrAn0NUdNBWNK_talkv_high.mp4" type="video/mp4" />
            동영상을 재생할 수 없습니다.
          </video>
          {/* Subtle Frame Accent */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
        </div>
      </div>

      {/* 2. 배너: '오늘의 타로뽑기' 버튼 (클릭 시 view-tarot 화면으로 전환) */}
      <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/20 via-indigo-950/80 to-purple-950/60 border border-amber-400/40 shadow-xl overflow-hidden group">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="space-y-1 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{isKo ? '마법 타로 운세' : 'Magic Tarot'}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight font-serif-magic">
              {isKo ? '오늘의 타로뽑기 🔮' : 'Draw Today’s Tarot 🔮'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {isKo 
                ? '오늘 밤 나만의 축제 운세와 찰떡 부스를 확인해보세요!' 
                : 'Discover your festival fortune and perfect matching booth!'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('tarot')}
            id="btn-nav-to-tarot"
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <Wand2 className="w-4 h-4 text-slate-950" />
            <span>{isKo ? '오늘의 타로뽑기' : 'Draw Tarot Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. 축제 바로가기:
          - 상단 2구: '1. 무대 타임라인' & '2. 캠퍼스 부스'
          - 하단 1구: '3. 축제 한정 굿즈' (전용 페이지로 전환) */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-300 px-1 flex items-center gap-1.5">
          <span>{isKo ? '축제 바로가기' : 'Festival Shortcuts'}</span>
        </h4>

        {/* 2열 그리드 내 배치: 무대 타임라인, 캠퍼스 부스 및 하단 중앙 굿즈 카드 */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Card 1: 1. 무대 타임라인 */}
          <div
            onClick={() => onNavigate('timeline')}
            id="card-nav-timeline"
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0e1424] hover:bg-[#131b30] border border-white/10 hover:border-amber-400/40 shadow-xl cursor-pointer group transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] flex flex-col items-center justify-between text-center"
          >
            <div className="space-y-2.5 sm:space-y-3 flex flex-col items-center w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-inner shrink-0">
                <Music className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {isKo ? '무대 타임라인' : 'Stage Timeline'}
                </h4>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-300 group-hover:text-amber-200 w-full">
              <span>{isKo ? '타임라인 보기' : 'View Timeline'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: 2. 캠퍼스 부스 */}
          <div
            onClick={() => onNavigate('booth')}
            id="card-nav-booth"
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0e1424] hover:bg-[#131b30] border border-white/10 hover:border-amber-400/40 shadow-xl cursor-pointer group transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] flex flex-col items-center justify-between text-center"
          >
            <div className="space-y-2.5 sm:space-y-3 flex flex-col items-center w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-inner shrink-0">
                <Store className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {isKo ? '캠퍼스 부스' : 'Campus Booths'}
                </h4>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-300 group-hover:text-amber-200 w-full">
              <span>{isKo ? '부스 안내 보기' : 'View Booths'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 (Row 2, Col 1): 3. 축제 굿즈 (무대 타임라인 바로 아래 좌정렬) */}
          <div
            onClick={() => onNavigate('goods')}
            id="card-nav-goods"
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0e1424] hover:bg-[#131b30] border border-white/10 hover:border-amber-400/40 shadow-xl cursor-pointer group transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] flex flex-col items-center justify-between text-center"
          >
            <div className="space-y-2.5 sm:space-y-3 flex flex-col items-center w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-inner shrink-0">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {isKo ? '축제 굿즈' : 'Festival Goods'}
                </h4>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-300 group-hover:text-amber-200 w-full">
              <span>{isKo ? '굿즈 보기' : 'View Goods'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

