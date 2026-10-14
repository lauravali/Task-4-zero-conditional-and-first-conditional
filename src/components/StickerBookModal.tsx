import React from 'react';
import { STICKERS } from '../data/conditionalsData';
import { UserProgress } from '../types';
import { X, Award, CheckCircle2, Lock, Sparkles, Printer } from 'lucide-react';
import { playPop } from '../utils/audio';

interface StickerBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const StickerBookModal: React.FC<StickerBookModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  const unlockedCount = progress.unlockedStickers.length;

  const handlePrint = () => {
    playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#201435] border-2 border-pink-500/50 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-4 right-4 text-purple-400 hover:text-pink-300 p-2 rounded-xl hover:bg-purple-900/50 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 text-xs font-bold uppercase mb-2">
            <Sparkles size={14} /> Colección Sanrio & Kuromi
          </div>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 font-display">
            Álbum de Stickers y Logros
          </h2>
          <p className="text-xs text-purple-300 mt-1">
            Has desbloqueado <span className="text-pink-400 font-bold">{unlockedCount} de {STICKERS.length}</span> insignias oficiales.
          </p>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {STICKERS.map(sticker => {
            const isUnlocked = progress.unlockedStickers.includes(sticker.id);

            return (
              <div
                key={sticker.id}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-[#2e1d4a] to-[#1e1233] border-pink-500/50 shadow-md'
                    : 'bg-[#150d23]/60 border-purple-950 opacity-60'
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-2xl flex items-center justify-center text-2xl bg-purple-950/70 border border-purple-800">
                  {isUnlocked ? sticker.icon : <Lock size={18} className="text-purple-600" />}
                </div>

                <h4 className="font-display font-bold text-xs text-pink-200 mb-1 leading-tight">
                  {sticker.name}
                </h4>
                <p className="text-[10px] text-purple-300 leading-snug">
                  {sticker.description}
                </p>

                {isUnlocked && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400 font-bold mt-2">
                    <CheckCircle2 size={10} /> Conseguido
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Kuromi Academy Diploma Card */}
        <div className="bg-gradient-to-b from-[#2a1745] to-[#180e29] border-2 border-dashed border-pink-400/60 rounded-3xl p-5 text-center relative print:border-black print:text-black">
          <div className="text-2xl mb-1">📜</div>
          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block font-display">
            Certificado de Honor Oficial
          </span>
          <h3 className="text-lg font-extrabold text-pink-100 font-display mt-0.5">
            Kuromi&apos;s English Mastery
          </h3>
          <p className="text-xs text-purple-200 mt-1 max-w-sm mx-auto">
            Por dominar las reglas del <strong>Zero Conditional</strong> (General Truths) y <strong>First Conditional</strong> (Real Future Possibilities).
          </p>

          <div className="mt-3 py-2 px-3 bg-purple-950/60 rounded-xl inline-flex items-center gap-4 text-xs font-bold text-pink-300 border border-purple-800">
            <span>Nivel: {progress.level}</span>
            <span>XP: {progress.xp} pts</span>
            <span>Racha Máxima: {progress.highestStreak} 🔥</span>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> Imprimir / Guardar Diploma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
