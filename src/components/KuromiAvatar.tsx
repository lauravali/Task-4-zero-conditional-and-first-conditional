import React from 'react';
import { KuromiMood } from '../types';

interface KuromiAvatarProps {
  mood?: KuromiMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const KuromiAvatar: React.FC<KuromiAvatarProps> = ({
  mood = 'idle',
  size = 'md',
  className = '',
  onClick,
  interactive = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  // Determine eyes and mouth according to mood
  const renderFace = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
        return (
          <>
            {/* Happy curved eyes ^^ */}
            <path d="M 68 85 Q 76 75 84 85" stroke="#1f182c" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 116 85 Q 124 75 132 85" stroke="#1f182c" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Blushing */}
            <ellipse cx="64" cy="94" rx="8" ry="4" fill="#fb7185" opacity="0.8" />
            <ellipse cx="136" cy="94" rx="8" ry="4" fill="#fb7185" opacity="0.8" />
            {/* Big open happy mouth with tongue */}
            <path d="M 90 94 Q 100 114 110 94 Z" fill="#e11d48" />
            <path d="M 95 104 Q 100 98 105 104" fill="#fda4af" />
          </>
        );

      case 'sassy':
        return (
          <>
            {/* Sassy wink & smirk */}
            {/* Left eye open with sharp anime shine */}
            <ellipse cx="76" cy="85" rx="7" ry="11" fill="#1e152d" />
            <circle cx="74" cy="80" r="3" fill="#ffffff" />
            <circle cx="78" cy="89" r="1.5" fill="#f472b6" />
            {/* Right eye winking line */}
            <path d="M 116 86 Q 124 78 132 86" stroke="#1e152d" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Blushing */}
            <ellipse cx="64" cy="94" rx="7" ry="4" fill="#f43f5e" opacity="0.75" />
            <ellipse cx="136" cy="94" rx="7" ry="4" fill="#f43f5e" opacity="0.75" />
            {/* Sassy side cat-smirk */}
            <path d="M 94 96 Q 104 94 110 92 Q 107 101 98 99" stroke="#1e152d" strokeWidth="3" fill="#ec4899" strokeLinecap="round" />
          </>
        );

      case 'shocked':
        return (
          <>
            {/* Wide surprised eyes */}
            <ellipse cx="74" cy="85" rx="8" ry="12" fill="#1e152d" />
            <circle cx="72" cy="81" r="3" fill="#ffffff" />
            <ellipse cx="126" cy="85" rx="8" ry="12" fill="#1e152d" />
            <circle cx="124" cy="81" r="3" fill="#ffffff" />
            {/* Blue sweat drop on temple */}
            <path d="M 142 70 C 142 66 146 62 146 62 C 146 62 150 66 150 70 C 150 74 146 76 142 70 Z" fill="#38bdf8" />
            {/* Small 'O' mouth */}
            <ellipse cx="100" cy="97" rx="5" ry="7" fill="#1e152d" />
          </>
        );

      case 'thinking':
        return (
          <>
            {/* Looking up-right thinking */}
            <ellipse cx="78" cy="81" rx="7" ry="10" fill="#1e152d" />
            <circle cx="80" cy="77" r="3" fill="#ffffff" />
            <ellipse cx="128" cy="81" rx="7" ry="10" fill="#1e152d" />
            <circle cx="130" cy="77" r="3" fill="#ffffff" />
            {/* Blushing */}
            <ellipse cx="65" cy="93" rx="6" ry="3" fill="#f472b6" opacity="0.6" />
            <ellipse cx="135" cy="93" rx="6" ry="3" fill="#f472b6" opacity="0.6" />
            {/* Pouting wave mouth */}
            <path d="M 94 95 Q 98 98 102 95 Q 106 92 110 95" stroke="#1e152d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );

      case 'proud':
      case 'explaining':
      case 'cheering':
      default:
        return (
          <>
            {/* Normal / cute confident Kuromi face */}
            <ellipse cx="76" cy="84" rx="7.5" ry="11" fill="#1e152d" />
            <circle cx="74" cy="79" r="3" fill="#ffffff" />
            <circle cx="78" cy="89" r="1.5" fill="#f472b6" />
            
            <ellipse cx="124" cy="84" rx="7.5" ry="11" fill="#1e152d" />
            <circle cx="122" cy="79" r="3" fill="#ffffff" />
            <circle cx="126" cy="89" r="1.5" fill="#f472b6" />

            {/* Rosy cute cheeks */}
            <ellipse cx="63" cy="94" rx="7" ry="4" fill="#fb7185" opacity="0.7" />
            <ellipse cx="137" cy="94" rx="7" ry="4" fill="#fb7185" opacity="0.7" />

            {/* Little Kuromi cat mouth */}
            <path d="M 94 95 Q 98 99 100 95 Q 102 99 106 95" stroke="#1e152d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`relative select-none inline-block transition-transform duration-300 ${sizeMap[size]} ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${className}`}
      title="¡Haz clic en Kuromi para hablar con ella!"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(168,85,247,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="kuromiBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e223b" />
            <stop offset="50%" stopColor="#1e1529" />
            <stop offset="100%" stopColor="#120c1a" />
          </linearGradient>
          <linearGradient id="pinkSkull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff85c0" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Devil Tail (Right side behind body) */}
        <path
          d="M 125 145 Q 165 140 160 115 Q 155 95 170 85"
          stroke="#1e1529"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Tail Spade */}
        <polygon points="170,75 160,90 180,90" fill="#1e1529" transform="rotate(35 170 85)" />

        {/* Jester Hat - Left Ear */}
        <path
          d="M 70 65 C 50 40 30 15 15 35 C 5 48 35 65 60 75 Z"
          fill="url(#kuromiBlack)"
        />
        {/* Left Ear Pink Pom-Pom Ball */}
        <circle cx="15" cy="35" r="7.5" fill="#f472b6" filter="url(#softGlow)" />
        <circle cx="13" cy="33" r="2.5" fill="#ffffff" />

        {/* Jester Hat - Right Ear */}
        <path
          d="M 130 65 C 150 40 170 15 185 35 C 195 48 165 65 140 75 Z"
          fill="url(#kuromiBlack)"
        />
        {/* Right Ear Pink Pom-Pom Ball */}
        <circle cx="185" cy="35" r="7.5" fill="#f472b6" filter="url(#softGlow)" />
        <circle cx="183" cy="33" r="2.5" fill="#ffffff" />

        {/* Jester Hat Dome / Hood (top of head) */}
        <path
          d="M 52 70 C 52 28 148 28 148 70 C 152 90 148 110 144 115 C 130 120 70 120 56 115 C 52 110 48 90 52 70 Z"
          fill="url(#kuromiBlack)"
        />

        {/* White Chibi Face */}
        <ellipse cx="100" cy="88" rx="46" ry="34" fill="#ffffff" />

        {/* Jester Hat Forehead Peak (widow's peak framing face) */}
        <path
          d="M 54 75 C 64 68 82 66 100 78 C 118 66 136 68 146 75 C 135 56 115 50 100 50 C 85 50 65 56 54 75 Z"
          fill="url(#kuromiBlack)"
        />

        {/* Pink Skull Emblem on Kuromi's Hat */}
        <g id="kuromiSkull" transform="translate(100, 46) scale(0.9)">
          {/* Skull head */}
          <ellipse cx="0" cy="0" rx="11" ry="9" fill="url(#pinkSkull)" />
          {/* Skull jaw */}
          <rect x="-6" y="5" width="12" height="6" rx="2" fill="url(#pinkSkull)" />
          {/* Skull eyes */}
          <circle cx="-4" cy="0" r="2.4" fill="#1e1529" />
          <circle cx="4" cy="0" r="2.4" fill="#1e1529" />
          {/* Skull nose */}
          <polygon points="0,2 -1,4 1,4" fill="#1e1529" />
          {/* Skull teeth indentations */}
          <line x1="-2" y1="8" x2="-2" y2="11" stroke="#1e1529" strokeWidth="1" />
          <line x1="2" y1="8" x2="2" y2="11" stroke="#1e1529" strokeWidth="1" />
        </g>

        {/* Facial features (eyes, mouth, blush) */}
        {renderFace()}

        {/* Tiny nose */}
        <ellipse cx="100" cy="90" rx="2" ry="1.5" fill="#1e1529" />

        {/* Jester Collar / Neck Ruff with Pink Baubles */}
        <g id="collar" transform="translate(100, 122)">
          {/* Collar points */}
          <path
            d="M -44 0 L -30 14 L -15 2 L 0 16 L 15 2 L 30 14 L 44 0 Z"
            fill="url(#kuromiBlack)"
          />
          {/* Pink baubles at tips */}
          <circle cx="-30" cy="14" r="4.5" fill="#f472b6" />
          <circle cx="0" cy="16" r="5" fill="#f472b6" />
          <circle cx="30" cy="14" r="4.5" fill="#f472b6" />
        </g>

        {/* Body (chubby little torso) */}
        <path
          d="M 75 125 C 75 125 70 162 76 166 C 85 170 115 170 124 166 C 130 162 125 125 125 125 Z"
          fill="url(#kuromiBlack)"
        />

        {/* Little Arms */}
        {mood === 'celebrating' || mood === 'cheering' ? (
          <>
            {/* Arms raised up in cheer! */}
            <path d="M 72 128 C 55 115 50 100 58 98 C 65 96 74 116 75 124" fill="url(#kuromiBlack)" />
            <path d="M 128 128 C 145 115 150 100 142 98 C 135 96 126 116 125 124" fill="url(#kuromiBlack)" />
          </>
        ) : (
          <>
            {/* Little paws resting forward */}
            <ellipse cx="74" cy="138" rx="8" ry="6" fill="url(#kuromiBlack)" transform="rotate(-15 74 138)" />
            <ellipse cx="126" cy="138" rx="8" ry="6" fill="url(#kuromiBlack)" transform="rotate(15 126 138)" />
          </>
        )}

        {/* Little stubby feet */}
        <ellipse cx="86" cy="167" rx="8" ry="6" fill="url(#kuromiBlack)" />
        <ellipse cx="114" cy="167" rx="8" ry="6" fill="url(#kuromiBlack)" />

        {/* Accessory: Sparkle star if celebrating */}
        {mood === 'celebrating' && (
          <g transform="translate(150, 40) scale(0.8)">
            <path
              d="M 0 -15 L 4 -4 L 15 0 L 4 4 L 0 15 L -4 4 L -15 0 L -4 -4 Z"
              fill="#fbbf24"
              filter="url(#softGlow)"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
