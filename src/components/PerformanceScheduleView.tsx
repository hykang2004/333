import React, { useState } from 'react';
import { Search, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { PerformanceItem, Language } from '../types';
import { translations } from '../data/translations';

interface ScheduleViewProps {
  language: Language;
  performances: PerformanceItem[];
  currentMinutes: number;
  onSelectPerformance: (perf: PerformanceItem) => void;
}

export const PerformanceScheduleView: React.FC<ScheduleViewProps> = ({
  language,
  performances,
  currentMinutes,
  onSelectPerformance
}) => {
  const t = translations[language];
  const isKo = language === 'ko';

  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = performances.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchTitle = (p.titleKo + p.titleEn).toLowerCase().includes(query);
      const matchClub = (p.clubNameKo + p.clubNameEn).toLowerCase().includes(query);
      const matchTags = (p.tagsKo.join(' ') + p.tagsEn.join(' ')).toLowerCase().includes(query);
      if (!matchTitle && !matchClub && !matchTags) return false;
    }

    return true;
  });

  return (
    <section id="timeline-section" className="py-4 sm:py-8 px-3.5 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium mb-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{isKo ? '메인 특설무대 타임테이블' : 'Stage Timetable'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight font-pyeongchang">
              {t.timeline.title}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-sans font-light">
              {isKo
                ? '18:20 개회사부터 23:15 피날레까지 이어지는 실시간 라이브 무대'
                : 'Live stage performances from 18:20 opening to 23:15 grand finale'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64 font-sans">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={t.timeline.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0e1424] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Performance List */}
        {filteredList.length === 0 ? (
          <div className="bg-[#0e1424] rounded-2xl p-8 text-center text-slate-400 space-y-2 border border-white/5">
            <p className="text-xs sm:text-sm font-medium text-slate-300">
              {t.timeline.noPerformances}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-2">
            {filteredList.map((item, index) => {
              const isLive = currentMinutes >= item.startMinutes && currentMinutes < item.endMinutes;
              const isPast = currentMinutes >= item.endMinutes;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectPerformance(item)}
                  className={`group rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between gap-2.5 sm:gap-4 ${
                    isLive
                      ? 'bg-[#12192e] border-amber-400/60 shadow-md ring-1 ring-amber-400/30'
                      : isPast
                      ? 'bg-[#090d18]/60 border-white/5 opacity-60 hover:opacity-90'
                      : 'bg-[#0e1424] border-white/5 hover:border-amber-400/30 hover:bg-[#12192e]'
                  }`}
                >
                  {/* Left: Time & Live Badge */}
                  <div className="flex items-center gap-2 shrink-0 font-sans">
                    <span className="text-xs tabular-nums font-medium text-slate-500 w-4 text-center hidden sm:inline">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex items-center gap-1.5 tabular-nums font-semibold text-[11px] sm:text-xs text-amber-300 bg-slate-900/90 px-2 sm:px-2.5 py-1 rounded-md border border-white/5 shrink-0">
                      <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{item.startTime} ~ {item.endTime}</span>
                    </div>

                    {isLive && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded-full border border-amber-400/40 animate-pulse shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>LIVE</span>
                      </span>
                    )}

                    {isPast && !isLive && (
                      <span className="text-[9px] text-slate-500 bg-slate-900/60 px-1.5 py-0.5 rounded shrink-0 hidden xs:inline">
                        {isKo ? '종료' : 'Ended'}
                      </span>
                    )}
                  </div>

                  {/* Center: Title & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors truncate">
                        {isKo ? item.titleKo : item.titleEn}
                      </h3>
                      {((isKo ? item.clubNameKo : item.clubNameEn) || '').trim() && (
                        <span className="text-[10px] sm:text-[11px] text-indigo-300 shrink-0 hidden md:inline">
                          · {isKo ? item.clubNameKo : item.clubNameEn}
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1 font-sans font-light mt-0.5">
                      {isKo ? item.descriptionKo : item.descriptionEn}
                    </p>
                  </div>

                  {/* Right: Detail Arrow */}
                  <div className="flex items-center gap-0.5 text-xs text-slate-400 group-hover:text-amber-300 shrink-0 font-sans">
                    <span className="text-[11px] font-medium hidden sm:inline">{isKo ? '상세' : 'Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
