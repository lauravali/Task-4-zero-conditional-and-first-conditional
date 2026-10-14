import React, { useState } from 'react';
import { KuromiMood } from '../types';
import { playCorrect, playIncorrect, playPop, speakEnglish } from '../utils/audio';
import { Sparkles, Volume2, RefreshCw, Layers } from 'lucide-react';

interface SentenceBuilderProps {
  onProgressUpdate: (xpGained: number, correct: boolean) => void;
  onSetKuromiMood: (mood: KuromiMood, customText?: string) => void;
}

interface SandboxItem {
  ifClause: string;
  expectedType: 'zero' | 'first';
  resultOptions: {
    text: string;
    isCorrect: boolean;
    type: 'zero' | 'first';
    explanation: string;
  }[];
}

const SANDBOX_DATA: SandboxItem[] = [
  {
    ifClause: "If students listen carefully in class,",
    expectedType: 'zero',
    resultOptions: [
      { text: "they understand the lesson.", isCorrect: true, type: 'zero', explanation: "¡Correcto! Zero Conditional: resultado lógico habitual." },
      { text: "they will understands the lesson.", isCorrect: false, type: 'first', explanation: "¡Error! Después de will nunca va -s ('will understands' ❌)." },
      { text: "they understood the lesson.", isCorrect: false, type: 'zero', explanation: "¡Error! 'Understood' es pasado, no presente." },
    ]
  },
  {
    ifClause: "If a student arrives late tomorrow,",
    expectedType: 'first',
    resultOptions: [
      { text: "the teacher will ask them to enter quietly.", isCorrect: true, type: 'first', explanation: "¡Correcto! 'Tomorrow' exige First Conditional con 'will'." },
      { text: "the teacher asks them to enter quietly.", isCorrect: false, type: 'zero', explanation: "'Asks' sería para hábitos generales, pero 'tomorrow' es específico." },
      { text: "the teacher will asks them to enter quietly.", isCorrect: false, type: 'first', explanation: "¡Error! 'will asks' tiene -s incorrecta." },
    ]
  },
  {
    ifClause: "If you take short breaks while studying,",
    expectedType: 'zero',
    resultOptions: [
      { text: "you feel less tired.", isCorrect: true, type: 'zero', explanation: "¡Genial! Hábito saludable en Zero conditional." },
      { text: "you feels less tired.", isCorrect: false, type: 'zero', explanation: "'You' no lleva -s en el verbo ('you feels' ❌)." },
      { text: "you will felt less tired.", isCorrect: false, type: 'first', explanation: "Después de will va forma base, nunca pasado." },
    ]
  },
  {
    ifClause: "If we do not respect our classmates,",
    expectedType: 'zero',
    resultOptions: [
      { text: "we have problems.", isCorrect: true, type: 'zero', explanation: "¡Exacto! Regla de convivencia escolar directa." },
      { text: "we has problems.", isCorrect: false, type: 'zero', explanation: "'We' se conjuga con 'have', nunca con 'has'." },
      { text: "we had problems.", isCorrect: false, type: 'zero', explanation: "'Had' es pasado." },
    ]
  },
  {
    ifClause: "If you make a study plan this week,",
    expectedType: 'first',
    resultOptions: [
      { text: "you will organize your time better.", isCorrect: true, type: 'first', explanation: "¡Excelente! 'This week' proyecta un resultado futuro real con will." },
      { text: "you will organizes your time better.", isCorrect: false, type: 'first', explanation: "'will organizes' tiene la 's' prohibida." },
      { text: "you organized your time better.", isCorrect: false, type: 'first', explanation: "'organized' es pasado." },
    ]
  }
];

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  onProgressUpdate,
  onSetKuromiMood,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedResult, setSelectedResult] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentItem = SANDBOX_DATA[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    playPop();
    setSelectedResult(idx);
    setIsAnswered(true);

    const chosen = currentItem.resultOptions[idx];
    if (chosen.isCorrect) {
      playCorrect();
      onProgressUpdate(20, true);
      onSetKuromiMood('proud', `¡Excelente ensamblaje! ${chosen.explanation}`);
    } else {
      playIncorrect();
      onProgressUpdate(5, false);
      onSetKuromiMood('shocked', `¡Ups! ${chosen.explanation}`);
    }
  };

  const handleNext = () => {
    playPop();
    setSelectedResult(null);
    setIsAnswered(false);
    setCurrentIndex(prev => (prev + 1) % SANDBOX_DATA.length);
    onSetKuromiMood('idle');
  };

  const selectedOpt = selectedResult !== null ? currentItem.resultOptions[selectedResult] : null;

  return (
    <div className="bg-[#211536] border-2 border-purple-500/40 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-pink-400" />
          <h3 className="font-display font-bold text-lg text-pink-200">
            Kuromi&apos;s Sentence Lab (Laboratorio)
          </h3>
        </div>
        <span className="text-xs bg-purple-900/60 text-purple-300 px-3 py-1 rounded-full font-bold border border-purple-700">
          Caso {currentIndex + 1} de {SANDBOX_DATA.length}
        </span>
      </div>

      <p className="text-xs text-purple-300">
        Selecciona la cláusula de resultado correcta para armar una oración gramaticalmente impecable.
      </p>

      {/* Clause 1: Condition */}
      <div className="bg-[#170e27] border-2 border-dashed border-pink-500/40 rounded-2xl p-4">
        <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
          Cláusula Condicional (IF):
        </span>
        <p className="text-base sm:text-lg font-bold text-pink-100 font-display">
          {currentItem.ifClause}
        </p>
      </div>

      {/* Clause 2: Result Options */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
          Elige la consecuencia gramatical adecuada:
        </span>

        {currentItem.resultOptions.map((opt, idx) => {
          const isSelected = selectedResult === idx;
          let styles = 'bg-[#180f28] border-purple-500/20 hover:border-pink-400/50 text-purple-200';

          if (isAnswered) {
            if (opt.isCorrect) {
              styles = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-400/80';
            } else if (isSelected && !opt.isCorrect) {
              styles = 'bg-rose-950/60 border-rose-500 text-rose-200';
            } else {
              styles = 'bg-[#150d24]/50 border-purple-900 text-purple-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${styles} ${
                !isAnswered ? 'active:scale-[0.99]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{opt.text}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-purple-950 text-purple-400 border border-purple-800">
                  {opt.type === 'zero' ? 'Zero' : 'First'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation when answered */}
      {isAnswered && selectedOpt && (
        <div
          className={`p-3.5 rounded-2xl border-2 text-xs flex items-center justify-between gap-3 ${
            selectedOpt.isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
          }`}
        >
          <div>
            <p className="font-bold mb-0.5">{selectedOpt.isCorrect ? '¡Armado Exitoso!' : '¡Ajuste Necesario!'}</p>
            <p>{selectedOpt.explanation}</p>
          </div>
          <button
            onClick={() => {
              playPop();
              const full = `${currentItem.ifClause} ${selectedOpt.text}`;
              speakEnglish(full);
            }}
            className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-pink-300 border border-purple-500/30 shrink-0"
            title="Escuchar"
          >
            <Volume2 size={16} />
          </button>
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Siguiente Oración</span>
            <RefreshCw size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
