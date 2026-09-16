import React from 'react';
import {
  Moon,
  Sparkles,
  ShoppingBag,
  Heart,
  Gift
} from 'lucide-react';
import { Language } from '../types';

interface GoodsViewProps {
  language: Language;
  onBackToHome?: () => void;
  onNavigateToBooth?: (boothId?: string) => void;
}

export const GoodsView: React.FC<GoodsViewProps> = ({
  language
}) => {
  const isKo = language === 'ko';

  // 굿즈 품목 3종 상세 정보 (체험부스 데이터 양식과 100% 호환)
  const goodsItems = [
    {
      id: 'griptok',
      code: 'MD 01',
      titleKo: '맥세이프 그립톡',
      titleEn: 'MagSafe GripTok',
      priceKo: '3,000원',
      priceEn: '3,000 KRW',
      imageSrc: '/IMG_3232-2.jpeg',
      descriptionKo:
        '가로·세로 자유로운 각도 조절로 탁상용 스탠드까지 편리하게 활용 가능한 그립톡입니다!',
      descriptionEn:
        'A convenient MagSafe grip talk that freely adjusts in horizontal and vertical angles, doubling as a desktop kickstand!',
      renderGraphic: () => (
        <div className="w-full h-full bg-[#0a0f1d] flex items-center justify-center relative overflow-hidden select-none">
          <img
            src="/IMG_3232-2.jpeg"
            alt="맥세이프 그립톡"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )
    },
    {
      id: 'clicker',
      code: 'MD 02',
      titleKo: '깜냥이 클릭커',
      titleEn: 'Kkamnyangi Clicker',
      priceKo: '3,000원',
      priceEn: '3,000 KRW',
      imageSrc: '/IMG_3232-3.jpeg',
      descriptionKo:
        '상자 속에 쏙 들어간 깜냥이 디자인입니다!\n가방에 귀여운 키링으로 달고 다니다가, 손이 심심할 때마다 손안에서 가볍게 딸깍이며 스트레스를 날려보세요.',
      descriptionEn:
        'Adorable Kkamnyangi tucked right inside a box! Hang it on your bag as a cute keyring, and click it lightly in your hand whenever you are bored to relieve stress.',
      renderGraphic: () => (
        <div className="w-full h-full bg-[#0a0f1d] flex items-center justify-center relative overflow-hidden select-none">
          <img
            src="/IMG_3232-3.jpeg"
            alt="깜냥이 클릭커"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )
    },
    {
      id: 'stickers',
      code: 'MD 03',
      titleKo: '사계절 우표 스티커',
      titleEn: 'Four Seasons Stamp Stickers',
      priceKo: '1,000원',
      priceEn: '1,000 KRW',
      imageSrc: '/IMG_3231-1.jpeg',
      descriptionKo:
        '사계절의 매력을 담아 다이어리와 소품에 감성을 더하는 우표 스티커입니다!',
      descriptionEn:
        'Stamp stickers capturing the charm of four seasons, adding cozy sentimental vibes to diaries and accessories!',
      renderGraphic: () => (
        <div className="w-full h-full bg-[#0a0f1d] flex items-center justify-center relative overflow-hidden select-none">
          <img
            src="/IMG_3231-1.jpeg"
            alt="사계절 우표 스티커"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-7 relative z-10 font-sans">

      {/* =========================================================================
          1. 섹션 상단 헤더
          ========================================================================= */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
          <Moon className="w-3.5 h-3.5 fill-amber-300/80 text-amber-300" />
          <span>{isKo ? '마법학교 축제 공식 한정 굿즈' : 'Festival Official Merchandise'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isKo ? '축제 한정 굿즈 안내' : 'Official Festival Merchandise'}
        </h2>
      </div>

      {/* =========================================================================
          2. [필수 문구 1] 굿즈 판매수익은 전액 기부될 예정입니다.
          ========================================================================= */}
      <div className="bg-[#0e1424] rounded-2xl p-4 sm:p-5 border border-amber-400/40 shadow-xl text-center">
        <div className="flex items-center justify-center gap-2 text-amber-300">
          <Heart className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
          <h3 className="text-base sm:text-xl md:text-2xl font-black text-amber-300 tracking-tight">
            {isKo
              ? '✨ 굿즈 판매수익은 전액 기부될 예정입니다. ✨'
              : '✨ All proceeds from goods sales will be fully donated. ✨'}
          </h3>
          <Heart className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
        </div>
      </div>

      {/* =========================================================================
          3. [체험부스 양식] 뒤쪽 배경 네모칸 컨테이너
          ========================================================================= */}
      <div className="bg-[#0e1424] rounded-2xl p-4 sm:p-6 border border-white/10 space-y-5 shadow-2xl">
        
        {/* 상단 타이틀 바 */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {isKo ? '축제 공식 굿즈 품목' : 'Official Merchandise'}
          </h3>
        </div>

        {/* 굿즈 카드 그리드: 격자형 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {goodsItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#11182c] rounded-2xl p-4 sm:p-5 border border-amber-400/30 hover:border-amber-400/60 shadow-xl flex flex-col justify-between transition-all duration-200 group"
            >
              <div className="w-full flex flex-col space-y-3">
                {/* 1. 상단 바: 품목 코드 */}
                <div className="flex items-center justify-between gap-1.5 w-full">
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 tabular-nums font-extrabold text-xs px-2.5 py-1 rounded-lg">
                    {item.code}
                  </span>
                </div>

                {/* 2. 사진과 가격이 나란히 정렬되는 수평 헤더 */}
                <div className="flex items-center gap-3 w-full bg-[#0a0f1d] p-3 rounded-xl border border-white/10 shadow-inner">
                  {/* 좌측: 제품 사진/그래픽 (정사각형 박스) */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-amber-400/40 bg-[#060a14] flex items-center justify-center relative shadow">
                    {item.renderGraphic()}
                  </div>

                  {/* 우측: 상품명 & 대형 가격 나란히 정렬 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                      {isKo ? item.titleKo : item.titleEn}
                    </h4>
                    <div className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums mt-0.5">
                      {isKo ? item.priceKo : item.priceEn}
                    </div>
                  </div>
                </div>

                {/* 3. 상세 설명 글씨 */}
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed whitespace-pre-line">
                  {isKo ? item.descriptionKo : item.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          4. [선착순 이벤트] 선착순 띠부씰 증정 안내 배너
          ========================================================================= */}
      <div className="bg-gradient-to-r from-amber-500/20 via-[#131b31] to-amber-500/20 rounded-xl py-3 px-4 sm:px-5 border border-amber-400/50 shadow-xl text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 text-amber-300">
          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight whitespace-nowrap">
            {isKo
              ? '🎁 굿즈 구매자 선착순 띠부씰 증정 이벤트!'
              : '🎁 First-Come, First-Served Ttibuseal Gift Event!'}
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          {isKo ? (
            <>
              축제 공식 굿즈를 구매하시는 분들께 한정판 깜냥이 띠부씰을 선착순으로 증정합니다.
              <br />
              (수량 소진 시 조기 마감될 수 있습니다.)
            </>
          ) : (
            <>
              Limited edition Kkamnyangi seal stickers will be gifted on a first-come, first-served basis.
              <br />
              (Event may close early once stocks run out.)
            </>
          )}
        </p>
      </div>

    </div>
  );
};
