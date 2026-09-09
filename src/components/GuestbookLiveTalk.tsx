import React, { useState, useEffect } from 'react';
import { Send, Heart, MessageSquare, Moon, Trash2 } from 'lucide-react';
import { LiveMessage, Language } from '../types';
import { INITIAL_GUESTBOOK } from '../data/festivalData';
import { translations } from '../data/translations';

interface LiveTalkProps {
  language: Language;
}

const AVATARS = ['⭐', '🐱', '🌙', '🌸', '🔥', '💧', '⚡', '💨'];

export const GuestbookLiveTalk: React.FC<LiveTalkProps> = ({ language }) => {
  const t = translations[language];
  const isKo = language === 'ko';

  const [messages, setMessages] = useState<LiveMessage[]>(() => {
    const saved = localStorage.getItem('magic_festival_guestbook_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_GUESTBOOK;
      }
    }
    // Clean old storage and initialize with only the Gaehwa message
    localStorage.removeItem('magic_festival_guestbook');
    localStorage.removeItem('magic_festival_guestbook_v2');
    localStorage.setItem('magic_festival_guestbook_v3', JSON.stringify(INITIAL_GUESTBOOK));
    return INITIAL_GUESTBOOK;
  });

  const [inputText, setInputText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🐱');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [likedMessageIds, setLikedMessageIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('magic_festival_guestbook_likes_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('magic_festival_guestbook_v3', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('magic_festival_guestbook_likes_v3', JSON.stringify(likedMessageIds));
  }, [likedMessageIds]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const content = inputText.trim();
    if (!content) return;

    const name = authorName.trim() || (isKo ? '축제 방문객' : 'Festival Guest');
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMessage: LiveMessage = {
      id: `msg-${Date.now()}`,
      author: name,
      roleKo: '축제 학우',
      roleEn: 'Student',
      avatar: selectedAvatar,
      content,
      time: timeStr,
      likes: 1,
      magicElement: isKo ? '달빛' : 'Moonlight'
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputText('');
  };

  const handleLike = (id: string) => {
    const isLiked = likedMessageIds.includes(id);

    if (isLiked) {
      // 좋아요 취소
      setLikedMessageIds((prev) => prev.filter((mId) => mId !== id));
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, likes: Math.max(0, msg.likes - 1) } : msg))
      );
    } else {
      // 좋아요 추가
      setLikedMessageIds((prev) => [...prev, id]);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg))
      );
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <section id="live-talk-section" className="pt-2 sm:pt-3 pb-6 sm:pb-10 px-0 relative z-10 w-full overflow-hidden">
      <div className="w-full max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-2 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
            <Moon className="w-3.5 h-3.5 fill-amber-300/80 text-amber-300" />
            <span>{isKo ? '실시간 소통 광장' : 'Live Community Plaza'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-pyeongchang">
            {t.liveTalk.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light">
            {t.liveTalk.subtitle}
          </p>
        </div>

        {/* Composer */}
        <div className="bg-[#0e1424] rounded-2xl p-3 sm:p-5 border border-white/5 font-sans shadow-sm w-full box-border">
          <form onSubmit={handleSendMessage} className="space-y-2.5 w-full">
            {/* Nickname & Avatar: Single cohesive bar */}
            <div className="relative flex items-center gap-2 bg-[#090d18] border border-white/10 rounded-xl px-2.5 py-1.5 focus-within:border-amber-400/50 transition-colors w-full box-border min-w-0">
              {/* Selected Avatar Button */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 flex items-center gap-1 cursor-pointer border border-white/5 transition-transform active:scale-95 shrink-0"
                  title={isKo ? '프로필 이모지 변경' : 'Change Avatar'}
                >
                  <span className="text-base leading-none">{selectedAvatar}</span>
                  <span className="text-[10px] text-amber-300 font-semibold">{isKo ? '선택' : 'Pick'}</span>
                </button>

                {showAvatarPicker && (
                  <div className="absolute left-0 top-full mt-2 z-40 p-2 bg-[#0d1424] border border-amber-400/40 rounded-xl shadow-2xl flex flex-wrap gap-1.5 w-[168px]">
                    {AVATARS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(av);
                          setShowAvatarPicker(false);
                        }}
                        className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center cursor-pointer transition-all ${
                          selectedAvatar === av
                            ? 'bg-amber-400 text-slate-950 font-bold scale-105 shadow-sm'
                            : 'hover:bg-slate-800 text-white'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-[1px] h-5 bg-white/10 shrink-0" />

              <input
                type="text"
                placeholder={t.liveTalk.authorPlaceholder}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={20}
                className="flex-1 min-w-0 w-full bg-transparent px-1 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none truncate"
              />
            </div>

            <div className="flex items-center gap-2 w-full min-w-0">
              <input
                type="text"
                placeholder={t.liveTalk.sendPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={150}
                className="flex-1 min-w-0 w-full px-3 py-2.5 bg-[#090d18] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors truncate focus:overflow-visible"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="shrink-0 px-3 sm:px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
              >
                <span>{t.liveTalk.btnSend}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Message Stream */}
        <div className="space-y-2.5 font-sans">
          {messages.length === 0 ? (
            <div className="text-center py-10 px-4 bg-[#0e1424] rounded-2xl border border-white/5 space-y-1.5">
              <p className="text-sm text-slate-300 font-medium">
                {isKo ? '등록된 방명록이 없습니다.' : 'No messages yet.'}
              </p>
              <p className="text-xs text-slate-500">
                {isKo ? '첫 번째 응원 메시지를 남겨보세요! ✨' : 'Leave the first cheer message! ✨'}
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const hasLiked = likedMessageIds.includes(msg.id);

              return (
                <div
                  key={msg.id}
                  className="bg-[#0e1424] rounded-xl p-3.5 sm:p-4 border border-white/5 flex items-start gap-3 transition-colors hover:bg-[#12192e] group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#090d18] border border-white/5 flex items-center justify-center text-base flex-shrink-0">
                    {msg.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white">
                          {msg.author}
                        </span>
                        <span className="text-[10px] text-slate-500 tabular-nums">
                          {msg.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleLike(msg.id)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                            hasLiked
                              ? 'text-pink-400 bg-pink-950/30'
                              : 'text-slate-400 hover:text-pink-300 bg-[#090d18]'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${hasLiked ? 'fill-pink-400' : ''}`} />
                          <span>{msg.likes}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                          title={isKo ? '메시지 삭제' : 'Delete message'}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
