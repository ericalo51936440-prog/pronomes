import React, { useState } from 'react';
import { DEMONSTRATIVE_PRONOUNS_DATA } from '../../data/lessonsData';
import { Volume2, MapPin, Compass, AlertCircle } from 'lucide-react';
import { speakText } from '../../utils/speech';
import { sounds } from '../../utils/sound';

export const PronomesDemonstrativos: React.FC = () => {
  const [activeDistance, setActiveDistance] = useState<number>(0);

  const zones = [
    {
      title: '1. Aqui (Perto de quem fala)',
      location: 'Mesmo aqui ao meu lado ou na minha mão',
      variables: ['este', 'esta', 'estes', 'estas'],
      invariable: 'isto',
      example: '«Gosto muito deste lápis aqui na minha mão.» / «O que é isto?»',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    },
    {
      title: '2. Aí (Perto de quem ouve)',
      location: 'Aí junto de ti ou com quem estou a falar',
      variables: ['esse', 'essa', 'esses', 'essas'],
      invariable: 'isso',
      example: '«Podes passar-me esse caderno que está aí ao teu lado?» / «Não faças isso.»',
      color: 'bg-purple-50 border-purple-200 text-purple-900',
    },
    {
      title: '3. Lá (Longe de ambos)',
      location: 'Lá ao longe, distante de nós os dois',
      variables: ['aquele', 'aquela', 'aqueles', 'aquelas'],
      invariable: 'aquilo',
      example: '«Olha para aquele pássaro lá no cimo da árvore!» / «O que será aquilo no céu?»',
      color: 'bg-pink-50 border-pink-200 text-pink-900',
    },
  ];

  const currentZone = zones[activeDistance];

  const handleSelectZone = (index: number) => {
    setActiveDistance(index);
    sounds.playClick();
    speakText(`${zones[index].title}. ${zones[index].location}. Exemplo: ${zones[index].example}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              3
            </span>
            <h3 className="text-xl font-bold text-slate-900">{DEMONSTRATIVE_PRONOUNS_DATA.title}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">{DEMONSTRATIVE_PRONOUNS_DATA.tagline}</p>
        </div>

        <button
          onClick={() => {
            speakText(
              `${DEMONSTRATIVE_PRONOUNS_DATA.title}. ${DEMONSTRATIVE_PRONOUNS_DATA.description} Exemplo do manual: ${DEMONSTRATIVE_PRONOUNS_DATA.exampleFromPdf}`
            );
          }}
          className="p-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs flex items-center gap-1.5 transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span className="font-medium">Ouvir Explicação</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
        {DEMONSTRATIVE_PRONOUNS_DATA.description}
      </p>

      {/* Manual Example */}
      <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3.5 mb-5 flex items-center gap-3">
        <Compass className="w-5 h-5 text-purple-600 shrink-0" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold text-purple-950 block">Exemplo do teu manual (Palavras fora da Caixa):</span>
          <span className="text-purple-900 font-medium">«{DEMONSTRATIVE_PRONOUNS_DATA.exampleFromPdf}»</span>
          <span className="text-slate-500 block text-xs mt-0.5">
            («este» é o que está aqui perto; «aquele» é o que está lá mais longe!)
          </span>
        </div>
      </div>

      {/* The Visual Distance Ruler */}
      <div className="my-5">
        <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>A Régua da Distância (Clica nas 3 zonas para experimentar):</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {zones.map((zone, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectZone(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeDistance === idx
                  ? 'border-purple-500 bg-purple-50 shadow-xs ring-2 ring-purple-200'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-purple-900">{zone.title}</span>
                <MapPin className={`w-3.5 h-3.5 ${activeDistance === idx ? 'text-purple-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{zone.location}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail of selected distance zone */}
      <div className="bg-gradient-to-br from-purple-50/60 to-indigo-50/60 rounded-xl p-4 border border-purple-200/80 my-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h5 className="font-bold text-purple-950 text-sm">{currentZone.title}</h5>
          <span className="text-xs text-purple-800 font-medium bg-purple-100/70 px-2 py-0.5 rounded-md">
            {currentZone.location}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-lg p-3 border border-purple-100 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 block mb-1">Formas Variáveis:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentZone.variables.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-900 font-bold text-xs"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-purple-100 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 block mb-1">Forma Invariável (nunca muda!):</span>
            <span className="px-3 py-1 rounded-md bg-amber-100 text-amber-900 font-bold text-xs inline-block">
              {currentZone.invariable}
            </span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 bg-white/80 rounded-lg p-3 border border-purple-100">
          <strong>Frase modelo: </strong>
          <span className="text-purple-950 italic">{currentZone.example}</span>
        </div>
      </div>

      {/* The Invariables Gold Rule Box */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mt-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h5 className="font-bold text-amber-950 text-xs sm:text-sm">
            ⭐ O Segredo dos Invariáveis: «isto», «isso» e «aquilo»
          </h5>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed">
            {DEMONSTRATIVE_PRONOUNS_DATA.invariableNotice.text}
          </p>
        </div>
      </div>
    </div>
  );
};
