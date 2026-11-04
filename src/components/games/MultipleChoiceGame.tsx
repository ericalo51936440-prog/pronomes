import React, { useState } from 'react';
import { MULTIPLE_CHOICE_QUESTIONS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { HelpCircle, RotateCcw, Volume2, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface MultipleChoiceProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'multipleChoice') => void;
}

export const MultipleChoiceGame: React.FC<MultipleChoiceProps> = ({ onAddPoints, onCompleteGame }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = MULTIPLE_CHOICE_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedOptionIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);
      onAddPoints(40);
      speakText(`Excelente! ${currentQ.explanation}`);
    } else {
      sounds.playGentleError();
      speakText(`Boa tentativa. ${currentQ.explanation}`);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIdx < MULTIPLE_CHOICE_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      sounds.playFanfare();
      confetti({ particleCount: 75, spread: 60 });
      onCompleteGame('multipleChoice');
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
  };

  const isGameOver = currentIdx === MULTIPLE_CHOICE_QUESTIONS.length - 1 && isAnswered;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h3 className="text-xl font-bold text-slate-900">Quiz de Escolha Múltipla</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Descobre a opção correta para cada desafio com exemplos do manual!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speakText(`${currentQ.question}. ${currentQ.options.join('. ')}`)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            title="Ouvir pergunta"
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
        <span>Pergunta {currentIdx + 1} de {MULTIPLE_CHOICE_QUESTIONS.length}</span>
        <span className="font-mono tabular-nums text-emerald-700">
          Pontos: {score * 40} · Acertos: {score}
        </span>
      </div>

      {/* Question Box */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 my-4">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block mb-1">
          {currentQ.context}
        </span>
        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h4>
      </div>

      {/* Hint toggle */}
      <div className="mb-3">
        <button
          onClick={() => {
            setShowHint(!showHint);
            sounds.playClick();
          }}
          className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Fechar dica' : 'Precisas de uma dica?'}</span>
        </button>

        {showHint && (
          <div className="mt-2 p-3 rounded-xl bg-amber-100/60 border border-amber-200 text-xs text-amber-950 font-medium">
            <strong>Dica do Professor: </strong>{currentQ.hint}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5 my-4">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOptionIdx === idx;
          const isCorrect = idx === currentQ.correctIndex;

          let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50/60 hover:border-amber-300';

          if (isAnswered) {
            if (isCorrect) {
              btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-200';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-rose-50 border-rose-300 text-rose-950';
            } else {
              btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          const letters = ['A', 'B', 'C', 'D'];

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0 shadow-2xs">
                  {letters[idx]}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswered && (
                <div className="shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback section */}
      {isAnswered && (
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
          <p className="font-medium text-slate-800 mb-3">
            <strong>Explicação: </strong>{currentQ.explanation}
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentIdx < MULTIPLE_CHOICE_QUESTIONS.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Game Over */}
      {isGameOver && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <h4 className="font-bold text-emerald-950 text-sm">Quiz Concluído!</h4>
          <p className="text-xs text-emerald-900 mt-0.5 mb-3">
            Parabéns! Conseguiste {score} acertos em {MULTIPLE_CHOICE_QUESTIONS.length} perguntas!
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
          >
            Repetir Quiz
          </button>
        </div>
      )}
    </div>
  );
};
