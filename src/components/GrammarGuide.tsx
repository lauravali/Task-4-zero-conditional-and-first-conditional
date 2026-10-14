import React from 'react';
import { Volume2, BookOpen, AlertCircle, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { speakEnglish, playPop } from '../utils/audio';

export const GrammarGuide: React.FC = () => {
  const handleListen = (text: string) => {
    playPop();
    speakEnglish(text);
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-purple-900/60 via-pink-950/50 to-purple-900/60 border border-pink-500/30 rounded-3xl p-6 text-center shadow-lg relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-300 border border-pink-400/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen size={14} /> El Grimorio Secreto de Kuromi
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-fuchsia-300 font-display">
          Zero vs First Conditional (Guía A2)
        </h2>
        <p className="text-purple-200 text-sm max-w-2xl mx-auto mt-1">
          Aprende cuándo usar cada condicional en las reglas del aula y tus hábitos diarios sin caer en las trampas gramaticales.
        </p>
      </div>

      {/* Side-by-side or stacked comparative cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zero Conditional Card */}
        <div className="bg-[#211636] border-2 border-purple-500/40 hover:border-purple-400 rounded-3xl p-5 shadow-md flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="bg-purple-600/30 text-purple-300 border border-purple-500 text-xs font-bold px-3 py-1 rounded-full">
                TIPO 0
              </span>
              <span className="text-xl">🖤</span>
            </div>
            <h3 className="text-xl font-bold text-pink-300 font-display mb-1">
              Zero Conditional (Verdades & Reglas)
            </h3>
            <p className="text-xs text-purple-300 mb-4">
              Se usa para hechos reales, reglas del salón, hábitos y cosas que <strong>SIEMPRE</strong> pasan como resultado directo.
            </p>

            {/* Formula box */}
            <div className="bg-[#170e26] border border-purple-500/30 rounded-2xl p-3 mb-4">
              <span className="text-[11px] font-bold text-pink-400 block mb-1 uppercase tracking-wider">
                📐 Estructura / Fórmula:
              </span>
              <div className="font-mono text-sm font-bold text-white bg-purple-950/70 p-2 rounded-xl text-center border border-purple-800">
                <span className="text-pink-400">If</span> + Present Simple, ... <span className="text-purple-300">Present Simple</span>
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
                Ejemplos de Classroom Rules:
              </span>

              <div className="bg-[#19102c] p-2.5 rounded-xl border border-purple-500/20 flex items-center justify-between group">
                <div className="text-xs">
                  <p className="text-pink-100 font-semibold">
                    If students listen carefully, they <span className="text-pink-400 font-bold underline">understand</span> the instructions.
                  </p>
                  <p className="text-[11px] text-purple-400">
                    (Si los alumnos escuchan con atención, entienden las instrucciones.)
                  </p>
                </div>
                <button
                  onClick={() => handleListen("If students listen carefully, they understand the instructions.")}
                  className="p-1.5 text-purple-400 hover:text-pink-300 bg-purple-900/40 hover:bg-purple-800 rounded-lg transition-colors"
                  title="Escuchar pronunciación"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              <div className="bg-[#19102c] p-2.5 rounded-xl border border-purple-500/20 flex items-center justify-between group">
                <div className="text-xs">
                  <p className="text-pink-100 font-semibold">
                    If students keep the classroom clean, everyone <span className="text-pink-400 font-bold underline">has</span> a better place.
                  </p>
                  <p className="text-[11px] text-purple-400">
                    (Todos tienen un mejor lugar. *Everyone = singular, lleva has!)
                  </p>
                </div>
                <button
                  onClick={() => handleListen("If students keep the classroom clean, everyone has a better place to study.")}
                  className="p-1.5 text-purple-400 hover:text-pink-300 bg-purple-900/40 hover:bg-purple-800 rounded-lg transition-colors"
                  title="Escuchar pronunciación"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-purple-950/40 border border-purple-500/20 rounded-xl p-2.5 text-[11px] text-purple-300 flex items-start gap-2">
            <Sparkles size={14} className="text-pink-400 shrink-0 mt-0.5" />
            <span><strong>Regla de oro:</strong> En el Zero Conditional NO usamos &quot;will&quot;. Ambas cláusulas van en presente simple porque no es una posibilidad futura, sino una realidad fija.</span>
          </div>
        </div>

        {/* First Conditional Card */}
        <div className="bg-[#211636] border-2 border-pink-500/40 hover:border-pink-400 rounded-3xl p-5 shadow-md flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="bg-pink-600/30 text-pink-300 border border-pink-500 text-xs font-bold px-3 py-1 rounded-full">
                TIPO 1
              </span>
              <span className="text-xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-pink-300 font-display mb-1">
              First Conditional (Futuro & Posibilidad)
            </h3>
            <p className="text-xs text-purple-300 mb-4">
              Se usa para situaciones <strong>reales o posibles en el futuro</strong>. Si se cumple la condición hoy, ocurrirá el resultado mañana.
            </p>

            {/* Formula box */}
            <div className="bg-[#170e26] border border-pink-500/30 rounded-2xl p-3 mb-4">
              <span className="text-[11px] font-bold text-pink-400 block mb-1 uppercase tracking-wider">
                📐 Estructura / Fórmula:
              </span>
              <div className="font-mono text-sm font-bold text-white bg-pink-950/70 p-2 rounded-xl text-center border border-pink-800">
                <span className="text-purple-300">If</span> + Present Simple, ... <span className="text-pink-400 font-extrabold">WILL</span> + Verbo Base
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider block">
                Ejemplos Clave:
              </span>

              <div className="bg-[#19102c] p-2.5 rounded-xl border border-pink-500/20 flex items-center justify-between group">
                <div className="text-xs">
                  <p className="text-pink-100 font-semibold">
                    If a student arrives late <span className="text-yellow-300 font-bold underline">tomorrow</span>, the teacher <span className="text-pink-400 font-bold underline">will ask</span> them to enter quietly.
                  </p>
                  <p className="text-[11px] text-purple-400">
                    (&quot;Tomorrow&quot; indica futuro específico → usamos will + verbo base.)
                  </p>
                </div>
                <button
                  onClick={() => handleListen("If a student arrives late tomorrow, the teacher will ask them to enter quietly.")}
                  className="p-1.5 text-purple-400 hover:text-pink-300 bg-purple-900/40 hover:bg-purple-800 rounded-lg transition-colors"
                  title="Escuchar pronunciación"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              <div className="bg-[#19102c] p-2.5 rounded-xl border border-pink-500/20 flex items-center justify-between group">
                <div className="text-xs">
                  <p className="text-pink-100 font-semibold">
                    If you make a study plan, you <span className="text-pink-400 font-bold underline">will organize</span> your time better.
                  </p>
                  <p className="text-[11px] text-purple-400">
                    (Si haces un plan, organizarás tu tiempo mejor en el futuro.)
                  </p>
                </div>
                <button
                  onClick={() => handleListen("If you make a study plan, you will organize your time better.")}
                  className="p-1.5 text-purple-400 hover:text-pink-300 bg-purple-900/40 hover:bg-purple-800 rounded-lg transition-colors"
                  title="Escuchar pronunciación"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-pink-950/40 border border-pink-500/20 rounded-xl p-2.5 text-[11px] text-pink-300 flex items-start gap-2">
            <AlertCircle size={14} className="text-pink-400 shrink-0 mt-0.5" />
            <span><strong>¡Alerta de Kuromi!</strong> Después de &quot;will&quot; el verbo NUNCA lleva &apos;s&apos;, ni &apos;ed&apos;, ni &apos;ing&apos;. Es incorrecto decir &quot;will understands ❌&quot; o &quot;will loses ❌&quot;. Lo correcto es &quot;will understand ✅&quot;.</span>
          </div>
        </div>
      </div>

      {/* Common Mistakes & Kuromi Traps table */}
      <div className="bg-[#1d122e] border border-purple-500/30 rounded-3xl p-5 shadow-md">
        <h3 className="text-lg font-bold text-pink-300 font-display flex items-center gap-2 mb-3">
          <span>💀</span> Trampas Típicas en Exámenes de Inglés A2
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-[#140b20] border border-red-500/30 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs mb-1">
              <XCircle size={14} /> Error Frecuente 1
            </div>
            <p className="text-xs line-through text-red-300 font-mono mb-1">
              they will understands ❌
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
              <CheckCircle2 size={14} /> Forma Correcta
            </div>
            <p className="text-xs text-emerald-300 font-mono">
              they will understand ✅
            </p>
            <p className="text-[11px] text-purple-300 mt-2">
              Los verbos modales como <em>will</em> siempre van con forma base (sin -s).
            </p>
          </div>

          <div className="bg-[#140b20] border border-red-500/30 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs mb-1">
              <XCircle size={14} /> Error Frecuente 2
            </div>
            <p className="text-xs line-through text-red-300 font-mono mb-1">
              everyone have a better place ❌
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
              <CheckCircle2 size={14} /> Forma Correcta
            </div>
            <p className="text-xs text-emerald-300 font-mono">
              everyone has a better place ✅
            </p>
            <p className="text-[11px] text-purple-300 mt-2">
              &quot;Everyone&quot; es singular en inglés, se conjuga como he/she/it con <em>has</em>.
            </p>
          </div>

          <div className="bg-[#140b20] border border-red-500/30 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs mb-1">
              <XCircle size={14} /> Error Frecuente 3
            </div>
            <p className="text-xs line-through text-red-300 font-mono mb-1">
              If a student will arrive... ❌
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
              <CheckCircle2 size={14} /> Forma Correcta
            </div>
            <p className="text-xs text-emerald-300 font-mono">
              If a student arrives... ✅
            </p>
            <p className="text-[11px] text-purple-300 mt-2">
              ¡NUNCA pongas &quot;will&quot; dentro de la cláusula de &quot;if&quot;! &quot;Will&quot; va en el resultado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
