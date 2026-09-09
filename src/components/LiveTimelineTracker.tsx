import React from 'react';
import { Play, SkipForward, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PerformanceItem, Language } from '../types';
import { translations } from '../data/translations';

interface LiveTimelineTrackerProps {
  language: Language;
  currentMinutes: number;
  performances: PerformanceItem[];
  onSelectPerformance: (perf: PerformanceItem) => void;
}

export const LiveTimelineTracker: React.FC<LiveTimelineTrackerProps> = ({
  language,
  currentMinutes,
  performances,
  onSelectPerformance
}) => {
  const t = translations[language];
  const isKo = language === 'ko';

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const currentPerf = performances.find(
    (p) => currentMinutes >= p.startMinutes && currentMinutes < p.endMinutes
  );

  const nextPerf = performances.find((p) => p.startMinutes > currentMinutes);

  let progressPercent = 0;
  let remainingMinutes = 0;
  if (currentPerf) {
    const duration = currentPerf.endMinutes - currentPerf.startMinutes;
    const elapsed = currentMinutes - currentPerf.startMinutes;
    progressPercent = Math.min(100, Math.max(0, (elapsed / duration) * 100));
    remainingMinutes = currentPerf.endMinutes - currentMinutes;
  }

  const formatDuration = (totalMins: number) => {
    if (totalMins <= 0) return isKo ? '곧 시작' : 'Starting soon';
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (isKo) {
      if (hrs > 0 && mins > 0) return `${hrs}시간 ${mins}분`;
      if (hrs > 0) return `${hrs}시간`;
      return `${mins}분`;
    } else {
      if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
      if (hrs > 0) return `${hrs}h`;
      return `${mins}m`;
    }
  };

  const lastPerf = performances[performances.length - 1];
  const isBeforeFestival = currentMinutes < (10 * 60);
  const isAfterFestival = currentMinutes > lastPerf.endMinutes;

  return (
    <div id="timeline-tracker" className="w-full night-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xl mb-4 sm:mb-8 relative overflow-hidden">
      {/* Decorative Star Flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-indigo-900/40">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5 font-pyeongchang truncate">
            <span>{t.timeline.title}</span>
          </h3>
        </div>

        {/* Current Time Badge */}
        <div className="px-2.5 py-1 rounded-lg bg-[#060b17] border border-amber-400/30 flex items-center gap-1.5 text-slate-100 shadow-inner shrink-0">
          <Clock className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold tabular-nums text-amber-300">
            {formatTime(currentMinutes)}
          </span>
          <span className="text-[10px] text-slate-400 font-sans hidden xs:inline">
            (09.17)
          </span>
        </div>
      </div>

      {/* Stage Tracker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 mt-3 sm:mt-4">
        {/* NOW ON STAGE CARD */}
        <div
          onClick={() => currentPerf && onSelectPerformance(currentPerf)}
          className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-all ${
            currentPerf
              ? 'night-card-gold cursor-pointer hover:border-amber-400'
              : 'bg-[#060b17]/70 border-indigo-950/60'
          }`}
        >
          {/* Top Pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-amber-300 uppercase tracking-wider bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/40 shrink-0">
              <Play className="w-2.5 h-2.5 fill-amber-300 text-amber-300 shrink-0" />
              {t.timeline.nowPlaying}
            </span>
            {currentPerf && (
              <span className="text-[11px] sm:text-xs tabular-nums font-bold text-amber-200 shrink-0">
                {currentPerf.startTime} ~ {currentPerf.endTime}
              </span>
            )}
          </div>

          {currentPerf ? (
            <div className="space-y-2 min-w-0">
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-1.5 font-serif-magic truncate">
                    <span className="truncate">{isKo ? currentPerf.titleKo : currentPerf.titleEn}</span>
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                  </h4>
                </div>
                {((isKo ? currentPerf.clubNameKo : currentPerf.clubNameEn) || '').trim() && (
                  <p className="text-[11px] sm:text-xs font-semibold text-indigo-300 mt-0.5 font-sans truncate">
                    {isKo ? currentPerf.clubNameKo : currentPerf.clubNameEn}
                  </p>
                )}
              </div>

              <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 leading-relaxed font-sans font-light">
                {isKo ? currentPerf.descriptionKo : currentPerf.descriptionEn}
              </p>

              {/* Progress */}
              <div className="space-y-1 pt-0.5 font-sans">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] tabular-nums text-slate-300">
                  <span>
                    {t.timeline.elapsed}: {formatDuration(Math.floor((progressPercent * (currentPerf.endMinutes - currentPerf.startMinutes)) / 100))}
                  </span>
                  <span className="text-amber-300 font-bold">
                    {t.timeline.timeLeft}: {formatDuration(remainingMinutes)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#060b17] rounded-full overflow-hidden border border-indigo-950 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2.5 sm:py-4 flex items-center justify-center gap-2 text-center text-slate-400">
              <span className="text-base sm:text-lg shrink-0">
                {isBeforeFestival ? '☀️' : isAfterFestival ? '🌙' : '✨'}
              </span>
              <p className="text-xs font-medium text-slate-300 font-sans">
                {isBeforeFestival
                  ? (isKo ? '축제 준비 중 (18:20 무대 시작)' : 'Preparing (18:20 Shows)')
                  : isAfterFestival
                  ? (isKo ? '축제 일정이 마무리되었습니다 🌙' : 'Festival concluded 🌙')
                  : (isKo ? '무대 준비 및 휴식 시간입니다' : 'Intermission')}
              </p>
            </div>
          )}
        </div>

        {/* UP NEXT STAGE CARD */}
        <div
          onClick={() => nextPerf && onSelectPerformance(nextPerf)}
          className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-all ${
            nextPerf
              ? 'night-card cursor-pointer hover:border-slate-400'
              : 'bg-[#060b17]/70 border-indigo-950/60'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/50 shrink-0">
              <SkipForward className="w-2.5 h-2.5 text-slate-300 shrink-0" />
              {t.timeline.upNext}
            </span>
            {nextPerf && (
              <span className="text-[11px] sm:text-xs tabular-nums font-bold text-slate-300 shrink-0">
                {nextPerf.startTime} ~ {nextPerf.endTime}
              </span>
            )}
          </div>

          {nextPerf ? (
            <div className="space-y-2 min-w-0">
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight font-serif-magic flex items-center gap-1.5 truncate">
                    <span className="truncate">{isKo ? nextPerf.titleKo : nextPerf.titleEn}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </h4>
                </div>
                {((isKo ? nextPerf.clubNameKo : nextPerf.clubNameEn) || '').trim() && (
                  <p className="text-[11px] sm:text-xs font-semibold text-indigo-300 mt-0.5 font-sans truncate">
                    {isKo ? nextPerf.clubNameKo : nextPerf.clubNameEn}
                  </p>
                )}
              </div>

              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 leading-relaxed font-sans font-light">
                {isKo ? nextPerf.descriptionKo : nextPerf.descriptionEn}
              </p>

              <div className="pt-1.5 border-t border-indigo-900/30 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400 text-[11px]">
                  {isKo ? '시작까지' : 'Starts in'}
                </span>
                <span className="tabular-nums font-bold text-amber-300 bg-[#060b17] px-2 py-0.5 rounded border border-amber-400/30 text-[11px]">
                  {nextPerf.startMinutes - currentMinutes > 0
                    ? formatDuration(nextPerf.startMinutes - currentMinutes)
                    : (isKo ? '곧 시작' : 'Starting Soon')}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-2.5 sm:py-4 flex items-center justify-center gap-2 text-center text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
              <p className="text-xs text-slate-400 font-sans">
                {isKo ? '예정된 다음 무대가 없습니다' : 'No further shows scheduled'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
