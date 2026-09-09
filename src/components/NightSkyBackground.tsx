import React, { useMemo } from 'react';

export const NightSkyBackground: React.FC = () => {
  // Generate random static stars once
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 70; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 2.2 + 0.8;
      const opacity = Math.random() * 0.7 + 0.3;
      const animClass =
        i % 3 === 0
          ? 'animate-twinkle-1'
          : i % 3 === 1
          ? 'animate-twinkle-2'
          : 'animate-twinkle-3';
      const isCross = i % 8 === 0;
      const color =
        i % 5 === 0 ? '#fde047' : i % 4 === 0 ? '#bae6fd' : '#ffffff';

      arr.push({ id: i, top, left, size, opacity, animClass, isCross, color });
    }
    return arr;
  }, []);

  return (
    <div
      id="celestial-night-sky"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Clearer, More Luminous Midnight Navy Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#182449] to-[#0e172e]" />

      {/* 2. Soft Atmospheric Radiant Glows */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[130px]" />
      <div className="absolute top-1/3 left-1/10 w-[550px] h-[550px] bg-sky-600/18 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/6 w-[650px] h-[650px] bg-amber-400/10 rounded-full blur-[140px]" />
      <div className="absolute top-2/3 left-1/3 w-[600px] h-[600px] bg-blue-500/12 rounded-full blur-[150px]" />

      {/* 3. Celestial Glowing Moon (Upper Right) */}
      <div className="absolute top-8 right-6 sm:top-14 sm:right-16 md:right-28 pointer-events-none">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 animate-float-slow">
          {/* Moon Outer Halo Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/35 via-yellow-400/20 to-transparent blur-2xl animate-moon-pulse" />
          
          {/* Crescent Moon SVG with Cratering & Star Accent */}
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_0_30px_rgba(253,224,71,0.65)]"
          >
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fef08a" />
                <stop offset="80%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="innerShadow" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#182449" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Glowing Crescent Body */}
            <path
              d="M 120 20 A 65 65 0 1 0 120 140 A 52 52 0 1 1 120 20 Z"
              fill="url(#moonGrad)"
            />

            {/* Subtle Surface Details / Moon Craters */}
            <circle cx="58" cy="72" r="5" fill="#d97706" opacity="0.35" />
            <circle cx="70" cy="50" r="3.5" fill="#d97706" opacity="0.3" />
            <circle cx="52" cy="98" r="4" fill="#d97706" opacity="0.25" />
            <circle cx="40" cy="80" r="2.5" fill="#d97706" opacity="0.3" />

            {/* Sparkle Star near the moon tip */}
            <g transform="translate(132, 28) scale(0.7)">
              <polygon
                points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3"
                fill="#fef08a"
              />
              <circle cx="0" cy="0" r="2" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>

      {/* 4. Drifting Layered Midnight Clouds */}
      {/* Cloud Layer 1 - High altitude, soft and wide */}
      <div className="absolute top-16 -left-20 w-[140%] h-48 opacity-45 animate-cloud-1 pointer-events-none">
        <svg viewBox="0 0 1200 200" className="w-full h-full fill-indigo-900/50 blur-md">
          <path d="M0,100 C150,40 300,140 450,80 C600,20 750,130 900,70 C1050,30 1150,90 1200,100 L1200,200 L0,200 Z" />
        </svg>
      </div>

      {/* Cloud Layer 2 - Mid altitude, drifting from right with subtle silver-blue rim */}
      <div className="absolute top-36 -right-20 w-[130%] h-56 opacity-35 animate-cloud-2 pointer-events-none">
        <svg viewBox="0 0 1200 220" className="w-full h-full fill-slate-800/60 blur-lg">
          <path d="M0,120 C180,60 320,160 500,90 C680,40 820,150 1000,80 C1120,40 1180,110 1200,120 L1200,220 L0,220 Z" />
        </svg>
      </div>

      {/* Cloud Layer 3 - Lower subtle misty clouds */}
      <div className="absolute bottom-10 left-0 w-full h-40 opacity-30 pointer-events-none">
        <svg viewBox="0 0 1200 180" className="w-full h-full fill-blue-900/40 blur-xl">
          <path d="M0,80 C200,130 400,50 600,100 C800,140 1000,60 1200,90 L1200,180 L0,180 Z" />
        </svg>
      </div>

      {/* 5. Twinkling Field of Stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className={`absolute ${s.animClass}`}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`
            }}
          >
            {s.isCross ? (
              <div
                className="relative flex items-center justify-center"
                style={{ width: `${s.size * 2.5}px`, height: `${s.size * 2.5}px` }}
              >
                <div
                  className="absolute w-full h-[1px]"
                  style={{ backgroundColor: s.color, opacity: s.opacity }}
                />
                <div
                  className="absolute h-full w-[1px]"
                  style={{ backgroundColor: s.color, opacity: s.opacity }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: `0 0 6px ${s.color}`
                  }}
                />
              </div>
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: s.color,
                  opacity: s.opacity,
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}`
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 6. Subtle Constellation Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {/* Ursa Major / Dipper shape illusion in the sky */}
        <polyline
          points="120,90 190,110 240,160 300,170 340,230 420,220 390,165 300,170"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="0.75"
          strokeDasharray="3 3"
        />
        {/* Cassiopeia W shape */}
        <polyline
          points="820,100 860,70 900,110 950,65 990,95"
          fill="none"
          stroke="#fef08a"
          strokeWidth="0.75"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
};
