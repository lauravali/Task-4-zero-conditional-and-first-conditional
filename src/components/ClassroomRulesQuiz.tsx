import React, { useState } from 'react';
import { CLASSROOM_RULES_QUESTIONS } from '../data/conditionalsData';
import { MultipleChoiceQuestion, KuromiMood } from '../types';
import { playCorrect, playIncorrect, playPop, playFanfare, speakEnglish } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Award,
  ChevronRight
} from 'lucide-react';

interface ClassroomRulesQuizProps {
  onProgressUpdate: (xpGained: number, correct: boolean) => void;
  onSetKuromiMood: (mood: KuromiMood, customText?: string) => void;
  onCompleteQuiz: () => void;
}

export const ClassroomRulesQuiz: React.FC<ClassroomRulesQuizProps> = ({
  onProgressUpdate,
  onSetKuromiMood,
  onCompleteQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionKey, setSelectedOptionKey] = useState<'a' | 'b' | 'c' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [answersState, setAnswersState] = useState<{ [qId: number]: 'a' | 'b' | 'c' }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showRuleTip, setShowRuleTip] = useState(false);

  const currentQ: MultipleChoiceQuestion = CLASSROOM_RULES_QUESTIONS[currentIndex];

  const handleSelectOption = (key: 'a' | 'b' | 'c') => {
    if (hasSubmitted) return;
    playPop();
    setSelectedOptionKey(key);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionKey || hasSubmitted) return;

    const chosenOption = currentQ.options.find(o => o.key === selectedOptionKey);
    const isCorrect = !!chosenOption?.isCorrect;

    setHasSubmitted(true);
    setAnswersState(prev => ({ ...prev, [currentQ.id]: selectedOptionKey }));

    if (isCorrect) {
      playCorrect();
      setScore(prev => prev + 1);
      onProgressUpdate(25, true);
      onSetKuromiMood('happy', `¡Excelente! ${chosenOption?.explanation || '¡Respuesta correcta!'}`);
    } else {
      playIncorrect();
      onProgressUpdate(5, false);
      onSetKuromiMood('shocked', `¡Ups! ${chosenOption?.explanation || 'Revisa la regla gramatical.'}`);
    }
  };

  const handleNext = () => {
    playPop();
    if (currentIndex < CLASSROOM_RULES_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionKey(null);
      setHasSubmitted(false);
      setShowRuleTip(false);
      onSetKuromiMood('idle');
    } else {
      // Finished
      setIsFinished(true);
      playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#a855f7', '#ec4899', '#c084fc', '#ffffff'],
      });
      onSetKuromiMood('celebrating', '¡Bwahaha! ¡Has completado todas las preguntas de Classroom Rules!');
      onCompleteQuiz();
    }
  };

  const handleRestart = () => {
    playPop();
    setCurrentIndex(0);
    setSelectedOptionKey(null);
    setHasSubmitted(false);
    setAnswersState({});
    setIsFinished(false);
    setScore(0);
    setShowRuleTip(false);
    onSetKuromiMood('idle', '¡Vamos a intentar de nuevo! Esta vez por el 100%.');
  };

  const handleListenSentence = () => {
    playPop();
    const correctOpt = currentQ.options.find(o => o.isCorrect);
    if (!correctOpt) return;
    const fullSentence = currentQ.sentence.replace('______', correctOpt.text);
    speakEnglish(fullSentence);
  };

  // Completion Screen
  if (isFinished) {
    const percentage = Math.round((score / CLASSROOM_RULES_QUESTIONS.length) * 100);
    return (
      <div className="bg-[#221638] border-2 border-pink-500/50 rounded-3xl p-6 sm:p-8 text-center shadow-xl animate-fade-in max-w-xl mx-auto">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-pink-300">
          👑
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-fuchsia-300 font-display mb-2">
          ¡Actividad Completada!
        </h3>

        <p className="text-purple-200 text-sm mb-6">
          Has completado las 5 oraciones de <strong>Classroom Rules</strong> con Kuromi.
        </p>

        {/* Score Card */}
        <div className="bg-[#180f28] border border-pink-500/30 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4">
          <div className="border-r border-purple-800">
            <span className="text-xs text-purple-400 uppercase tracking-wider block mb-1">
              Puntuación
            </span>
            <span className="text-3xl font-extrabold text-pink-300 font-display">
              {score} / {CLASSROOM_RULES_QUESTIONS.length}
            </span>
          </div>
          <div>
            <span className="text-xs text-purple-400 uppercase tracking-wider block mb-1">
              Precisión
            </span>
            <span className="text-3xl font-extrabold text-purple-300 font-display">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-900/60 hover:bg-purple-800 text-pink-200 border border-purple-500/40 font-bold transition-all"
          >
            <RotateCcw size={16} /> Repetir Actividad
          </button>
        </div>
      </div>
    );
  }

  const selectedOpt = currentQ.options.find(o => o.key === selectedOptionKey);
  const correctOpt = currentQ.options.find(o => o.isCorrect);

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header and Step Indicators */}
      <div className="flex items-center justify-between text-xs font-bold text-purple-300 bg-[#211536] px-4 py-2.5 rounded-2xl border border-purple-500/20">
        <div className="flex items-center gap-2">
          <span className="bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-md border border-pink-500/30 uppercase text-[10px]">
            {currentQ.conditionalType === 'zero' ? 'Zero Conditional' : 'First Conditional'}
          </span>
          <span className="text-pink-100">{currentQ.topic}</span>
        </div>

        <div className="flex items-center gap-1">
          {CLASSROOM_RULES_QUESTIONS.map((q, idx) => {
            const answeredKey = answersState[q.id];
            const isQAnswered = answeredKey !== undefined;
            const isQCorrect = isQAnswered && q.options.find(o => o.key === answeredKey)?.isCorrect;

            return (
              <div
                key={q.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  idx === currentIndex
                    ? 'ring-2 ring-pink-400 bg-pink-500 text-white'
                    : isQAnswered
                    ? isQCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                    : 'bg-purple-950 text-purple-400 border border-purple-800'
                }`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-[#221638] border-2 border-purple-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} /> Completa la oración del aula:
          </span>

          <button
            onClick={handleListenSentence}
            className="flex items-center gap-1 text-xs text-purple-300 hover:text-pink-300 bg-purple-900/50 hover:bg-purple-900 px-2.5 py-1 rounded-xl border border-purple-500/30 transition-colors"
            title="Escuchar oración completa"
          >
            <Volume2 size={14} />
            <span>Escuchar</span>
          </button>
        </div>

        {/* Target Sentence Display */}
        <div className="bg-[#170e27] border border-pink-500/30 rounded-2xl p-4 sm:p-5 mb-6 text-center">
          <p className="text-lg sm:text-xl font-bold text-pink-100 leading-relaxed font-display">
            {currentQ.sentence.split('______').map((part, index, array) => (
              <React.Fragment key={index}>
                <span>{part}</span>
                {index < array.length - 1 && (
                  <span
                    className={`inline-block mx-1.5 px-3 py-0.5 rounded-lg border-2 font-mono text-base sm:text-lg transition-all ${
                      hasSubmitted
                        ? selectedOpt?.isCorrect
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-rose-950/80 border-rose-400 text-rose-300 line-through'
                        : selectedOptionKey
                        ? 'bg-purple-900/80 border-pink-400 text-pink-300'
                        : 'bg-[#26183e] border-dashed border-purple-400 text-purple-400 animate-pulse'
                    }`}
                  >
                    {selectedOptionKey ? selectedOpt?.text : '______'}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
          {hasSubmitted && !selectedOpt?.isCorrect && (
            <p className="mt-2 text-xs font-semibold text-emerald-400">
              Forma correcta: <span className="underline font-bold font-mono">{correctOpt?.text}</span>
            </p>
          )}
        </div>

        {/* Options a, b, c */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map(option => {
            const isSelected = selectedOptionKey === option.key;
            let optionStyles = 'bg-[#1b122e] border-purple-500/30 hover:border-pink-400/60 text-purple-100';

            if (hasSubmitted) {
              if (option.isCorrect) {
                optionStyles = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400';
              } else if (isSelected && !option.isCorrect) {
                optionStyles = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-400';
              } else {
                optionStyles = 'bg-[#160d26]/60 border-purple-900 text-purple-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyles = 'bg-pink-950/70 border-pink-500 text-pink-200 ring-2 ring-pink-400';
            }

            return (
              <button
                key={option.key}
                onClick={() => handleSelectOption(option.key)}
                disabled={hasSubmitted}
                className={`w-full text-left p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all duration-200 ${optionStyles} ${
                  !hasSubmitted ? 'cursor-pointer active:scale-[0.99]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-sm uppercase ${
                      isSelected
                        ? 'bg-pink-500 text-white'
                        : 'bg-purple-900/60 text-purple-300 border border-purple-700'
                    }`}
                  >
                    {option.key}
                  </span>
                  <span className="font-semibold text-sm sm:text-base">{option.text}</span>
                </div>

                {hasSubmitted && (
                  <div>
                    {option.isCorrect && <CheckCircle2 size={20} className="text-emerald-400" />}
                    {isSelected && !option.isCorrect && <XCircle size={20} className="text-rose-400" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Feedback Explanation Box (Kuromi's Grammar breakdown) */}
        {hasSubmitted && (
          <div
            className={`p-4 rounded-2xl mb-6 border-2 transition-all ${
              selectedOpt?.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="text-xl shrink-0 mt-0.5">
                {selectedOpt?.isCorrect ? '💜' : '💀'}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm">
                  {selectedOpt?.isCorrect ? '¡Excelente análisis!' : '¡Aprende con este detalle!'}
                </p>
                <p className="text-xs leading-relaxed opacity-95">
                  {selectedOpt?.explanation}
                </p>
                <div className="pt-1 text-[11px] text-purple-300 font-medium">
                  {currentQ.spanishTip}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setShowRuleTip(!showRuleTip)}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-pink-300 transition-colors"
          >
            <HelpCircle size={15} />
            <span>{showRuleTip ? 'Ocultar pista' : '¿Necesitas una pista?'}</span>
          </button>

          {!hasSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOptionKey}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                selectedOptionKey
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg cursor-pointer hover:scale-105 active:scale-95'
                  : 'bg-purple-950/60 text-purple-500 border border-purple-900 cursor-not-allowed'
              }`}
            >
              <span>Verificar</span>
              <CheckCircle2 size={16} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <span>{currentIndex < CLASSROOM_RULES_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Ver Resultados'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Collapsible rule tip */}
        {showRuleTip && (
          <div className="mt-4 p-3 bg-[#190f2b] border border-purple-500/30 rounded-2xl text-xs text-purple-200 animate-fade-in flex items-start gap-2">
            <Sparkles size={14} className="text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-pink-300 mb-0.5">Pista de Kuromi:</p>
              <p>{currentQ.ruleExplanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
