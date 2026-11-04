import React, { useState } from 'react';
import { PERSONAL_PRONOUNS_DATA } from '../../data/lessonsData';
import { Volume2, CheckCircle2, User, Users } from 'lucide-react';
import { speakText } from '../../utils/speech';
import { sounds } from '../../utils/sound';

export const PronomesPessoais: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>('eu');

  const getWordInfo = (word: string) => {
    switch (word.toLowerCase()) {
      case 'eu':
        return { role: '1.ª Pessoa do Singular (Sujeito)', example: '«Eu vou estudar a matéria de Português.»' };
      case 'tu':
        return { role: '2.ª Pessoa do Singular (Sujeito)', example: '«Tu gostaste de ler o livro?»' };
      case 'ele':
      case 'ela':
        return { role: '3.ª Pessoa do Singular (Sujeito)', example: '«Ela deu-te um bolo.» (exemplo do teu manual)' };
      case 'nós':
        return { role: '1.ª Pessoa do Plural (Sujeito)', example: '«Nós queríamo-lo.» (exemplo do teu manual)' };
      case 'vós':
        return { role: '2.ª Pessoa do Plural (Sujeito)', example: '«Vós fostes muito rápidos no jogo.»' };
      case 'eles':
      case 'elas':
        return { role: '3.ª Pessoa do Plural (Sujeito)', example: '«Eles apresentaram o trabalho à turma.»' };
      case 'me':
        return { role: '1.ª Pessoa do Singular (Complemento)', example: '«O professor chamou-me para responder.»' };
      case 'te':
        return { role: '2.ª Pessoa do Singular (Complemento)', example: '«Ela deu-te um bolo.»' };
      case 'o, a, se':
      case '-lo':
        return { role: '3.ª Pessoa do Singular (Complemento direto)', example: '«Tu gostaste de comê-lo.»' };
      case 'lhe':
        return { role: '3.ª Pessoa do Singular (Complemento indireto)', example: '«Entreguei-lhe o convite da festa.»' };
      case 'nos':
        return { role: '1.ª Pessoa do Plural (Complemento)', example: '«O guia mostrou-nos a biblioteca.»' };
      case 'vos':
        return { role: '2.ª Pessoa do Plural (Complemento)', example: '«Desejo-vos boa sorte no desafio!»' };
      case 'lhes':
        return { role: '3.ª Pessoa do Plural (Complemento indireto)', example: '«O treinador explicou-lhes a tática.»' };
      default:
        return { role: 'Pronome Pessoal', example: 'Refere-se a quem participa na conversa.' };
    }
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    sounds.playClick();
    const info = getWordInfo(word);
    speakText(`Pronome ${word}. Função: ${info.role}. Exemplo: ${info.example}`);
  };

  const currentInfo = selectedWord ? getWordInfo(selectedWord) : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h3 className="text-xl font-bold text-slate-900">{PERSONAL_PRONOUNS_DATA.title}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">{PERSONAL_PRONOUNS_DATA.tagline}</p>
        </div>

        <button
          onClick={() => {
            speakText(
              `${PERSONAL_PRONOUNS_DATA.title}. ${PERSONAL_PRONOUNS_DATA.description} Exemplos do teu manual: ${PERSONAL_PRONOUNS_DATA.examplesFromPdf.join(', ')}`
            );
          }}
          className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs flex items-center gap-1.5 transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span className="font-medium">Ouvir Explicação</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
        {PERSONAL_PRONOUNS_DATA.description}
      </p>

      {/* Examples directly from PDF */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 mb-5">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1.5">
          📖 Exemplos do manual «Palavras fora da Caixa»:
        </span>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          {PERSONAL_PRONOUNS_DATA.examplesFromPdf.map((ex, i) => (
            <span
              key={i}
              className="bg-white text-blue-900 px-3 py-1 rounded-lg border border-blue-200/60 font-medium shadow-2xs"
            >
              {ex}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Table based on PDF slide 4 */}
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-blue-200 bg-blue-50/60 text-blue-950 font-bold">
              <th className="p-3">Pessoa Gramatical</th>
              <th className="p-3">Sujeito (quem faz a ação)</th>
              <th className="p-3">Complemento Direto / Indireto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {/* Singular Section */}
            <tr className="bg-slate-50/50">
              <td colSpan={3} className="px-3 py-1.5 text-xs font-bold text-blue-800 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Singular (uma só pessoa)</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-600">1.ª pessoa (eu)</td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('eu')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'eu'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  eu
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('me')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'me'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  me
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-600">2.ª pessoa (tu)</td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('tu')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'tu'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  tu
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('te')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'te'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  te
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-600">3.ª pessoa (ele / ela)</td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('ele')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'ele'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  ele / ela
                </button>
              </td>
              <td className="p-3 flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleWordClick('o, a, se')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'o, a, se'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  o, a, se
                </button>
                <button
                  onClick={() => handleWordClick('lhe')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'lhe'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  lhe
                </button>
              </td>
            </tr>

            {/* Plural Section */}
            <tr className="bg-slate-50/50">
              <td colSpan={3} className="px-3 py-1.5 text-xs font-bold text-blue-800 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Plural (duas ou mais pessoas)</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-600">1.ª pessoa (nós)</td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('nós')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'nós'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  nós
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('nos')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'nos'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  nos
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-600">2.ª pessoa (vós)</td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('vós')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'vós'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  vós
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('vos')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'vos'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  vos
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-600">3.ª pessoa (eles / elas)</td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('eles')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'eles'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  eles / elas
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleWordClick('lhes')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedWord === 'lhes'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  lhes (ou os, as)
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Selected word inspector */}
      {selectedWord && currentInfo && (
        <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-4 mt-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            {selectedWord.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-950 text-base">«{selectedWord}»</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                {currentInfo.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              <strong>Exemplo na frase: </strong>
              <span className="text-blue-900 font-medium">{currentInfo.example}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
