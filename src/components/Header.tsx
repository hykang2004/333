import React from 'react';
import { Globe, Home } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
  sparklesEnabled?: boolean;
  onToggleSparkles?: () => void;
  currentTimeString?: string;
  onOpenShareModal?: () => void;
  onNavigateView?: (view: 'home' | 'tarot' | 'timeline' | 'booth' | 'goods') => void;
  currentView?: 'home' | 'tarot' | 'timeline' | 'booth' | 'goods';
  onOpenTarot?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageToggle,
  currentView,
  onNavigateView
}) => {
  const isKo = language === 'ko';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-amber-400/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Left-aligned Eye-catching Language Switcher */}
        <button
          onClick={onLanguageToggle}
          id="btn-header-language-toggle"
          className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/30 border border-amber-200 cursor-pointer transition-all duration-200 transform hover:scale-[1.03] active:scale-95 select-none"
          title={isKo ? 'Switch to English' : '한국어로 변경'}
        >
          <Globe className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span className="tracking-tight font-bold">
            {isKo ? 'English' : '한국어'}
          </span>
        </button>

        {/* Right-aligned Home button when inside a subpage */}
        {currentView && currentView !== 'home' && (
          <button
            onClick={() => onNavigateView?.('home')}
            id="btn-header-back-home"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 hover:text-amber-200 font-bold text-xs sm:text-sm border border-amber-400/30 cursor-pointer transition-all active:scale-95 shadow"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>{isKo ? '홈으로' : 'Home'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
