import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Sparkles, Moon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = translations[language];
  const isKo = language === 'ko';
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedKakao, setCopiedKakao] = useState(false);

  const shareUrl = window.location.href;

  const kakaoMessageText = isKo
    ? `[2026 마법학교 동아리밤 초대장 🪄🌙]\n\n제33대 총동아리연합회 개화와 함께하는 신비한 달빛 축제!\n- 장소: 한국기술교육대학교 중앙 잔디밭\n- 일시: 2026.09.17(목) 10:30~23:25\n- 메인공연: 18:20~23:00 (K-오케스트라, 제스트, 선문대 태권도, 스콘, 빠샤 등)\n- 낮/밤 부스 & 23:10 상품추첨!\n\n마지와 함께 마법 같은 축제를 즐기러 가요!\n👉 ${shareUrl}`
    : `[2026 Magic Academy Club Night Invitation 🪄🌙]\n\nJoin the 33rd Club Association Gaehwa for an enchanted night!\n- Location: KOREATECH Central Lawn\n- Date: Sept 17, 2026 (Thu)\n- Live Shows: 18:20 ~ 23:00\n- Day & Night Booths + Grand Lucky Draw at 23:10!\n\n👉 ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyKakaoText = () => {
    navigator.clipboard.writeText(kakaoMessageText);
    setCopiedKakao(true);
    setTimeout(() => setCopiedKakao(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '2026 마법학교 동아리밤',
          text: kakaoMessageText,
          url: shareUrl
        });
      } catch {
        // safe fallback
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050814]/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md night-card-gold rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-amber-400/30 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#060b17] border border-amber-400/40 flex items-center justify-center text-2xl mx-auto mb-2 shadow-md">
            💌
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight font-serif-magic">
            {t.share.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.share.subtitle}
          </p>
        </div>

        {/* Share Preview Card */}
        <div className="bg-[#060b17] border border-indigo-950 rounded-2xl p-4 mb-5 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.share.cardTitle}</span>
          </div>
          <p className="text-slate-300 whitespace-pre-line leading-relaxed text-[11px] font-light">
            {kakaoMessageText}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleCopyKakaoText}
            className="w-full py-3.5 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-[#191919]" />
            <span>{copiedKakao ? (isKo ? '메시지가 복사되었습니다! 🎉' : 'Message Copied! 🎉') : t.share.shareKaKao}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? t.share.copySuccess : t.share.copyLink}</span>
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.share.shareNative}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
