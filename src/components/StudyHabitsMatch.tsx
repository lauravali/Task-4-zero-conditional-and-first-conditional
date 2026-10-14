import React, { useState } from 'react';
import { STUDY_HABITS_PAIRS } from '../data/conditionalsData';
import { MatchPair, KuromiMood } from '../types';
import { playCorrect, playIncorrect, playPop, playFanfare, speakEnglish } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  BookMarked,
  ArrowRight,
  Shuffle
} from 'lucide-react';

interface StudyHabitsMatchProps {
  onProgressUpdate: (xpGained: number, correct: boolean) => void;
  onSetKuromiMood: (mood: KuromiMood, customText?: string) => void;
  onCompleteActivity: () => void;
}

export const StudyHabitsMatch: React.FC<StudyHabitsMatchProps> = ({
  onProgressUpdate,
  onSetKuromiMood,
  onCompleteActivity,
}) => {
  // Selected IDs
  const [selectedBeginningId, setSelectedBeginningId] = useState<number | null>(null);
  const [selectedEndingId, setSelectedEndingId] = useState<string | null>(null);

  // Successfully matched pairs: beginningId -> endingId
  const [matchedPairs, setMatchedPairs] = useState<{ [bId: number]: string }>({});

  // Active feedback notification
  const [lastFeedback, setLastFeedback] = useState<{
    success: boolean;
    text: string;
    pair?: MatchPair;
  } | null>(null);

  // Shuffled endings list
  const [shuffledEndings, setShuffledEndings] = useState(() => {
    return [...STUDY_HABITS_PAIRS].sort(() => Math.random() - 0.5);
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'zero' | 'first'>('all');

  const handleShuffle = () => {
    playPop();
    setShuffledEndings(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleSelectBeginning = (bId: number) => {
    if (matchedPairs[bId]) return; // Already matched
    playPop();
    setSelectedBeginningId(bId);

    // If an ending was already selected, evaluate match
    if (selectedEndingId) {
      checkMatch(bId, selectedEndingId);
    }
  };

  const handleSelectEnding = (endingId: string) => {
    // Check if this ending is already matched
    const isAlreadyMatched = Object.values(matchedPairs).includes(endingId);
    if (isAlreadyMatched) return;

    playPop();
    setSelectedEndingId(endingId);

    // If beginning was already selected, evaluate match
    if (selectedBeginningId !== null) {
      checkMatch(selectedBeginningId, endingId);
    }
  };

  const checkMatch = (bId: number, eId: string) => {
    const targetPair = STUDY_HABITS_PAIRS.find(p => p.beginningId === bId);

    if (targetPair && targetPair.endingId === eId) {
      // Correct Match!
      playCorrect();
      const newMatches = { ...matchedPairs, [bId]: eId };
      setMatchedPairs(newMatches);
      setSelectedBeginningId(null);
      setSelectedEndingId(null);

      onProgressUpdate(15, true);
      const isFirst = targetPair.conditionalType === 'first';
      onSetKuromiMood(
        'happy',
        `¡Match perfecto! Formaste un ${isFirst ? 'First Conditional (futuro)' : 'Zero Conditional (hábito)'}: "${targetPair.beginning} ${targetPair.ending}"`
      );

      setLastFeedback({
        success: true,
        text: `¡Correcto! ${targetPair.explanation}`,
        pair: targetPair,
      });

      // Speak complete sentence
      speakEnglish(`${targetPair.beginning} ${targetPair.ending}`);

      // Check if all 10 are completed!
      if (Object.keys(newMatches).length === STUDY_HABITS_PAIRS.length) {
        playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#a855f7', '#ec4899', '#f472b6', '#c084fc', '#38bdf8'],
        });
        onSetKuromiMood('celebrating', '¡INCREÍBLE! ¡Has conectado todos los 10 hábitos de estudio como un genio de los condicionales!');
        onCompleteActivity();
      }
    } else {
      // Incorrect Match
      playIncorrect();
      setSelectedBeginningId(null);
      setSelectedEndingId(null);

      // Sassy hint from Kuromi
      let hintText = 'Esa combinación no tiene sentido lógico o gramatical.';
      if (bId === 6 && eId !== 'B') {
        hintText = 'Fíjate en el sujeto: "If I review..." habla de MI persona ("I"), busca una terminación con "I".';
      } else if (bId === 4 && eId !== 'E') {
        hintText = 'Fíjate en el sujeto: "If you make..." habla de ti ("you"), busca una terminación con "you".';
      }

      setLastFeedback({
        success: false,
        text: hintText,
      });

      onSetKuromiMood('shocked', `¡Ups! ${hintText}`);
    }
  };

  const handleReset = () => {
    playPop();
    setMatchedPairs({});
    setSelectedBeginningId(null);
    setSelectedEndingId(null);
    setLastFeedback(null);
    onSetKuromiMood('idle', '¡Tablero reiniciado! Comienza a unir las oraciones.');
  };

  const matchedCount = Object.keys(matchedPairs).length;
  const isAllComplete = matchedCount === STUDY_HABITS_PAIRS.length;

  return (
    <div className="space-y-6">
      {/* Top Banner and Controls */}
      <div className="bg-[#221638] border-2 border-purple-500/40 rounded-3xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-pink-500/20 text-pink-300 border border-pink-500/40 px-3 py-0.5 rounded-full text-xs font-bold uppercase mb-1">
              <BookMarked size={12} /> Actividad de Conexión
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-pink-200 font-display">
              Effective Study Habits — Match Master
            </h2>
            <p className="text-xs text-purple-300">
              Une la condición (Columna 1) con su resultado lógico (Columna 2).
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30 transition-all"
              title="Mezclar terminaciones"
            >
              <Shuffle size={14} /> Mezclar
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30 transition-all"
              title="Reiniciar tablero"
            >
              <RotateCcw size={14} /> Reiniciar
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-3 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-purple-300">Parejas Encontradas:</span>
              <span className="text-pink-300 font-display">{matchedCount} de 10 completadas</span>
            </div>
            <div className="w-full bg-[#150d22] h-2.5 rounded-full overflow-hidden border border-purple-800">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-400 rounded-full transition-all duration-300"
                style={{ width: `${(matchedCount / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Matching Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* COLUMN 1: Beginnings */}
        <div className="bg-[#201534] border border-purple-500/30 rounded-3xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-500/20">
            <span className="text-xs font-extrabold text-pink-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <span className="w-5 h-5 rounded-md bg-pink-500/20 border border-pink-400 flex items-center justify-center text-[10px]">1</span>
              COLUMN 1 — Sentence Beginnings
            </span>
            <span className="text-[11px] text-purple-400 font-medium">Condición (&quot;If...&quot;)</span>
          </div>

          <div className="space-y-2.5">
            {STUDY_HABITS_PAIRS.map(item => {
              const isMatched = matchedPairs[item.beginningId] !== undefined;
              const isSelected = selectedBeginningId === item.beginningId;

              let cardStyles = 'bg-[#180f28] border-purple-500/20 hover:border-pink-400/60 text-purple-100';

              if (isMatched) {
                cardStyles = 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200';
              } else if (isSelected) {
                cardStyles = 'bg-pink-950/80 border-pink-400 text-pink-200 ring-2 ring-pink-400/80 shadow-[0_0_15px_rgba(236,72,153,0.3)]';
              }

              return (
                <div
                  key={item.beginningId}
                  onClick={() => handleSelectBeginning(item.beginningId)}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer ${cardStyles} ${
                    isMatched ? 'cursor-default' : 'active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isMatched
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-pink-500 text-white'
                          : 'bg-purple-900/60 text-purple-300 border border-purple-700'
                      }`}
                    >
                      {item.beginningId}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{item.beginning}</span>
                  </div>

                  {isMatched && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                        → {matchedPairs[item.beginningId]}
                      </span>
                      <Check size={16} className="text-emerald-400" />
                    </div>
                  )}

                  {!isMatched && isSelected && (
                    <span className="text-[11px] text-pink-300 font-bold animate-pulse">
                      Elige resultado →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Endings */}
        <div className="bg-[#201534] border border-purple-500/30 rounded-3xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-500/20">
            <span className="text-xs font-extrabold text-pink-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <span className="w-5 h-5 rounded-md bg-purple-500/20 border border-purple-400 flex items-center justify-center text-[10px]">2</span>
              COLUMN 2 — Sentence Endings
            </span>
            <span className="text-[11px] text-purple-400 font-medium">Consecuencia / Resultado</span>
          </div>

          <div className="space-y-2.5">
            {shuffledEndings.map(item => {
              const matchedBeginningId = Object.keys(matchedPairs).find(
                bId => matchedPairs[Number(bId)] === item.endingId
              );
              const isMatched = matchedBeginningId !== undefined;
              const isSelected = selectedEndingId === item.endingId;

              let cardStyles = 'bg-[#180f28] border-purple-500/20 hover:border-pink-400/60 text-purple-100';

              if (isMatched) {
                cardStyles = 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200';
              } else if (isSelected) {
                cardStyles = 'bg-pink-950/80 border-pink-400 text-pink-200 ring-2 ring-pink-400/80 shadow-[0_0_15px_rgba(236,72,153,0.3)]';
              }

              return (
                <div
                  key={item.endingId}
                  onClick={() => handleSelectEnding(item.endingId)}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer ${cardStyles} ${
                    isMatched ? 'cursor-default' : 'active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isMatched
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-pink-500 text-white'
                          : 'bg-purple-900/60 text-purple-300 border border-purple-700'
                      }`}
                    >
                      {item.endingId}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{item.ending}</span>
                  </div>

                  {isMatched && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                        {matchedBeginningId} ←
                      </span>
                      <Check size={16} className="text-emerald-400" />
                    </div>
                  )}

                  {!isMatched && isSelected && (
                    <span className="text-[11px] text-pink-300 font-bold animate-pulse">
                      ← Elige condición
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback & Habit Insight Card */}
      {lastFeedback && (
        <div
          className={`p-4 rounded-3xl border-2 transition-all shadow-md animate-fade-in ${
            lastFeedback.success
              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
              : 'bg-rose-950/40 border-rose-500/60 text-rose-100'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="text-xl shrink-0 mt-0.5">
                {lastFeedback.success ? '🎉' : '💡'}
              </span>
              <div>
                <p className="font-bold text-sm mb-1">{lastFeedback.text}</p>
                {lastFeedback.pair && (
                  <div className="text-xs text-purple-200 space-y-1">
                    <p className="font-medium">
                      Consejo de estudio: <span className="text-pink-300 font-semibold">{lastFeedback.pair.habitsAdvice}</span>
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-purple-900/70 text-purple-300 text-[10px] font-bold border border-purple-700">
                      Gramática: {lastFeedback.pair.conditionalType === 'zero' ? 'Zero Conditional (Regla habitual)' : 'First Conditional (Posibilidad futura)'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {lastFeedback.pair && (
              <button
                onClick={() => {
                  playPop();
                  speakEnglish(`${lastFeedback.pair?.beginning} ${lastFeedback.pair?.ending}`);
                }}
                className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-pink-300 border border-purple-500/30 transition-colors shrink-0"
                title="Escuchar oración completa"
              >
                <Volume2 size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* All Complete Summary */}
      {isAllComplete && (
        <div className="bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-pink-950/60 border-2 border-pink-500 rounded-3xl p-6 text-center shadow-xl animate-bounce-cute">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="text-2xl font-extrabold text-pink-300 font-display mb-1">
            ¡Completaste las 10 Conexiones de Hábitos de Estudio!
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto mb-4">
            Has demostrado un dominio total de cómo conectar causas y efectos usando tanto el Zero Conditional como el First Conditional. ¡Kuromi está super orgullosa!
          </p>
          <button
            onClick={() => {
              playPop();
              const fullText = STUDY_HABITS_PAIRS.map(p => `${p.beginning} ${p.ending}`).join('. ');
              speakEnglish(fullText);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Volume2 size={16} /> Escuchar todas las oraciones en inglés
          </button>
        </div>
      )}
    </div>
  );
};
