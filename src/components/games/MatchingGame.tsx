import React, { useState } from 'react';
import { MATCHING_SETS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, Volume2, Sparkles, Award } from 'lucide-react';

interface MatchingGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'matching') => void;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({ onAddPoints, onCompleteGame }) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = MATCHING_SETS[currentSetIndex];

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ wordId: string; catId: string }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const matchedWordIds = matchedPairs.map((p) => p.wordId);
  const matchedCatKeys = matchedPairs.map((p) => {
    const word = currentSet.words.find((w) => w.id === p.wordId);
    return word ? word.matchKey : '';
  });

  const handleWordSelect = (wordId: string) => {
    if (matchedWordIds.includes(wordId)) return;
    sounds.playClick();
    setSelectedWord(wordId);
    const word = currentSet.words.find((w) => w.id === wordId);
    if (word) {
      speakText(word.text);
    }

    if (selectedCategory) {
      checkMatch(wordId, selectedCategory);
    }
  };

  const handleCategorySelect = (catId: string) => {
    sounds.playClick();
    setSelectedCategory(catId);
    const category = currentSet.categories.find((c) => c.id === catId);
    if (category) {
      speakText(category.text);
    }

    if (selectedWord) {
      checkMatch(selectedWord, catId);
    }
  };

  const checkMatch = (wordId: string, catId: string) => {
    const word = currentSet.words.find((w) => w.id === wordId);
    const category = currentSet.categories.find((c) => c.id === catId);

    if (word && category) {
      if (word.matchKey === category.matchKey) {
        sounds.playSuccess();
        const newPairs = [...matchedPairs, { wordId, catId }];
        setMatchedPairs(newPairs);
        setFeedback(`Par correto! «${word.text}» pertence a «${category.text}».`);
        setSelectedWord(null);
        setSelectedCategory(null);
        onAddPoints(20);

        if (newPairs.length === currentSet.words.length) {
          setIsCompleted(true);
          sounds.playFanfare();
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          onCompleteGame('matching');
          onAddPoints(100);
        }
      } else {
        sounds.playGentleError();
        setFeedback(`Quase lá! «${word.text}» não pertence a «${category.text}». Tenta outra vez!`);
        setSelectedWord(null);
        setSelectedCategory(null);
      }
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setMatchedPairs([]);
    setSelectedWord(null);
    setSelectedCategory(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  const handleNextSet = () => {
    sounds.playClick();
    setCurrentSetIndex((prev) => (prev + 1) % MATCHING_SETS.length);
    handleReset();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔗</span>
            <h3 className="text-xl font-bold text-slate-900">{currentSet.title}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{currentSet.instruction}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speakText(`${currentSet.title}. ${currentSet.instruction}`)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Ouvir instrução"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-medium">Ouvir</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Recomeçar exercício"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-medium">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
          <span>Pares encontrados:</span>
          <span className="font-mono tabular-nums text-emerald-700">
            {matchedPairs.length} / {currentSet.words.length}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${(matchedPairs.length / currentSet.words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-xl mb-4 text-xs sm:text-sm font-medium flex items-center gap-2 ${
            feedback.includes('correto')
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-amber-50 text-amber-900 border border-amber-200'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Game columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        {/* Left Column: Words */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            1. Escolhe um Pronome:
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {currentSet.words.map((word) => {
              const isMatched = matchedWordIds.includes(word.id);
              const isSelected = selectedWord === word.id;

              return (
                <button
                  key={word.id}
                  disabled={isMatched}
                  onClick={() => handleWordSelect(word.id)}
                  className={`p-3.5 rounded-xl border text-center font-bold text-sm sm:text-base transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    <span>{word.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Categories */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            2. Escolhe a Subclasse ou Categoria correspondente:
          </span>
          <div className="space-y-2.5">
            {currentSet.categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`w-full p-3.5 rounded-xl border text-left font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300 scale-[1.01]'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <span>{cat.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Modal / Banner */}
      {isCompleted && (
        <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
          <Award className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
          <h4 className="text-lg font-bold text-emerald-950">Espetacular! Concluíste todos os pares!</h4>
          <p className="text-xs sm:text-sm text-emerald-800 mt-1 mb-4">
            Ganhaste +100 pontos e provaste que já sabes distinguir os pronomes!
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleNextSet}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Jogar Próximo Nível →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
