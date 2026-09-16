export type Language = 'ko' | 'en';

export interface PerformanceItem {
  id: string;
  titleKo: string;
  titleEn: string;
  clubNameKo: string;
  clubNameEn: string;
  category: 'opening' | 'music' | 'dance' | 'martial' | 'content' | 'raffle' | 'closing';
  startTime: string; // "18:20"
  endTime: string;   // "18:35"
  startMinutes: number; // 18*60 + 20 = 1100
  endMinutes: number;   // 18*60 + 35 = 1115
  descriptionKo: string;
  descriptionEn: string;
  tagsKo: string[];
  tagsEn: string[];
  performerInfoKo?: string;
  performerInfoEn?: string;
  setListKo?: string[];
  setListEn?: string[];
  locationKo: string;
  locationEn: string;
  antidoteClueKo?: string;
  antidoteClueEn?: string;
}

export interface BoothItem {
  id: string;
  nameKo: string;
  nameEn: string;
  clubKo: string;
  clubEn: string;
  timeType: 'day' | 'night' | 'both';
  timeRange: string;
  operatingHoursKo?: string;
  operatingHoursEn?: string;
  category: 'food' | 'experience' | 'game' | 'profit' | 'activity' | 'promotion' | 'goods' | 'pub' | 'event';
  categoryKo?: string;
  categoryEn?: string;
  locationZone: string;
  locationZoneEn: string;
  boothNumber: string;
  shortDescKo: string;
  shortDescEn: string;
  fullDescKo: string;
  fullDescEn: string;
  highlightsKo?: string[];
  highlightsEn?: string[];
  menuItems?: {
    nameKo: string;
    nameEn: string;
    price: string;
    tag?: string;
  }[];
  elementRewardKo?: string;
  elementRewardEn?: string;
  isPopular?: boolean;
  // Compatibility helper fields
  titleKo?: string;
  titleEn?: string;
  clubNameKo?: string;
  clubNameEn?: string;
  descriptionKo?: string;
  descriptionEn?: string;
}

export interface MagicElement {
  id: string;
  nameKo: string;
  nameEn: string;
  symbol: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  fortuneKo: string;
  fortuneEn: string;
  recommendedBoothId: string;
  boothReasonKo: string;
  boothReasonEn: string;
  color: string;
  bgColor: string;
  glowColor: string;
  catCommentKo: string;
  catCommentEn: string;
  potionBonusMl: number;
}

export interface LiveMessage {
  id: string;
  author: string;
  roleKo: string;
  roleEn: string;
  avatar: string; // emoji or cat variant
  content: string;
  time: string;
  likes: number;
  magicElement?: string;
  isOfficial?: boolean;
}

export interface OverallScheduleItem {
  id: string;
  titleKo: string;
  titleEn: string;
  timeRange: string;
  startMinutes: number;
  endMinutes: number;
  type: 'day_booth' | 'night_booth' | 'ceremony' | 'performance' | 'raffle' | 'closing';
  locationKo: string;
  locationEn: string;
  icon: string;
}
