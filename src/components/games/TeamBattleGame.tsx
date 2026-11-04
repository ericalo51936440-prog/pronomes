import React, { useState, useEffect } from 'react';
import { TEAM_BATTLE_QUESTIONS } from '../../data/gamesData';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import confetti from 'canvas-confetti';
import { Users, Trophy, Play, RotateCcw, Volume2, Clock, Check, X } from 'lucide-react';

interface TeamBattleProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: 'teamBattle') => void;
}

export const TeamBattleGame: React.FC<TeamBattleProps> = ({ onAddPoints, onCompleteGame }) => {
  const [team1Name, setTeam1Name] = useState('Equipa Azul 🐬');
  const [team2Name, setTeam2Name] = useState('Equipa Vermelha 🦁');
  const [isEditingNames, setIsEditingNames] = useState(false);

  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentTurnTeam, setCurrentTurnTeam] = useState<1 | 2>(1); // 1 = Team 1, 2 = Team 2

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = TEAM_BATTLE_QUESTIONS[currentQIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    sounds.playClick();

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playSuccess();
      if (currentTurnTeam === 1) {
        setTeam1Score((prev) => prev + currentQ.points);
      } else {
        setTeam2Score((prev) => prev + currentQ.points);
      }
      speakText(`Resposta certa! ${currentTurnTeam === 1 ? team1Name : team2Name} ganhou ${currentQ.points} pontos.`);
    } else {
      sounds.playBuzzer();
      speakText(`Resposta errada! A resposta correta era: ${currentQ.options[currentQ.correctIndex]}.`);
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentQIdx < TEAM_BATTLE_QUESTIONS.length - 1) {
      setCurrentQIdx(currentQIdx + 1);
      setCurrentTurnTeam(currentTurnTeam === 1 ? 2 : 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      sounds.playFanfare();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onCompleteGame('teamBattle');
      onAddPoints(120);
    }
  };

  const handleResetGame = () => {
    sounds.playClick();
    setCurrentQIdx(0);
    setTeam1Score(0);
    setTeam2Score(0);
    setCurrentTurnTeam(1);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <h3 className="text-xl font-bold text-slate-900">Duelo de Turma (Jogo em Grupo)</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ideal para 2 equipas competirem no quadro ou lado a lado na sala de aula!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingNames(!isEditingNames)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            {isEditingNames ? 'Guardar Nomes' : 'Mudar Nomes das Equipas'}
          </button>
          <button
            onClick={handleResetGame}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            title="Recomeçar duelo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit Names Banner */}
      {isEditingNames && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-bold text-blue-900 mb-1">Nome da Equipa 1:</label>
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-red-900 mb-1">Nome da Equipa 2:</label>
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
            />
          </div>
        </div>
      )}

      {/* Scoreboard Bar */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Team 1 Card */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            currentTurnTeam === 1 && !isGameOver
              ? 'bg-blue-50 border-blue-400 shadow-sm ring-2 ring-blue-300'
              : 'bg-slate-50/70 border-slate-200 opacity-90'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm text-blue-950 truncate">{team1Name}</span>
            {currentTurnTeam === 1 && !isGameOver && (
              <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white animate-pulse">
                A Vossa Vez!
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-700 tabular-nums">
            {team1Score} <span className="text-xs font-sans text-blue-900">pts</span>
          </div>
        </div>

        {/* Team 2 Card */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            currentTurnTeam === 2 && !isGameOver
              ? 'bg-rose-50 border-rose-400 shadow-sm ring-2 ring-rose-300'
              : 'bg-slate-50/70 border-slate-200 opacity-90'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm text-rose-950 truncate">{team2Name}</span>
            {currentTurnTeam === 2 && !isGameOver && (
              <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                A Vossa Vez!
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700 tabular-nums">
            {team2Score} <span className="text-xs font-sans text-rose-900">pts</span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div>
          {/* Active Question Box */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-2">
              <span>
                Pergunta {currentQIdx + 1} de {TEAM_BATTLE_QUESTIONS.length} · Vale {currentQ.points} pontos
              </span>
              <span className="text-slate-600">
                A responder: {currentTurnTeam === 1 ? team1Name : team2Name}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && (
                    <span>{isCorrect ? <Check className="w-5 h-5" /> : isSelected ? <X className="w-5 h-5" /> : null}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-slate-700 font-medium">
                <strong>Explicação: </strong>{currentQ.explanation}
              </span>
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                Passar a Vez →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Winner Podium */
        <div className="my-8 text-center p-6 bg-slate-50 border border-slate-200 rounded-3xl">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-2 animate-bounce" />
          <h4 className="text-2xl font-black text-slate-900 mb-1">
            {team1Score > team2Score
              ? `🏆 ${team1Name} É A GRANDE VENCEDORA!`
              : team2Score > team1Score
              ? `🏆 ${team2Name} É A GRANDE VENCEDORA!`
              : '🤝 EMPATE AMIGÁVEL! AS DUAS EQUIPAS SÃO BRILHANTES!'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Placar final: {team1Name} ({team1Score} pts) vs {team2Name} ({team2Score} pts).
            Ambas as equipas demonstraram grande domínio da matéria de 5.º ano!
          </p>

          <button
            onClick={handleResetGame}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
          >
            Começar Nova Batalha de Turma
          </button>
        </div>
      )}
    </div>
  );
};
