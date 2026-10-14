import { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { KuromiCompanion } from './components/KuromiCompanion';
import { IntroGuide } from './components/IntroGuide';
import { ClassroomRulesQuiz } from './components/ClassroomRulesQuiz';
import { StudyHabitsMatch } from './components/StudyHabitsMatch';
import { GrammarGuide } from './components/GrammarGuide';
import { SentenceBuilder } from './components/SentenceBuilder';
import { StickerBookModal } from './components/StickerBookModal';
import { UserProgress, KuromiMood } from './types';
import { playFanfare, playPop } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, BookOpen, CheckSquare, Link2, Heart, HelpCircle } from 'lucide-react';

const STORAGE_KEY = 'kuromi_academy_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  score: 0,
  xp: 40,
  level: 1,
  streak: 0,
  highestStreak: 0,
  completedClassroom: false,
  completedStudyHabits: false,
  unlockedStickers: ['rookie_rebel'],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('intro');
  const [kuromiMood, setKuromiMood] = useState<KuromiMood>('idle');
  const [customKuromiMessage, setCustomKuromiMessage] = useState<string | undefined>(
    '¡Bienvenido a mi academia! Aquí tienes la introducción y la explicación completa de Zero y First Conditional.'
  );
  const [isStickerBookOpen, setIsStickerBookOpen] = useState(false);

  // Load progress from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROGRESS;
  });

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  const handleSetKuromiMood = (mood: KuromiMood, customText?: string) => {
    setKuromiMood(mood);
    if (customText) {
      setCustomKuromiMessage(customText);
    }
  };

  const handleProgressUpdate = (xpGained: number, correct: boolean) => {
    setProgress(prev => {
      const newXp = prev.xp + xpGained;
      const newLevel = Math.max(1, Math.floor(newXp / 80) + 1);
      const newStreak = correct ? prev.streak + 1 : 0;
      const newHighest = Math.max(prev.highestStreak, newStreak);

      const stickers = [...prev.unlockedStickers];
      if (newLevel >= 2 && !stickers.includes('zero_hero')) {
        stickers.push('zero_hero');
      }
      if (newLevel >= 3 && !stickers.includes('first_class_diva')) {
        stickers.push('first_class_diva');
      }

      // Check level up celebration
      if (newLevel > prev.level) {
        playFanfare();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#ec4899', '#a855f7', '#fb7185', '#38bdf8'],
        });
        setKuromiMood('celebrating');
        setCustomKuromiMessage(`¡SUBISTE DE NIVEL! Ahora eres Nivel ${newLevel}. ¡Sigue así, secuaz!`);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        highestStreak: newHighest,
        unlockedStickers: stickers,
      };
    });
  };

  const handleCompleteClassroom = () => {
    setProgress(prev => {
      const stickers = [...prev.unlockedStickers];
      if (!stickers.includes('classroom_ruler')) stickers.push('classroom_ruler');
      if (prev.completedStudyHabits && !stickers.includes('kuromi_bestie')) {
        stickers.push('kuromi_bestie');
      }
      return {
        ...prev,
        completedClassroom: true,
        unlockedStickers: stickers,
      };
    });
  };

  const handleCompleteStudyHabits = () => {
    setProgress(prev => {
      const stickers = [...prev.unlockedStickers];
      if (!stickers.includes('habit_master')) stickers.push('habit_master');
      if (prev.completedClassroom && !stickers.includes('kuromi_bestie')) {
        stickers.push('kuromi_bestie');
      }
      return {
        ...prev,
        completedStudyHabits: true,
        unlockedStickers: stickers,
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#140c20] text-[#f7e8ff] flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          if (tab === 'intro') {
            handleSetKuromiMood('explaining', '¡Aquí tienes la explicación detallada de Zero y First Conditional y cómo ganar esta actividad!');
          } else if (tab === 'grimoire') {
            handleSetKuromiMood('explaining', 'Aquí tienes la teoría clara: Zero = verdades fijas, First = futuro con will.');
          } else if (tab === 'habits') {
            handleSetKuromiMood('sassy', '¡Conecta las 10 oraciones de hábitos de estudio! Busca la causa y su consecuencia.');
          } else if (tab === 'rules') {
            handleSetKuromiMood('idle', '¡Vamos a resolver las 5 reglas de convivencia del aula de inglés!');
          } else if (tab === 'lab') {
            handleSetKuromiMood('thinking', '¡Experimenta y construye tus propias oraciones condicionales sin fallar!');
          }
        }}
        progress={progress}
        onOpenStickers={() => setIsStickerBookOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Interactive Kuromi Mascot Card */}
        <KuromiCompanion
          mood={kuromiMood}
          customMessage={customKuromiMessage}
          progress={progress}
          onPet={() => {
            handleProgressUpdate(5, true);
          }}
        />

        {/* Quick Activity Navigator Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => {
              playPop();
              setActiveTab('intro');
              handleSetKuromiMood('explaining', '¡Repasa la teoría y conoce los objetivos de cada actividad!');
            }}
            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              activeTab === 'intro'
                ? 'bg-gradient-to-br from-pink-950/70 to-purple-950/70 border-pink-500 shadow-lg'
                : 'bg-[#1c122c] border-purple-500/20 hover:border-pink-500/40 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-1.5 py-0.2 rounded-full font-bold">
                Inicio
              </span>
            </div>
            <div className="font-display font-bold text-xs text-pink-100">🌟 Intro & Clases</div>
            <div className="text-[10px] text-purple-400">Objetivos y Explicación</div>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('rules');
              handleSetKuromiMood('idle', '¡Vamos a resolver las 5 reglas de convivencia del aula de inglés!');
            }}
            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-gradient-to-br from-pink-950/70 to-purple-950/70 border-pink-500 shadow-lg'
                : 'bg-[#1c122c] border-purple-500/20 hover:border-pink-500/40 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <CheckSquare size={16} className="text-pink-400" />
              {progress.completedClassroom && (
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 border border-emerald-500 px-1.5 py-0.2 rounded-full font-bold">
                  ✓ Hecho
                </span>
              )}
            </div>
            <div className="font-display font-bold text-xs text-pink-100">1. Classroom Rules</div>
            <div className="text-[10px] text-purple-400">5 preguntas múltiples</div>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('habits');
              handleSetKuromiMood('sassy', '¡Conecta las 10 oraciones de hábitos de estudio!');
            }}
            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              activeTab === 'habits'
                ? 'bg-gradient-to-br from-pink-950/70 to-purple-950/70 border-pink-500 shadow-lg'
                : 'bg-[#1c122c] border-purple-500/20 hover:border-pink-500/40 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Link2 size={16} className="text-purple-400" />
              {progress.completedStudyHabits && (
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 border border-emerald-500 px-1.5 py-0.2 rounded-full font-bold">
                  ✓ Hecho
                </span>
              )}
            </div>
            <div className="font-display font-bold text-xs text-pink-100">2. Study Habits Match</div>
            <div className="text-[10px] text-purple-400">10 pares causa-efecto</div>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('grimoire');
              handleSetKuromiMood('explaining', '¡Aquí tienes las fórmulas y las trampas de examen!');
            }}
            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              activeTab === 'grimoire'
                ? 'bg-gradient-to-br from-pink-950/70 to-purple-950/70 border-pink-500 shadow-lg'
                : 'bg-[#1c122c] border-purple-500/20 hover:border-pink-500/40 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <BookOpen size={16} className="text-fuchsia-400" />
              <span className="text-[10px] bg-purple-900/40 text-purple-300 px-1.5 py-0.2 rounded-full font-bold">
                Fórmulas
              </span>
            </div>
            <div className="font-display font-bold text-xs text-pink-100">3. Grimorio Secreto</div>
            <div className="text-[10px] text-purple-400">Guía y Trampas</div>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('lab');
              handleSetKuromiMood('thinking', '¡Experimenta y construye tus propias oraciones condicionales sin fallar!');
            }}
            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-gradient-to-br from-pink-950/70 to-purple-950/70 border-pink-500 shadow-lg'
                : 'bg-[#1c122c] border-purple-500/20 hover:border-pink-500/40 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-[10px] bg-purple-900/40 text-purple-300 px-1.5 py-0.2 rounded-full font-bold">
                Lab
              </span>
            </div>
            <div className="font-display font-bold text-xs text-pink-100">4. Sentence Lab</div>
            <div className="text-[10px] text-purple-400">Práctica interactiva</div>
          </button>
        </div>

        {/* Dynamic Activity Render */}
        <div className="pt-2">
          {activeTab === 'intro' && (
            <IntroGuide
              onStartRules={() => {
                setActiveTab('rules');
                handleSetKuromiMood('idle', '¡Vamos a resolver las 5 reglas de convivencia del aula de inglés!');
              }}
              onStartHabits={() => {
                setActiveTab('habits');
                handleSetKuromiMood('sassy', '¡Conecta las 10 oraciones de hábitos de estudio! Busca la causa y su consecuencia.');
              }}
            />
          )}

          {activeTab === 'rules' && (
            <ClassroomRulesQuiz
              onProgressUpdate={handleProgressUpdate}
              onSetKuromiMood={handleSetKuromiMood}
              onCompleteQuiz={handleCompleteClassroom}
            />
          )}

          {activeTab === 'habits' && (
            <StudyHabitsMatch
              onProgressUpdate={handleProgressUpdate}
              onSetKuromiMood={handleSetKuromiMood}
              onCompleteActivity={handleCompleteStudyHabits}
            />
          )}

          {activeTab === 'grimoire' && <GrammarGuide />}

          {activeTab === 'lab' && (
            <SentenceBuilder
              onProgressUpdate={handleProgressUpdate}
              onSetKuromiMood={handleSetKuromiMood}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-purple-900/60 bg-[#11091b] py-6 text-center text-xs text-purple-400/80">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-display font-semibold text-pink-300">
            <span>💀 Kuromi&apos;s English Academy</span>
            <span>•</span>
            <span className="text-purple-400">A2 Grammar & Study Habits</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <span>Hecho con actitud Sanrio</span>
            <Heart size={13} className="text-pink-500 fill-pink-500" />
          </div>
        </div>
      </footer>

      {/* Sticker & Certificate Modal */}
      <StickerBookModal
        isOpen={isStickerBookOpen}
        onClose={() => setIsStickerBookOpen(false)}
        progress={progress}
      />
    </div>
  );
}
