import React, { useState } from 'react';
import { TREASURE_CLUES } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { Compass, Gem, Map, RotateCcw, Volume2, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface TreasureHuntProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'treasureHunt') => void;
}

export const TreasureHuntGame: React.FC<TreasureHuntProps> = ({ onAddPoints, onCompleteGame }) => {
  const [currentClueIdx, setCurrentClueIdx] = useState(0);
  const [collectedGems, setCollectedGems] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentClue = TREASURE_CLUES[currentClueIdx];

  // Tokenize passage text for clickable words
  const passageWords = currentClue.passageText
    .replace(/[«»"]/g, '')
    .split(/\s+/)
    .map((w) => w.replace(/[.,!?;:]/g, ''));

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    sounds.playClick();

    const cleanWord = word.trim().toLowerCase();
    const cleanTarget = currentClue.targetPronoun.replace('-', '').trim().toLowerCase();

    if (cleanWord === cleanTarget || (cleanTarget === 'me' && cleanWord.includes('me'))) {
      sounds.playSuccess();
      setFeedback(`Acertaste! ${currentClue.explanation}`);
      speakText(currentClue.explanation);

      if (!collectedGems.includes(currentClue.gemName)) {
        const newGems = [...collectedGems, currentClue.gemName];
        setCollectedGems(newGems);
        onAddPoints(40);

        if (currentClueIdx === TREASURE_CLUES.length - 1) {
          setIsCompleted(true);
          sounds.playFanfare();
          confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
          onCompleteGame('treasureHunt');
          onAddPoints(160);
        }
      }
    } else {
      sounds.playGentleError();
      setFeedback(`A palavra «${word}» não é o pronome que procuramos nesta pista. Tenta clicar noutra palavra!`);
    }
  };

  const handleNextClue = () => {
    sounds.playClick();
    setSelectedWord(null);
    setFeedback(null);
    if (currentClueIdx < TREASURE_CLUES.length - 1) {
      setCurrentClueIdx(currentClueIdx + 1);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentClueIdx(0);
    setCollectedGems([]);
    setSelectedWord(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-amber-900/90 text-amber-50 rounded-3xl border border-amber-700 p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-300" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              Caça ao Tesouro: A Ilha dos Pronomes Perdidos
            </h3>
          </div>
          <p className="text-xs text-amber-200 mt-1">
            Segue o mapa secreto e clica no pronome correto dentro do texto para desbloquear a gema!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              speakText(
                `${currentClue.spotName}. ${currentClue.riddle}. Texto: ${currentClue.passageText}`
              )
            }
            className="p-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs flex items-center gap-1 cursor-pointer"
            title="Ouvir pista"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-medium">Ouvir</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs flex items-center gap-1 cursor-pointer"
            title="Recomeçar mapa"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gem Pouch Bar */}
      <div className="my-5 p-4 rounded-2xl bg-amber-950/60 border border-amber-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Saco de Gemas:
          </span>
          <span className="text-xs text-amber-200">
            ({collectedGems.length} de {TREASURE_CLUES.length} encontradas)
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {TREASURE_CLUES.map((clue, idx) => {
            const hasGem = collectedGems.includes(clue.gemName);
            return (
              <div
                key={idx}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                  hasGem
                    ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-md scale-105'
                    : 'bg-amber-900/60 text-amber-700 border-amber-800'
                }`}
                title={clue.gemName}
              >
                <Gem className="w-4 h-4" />
              </div>
            );
          })}
        </div>
      </div>

      {!isCompleted ? (
        <div>
          {/* Island Stage Card */}
          <div className="bg-amber-950/40 border border-amber-700/60 rounded-2xl p-5 mb-5">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
              <span className="flex items-center gap-1">
                <Map className="w-4 h-4" />
                <span>LOCALIDADE {currentClueIdx + 1} de {TREASURE_CLUES.length}: {currentClue.spotName}</span>
              </span>
              <span className="text-amber-400 font-semibold">Gema a descobrir: {currentClue.gemName}</span>
            </div>

            <p className="text-sm text-amber-100 font-medium mb-3">
              📜 <strong>Pista do Mapa:</strong> {currentClue.riddle}
            </p>

            {/* Clickable Passage */}
            <div className="bg-amber-950/80 rounded-xl p-5 border border-amber-700/80">
              <span className="text-2xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Clica na palavra que é o pronome que resolve a pista:
              </span>

              <div className="flex flex-wrap gap-2 text-sm sm:text-base leading-relaxed">
                {passageWords.map((word, wIdx) => {
                  const isTarget =
                    word.toLowerCase() === currentClue.targetPronoun.replace('-', '').toLowerCase();
                  const isSelected = selectedWord === word;

                  return (
                    <button
                      key={wIdx}
                      onClick={() => handleWordClick(word)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        isSelected && isTarget
                          ? 'bg-emerald-500 text-white font-bold ring-2 ring-emerald-300 shadow-md scale-105'
                          : isSelected && !isTarget
                          ? 'bg-red-800/80 text-red-100'
                          : 'bg-amber-900/70 text-amber-100 hover:bg-amber-800 hover:text-white border border-amber-800'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm font-medium mb-4 flex items-start gap-2.5 ${
                feedback.includes('Acertaste')
                  ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200'
                  : 'bg-amber-950/80 border border-amber-700 text-amber-200'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Next Button */}
          {feedback && feedback.includes('Acertaste') && currentClueIdx < TREASURE_CLUES.length - 1 && (
            <div className="flex justify-end">
              <button
                onClick={handleNextClue}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Navegar para o Próximo Local</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Treasure unlocked */
        <div className="my-6 text-center p-6 sm:p-8 bg-amber-950/70 rounded-3xl border border-amber-400/50">
          <div className="text-5xl mb-3 animate-bounce">🪙💎👑</div>
          <h4 className="text-2xl font-black text-amber-300 mb-2">
            O GRANDE BAÚ DO TESOURO FOI ABERTO!
          </h4>
          <p className="text-amber-100 text-sm max-w-lg mx-auto mb-4 leading-relaxed">
            Reuniste todas as 5 gemas preciosas da Ilha da Gramática!
            Descobriste os pronomes escondidos em cada pista e provaste que tens olhar de verdadeiro explorador!
          </p>

          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 max-w-md mx-auto mb-6 text-amber-300 text-xs font-semibold">
            Recompensa Máxima: +200 Pontos e a Medalha «Lenda da Ilha do Tesouro»!
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-sm transition-colors cursor-pointer"
          >
            Explorar a Ilha Outra Vez
          </button>
        </div>
      )}
    </div>
  );
};
