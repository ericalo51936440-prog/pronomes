import React, { useState } from 'react';
import { TRUE_FALSE_QUESTIONS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Volume2, ArrowRight, Lightbulb } from 'lucide-react';

interface TrueFalseGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'trueFalse') => void;
}

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ onAddPoints, onCompleteGame }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = TRUE_FALSE_QUESTIONS[currentIdx];

  const handleAnswer = (choice: boolean) => {
    if (isAnswered) return;
    setUserChoice(choice);
    setIsAnswered(true);
    sounds.playClick();

    const isCorrect = choice === currentQ.isTrue;
    if (isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);
      onAddPoints(30);
      speakText(`Correto! ${currentQ.explanation}`);
    } else {
      sounds.playGentleError();
      speakText(`Não foi desta vez. ${currentQ.explanation}`);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIdx < TRUE_FALSE_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserChoice(null);
      setIsAnswered(false);
    } else {
      sounds.playFanfare();
      confetti({ particleCount: 70, spread: 60 });
      onCompleteGame('trueFalse');
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setUserChoice(null);
    setIsAnswered(false);
    setScore(0);
  };

  const isGameOver = currentIdx === TRUE_FALSE_QUESTIONS.length - 1 && isAnswered;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            <h3 className="text-xl font-bold text-slate-900">Verdadeiro ou Falso?</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Lê a frase com atenção e decide se é Verdadeira ou Falsa!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speakText(currentQ.statement)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            title="Ouvir afirmação"
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

      {/* Progress */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-4 pb-2 border-b border-slate-100">
        <span>Pergunta {currentIdx + 1} de {TRUE_FALSE_QUESTIONS.length}</span>
        <span className="font-mono tabular-nums text-emerald-700">
          Pontos: {score * 30} · Acertos: {score}
        </span>
      </div>

      {/* Statement Card */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-center my-6 min-h-[120px] flex items-center justify-center">
        <p className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
          "{currentQ.statement}"
        </p>
      </div>

      {/* Buttons: True vs False */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto my-4">
        <button
          disabled={isAnswered}
          onClick={() => handleAnswer(true)}
          className={`p-4 rounded-2xl border-2 font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer ${
            isAnswered
              ? currentQ.isTrue
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                : userChoice === true
                ? 'bg-red-100 text-red-900 border-red-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 opacity-50'
              : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400'
          }`}
        >
          <Check className="w-6 h-6 text-emerald-600" />
          <span>VERDADEIRO</span>
        </button>

        <button
          disabled={isAnswered}
          onClick={() => handleAnswer(false)}
          className={`p-4 rounded-2xl border-2 font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer ${
            isAnswered
              ? !currentQ.isTrue
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                : userChoice === false
                ? 'bg-red-100 text-red-900 border-red-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 opacity-50'
              : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100 hover:border-rose-400'
          }`}
        >
          <X className="w-6 h-6 text-rose-600" />
          <span>FALSO</span>
        </button>
      </div>

      {/* Feedback Card */}
      {isAnswered && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 mb-2">
            <span className="text-base">
              {userChoice === currentQ.isTrue ? '🎉' : '💡'}
            </span>
            <div>
              <strong className="text-slate-900">
                {userChoice === currentQ.isTrue ? 'Muito bem, acertaste!' : 'Presta atenção:'}{' '}
              </strong>
              <span className="text-slate-700">{currentQ.explanation}</span>
            </div>
          </div>

          <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200/80 flex items-center gap-1.5 mt-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span><strong>Dica para memorizar:</strong> {currentQ.tip}</span>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentIdx < TRUE_FALSE_QUESTIONS.length - 1 ? 'Próxima Afirmação' : 'Ver Resultado'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Game Over */}
      {isGameOver && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <h4 className="font-bold text-emerald-950 text-sm">Jogo Terminado!</h4>
          <p className="text-xs text-emerald-900 mt-0.5 mb-3">
            Acertaste {score} em {TRUE_FALSE_QUESTIONS.length} afirmações!
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
