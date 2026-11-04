import React, { useState } from 'react';
import { IMPOSTOR_ROUNDS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { ShieldAlert, UserX, UserCheck, RotateCcw, Volume2, ArrowRight } from 'lucide-react';

interface ImpostorGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'impostor') => void;
}

export const ImpostorGame: React.FC<ImpostorGameProps> = ({ onAddPoints, onCompleteGame }) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentRound = IMPOSTOR_ROUNDS[roundIdx];

  const handleSelectWord = (idx: number) => {
    if (isRevealed) return;
    sounds.playClick();
    setSelectedWordIdx(idx);
    setIsRevealed(true);

    const wordObj = currentRound.words[idx];
    if (wordObj.isImpostor) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);
      onAddPoints(40);
      speakText(`Apanhaste o impostor! ${wordObj.explanation}`);
    } else {
      sounds.playGentleError();
      const impostor = currentRound.words.find((w) => w.isImpostor);
      speakText(`Esta palavra não é o impostor! O impostor era a palavra ${impostor?.text}.`);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (roundIdx < IMPOSTOR_ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
      setSelectedWordIdx(null);
      setIsRevealed(false);
    } else {
      sounds.playFanfare();
      confetti({ particleCount: 75, spread: 60 });
      onCompleteGame('impostor');
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setRoundIdx(0);
    setSelectedWordIdx(null);
    setIsRevealed(false);
    setScore(0);
  };

  const isGameOver = roundIdx === IMPOSTOR_ROUNDS.length - 1 && isRevealed;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛸</span>
            <h3 className="text-xl font-bold text-slate-900">O Impostor das Palavras</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Três palavras são companheiras de equipa. Uma é um intruso disfarçado!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              speakText(`${currentRound.categoryTitle}. ${currentRound.hint}`)
            }
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            title="Ouvir missão"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-medium">Ouvir</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            title="Recomeçar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mission card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 mb-5 shadow-xs">
        <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
          <span>{currentRound.categoryTitle}</span>
          <span className="font-mono tabular-nums">
            Ronda {roundIdx + 1} de {IMPOSTOR_ROUNDS.length}
          </span>
        </div>
        <p className="text-slate-200 text-xs sm:text-sm font-medium">
          🔍 <strong>Dica da missão:</strong> {currentRound.hint}
        </p>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {currentRound.words.map((w, idx) => {
          const isSelected = selectedWordIdx === idx;
          let cardStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50 hover:border-red-300';

          if (isRevealed) {
            if (w.isImpostor) {
              cardStyle = 'bg-red-500 text-white border-red-600 shadow-md ring-2 ring-red-300 scale-105';
            } else if (isSelected && !w.isImpostor) {
              cardStyle = 'bg-slate-200 text-slate-600 border-slate-300';
            } else {
              cardStyle = 'bg-slate-50 border-slate-200 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={isRevealed}
              onClick={() => handleSelectWord(idx)}
              className={`p-5 rounded-2xl border text-center font-bold text-base sm:text-lg transition-all cursor-pointer flex flex-col items-center justify-center min-h-[110px] ${cardStyle}`}
            >
              <span className="block">{w.text}</span>
              {isRevealed && (
                <span className="text-xs font-semibold mt-2 block">
                  {w.isImpostor ? '🚨 IMPOSTOR!' : '✔️ Inocente'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation banner if revealed */}
      {isRevealed && selectedWordIdx !== null && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
          <p className="font-medium text-slate-800">
            {currentRound.words[selectedWordIdx].explanation}
          </p>
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{roundIdx < IMPOSTOR_ROUNDS.length - 1 ? 'Próxima Missão' : 'Concluir Desafio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Game Over */}
      {isGameOver && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <h4 className="font-bold text-amber-950 text-sm">Missão Impostor Concluída!</h4>
          <p className="text-xs text-amber-900 mt-0.5 mb-3">
            Apanhaste {score} de {IMPOSTOR_ROUNDS.length} impostores!
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 cursor-pointer"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
