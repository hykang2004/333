import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Gamepad2,
  ShoppingBag,
  Target,
  Megaphone,
  Truck,
  Search,
  CheckCircle2,
  Utensils
} from 'lucide-react';
import { BoothItem, Language } from '../types';
import { translations } from '../data/translations';

interface BoothSectionProps {
  language: Language;
  booths: BoothItem[];
  onSelectBooth?: (booth: BoothItem) => void;
}

interface CategoryConfig {
  id: string;
  nameKo: string;
  nameEn: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
  accentColor: string;
  borderAccent: string;
  descKo: string;
  descEn: string;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: 'experience',
    nameKo: '체험부스',
    nameEn: 'Experience',
    icon: Sparkles,
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    accentColor: 'text-purple-400',
    borderAccent: 'border-purple-500/30 hover:border-purple-400/50',
    descKo: '페이스페인팅, 양말목 공예, 동아리 체험 프로그램 (12개소)',
    descEn: 'Club hands-on workshops and interactive booths (12 booths)'
  },
  {
    id: 'game',
    nameKo: '게임부스',
    nameEn: 'Game Booths',
    icon: Gamepad2,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accentColor: 'text-emerald-400',
    borderAccent: 'border-emerald-500/30 hover:border-emerald-400/50',
    descKo: '스탬프 시작/마감, 총동연 미니게임 & 힐링존 (3개소)',
    descEn: 'Quest start/finish, mini-games & healing zone (3 booths)'
  },
  {
    id: 'profit',
    nameKo: '수익부스',
    nameEn: 'Revenue / Market',
    icon: ShoppingBag,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    accentColor: 'text-amber-400',
    borderAccent: 'border-amber-500/30 hover:border-amber-400/50',
    descKo: '도깨비 타로, 빈티지 의류, 칵테일, 플리마켓 (8개소)',
    descEn: 'Tarot, curated vintage clothing, cocktails & market (8 booths)'
  },
  {
    id: 'activity',
    nameKo: '액티비티',
    nameEn: 'Activity',
    icon: Target,
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    accentColor: 'text-cyan-400',
    borderAccent: 'border-cyan-500/30 hover:border-cyan-400/50',
    descKo: '물대포 슈팅 챌린지와 익사이팅 액티비티 & 음료 (2개소)',
    descEn: 'Water cannon target challenge & refreshing drinks (2 booths)'
  },
  {
    id: 'promotion',
    nameKo: '홍보부스',
    nameEn: 'Promotion',
    icon: Megaphone,
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    accentColor: 'text-indigo-400',
    borderAccent: 'border-indigo-500/30 hover:border-indigo-400/50',
    descKo: '홍보대사 나래, 인권센터, 학생복지 & 취창업 멘토링 (7개소)',
    descEn: 'Campus ambassadors, counseling, student welfare & career (7 booths)'
  },
  {
    id: 'food',
    nameKo: '푸드트럭',
    nameEn: 'Food Trucks',
    icon: Truck,
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    accentColor: 'text-orange-400',
    borderAccent: 'border-orange-500/30 hover:border-orange-400/50',
    descKo: '스테이크, 직화닭꼬치, 타코야끼, 츄러스 등 (11개소)',
    descEn: 'Steak, chicken skewers, takoyaki, churros & more (11 trucks)'
  }
];

