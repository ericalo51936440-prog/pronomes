import React, { useState } from 'react';
import { ESCAPE_ROOM_STEPS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { KeyRound, Lock, Unlock, HelpCircle, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface EscapeRoomGameProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'escapeRoom') => void;
}

export const EscapeRoomGame: React.FC<EscapeRoomGameProps> = ({ onAddPoints, onCompleteGame }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [collectedDigits, setCollectedDigits] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isEscaped, setIsEscaped] = useState(false);

  const currentStep = ESCAPE_ROOM_STEPS[currentStepIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    const option = currentStep.options[idx];

    if (option.isCorrect) {
      sounds.playSuccess();
      setFeedback({ text: option.feedback, isCorrect: true });
      speakText(option.feedback);

      if (!collectedDigits.includes(option.digit)) {
        const newDigits = [...collectedDigits, option.digit];
        setCollectedDigits(newDigits);
        onAddPoints(30);

        if (currentStepIdx === ESCAPE_ROOM_STEPS.length - 1) {
          setIsEscaped(true);
          sounds.playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          onCompleteGame('escapeRoom');
          onAddPoints(150);
        }
      }
    } else {
      sounds.playGentleError();
      setFeedback({ text: option.feedback, isCorrect: false });
      speakText(option.feedback);
    }
  };

  const handleNextRoom = () => {
    sounds.playClick();
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
    if (currentStepIdx < ESCAPE_ROOM_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleResetGame = () => {
    sounds.playClick();
    setCurrentStepIdx(0);
    setCollectedDigits([]);
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
    setIsEscaped(false);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
      {/* Top Escape Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold tracking-tight text-white">
              Escape Room: O Mistério da Biblioteca dos Pronomes
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Resolve os 4 enigmas gramaticais para recolher os 4 dígitos do cofre secreto!
          </p>
        </div>

        {/* Secret Code Pad */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <span className="text-xs text-slate-400 font-semibold mr-1">Código:</span>
          {[0, 1, 2, 3].map((slotIdx) => {
            const digit = collectedDigits[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`w-8 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg border ${
                  digit
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-xs'
                    : 'bg-slate-900/90 text-slate-600 border-slate-700'
                }`}
              >
                {digit || '•'}
              </div>
            );
          })}
        </div>
      </div>

      {!isEscaped ? (
        <div className="my-6">
          {/* Room Progress Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-2">
            <span>CÂMARA ATUAL: {currentStepIdx + 1} de {ESCAPE_ROOM_STEPS.length}</span>
            <span className="text-slate-400">{currentStep.roomName}</span>
          </div>

          {/* Room narrative */}
          <div className="bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-700/80 mb-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{currentStep.description}"
              </p>
              <button
                onClick={() =>
                  speakText(`${currentStep.roomName}. ${currentStep.description}. Enigma: ${currentStep.riddle}`)
                }
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs shrink-0 cursor-pointer"
                title="Ouvir enigma"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-4 border border-amber-500/40 text-amber-200 font-bold text-sm sm:text-base">
              ❓ Enigma: {currentStep.riddle}
            </div>
          </div>

          {/* Hint button */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => {
                setShowHint(!showHint);
                sounds.playClick();
              }}
              className="text-xs text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Ocultar Pista' : 'Precisas de uma pista do guardião?'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs mb-4">
              <strong>Pista Amiga: </strong> {currentStep.hint}
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {currentStep.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl text-left font-bold text-sm transition-all cursor-pointer border ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300'
                        : 'bg-red-900/80 text-red-100 border-red-700'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text}</span>
                    {isSelected && (opt.isCorrect ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback section */}
          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm font-medium mt-4 flex items-start gap-2.5 ${
                feedback.isCorrect
                  ? 'bg-emerald-950/60 border border-emerald-700/80 text-emerald-200'
                  : 'bg-red-950/60 border border-red-800/80 text-red-200'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{feedback.text}</span>
              </div>
            </div>
          )}

          {/* Advance button if correct */}
          {feedback && feedback.isCorrect && currentStepIdx < ESCAPE_ROOM_STEPS.length - 1 && (
            <div className="mt-5 text-right">
              <button
                onClick={handleNextRoom}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Avançar para a Próxima Câmara</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Escaped Screen */
        <div className="my-8 text-center p-6 sm:p-8 bg-slate-800/60 rounded-3xl border border-amber-500/50">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg animate-bounce">
            🗝️
          </div>
          <h4 className="text-2xl font-extrabold text-white mb-2">
            CONSEGUISTE ESCAPAR DA BIBLIOTECA!
          </h4>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-4 leading-relaxed">
            Inseriste com sucesso o código <strong>«{collectedDigits.join('')}»</strong>! O cofre ancestral abriu-se e desvendaste todos os segredos dos pronomes pessoais, possessivos e demonstrativos!
          </p>

          <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-3 max-w-md mx-auto mb-6 text-amber-300 text-xs font-semibold">
            Recompensa: +180 Pontos e a Medalha «Guardião da Biblioteca»!
          </div>

          <button
            onClick={handleResetGame}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            Jogar Escape Room Novamente
          </button>
        </div>
      )}
    </div>
  );
};
