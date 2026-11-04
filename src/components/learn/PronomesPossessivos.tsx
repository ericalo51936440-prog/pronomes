import React, { useState } from 'react';
import { POSSESSIVE_PRONOUNS_DATA } from '../../data/lessonsData';
import { Volume2, Package, Sparkles } from 'lucide-react';
import { speakText } from '../../utils/speech';
import { sounds } from '../../utils/sound';

export const PronomesPossessivos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'one' | 'multi'>('one');

  const handleSpeakWord = (word: string, context: string) => {
    sounds.playClick();
    speakText(`Pronome possessivo: ${word}. Exemplo: ${context}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h3 className="text-xl font-bold text-slate-900">{POSSESSIVE_PRONOUNS_DATA.title}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">{POSSESSIVE_PRONOUNS_DATA.tagline}</p>
        </div>

        <button
          onClick={() => {
            speakText(
              `${POSSESSIVE_PRONOUNS_DATA.title}. ${POSSESSIVE_PRONOUNS_DATA.description} Exemplo do teu manual: ${POSSESSIVE_PRONOUNS_DATA.exampleFromPdf}`
            );
          }}
          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs flex items-center gap-1.5 transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span className="font-medium">Ouvir Explicação</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
        {POSSESSIVE_PRONOUNS_DATA.description}
      </p>

      {/* Manual Example */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 mb-5 flex items-center gap-3">
        <Package className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold text-emerald-950 block">Exemplo do teu manual (Palavras fora da Caixa):</span>
          <span className="text-emerald-900 font-medium">«{POSSESSIVE_PRONOUNS_DATA.exampleFromPdf}»</span>
          <span className="text-slate-500 block text-xs mt-0.5">
            («o teu» substitui o carro da outra pessoa para não repetir a palavra!)
          </span>
        </div>
      </div>

      {/* Mode switch */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-4 max-w-md">
        <button
          onClick={() => {
            setActiveTab('one');
            sounds.playClick();
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'one'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          👤 Um Só Possuidor (ex: meu, teu)
        </button>
        <button
          onClick={() => {
            setActiveTab('multi');
            sounds.playClick();
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'multi'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          👥 Vários Possuidores (ex: nosso, vosso)
        </button>
      </div>

      {/* Tables based on slide 5 */}
      {activeTab === 'one' ? (
        <div className="overflow-x-auto">
          <h4 className="text-sm font-bold text-emerald-950 mb-2 flex items-center gap-2">
            <span>{POSSESSIVE_PRONOUNS_DATA.oneOwner.title}</span>
            <span className="text-xs font-normal text-slate-500">(Clica em qualquer palavra para ouvir!)</span>
          </h4>
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-50/70 border-b border-emerald-200 text-emerald-950 font-bold">
                <th className="p-3">Pessoa</th>
                <th className="p-3">Singular Masc.</th>
                <th className="p-3">Singular Fem.</th>
                <th className="p-3">Plural Masc.</th>
                <th className="p-3">Plural Fem.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {POSSESSIVE_PRONOUNS_DATA.oneOwner.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="p-3 font-semibold text-slate-800">{row.person}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.mascSing, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.mascSing}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.femSing, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.femSing}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.mascPlur, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.mascPlur}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.femPlur, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.femPlur}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <h4 className="text-sm font-bold text-emerald-950 mb-2 flex items-center gap-2">
            <span>{POSSESSIVE_PRONOUNS_DATA.multiOwners.title}</span>
            <span className="text-xs font-normal text-slate-500">(Clica em qualquer palavra para ouvir!)</span>
          </h4>
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-50/70 border-b border-emerald-200 text-emerald-950 font-bold">
                <th className="p-3">Pessoa</th>
                <th className="p-3">Singular Masc.</th>
                <th className="p-3">Singular Fem.</th>
                <th className="p-3">Plural Masc.</th>
                <th className="p-3">Plural Fem.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {POSSESSIVE_PRONOUNS_DATA.multiOwners.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="p-3 font-semibold text-slate-800">{row.person}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.mascSing, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.mascSing}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.femSing, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.femSing}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.mascPlur, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.mascPlur}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleSpeakWord(row.femPlur, row.phrase)}
                      className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                    >
                      {row.femPlur}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Helpful tip for students with learning difficulties */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mt-4 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900">
          <strong>Dica Amiga:</strong> Repara que o pronome combina com o que é possuído! Se dizes «o caderno», dizes «o <strong>meu</strong> caderno» (masculino). Se dizes «a bola», dizes «a <strong>minha</strong> bola» (feminino)!
        </p>
      </div>
    </div>
  );
};
