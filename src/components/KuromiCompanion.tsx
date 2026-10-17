import React, { useState } from 'react';
import { KuromiAvatar } from './KuromiAvatar';
import { KuromiMood, UserProgress } from '../types';
import { KUROMI_QUOTES } from '../data/conditionalsData';
import { playKuromiGiggle, playPop } from '../utils/audio';
import { Sparkles, MessageCircle, Heart, ChevronDown, ChevronUp } from 'lucide-react';

interface KuromiCompanionProps {
  mood: KuromiMood;
  customMessage?: string;
  progress: UserProgress;
  onPet?: () => void;
}

export const KuromiCompanion: React.FC<KuromiCompanionProps> = ({
  mood,
  customMessage,
  progress,
  onPet,
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [heartsEffect, setHeartsEffect] = useState<{ id: number; x: number; y: number }[]>([]);

  // Sassy companion responses on tap
  const handleMascotClick = (e: React.MouseEvent) => {
    playKuromiGiggle();
    playPop();

    // Trigger floating heart animation
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setHeartsEffect(prev => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setHeartsEffect(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1200);

    // Rotate speech bubble to next sassy tip or fun quote
    const allQuotes = [
      ...KUROMI_QUOTES.sassyTips,
      ...KUROMI_QUOTES.welcome,
      "¡Hazme caso y ganarás 100 de XP!",
      "¿Sabías que en Zero Conditional ambas cláusulas van en Presente Simple?",
      "¡Si estudias hoy, mañana aprobarás el examen! (¡Eso es First Conditional!)",
      "¡Me encanta el negro, el rosa y los estudiantes que conjugan bien los verbos!"
    ];
    setCurrentQuoteIndex(prev => (prev + 1) % allQuotes.length);

    if (onPet) onPet();
  };

  const activeMessage = customMessage || [
    ...KUROMI_QUOTES.sassyTips,
    ...KUROMI_QUOTES.welcome,
  ][currentQuoteIndex % (KUROMI_QUOTES.sassyTips.length + KUROMI_QUOTES.welcome.length)];

  // Level Titles
  const getLevelName = (lvl: number) => {
    if (lvl <= 1) return 'Rookie Rebel';
    if (lvl === 2) return 'Troublemaker Scholar';
    if (lvl === 3) return 'Grammar Rockstar';
    if (lvl === 4) return 'Master of If Clauses';
    return 'Kuromi Bestie & Queen';
  };

  return (
    <div className="bg-[#241738]/90 backdrop-blur-md border-2 border-[#a855f7]/40 rounded-3xl p-4 shadow-[0_12px_30px_rgba(168,85,247,0.25)] relative overflow-hidden transition-all duration-300">
      {/* Background cute pattern */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/20 blur-xl pointer-events-none" />

      {/* Top Bar inside card */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-xs">
            💀
          </div>
          <span className="font-display font-bold text-sm tracking-wide text-pink-300 uppercase">
            Kuromi Companion
          </span>
          <span className="bg-purple-900/60 text-purple-300 border border-purple-600/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
            Lv. {progress.level} · {getLevelName(progress.level)}
          </span>
        </div>

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-purple-300 hover:text-pink-300 p-1 rounded-lg transition-colors"
          title={isMinimized ? "Expandir Kuromi" : "Minimizar"}
        >
          {isMinimized ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {!isMinimized && (
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
          {/* Avatar with tap effect and floating hearts */}
          <div className="relative group shrink-0">
            <div
              onClick={handleMascotClick}
              className="relative p-1 rounded-2xl cursor-pointer hover:bg-purple-500/10 transition-all active:scale-95"
            >
              <KuromiAvatar
                mood={mood}
                size="md"
                className="animate-bounce-cute"
              />

              {/* Floating Hearts Animation */}
              {heartsEffect.map(h => (
                <div
                  key={h.id}
                  className="absolute pointer-events-none text-pink-400 animate-ping font-bold text-lg"
                  style={{ left: h.x, top: h.y }}
                >
                  💜
                </div>
              ))}

              {/* Interactive badge badge */}
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-pink-300">
                <Heart size={10} className="fill-current text-white animate-pulse" />
                <span>Tap me!</span>
              </div>
            </div>
          </div>

          {/* Speech bubble */}
          <div className="flex-1 w-full">
            <div className="relative bg-[#1a1129] border border-pink-500/40 rounded-2xl p-3 shadow-inner text-left">
              {/* Cute speech bubble pointer */}
              <div className="hidden sm:block absolute -left-2 top-6 w-3 h-3 bg-[#1a1129] border-l border-t border-pink-500/40 rotate-[-45deg]" />

              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1 uppercase tracking-wider">
                  <MessageCircle size={12} /> KUROMI SAYS:
                </span>
                <span className="text-[10px] text-purple-300/70">
                  (Tap Kuromi for more tips)
                </span>
              </div>

              <p className="text-sm font-semibold text-pink-100 leading-snug">
                {activeMessage}
              </p>
            </div>

            {/* XP bar */}
            <div className="mt-3 bg-purple-950/60 rounded-xl p-2 border border-purple-500/20">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-purple-300 flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" /> Mischief XP
                </span>
                <span className="text-pink-300">{progress.xp % 100} / 100 XP</span>
              </div>
              <div className="w-full bg-[#150d22] h-2.5 rounded-full overflow-hidden border border-purple-800">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  style={{ width: `${Math.min(100, Math.max(8, progress.xp % 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
