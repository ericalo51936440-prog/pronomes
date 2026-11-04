import React from 'react';
import { SubstitutionDemo } from './SubstitutionDemo';
import { PronomesPessoais } from './PronomesPessoais';
import { PronomesPossessivos } from './PronomesPossessivos';
import { PronomesDemonstrativos } from './PronomesDemonstrativos';
import { BookOpen, Sparkles, Volume2, ShieldCheck, Gamepad2 } from 'lucide-react';
import { speakText } from '../../utils/speech';
import { sounds } from '../../utils/sound';

interface LearnSectionProps {
  onGoToGames: () => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({ onGoToGames }) => {
  const introSpeech =
    'Bem-vindo à Aventura dos Pronomes! O pronome é uma palavra mágica que substitui nomes, adjetivos ou frases inteiras para o texto não ficar repetitivo. No quinto ano, vamos estudar três subclasses principais: os pronomes pessoais, os possessivos e os demonstrativos. Explora as lições abaixo e depois diverte-te com os jogos!';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2 text-amber-100 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Português · 5.º Ano de Escolaridade · Raiz Editora</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            O Pronome: O Grande Mestre dos Substitutos!
          </h1>

          <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Imagina que estavas a contar uma história e tinhas de repetir o nome do teu melhor amigo vinte vezes! Seria cansativo, não era?
            É aqui que entra o <strong>pronome</strong>: a palavra que entra em campo para substituir nomes, evitar repetições e tornar as tuas frases elegantes e divertidas!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                speakText(introSpeech);
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-50 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Ouvir Introdução</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onGoToGames();
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-900/40 hover:bg-amber-900/60 text-white font-bold text-xs sm:text-sm border border-amber-300/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Ir Direto aos Jogos →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Rules Card from PDF slide 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base mb-3">
            🔄
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1.5">O que substitui?</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pode substituir um <strong>grupo nominal</strong>, um <strong>adjetivo</strong>, um <strong>grupo preposicional</strong> ou até uma <strong>frase inteira</strong>!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-3">
            ⚖️
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1.5">Variáveis vs Invariáveis</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A maior parte varia em <strong>número</strong> (singular/plural) e <strong>género</strong> (masculino/feminino). Mas há alguns que são <strong>invariáveis</strong> (como <em>isto, isso, aquilo</em>)!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base mb-3">
            📚
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1.5">As 3 Subclasses do 5.º Ano</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No 5.º ano aprendes 3 subclasses fundamentais: <strong>Pessoais</strong> (eu, tu, nos), <strong>Possessivos</strong> (meu, teu, vosso) e <strong>Demonstrativos</strong> (este, aquele, isto).
          </p>
        </div>
      </div>

      {/* Interactive Substitution Laboratory */}
      <section>
        <SubstitutionDemo />
      </section>

      {/* Subclass 1: Pronomes Pessoais */}
      <section id="pessoais">
        <PronomesPessoais />
      </section>

      {/* Subclass 2: Pronomes Possessivos */}
      <section id="possessivos">
        <PronomesPossessivos />
      </section>

      {/* Subclass 3: Pronomes Demonstrativos */}
      <section id="demonstrativos">
        <PronomesDemonstrativos />
      </section>

      {/* Bottom CTA to games */}
      <div className="bg-amber-100/70 border border-amber-200 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-amber-950 mb-1">Senteste pronto para treinar?</h3>
        <p className="text-xs sm:text-sm text-amber-900/80 mb-4 max-w-xl mx-auto">
          Temos 8 jogos cheios de diversão: Escape Room, O Impostor, Caça ao Tesouro, Duelo em Equipa e muito mais!
        </p>
        <button
          onClick={() => {
            sounds.playFanfare();
            onGoToGames();
          }}
          className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Jogar Todos os Jogos Agora!</span>
        </button>
      </div>
    </div>
  );
};
