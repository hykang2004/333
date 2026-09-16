import React, { useState, useEffect } from 'react';
import { Language, PerformanceItem, BoothItem } from './types';
import { PERFORMANCE_SCHEDULE, FESTIVAL_BOOTHS } from './data/festivalData';
import { Header } from './components/Header';
import { NightSkyBackground } from './components/NightSkyBackground';
import { SparkleCursor } from './components/SparkleCursor';
import { HomeView } from './components/HomeView';
import { TarotView } from './components/TarotView';
import { LiveTimelineTracker } from './components/LiveTimelineTracker';
import { PerformanceScheduleView } from './components/PerformanceScheduleView';
import { BoothSection } from './components/BoothSection';
import { MascotKkamnyangi } from './components/MascotKkamnyangi';
import { PerformanceDetailModal } from './components/PerformanceDetailModal';
import { BoothDetailModal } from './components/BoothDetailModal';
import { GoodsView } from './components/GoodsView';
import { ShareModal } from './components/ShareModal';
import { Moon, ArrowLeft } from 'lucide-react';

export type AppView = 'home' | 'tarot' | 'timeline' | 'booth' | 'goods';

export default function App() {
  // 1. Current View State (SPA Navigation)
  // Default to 'home' on initial site visit
  const [currentView, setCurrentView] = useState<AppView>('home');

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // 2. Language State (KO / EN)
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('magic_fest_lang') as Language) || 'ko';
  });

  const handleLanguageToggle = () => {
    setLanguage((prev) => {
      const next = prev === 'ko' ? 'en' : 'ko';
      localStorage.setItem('magic_fest_lang', next);
      return next;
    });
  };

  // 3. Cursor Sparkles Toggle
  const [sparklesEnabled, setSparklesEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('magic_fest_sparkles');
    return saved !== null ? saved === 'true' : true;
  });

  const handleToggleSparkles = () => {
    setSparklesEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('magic_fest_sparkles', String(next));
      return next;
    });
  };

  // 4. Real-Time Live Clock
  const [currentMinutes, setCurrentMinutes] = useState<number>(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (mins: number) => {
    const hrs = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return `${hrs.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // 6. Modals State
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceItem | null>(null);
  const [selectedBooth, setSelectedBooth] = useState<BoothItem | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleSelectBoothById = (boothId: string) => {
    const found = FESTIVAL_BOOTHS.find((b) => b.id === boothId);
    if (found && found.category === 'food') {
      setSelectedBooth(found);
    }
    setCurrentView('booth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isKo = language === 'ko';

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden flex flex-col justify-between">
      {/* 1. Celestial Night Sky Background */}
      <NightSkyBackground />

      {/* 2. Sparkle Cursor Canvas */}
      <SparkleCursor enabled={sparklesEnabled} />

      {/* 3. Sticky Celestial Header with SPA Navigation */}
      <Header
        language={language}
        onLanguageToggle={handleLanguageToggle}
        sparklesEnabled={sparklesEnabled}
        onToggleSparkles={handleToggleSparkles}
        currentTimeString={formatTime(currentMinutes)}
        onOpenShareModal={() => setIsShareOpen(true)}
        onNavigateView={handleNavigate}
        currentView={currentView}
        onOpenTarot={() => handleNavigate('tarot')}
      />

      {/* Main Content Areas: Explicit View Containers with display: block / display: none */}
      <main className="flex-1">

        {/* =========================================================
            1. 메인 시작 화면: id="view-home" (사이트 최초 접속 시 이 화면만 표시)
           ========================================================= */}
        <div
          id="view-home"
          style={{ display: currentView === 'home' ? 'block' : 'none' }}
          className="w-full"
        >
          <HomeView
            language={language}
            onNavigate={handleNavigate}
          />
        </div>

        {/* =========================================================
            2. 오늘의 타로 화면: id="view-tarot" (기존 타로 로직 포함, 기본 숨김)
           ========================================================= */}
        <div
          id="view-tarot"
          style={{ display: currentView === 'tarot' ? 'block' : 'none' }}
          className="w-full"
        >
          <TarotView
            language={language}
            onBackToHome={handleBackToHome}
            onNavigateToBooth={(boothId) => {
              handleNavigate('booth');
              handleSelectBoothById(boothId);
            }}
          />
        </div>

        {/* =========================================================
            3. 무대 타임라인 화면: id="view-timeline" (기존 타임라인 내용 포함, 기본 숨김)
           ========================================================= */}
        <div
          id="view-timeline"
          style={{ display: currentView === 'timeline' ? 'block' : 'none' }}
          className="w-full pb-16"
        >
          {/* 상단 '← 뒤로가기 (홈으로)' 버튼 */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
            <button
              onClick={handleBackToHome}
              id="btn-back-from-timeline"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{isKo ? '← 뒤로가기 (홈으로)' : '← Back (Home)'}</span>
            </button>
          </div>

          {/* 실시간 무대 모니터 */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <LiveTimelineTracker
              language={language}
              currentMinutes={currentMinutes}
              performances={PERFORMANCE_SCHEDULE}
              onSelectPerformance={(perf) => setSelectedPerformance(perf)}
            />
          </div>

          {/* 전체 공연 일정표 */}
          <PerformanceScheduleView
            language={language}
            performances={PERFORMANCE_SCHEDULE}
            currentMinutes={currentMinutes}
            onSelectPerformance={(perf) => setSelectedPerformance(perf)}
          />
        </div>

        {/* =========================================================
            4. 캠퍼스 부스 화면: id="view-booth" (기존 부스 안내 내용 포함, 기본 숨김)
           ========================================================= */}
        <div
          id="view-booth"
          style={{ display: currentView === 'booth' ? 'block' : 'none' }}
          className="w-full pb-16"
        >
          {/* 상단 '← 뒤로가기 (홈으로)' 버튼 */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
            <button
              onClick={handleBackToHome}
              id="btn-back-from-booth"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{isKo ? '← 뒤로가기 (홈으로)' : '← Back (Home)'}</span>
            </button>
          </div>

          {/* 전체 캠퍼스 부스 섹션 */}
          <BoothSection
            language={language}
            booths={FESTIVAL_BOOTHS}
            onSelectBooth={(booth) => {
              if (booth.category === 'food') {
                setSelectedBooth(booth);
              }
            }}
          />
        </div>

        {/* =========================================================
            5. 축제 굿즈 화면: id="view-goods" (전용 굿즈 안내 페이지)
           ========================================================= */}
        <div
          id="view-goods"
          style={{ display: currentView === 'goods' ? 'block' : 'none' }}
          className="w-full pt-4 sm:pt-6 pb-16 relative z-10"
        >
          {/* 전체 축제 굿즈 섹션 */}
          <GoodsView
            language={language}
            onBackToHome={handleBackToHome}
            onNavigateToBooth={(boothId) => {
              handleNavigate('booth');
              if (boothId) {
                handleSelectBoothById(boothId);
              }
            }}
          />
        </div>

      </main>

      {/* 플로팅 홈으로 돌아가기 버튼 (스크롤 중에도 언제든 즉시 홈 복귀) */}
      {currentView !== 'home' && (
        <button
          onClick={handleBackToHome}
          id="btn-floating-back-home"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4.5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/40 border border-amber-200 cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 select-none"
          title={isKo ? '홈으로 돌아가기' : 'Back to Home'}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>{isKo ? '홈으로 돌아가기' : 'Back to Home'}</span>
        </button>
      )}

      {/* Floating Mascot Cat Kkamnyangi */}
      <MascotKkamnyangi
        language={language}
        onOpenTarot={() => handleNavigate('tarot')}
      />

      {/* Modals */}
      <PerformanceDetailModal
        performance={selectedPerformance}
        onClose={() => setSelectedPerformance(null)}
        language={language}
      />

      <BoothDetailModal
        booth={selectedBooth}
        onClose={() => setSelectedBooth(null)}
        language={language}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        language={language}
      />

      {/* Celestial Night Footer */}
      <footer className="bg-[#0b1328]/95 border-t border-indigo-900/40 py-10 px-4 sm:px-6 relative z-10 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-indigo-900/30 pb-5 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-extrabold text-xs sm:text-sm whitespace-nowrap">
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap">제33대 총동아리연합회 개화</span>
                <span className="text-amber-400 shrink-0">|</span>
                <span className="text-indigo-200 font-pyeongchang text-xs sm:text-sm whitespace-nowrap">2026 동아리밤</span>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-500 font-sans">
            <p>
              © 2026 The 33rd Club Association Gaehwa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

