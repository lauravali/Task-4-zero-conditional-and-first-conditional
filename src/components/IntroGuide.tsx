import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  AlertTriangle, 
  HelpCircle,
  Lightbulb,
  Gamepad2,
  Calendar,
  CheckSquare,
  Link2
} from 'lucide-react';
import { speakEnglish, playPop } from '../utils/audio';

interface IntroGuideProps {
  onStartRules: () => void;
  onStartHabits: () => void;
}

export const IntroGuide: React.FC<IntroGuideProps> = ({
  onStartRules,
  onStartHabits,
}) => {
  const handleListen = (text: string) => {
    playPop();
    speakEnglish(text);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome & Activity Introduction Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b1747] via-[#1f1035] to-[#160a26] border-2 border-pink-500/50 p-6 sm:p-8 shadow-2xl">
        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-300 border border-pink-400/50 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-yellow-400 animate-spin-slow" />
            Introducción Oficial a la Actividad • Nivel A2
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-200 to-purple-200 font-display mb-3">
            ¡Domina los Condicionales con Kuromi!
          </h1>

          <p className="text-purple-200 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
            Bienvenido a esta experiencia gamificada diseñada especialmente para estudiantes de inglés de nivel A2. 
            Aprenderás a construir oraciones sobre <strong>reglas de convivencia en el salón de clases</strong> (*Classroom Rules*) 
            y <strong>hábitos de estudio efectivos</strong> (*Effective Study Habits*) utilizando dos de las estructuras más importantes del idioma: 
            el <span className="text-pink-300 font-bold">Zero Conditional</span> y el <span className="text-purple-300 font-bold">First Conditional</span>.
          </p>

          {/* Activity Objectives Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-[#150b24]/80 border border-purple-500/30 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0 text-base">
                🎯
              </div>
              <div>
                <h4 className="text-xs font-bold text-pink-200 font-display">1. Objetivo</h4>
                <p className="text-[11px] text-purple-300">
                  Diferenciar entre hechos y reglas inmutables (Zero) vs posibilidades del futuro (First).
                </p>
              </div>
            </div>

            <div className="bg-[#150b24]/80 border border-purple-500/30 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 text-base">
                🎮
              </div>
              <div>
                <h4 className="text-xs font-bold text-pink-200 font-display">2. Dinámica</h4>
                <p className="text-[11px] text-purple-300">
                  Resolver 5 preguntas de reglas de clase y conectar 10 pares de hábitos de estudio con retroalimentación instantánea.
                </p>
              </div>
            </div>

            <div className="bg-[#150b24]/80 border border-purple-500/30 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 flex items-center justify-center shrink-0 text-base">
                🏆
              </div>
              <div>
                <h4 className="text-xs font-bold text-pink-200 font-display">3. Recompensa</h4>
                <p className="text-[11px] text-purple-300">
                  Ganar XP de travesura, desbloquear stickers exclusivos y obtener el Diploma oficial firmado por Kuromi.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                playPop();
                onStartRules();
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <CheckSquare size={16} />
              <span>Ir directo a Classroom Rules (5 Preguntas)</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                playPop();
                onStartHabits();
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-pink-200 font-bold text-xs sm:text-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Link2 size={16} />
              <span>Ir a Study Habits Match (10 Conexiones)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Detailed Explanation of Both Topics */}
      <div className="space-y-6">
        <div className="border-b border-purple-500/20 pb-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider">
            <Lightbulb size={14} /> Fundamentos Gramaticales
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-pink-100 font-display">
            Explicación Completa de los Dos Temas
          </h2>
          <p className="text-xs text-purple-300">
            Comprende cómo funcionan las oraciones condicionales y cuándo usar cada una.
          </p>
        </div>

        {/* Anatomía de un condicional */}
        <div className="bg-[#1e1330] border border-purple-500/30 rounded-3xl p-5 shadow-lg">
          <h3 className="font-display font-bold text-base text-pink-300 mb-2 flex items-center gap-2">
            <span>🧩</span> ¿Qué es una oración condicional (*Conditional Sentence*)?
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed mb-3">
            Una oración condicional en inglés tiene <strong>dos partes inseparables</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-[#140b20] border border-pink-500/30 p-3.5 rounded-2xl">
              <span className="text-pink-400 font-bold block mb-1">1. Cláusula &quot;IF&quot; (La Condición o Causa)</span>
              <p className="text-purple-200 font-sans text-xs">
                Establece la circunstancia. Empieza con la palabra <strong>If</strong> (Si...).<br />
                <em className="text-pink-300 font-mono">Ej: If students listen carefully,</em>
              </p>
            </div>
            <div className="bg-[#140b20] border border-purple-500/30 p-3.5 rounded-2xl">
              <span className="text-purple-300 font-bold block mb-1">2. Cláusula Principal (El Resultado o Consecuencia)</span>
              <p className="text-purple-200 font-sans text-xs">
                Describe lo que ocurre o ocurrirá si la condición se cumple.<br />
                <em className="text-purple-300 font-mono">Ej: they understand the instructions.</em>
              </p>
            </div>
          </div>
          <div className="mt-3 p-2.5 rounded-xl bg-purple-950/60 border border-purple-700/40 text-[11px] text-purple-300 flex items-center gap-2">
            <span>💡</span>
            <span><strong>Regla de la coma (,):</strong> Si la oración empieza con <em>If</em>, lleva coma después de la condición. Si el resultado va primero, no lleva coma: <em>&quot;Students understand the instructions if they listen carefully.&quot;</em></span>
          </div>
        </div>

        {/* Comparative Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TEMA 1: ZERO CONDITIONAL */}
          <div className="bg-[#1f1333] border-2 border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-purple-900/80 text-purple-200 border border-purple-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Tema 1 • 100% Hecho Real
                </span>
                <span className="text-2xl">🖤</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-pink-300 font-display mb-1">
                Zero Conditional (Condicional Cero)
              </h3>
              
              <div className="space-y-3 my-4">
                <div className="bg-[#160d26] p-3.5 rounded-2xl border border-purple-500/30">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
                    🎯 ¿Cuándo se usa?
                  </span>
                  <ul className="text-xs text-purple-200 space-y-1 list-disc list-inside">
                    <li><strong>Reglas del salón:</strong> Lo que siempre pasa si respetas o incumples una norma.</li>
                    <li><strong>Hechos científicos o universales:</strong> Resultados que ocurren el 100% de las veces.</li>
                    <li><strong>Hábitos automáticos:</strong> Consecuencias inmediatas de una acción cotidiana.</li>
                  </ul>
                </div>

                <div className="bg-[#160d26] p-3.5 rounded-2xl border border-pink-500/30">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
                    📐 Fórmula Estructural:
                  </span>
                  <div className="font-mono text-xs sm:text-sm bg-purple-950 p-2.5 rounded-xl text-center text-pink-200 font-bold border border-purple-800">
                    <span className="text-pink-400">If</span> + Present Simple, + <span className="text-purple-300">Present Simple</span>
                  </div>
                </div>

                {/* Real classroom examples */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
                    Ejemplos Reales de la Actividad:
                  </span>

                  <div className="bg-[#150a22] p-3 rounded-xl border border-purple-500/20 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <p className="text-pink-100 font-semibold">
                        &quot;If students listen carefully, they <span className="text-pink-400 font-bold underline">understand</span> the instructions.&quot;
                      </p>
                      <p className="text-[11px] text-purple-400">
                        (Regla de clase: Ambas cláusulas en presente simple).
                      </p>
                    </div>
                    <button
                      onClick={() => handleListen("If students listen carefully, they understand the instructions.")}
                      className="p-2 text-purple-300 hover:text-pink-300 bg-purple-900/50 hover:bg-purple-900 rounded-lg transition-colors shrink-0"
                      title="Escuchar"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div className="bg-[#150a22] p-3 rounded-xl border border-purple-500/20 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <p className="text-pink-100 font-semibold">
                        &quot;If students keep the classroom clean, everyone <span className="text-pink-400 font-bold underline">has</span> a better place.&quot;
                      </p>
                      <p className="text-[11px] text-purple-400">
                        (*Everyone* es 3ª persona singular, por eso lleva *has* y no *have*).
                      </p>
                    </div>
                    <button
                      onClick={() => handleListen("If students keep the classroom clean, everyone has a better place to study.")}
                      className="p-2 text-purple-300 hover:text-pink-300 bg-purple-900/50 hover:bg-purple-900 rounded-lg transition-colors shrink-0"
                      title="Escuchar"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-950/60 border border-purple-600/30 rounded-2xl p-3 text-xs text-purple-300 flex items-start gap-2 mt-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Clave de Kuromi:</strong> En el Zero Conditional <em>NUNCA</em> usamos &quot;will&quot;, porque describe algo que ocurre siempre, no una promesa futura.</span>
            </div>
          </div>

          {/* TEMA 2: FIRST CONDITIONAL */}
          <div className="bg-[#1f1333] border-2 border-pink-500/40 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-pink-900/80 text-pink-200 border border-pink-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Tema 2 • Futuro Posible con WILL
                </span>
                <span className="text-2xl">✨</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-pink-300 font-display mb-1">
                First Conditional (Primer Condicional)
              </h3>
              
              <div className="space-y-3 my-4">
                <div className="bg-[#160d26] p-3.5 rounded-2xl border border-pink-500/30">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
                    🎯 ¿Cuándo se usa?
                  </span>
                  <ul className="text-xs text-purple-200 space-y-1 list-disc list-inside">
                    <li><strong>Situaciones futuras reales:</strong> Si haces esto hoy, ocurrirá esto mañana.</li>
                    <li><strong>Promesas, planes y advertencias:</strong> Predicciones con alta probabilidad.</li>
                    <li><strong>Palabras temporales de futuro:</strong> <em>tomorrow, next week, soon, later</em>.</li>
                  </ul>
                </div>

                <div className="bg-[#160d26] p-3.5 rounded-2xl border border-purple-500/30">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
                    📐 Fórmula Estructural:
                  </span>
                  <div className="font-mono text-xs sm:text-sm bg-pink-950 p-2.5 rounded-xl text-center text-pink-200 font-bold border border-pink-800">
                    <span className="text-purple-300">If</span> + Present Simple, + <span className="text-pink-400 font-extrabold">WILL</span> + Verbo Base
                  </div>
                </div>

                {/* Real classroom examples */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider block">
                    Ejemplos Reales de la Actividad:
                  </span>

                  <div className="bg-[#150a22] p-3 rounded-xl border border-pink-500/20 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <p className="text-pink-100 font-semibold">
                        &quot;If a student arrives late <span className="text-yellow-300 font-bold">tomorrow</span>, the teacher <span className="text-pink-400 font-bold underline">will ask</span> them to enter quietly.&quot;
                      </p>
                      <p className="text-[11px] text-purple-400">
                        (&quot;Tomorrow&quot; indica situación específica futura → activamos *will ask*).
                      </p>
                    </div>
                    <button
                      onClick={() => handleListen("If a student arrives late tomorrow, the teacher will ask them to enter quietly.")}
                      className="p-2 text-purple-300 hover:text-pink-300 bg-purple-900/50 hover:bg-purple-900 rounded-lg transition-colors shrink-0"
                      title="Escuchar"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div className="bg-[#150a22] p-3 rounded-xl border border-pink-500/20 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <p className="text-pink-100 font-semibold">
                        &quot;If you make a study plan, you <span className="text-pink-400 font-bold underline">will organize</span> your time better.&quot;
                      </p>
                      <p className="text-[11px] text-purple-400">
                        (Consecuencia futura de adoptar el hábito).
                      </p>
                    </div>
                    <button
                      onClick={() => handleListen("If you make a study plan, you will organize your time better.")}
                      className="p-2 text-purple-300 hover:text-pink-300 bg-purple-900/50 hover:bg-purple-900 rounded-lg transition-colors shrink-0"
                      title="Escuchar"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-pink-950/60 border border-pink-600/30 rounded-2xl p-3 text-xs text-pink-300 flex items-start gap-2 mt-2">
              <AlertTriangle size={16} className="text-pink-400 shrink-0 mt-0.5" />
              <span><strong>Regla de oro de Kuromi:</strong> Después de <em>will</em> NUNCA pongas una &apos;s&apos;. Jamás digas <em>&quot;will understands&quot; ❌</em> o <em>&quot;will loses&quot; ❌</em>. Lo correcto es <em>&quot;will understand&quot; ✅</em>.</span>
            </div>
          </div>
        </div>

        {/* Quick Comparison Summary Table */}
        <div className="bg-[#1a102b] border border-purple-500/30 rounded-3xl p-5 shadow-lg overflow-x-auto">
          <h3 className="font-display font-bold text-base text-pink-200 mb-3 flex items-center gap-2">
            <span>📊</span> Cuadro Resumen Comparativo para Nivel A2
          </h3>
          <table className="w-full text-left text-xs text-purple-200 min-w-[550px]">
            <thead>
              <tr className="border-b border-purple-800 text-pink-300 font-display">
                <th className="py-2 px-3">Condicional</th>
                <th className="py-2 px-3">¿Para qué sirve?</th>
                <th className="py-2 px-3">Cláusula &quot;If&quot;</th>
                <th className="py-2 px-3">Cláusula Resultado</th>
                <th className="py-2 px-3">Ejemplo Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/50 font-medium">
              <tr>
                <td className="py-3 px-3 font-bold text-pink-300">Zero Conditional</td>
                <td className="py-3 px-3">Verdades universales, reglas y hábitos escolares.</td>
                <td className="py-3 px-3 font-mono text-purple-300">If + Present Simple</td>
                <td className="py-3 px-3 font-mono text-purple-300">Present Simple</td>
                <td className="py-3 px-3 italic">If students listen, they understand.</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-purple-300">First Conditional</td>
                <td className="py-3 px-3">Posibilidades reales en el futuro, advertencias y planes.</td>
                <td className="py-3 px-3 font-mono text-purple-300">If + Present Simple</td>
                <td className="py-3 px-3 font-mono text-pink-400 font-bold">WILL + Verbo Base</td>
                <td className="py-3 px-3 italic">If you arrive late tomorrow, the teacher will ask...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Instructions and Activity Breakdown */}
      <div className="bg-[#201435] border-2 border-purple-500/40 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Gamepad2 size={16} /> Guía del Estudiante
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-pink-100 font-display mb-2">
          ¿Cómo completar las actividades con Kuromi?
        </h2>
        <p className="text-xs sm:text-sm text-purple-300 mb-6">
          Sigue esta ruta paso a paso para conseguir el 100% de la puntuación:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#160c26] border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-pink-500/20 text-pink-300 border border-pink-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                  Paso 1
                </span>
                <span className="text-xs text-purple-400 font-mono">5 Preguntas</span>
              </div>
              <h4 className="font-display font-bold text-sm text-pink-200 mb-1">
                Classroom Rules (Reglas del Aula)
              </h4>
              <p className="text-xs text-purple-300 leading-relaxed mb-3">
                Lee cada oración sobre el comportamiento en clase. Selecciona la opción correcta (*a, b o c*). 
                Kuromi te dirá inmediatamente por qué acertaste o qué regla gramatical debes recordar.
              </p>
            </div>
            <button
              onClick={() => {
                playPop();
                onStartRules();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Empezar Classroom Rules</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-[#160c26] border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                  Paso 2
                </span>
                <span className="text-xs text-purple-400 font-mono">10 Conexiones</span>
              </div>
              <h4 className="font-display font-bold text-sm text-pink-200 mb-1">
                Study Habits Match (Hábitos de Estudio)
              </h4>
              <p className="text-xs text-purple-300 leading-relaxed mb-3">
                Conecta la Columna 1 (Condición &quot;If...&quot;) con su consecuencia lógica de la Columna 2. 
                Cada pareja completada te enseñará un consejo para estudiar mejor y te dará puntos de experiencia.
              </p>
            </div>
            <button
              onClick={() => {
                playPop();
                onStartHabits();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Empezar Study Habits Match</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
