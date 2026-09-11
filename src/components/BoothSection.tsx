import React, { useState } from 'react';
import { Moon, Compass, ChevronRight } from 'lucide-react';
import { BoothItem, Language } from '../types';
import { translations } from '../data/translations';

interface BoothSectionProps {
  language: Language;
  booths: BoothItem[];
  onSelectBooth: (booth: BoothItem) => void;
}

export const BoothSection: React.FC<BoothSectionProps> = ({
  language,
  booths,
  onSelectBooth
}) => {
  const t = translations[language];
  const isKo = language === 'ko';

  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filteredBooths = booths.filter((b) => {
    if (selectedZone !== 'all' && !b.locationZone.includes(selectedZone)) {
      return false;
    }

    return true;
  });

  return (
    <section
      id="booth-section"
      className="py-12 sm:py-16 px-4 sm:px-6 relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-7">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
            <Moon className="w-3.5 h-3.5 fill-amber-300/80 text-amber-300" />
            <span>{isKo ? '마법학교 캠퍼스 부스 탐방' : 'Campus Booths'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-pyeongchang">
            {t.booths.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light">
            {t.booths.subtitle}
          </p>
        </div>

        {/* Mascot Speech Tip */}
        <div className="max-w-lg mx-auto bg-[#0e1424] rounded-2xl p-3.5 flex items-center gap-3 border border-white/5">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-amber-400/30 flex-shrink-0 bg-slate-900 shadow">
            <img
              src="/131.png"
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
          <div className="text-xs text-slate-300 font-sans font-light">
            <span className="text-amber-300 font-medium mr-1.5">
              {isKo ? '깜냥이의 부스 팁:' : "Kkamnyangi's Tip:"}
            </span>
            {t.booths.catDayTip}
          </div>
        </div>

        {/* Campus Map Zones */}
        <div className="bg-[#0e1424] rounded-2xl p-4 sm:p-5 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{isKo ? '캠퍼스 구역 선택' : 'Campus Zones'}</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-sans">
              {isKo ? '구역별 부스 필터링' : 'Filter by Zone'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
            {[
              { id: 'all', nameKo: '전체 구역', nameEn: 'All Zones', descKo: '캠퍼스 전체 (18개소)', descEn: 'All Campus' },
              { id: 'A-Zone', nameKo: 'A-Zone 푸드존', nameEn: 'A-Zone Food', descKo: '푸드트럭', descEn: '11 Food Trucks' },
              { id: 'B-Zone', nameKo: 'B-Zone 중앙 공원', nameEn: 'B-Zone Central Park', descKo: '플리마켓', descEn: 'Flea Market' },
              { id: 'C-Zone', nameKo: 'C-Zone 다산 앞', nameEn: 'C-Zone Dasan', descKo: '체험존', descEn: 'Experience Zone' }
            ].map((z) => {
              const isSelected = selectedZone === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z.id)}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#141d33] border-amber-400/50 text-white shadow-sm'
                      : 'bg-[#090e1d] border-white/5 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="font-semibold text-xs truncate">
                    {isKo ? z.nameKo : z.nameEn}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5 font-light">
                    {isKo ? z.descKo : z.descEn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Booths Grid: 2 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {filteredBooths.map((booth) => {
            const boothTitle = isKo ? (booth.nameKo || booth.titleKo) : (booth.nameEn || booth.titleEn);
            const boothDesc = isKo ? (booth.shortDescKo || booth.descriptionKo) : (booth.shortDescEn || booth.descriptionEn);

            return (
              <div
                key={booth.id}
                onClick={() => onSelectBooth(booth)}
                className="group bg-[#0e1424] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/5 transition-all cursor-pointer flex flex-col justify-between items-center text-center hover:border-amber-400/30 hover:bg-[#12192e] shadow"
              >
                <div className="w-full flex flex-col items-center text-center">
                  {/* Top Bar: Booth Number only (Centered) */}
                  <div className="flex items-center justify-center mb-2">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 tabular-nums font-bold text-[11px] sm:text-xs px-2.5 py-0.5 rounded-md">
                      {booth.boothNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1 w-full">
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                      {boothTitle}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-light line-clamp-2 leading-relaxed mt-0.5">
                      {boothDesc}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="w-full mt-3 pt-2 border-t border-white/5 flex items-center justify-center text-xs">
                  <span className="text-amber-400 text-[11px] sm:text-xs font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>{isKo ? '상세보기' : 'Details'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
