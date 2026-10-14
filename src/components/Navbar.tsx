import React from 'react';
import { UserProgress } from '../types';
import { 
  Volume2, 
  VolumeX, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  CheckSquare, 
  Link2, 
  Layers,
  Flame
} from 'lucide-react';
import { playPop, setSoundEnabled, isSoundEnabled } from '../utils/audio';

export type ActiveTab = 'intro' | 'rules' | 'habits' | 'grimoire' | 'lab';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  onOpenStickers: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  progress,
  onOpenStickers,
}) => {
  const [muted, setMuted] = React.useState(!isSoundEnabled());

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setSoundEnabled(!next);
    if (!next) {
      playPop();
    }
  };

  const navItems = [
    { id: 'intro' as ActiveTab, label: '🌟 Introducción & Clases', icon: Sparkles, badge: 'Inicio' },
    { id: 'rules' as ActiveTab, label: 'Classroom Rules', icon: CheckSquare, badge: '5 Preguntas' },
    { id: 'habits' as ActiveTab, label: 'Study Habits', icon: Link2, badge: '10 Conexiones' },
    { id: 'grimoire' as ActiveTab, label: 'Grimorio de Reglas', icon: BookOpen, badge: 'Fórmulas' },
    { id: 'lab' as ActiveTab, label: 'Sentence Lab', icon: Layers, badge: 'Práctica' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#160d24]/95 backdrop-blur-md border-b border-purple-500/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-lg shadow-md border border-pink-400">
              💀
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-extrabold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-200 to-purple-300 leading-tight">
                  Kuromi&apos;s Academy
                </h1>
                <span className="bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                  A2 English
                </span>
              </div>
              <p className="text-[11px] text-purple-300 hidden sm:block">
                Zero & First Conditional Gamified Adventure
              </p>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-1 bg-purple-950/80 border border-orange-500/40 px-2.5 py-1 rounded-xl text-xs font-bold text-orange-300" title="Racha de aciertos seguidos">
              <Flame size={14} className="fill-orange-500 text-orange-400 animate-pulse" />
              <span>{progress.streak}</span>
            </div>

            {/* Level & Trophy */}
            <button
              onClick={() => {
                playPop();
                onOpenStickers();
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-900/80 to-pink-950/80 hover:from-purple-800 hover:to-pink-900 border border-pink-500/40 px-3 py-1 rounded-xl text-xs font-bold text-pink-200 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="Ver Stickers y Certificado"
            >
              <Trophy size={14} className="text-yellow-400" />
              <span className="hidden sm:inline">Nivel {progress.level}</span>
              <span className="text-pink-400 font-extrabold">({progress.xp} XP)</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-pink-300 transition-colors cursor-pointer"
              title={muted ? 'Activar Sonidos' : 'Silenciar'}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  playPop();
                  onSelectTab(item.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'bg-[#1e1330] hover:bg-[#281a42] text-purple-300 hover:text-pink-200 border border-purple-500/20'
                }`}
              >
                <Icon size={15} />
                <span>{item.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold hidden sm:inline ${
                    isActive ? 'bg-white/20 text-white' : 'bg-purple-950 text-purple-400'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