export const BoothSection: React.FC<BoothSectionProps> = ({
  language,
  booths,
  onSelectBooth
}) => {
  const t = translations[language];
  const isKo = language === 'ko';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: booths.length };
    CATEGORY_CONFIGS.forEach((cfg) => {
      counts[cfg.id] = booths.filter((b) => b.category === cfg.id).length;
    });
    return counts;
  }, [booths]);

  // Filtered Booths
  const filteredBooths = useMemo(() => {
    return booths.filter((b) => {
      if (selectedCategory !== 'all' && b.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const num = (b.boothNumber || '').toLowerCase();
        const nameKo = (b.nameKo || b.titleKo || '').toLowerCase();
        const nameEn = (b.nameEn || b.titleEn || '').toLowerCase();
        const descKo = (b.descriptionKo || b.shortDescKo || '').toLowerCase();
        const descEn = (b.descriptionEn || b.shortDescEn || '').toLowerCase();
        const club = (b.clubKo || b.clubNameKo || '').toLowerCase();
        return (
          num.includes(q) ||
          nameKo.includes(q) ||
          nameEn.includes(q) ||
          descKo.includes(q) ||
          descEn.includes(q) ||
          club.includes(q)
        );
      }
      return true;
    });
  }, [booths, selectedCategory, searchQuery]);

  // Active groups to display
  const displayGroups = useMemo(() => {
    if (selectedCategory !== 'all') {
      const cfg = CATEGORY_CONFIGS.find((c) => c.id === selectedCategory);
      if (!cfg) return [];
      const items = filteredBooths.filter((b) => b.category === cfg.id);
      return items.length > 0 ? [{ config: cfg, items }] : [];
    }

    return CATEGORY_CONFIGS.map((cfg) => ({
      config: cfg,
      items: filteredBooths.filter((b) => b.category === cfg.id)
    })).filter((group) => group.items.length > 0);
  }, [selectedCategory, filteredBooths]);

  return (
    <section
      id="booth-section"
      className="pt-2 sm:pt-3 pb-12 sm:pb-16 px-4 sm:px-6 relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300/80 text-amber-300" />
            <span>{isKo ? '마법학교 캠퍼스 부스 탐방' : 'Campus Booths'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-pyeongchang">
            {isKo ? '캠퍼스 부스 & 푸드트럭' : t.booths.title}
          </h2>
        </div>

        {/* Campus Map */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-4xl flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
            <img
              src="/IMG_3236-1.jpeg"
              alt={isKo ? '캠퍼스 부스 배치도' : 'Campus Booth Map'}
              className="w-full h-auto max-h-[500px] sm:max-h-[640px] object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('booth_map.jpeg')) {
                  target.src = '/booth_map.jpeg';
                }
              }}
            />
          </div>
        </div>

        {/* Category Filter Tabs & Search */}
        <div className="bg-[#0e1424] rounded-2xl p-4 sm:p-5 border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isKo ? '부스 종류별 선택' : 'Filter by Booth Type'}</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {isKo
                  ? '체험, 게임, 수익, 액티비티, 홍보, 푸드트럭 부스별로 나눠서 확인하세요'
                  : 'Grouped into Experience, Games, Revenue, Activities, Promotion, and Food Trucks'}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isKo ? '부스명, 번호 검색 (예: 타로, 05번)' : 'Search booth name or number...'}
                className="w-full bg-[#090e1d] text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-8 pr-3 py-2 border border-white/10 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-1 font-sans">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow'
                  : 'bg-[#090e1d] border-white/5 text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>{isKo ? '전체 부스' : 'All Booths'}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  selectedCategory === 'all' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/10 text-slate-400'
                }`}
              >
                {categoryCounts.all || booths.length}
              </span>
            </button>

            {CATEGORY_CONFIGS.map((cfg) => {
              const isSelected = selectedCategory === cfg.id;
              const Icon = cfg.icon;
              const count = categoryCounts[cfg.id] || 0;

              return (
                <button
                  key={cfg.id}
                  onClick={() => setSelectedCategory(cfg.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#141d33] border-amber-400/60 text-amber-300 shadow font-semibold'
                      : 'bg-[#090e1d] border-white/5 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isKo ? cfg.nameKo : cfg.nameEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      isSelected ? 'bg-amber-400/20 text-amber-300 font-bold' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {displayGroups.length === 0 && (
          <div className="text-center py-16 bg-[#0e1424] rounded-2xl border border-white/5 space-y-2">
            <p className="text-sm text-slate-400">
              {isKo ? '검색 조건에 일치하는 부스가 없습니다.' : 'No booths found matching your search.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-amber-400 hover:underline cursor-pointer"
            >
              {isKo ? '필터 및 검색 초기화' : 'Reset filters'}
            </button>
          </div>
        )}

        {/* Grouped Booth Sections */}
        <div className="space-y-10">
          {displayGroups.map(({ config, items }) => {
            const GroupIcon = config.icon;

            return (
              <div key={config.id} className="space-y-4">
                {/* Category Header Banner */}
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                  <div className={`p-1.5 rounded-lg ${config.badgeColor}`}>
                    <GroupIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-pyeongchang">
                    {isKo ? config.nameKo : config.nameEn}
                  </h3>
                </div>

                {/* Booths Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                  {items.map((booth) => {
                    const isFoodTruck = booth.category === 'food';
                    const boothTitle = isKo
                      ? booth.nameKo || booth.titleKo
                      : booth.nameEn || booth.titleEn;

                    return (
                      <div
                        key={booth.id}
                        onClick={isFoodTruck ? () => onSelectBooth?.(booth) : undefined}
                        className={`bg-[#0e1424] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/5 flex flex-col justify-between shadow ${config.borderAccent} ${
                          isFoodTruck
                            ? 'cursor-pointer hover:bg-[#121a30] hover:border-amber-400/40 transition-all duration-200 group'
                            : ''
                        }`}
                      >
                        <div className="w-full flex flex-col items-center text-center">
                          {/* Top Bar: Booth Number & Category Badge */}
                          <div className="flex items-center justify-center gap-1.5 mb-2 w-full">
                            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 tabular-nums font-bold text-[11px] sm:text-xs px-2.5 py-0.5 rounded-md">
                              {booth.boothNumber}
                            </span>
                            <span className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md border ${config.badgeColor}`}>
                              {isKo ? config.nameKo : config.nameEn}
                            </span>
                          </div>

                          {/* Title */}
                          <div className="w-full">
                            <h4 className={`text-sm sm:text-base font-bold text-white line-clamp-1 ${isFoodTruck ? 'group-hover:text-amber-300 transition-colors' : ''}`}>
                              {boothTitle}
                            </h4>
                          </div>

                          {/* Highlights (e.g. 양말목 체험 키링) */}
                          {booth.highlightsKo && booth.highlightsKo.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-1 mt-2.5">
                              {(isKo ? booth.highlightsKo : (booth.highlightsEn || booth.highlightsKo)).map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer: Food truck has centered "메뉴보기" button (NO A-ZONE text), other booths have plain non-interactive location */}
                        {isFoodTruck ? (
                          <div className="w-full mt-3 pt-2.5 border-t border-white/5 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectBooth?.(booth);
                              }}
                              className="w-full py-1.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-bold transition-all border border-amber-400/30 text-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm group-hover:bg-amber-400 group-hover:text-slate-950"
                            >
                              <Utensils className="w-3.5 h-3.5" />
                              <span>{isKo ? '메뉴보기' : 'View Menu'}</span>
                            </button>
                          </div>
                        ) : (
                          <div className="w-full mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                            <span className="truncate">
                              {booth.locationZone}
                            </span>
                            {booth.operatingHours && (
                              <span className="text-slate-500 tabular-nums text-[10px] sm:text-[11px]">
                                {booth.operatingHours}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

