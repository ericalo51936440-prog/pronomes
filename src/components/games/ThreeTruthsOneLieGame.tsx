import React, { useState } from 'react';
import { THREE_TRUTHS_ROUNDS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { ShieldAlert, CheckCircle, XCircle, RotateCcw, Volume2, ArrowRight } from 'lucide-react';

interface ThreeTruthsProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'threeTruths') => void;
}

export const ThreeTruthsOneLieGame: React.FC<ThreeTruthsProps> = ({ onAddPoints, onCompleteGame }) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedStatementId, setSelectedStatementId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentRound = THREE_TRUTHS_ROUNDS[roundIdx];

  const handleSelect = (stmtId: string) => {
    if (isRevealed) return;
    sounds.playClick();
    setSelectedStatementId(stmtId);
    setIsRevealed(true);

    const chosen = currentRound.statements.find((s) => s.id === stmtId);
    if (chosen?.isLie) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);
      onAddPoints(50);
      speakText(`Excelente! Apanhaste a mentira: ${chosen.explanation}`);
    } else {
      sounds.playGentleError();
      const lie = currentRound.statements.find((s) => s.isLie);
      speakText(`Essa afirmação é verdadeira! A mentira era: ${lie?.text}`);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (roundIdx < THREE_TRUTHS_ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
      setSelectedStatementId(null);
      setIsRevealed(false);
    } else {
      // Completed all rounds
      sounds.playFanfare();
      confetti({ particleCount: 70, spread: 60 });
      onCompleteGame('threeTruths');
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setRoundIdx(0);
    setSelectedStatementId(null);
    setIsRevealed(false);
    setScore(0);
  };

  const isGameOver = roundIdx === THREE_TRUTHS_ROUNDS.length - 1 && isRevealed;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🕵️</span>
            <h3 className="text-xl font-bold text-slate-900">3 Verdades e 1 Mentira</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Três frases dizem a verdade e uma frase está a mentir. Descobre a mentira!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              speakText(
                `${currentRound.title}. Descobre qual das quatro afirmações é a mentira!`
              )
            }
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            title="Ouvir instrução"
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

      {/* Round Indicator */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-4 pb-2 border-b border-slate-100">
        <span>{currentRound.title}</span>
        <span className="font-mono tabular-nums text-amber-700">
          Ronda {roundIdx + 1} de {THREE_TRUTHS_ROUNDS.length} · Acertos: {score}
        </span>
      </div>

      {/* 4 Statements */}
      <div className="space-y-3 my-4">
        {currentRound.statements.map((stmt) => {
          const isSelected = selectedStatementId === stmt.id;
          let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50/60 hover:border-amber-300';

          if (isRevealed) {
            if (stmt.isLie) {
              btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-200';
            } else if (isSelected && !stmt.isLie) {
              btnStyle = 'bg-amber-50 border-amber-300 text-amber-950';
            } else {
              btnStyle = 'bg-slate-50/60 border-slate-200 text-slate-500 opacity-70';
            }
          }

          return (
            <button
              key={stmt.id}
              disabled={isRevealed}
              onClick={() => handleSelect(stmt.id)}
              className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span>{stmt.text}</span>
                  {isRevealed && stmt.isLie && (
                    <span className="block mt-1 text-xs font-bold text-rose-600">
                      🚨 ESTA É A MENTIRA! {stmt.explanation}
                    </span>
                  )}
                </div>
                {isRevealed && (
                  <div className="shrink-0 mt-0.5">
                    {stmt.isLie ? (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-200 text-rose-900">
                        Mentira
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        Verdade
                      </span>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom controls */}
      {isRevealed && (
        <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-600 font-medium">
            {currentRound.statements.find((s) => s.id === selectedStatementId)?.isLie
              ? '🎉 Acertaste! Encontraste a mentira com olhar de falcão!'
              : '💡 Olha a explicação acima para aprender o detalhe da regra!'}
          </p>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>{roundIdx < THREE_TRUTHS_ROUNDS.length - 1 ? 'Próxima Ronda' : 'Terminar Jogo'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Game Over Summary */}
      {isGameOver && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <h4 className="font-bold text-amber-950 text-sm">Fim do Jogo 3 Verdades e 1 Mentira!</h4>
          <p className="text-xs text-amber-900 mt-0.5 mb-3">
            Conseguiste {score} de {THREE_TRUTHS_ROUNDS.length} acertos!
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
