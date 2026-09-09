import React from 'react';
import { X, MapPin, Sparkles, Award, Utensils } from 'lucide-react';
import { BoothItem, Language } from '../types';

interface BoothModalProps {
  booth: BoothItem | null;
  onClose: () => void;
  language: Language;
}

export const BoothDetailModal: React.FC<BoothModalProps> = ({
  booth,
  onClose,
  language
}) => {
  if (!booth) return null;

  const isKo = language === 'ko';
  const isAZone = booth.boothNumber?.startsWith('A-') || booth.locationZone?.includes('A-Zone');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0e1424] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-xs font-bold tabular-nums">
            {booth.boothNumber}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-white/10 text-slate-300 text-xs font-medium">
            {booth.operatingHoursKo
              ? (isKo ? booth.operatingHoursKo : (booth.operatingHoursEn || booth.operatingHoursKo))
              : booth.timeType === 'day'
              ? (isKo ? '낮 부스 (10:30~17:00)' : 'Day Booth')
              : booth.timeType === 'night'
              ? (isKo ? '밤 부스 (18:30~23:00)' : 'Night Booth')
              : (isKo ? '상시 부스 (10:30~23:00)' : 'All-Day Booth')}
          </span>
        </div>

        {/* Title & Host Club */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 font-serif-magic">
          {isKo ? (booth.titleKo || booth.nameKo) : (booth.titleEn || booth.nameEn)}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-amber-400 mb-4 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          <span>{isKo ? (booth.clubKo || booth.clubNameKo) : (booth.clubEn || booth.clubNameEn)}</span>
        </p>

        {/* Location Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#090d18] p-3 rounded-xl border border-white/5 mb-4">
          <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="font-medium text-amber-300">
            {booth.locationZone}
          </span>
        </div>

        {/* Description (A-Zone 푸드트럭은 하단 메뉴 및 가격 안내와 중복되므로 부스소개란 제외) */}
        {!isAZone && (
          <div className="space-y-1.5 mb-4">
            <h4 className="text-xs font-semibold text-slate-400">
              {isKo ? '부스 소개' : 'About Booth'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#090d18] p-3.5 rounded-xl border border-white/5 font-light">
              {isKo ? (booth.fullDescKo || booth.descriptionKo || booth.shortDescKo) : (booth.fullDescEn || booth.descriptionEn || booth.shortDescEn)}
            </p>
          </div>
        )}

        {/* Highlights */}
        {booth.highlightsKo && booth.highlightsKo.length > 0 && (
          <div className="space-y-1.5 mb-4">
            <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isKo
                  ? (booth.nameKo?.includes('키링') ? '키링 종류' : '주요 프로그램 및 특징')
                  : (booth.nameEn?.includes('Keyring') ? 'Keyring Types' : 'Highlights')}
              </span>
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {(isKo ? booth.highlightsKo : (booth.highlightsEn || booth.highlightsKo)).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-[#090d18] px-3 py-2 rounded-lg border border-white/5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items */}
        {booth.menuItems && booth.menuItems.length > 0 && (
          <div className="space-y-1.5 mb-4">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {booth.category === 'food'
                  ? (isKo ? '메뉴 및 가격 안내' : 'Menu & Prices')
                  : booth.category === 'goods'
                  ? (isKo ? '판매 품목 및 가격 안내' : 'Items & Prices')
                  : (isKo ? '체험 비용 및 프로그램' : 'Experience Fees')}
              </span>
            </h4>
            <div className="bg-[#090d18] border border-white/5 rounded-xl p-2.5 divide-y divide-white/5">
              {booth.menuItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 first:pt-0 last:pb-0 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200 font-medium">
                      {isKo ? item.nameKo : item.nameEn}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-amber-400 tabular-nums font-semibold">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition-colors border border-white/10 cursor-pointer text-center"
          >
            {isKo ? '닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
