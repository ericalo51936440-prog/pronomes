import React, { useState } from 'react';
import { SUBSTITUTION_EXAMPLES } from '../../data/lessonsData';
import { Sparkles, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/speech';
import { sounds } from '../../utils/sound';

export const SubstitutionDemo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReplaced, setIsReplaced] = useState(false);

  const current = SUBSTITUTION_EXAMPLES[currentIndex];

  const handleToggle = () => {
    sounds.playClick();
    const nextState = !isReplaced;
    setIsReplaced(nextState);
    if (nextState) {
      speakText(`Substituição: ${current.replaced}. ${current.explanation}`);
    } else {
      speakText(`Frase original: ${current.original}`);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setIsReplaced(false);
    setCurrentIndex((prev) => (prev + 1) % SUBSTITUTION_EXAMPLES.length);
  };

  const handlePrev = () => {
    sounds.playClick();
    setIsReplaced(false);
    setCurrentIndex((prev) => (prev - 1 + SUBSTITUTION_EXAMPLES.length) % SUBSTITUTION_EXAMPLES.length);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/90 p-5 md:p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>O Laboratório da Substituição</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              Exemplo {currentIndex + 1} de {SUBSTITUTION_EXAMPLES.length}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            O que o pronome substitui: <span className="font-semibold text-amber-700">{current.replacedType}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speakText(isReplaced ? current.replaced : current.original)}
            className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs flex items-center gap-1.5 transition-colors"
            title="Ouvir frase em voz alta"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-medium">Ouvir</span>
          </button>
        </div>
      </div>

      {/* Interactive Sentence Box */}
      <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-100 text-center my-3 transition-all">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {isReplaced ? 'Frase com o Pronome (mais rápida e fluida):' : 'Frase Original (com repetição de palavras):'}
        </p>

        <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 min-h-[3rem] flex items-center justify-center">
          {isReplaced ? (
            <span className="text-emerald-700">
              {current.replaced.split(current.highlightReplaced).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md shadow-xs mx-1">
                      {current.highlightReplaced}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </span>
          ) : (
            <span className="text-slate-800">
              {current.original.split(current.highlightOriginal).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md shadow-xs mx-1">
                      {current.highlightOriginal}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </span>
          )}
        </div>
      </div>

      {/* Big Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-4">
        <button
          onClick={handleToggle}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isReplaced
              ? 'bg-slate-800 text-white hover:bg-slate-700'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 scale-[1.02]'
          }`}
        >
          {isReplaced ? (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Ver Frase Original</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Substituir com Pronome!</span>
            </>
          )}
        </button>
      </div>

      {/* Explanation Box */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
        <span className="text-amber-500 text-base leading-none">💡</span>
        <div>
          <strong className="text-slate-900 font-semibold">Como funciona: </strong>
          {current.explanation}
        </div>
      </div>

      {/* Example pagination */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
        <button
          onClick={handlePrev}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-600 transition-colors"
        >
          ← Exemplo Anterior
        </button>
        <div className="flex gap-1.5">
          {SUBSTITUTION_EXAMPLES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsReplaced(false);
                sounds.playClick();
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-amber-500' : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Ver exemplo ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-600 transition-colors"
        >
          Próximo Exemplo →
        </button>
      </div>
    </div>
  );
};
