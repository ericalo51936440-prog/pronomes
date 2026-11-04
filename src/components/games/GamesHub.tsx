import React, { useState } from 'react';
import { MatchingGame } from './MatchingGame';
import { EscapeRoomGame } from './EscapeRoomGame';
import { ThreeTruthsOneLieGame } from './ThreeTruthsOneLieGame';
import { ImpostorGame } from './ImpostorGame';
import { TrueFalseGame } from './TrueFalseGame';
import { MultipleChoiceGame } from './MultipleChoiceGame';
import { TeamBattleGame } from './TeamBattleGame';
import { TreasureHuntGame } from './TreasureHuntGame';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import {
  Gamepad2,
  KeyRound,
  Compass,
  CheckCircle2,
  Users,
  Target,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface GamesHubProps {
  onAddPoints: (points: number) => void;
  onCompleteGame: (gameKey: any) => void;
  completedGames: Record<string, boolean>;
}

export type GameId =
  | 'matching'
  | 'escapeRoom'
  | 'threeTruths'
  | 'impostor'
  | 'trueFalse'
  | 'multipleChoice'
  | 'teamBattle'
  | 'treasureHunt';

export const GamesHub: React.FC<GamesHubProps> = ({
  onAddPoints,
  onCompleteGame,
  completedGames,
}) => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  const gamesList: {
    id: GameId;
    title: string;
    description: string;
    icon: string;
    lucideIcon: React.ReactNode;
    color: string;
    points: number;
    difficulty: string;
  }[] = [
    {
      id: 'matching',
      title: 'Correspondência',
      description: 'Clica nos pronomes e liga-os à sua subclasse ou distância correta!',
      icon: '🔗',
      lucideIcon: <Gamepad2 className="w-5 h-5 text-blue-600" />,
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/30',
      points: 120,
      difficulty: 'Fácil',
    },
    {
      id: 'escapeRoom',
      title: 'Escape Room',
      description: 'O Mistério da Biblioteca: resolve 4 câmaras e descobre o código secreto do cofre!',
      icon: '🗝️',
      lucideIcon: <KeyRound className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-200 hover:border-amber-400 bg-amber-50/30',
      points: 180,
      difficulty: 'Desafio',
    },
    {
      id: 'threeTruths',
      title: '3 Verdades e 1 Mentira',
      description: 'Três afirmações são certas e uma mente. Usa os teus olhos de detetive para apanhar a mentira!',
      icon: '🕵️',
      lucideIcon: <ShieldAlert className="w-5 h-5 text-purple-600" />,
      color: 'border-purple-200 hover:border-purple-400 bg-purple-50/30',
      points: 150,
      difficulty: 'Médio',
    },
    {
      id: 'impostor',
      title: 'O Impostor',
      description: 'Estilo detetive! Num grupo de 4 palavras, descobre qual não é pronome e infiltrou-se na equipa.',
      icon: '🛸',
      lucideIcon: <Sparkles className="w-5 h-5 text-rose-600" />,
      color: 'border-rose-200 hover:border-rose-400 bg-rose-50/30',
      points: 160,
      difficulty: 'Divertido',
    },
    {
      id: 'trueFalse',
      title: 'Verdadeiro ou Falso',
      description: 'Perguntas rápidas com botões grandes e claros para testares o que aprendeste.',
      icon: '⚖️',
      lucideIcon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/30',
      points: 180,
      difficulty: 'Rápido',
    },
    {
      id: 'multipleChoice',
      title: 'Escolha Múltipla',
      description: 'Perguntas clássicas do 5.º ano com dicas amigas e explicações do teu manual.',
      icon: '🎯',
      lucideIcon: <Target className="w-5 h-5 text-sky-600" />,
      color: 'border-sky-200 hover:border-sky-400 bg-sky-50/30',
      points: 200,
      difficulty: 'Treino',
    },
    {
      id: 'teamBattle',
      title: 'Duelo de Turma (Grupo)',
      description: 'Modo competição de 2 equipas (Azul vs Vermelha) para jogar no quadro ou com um colega!',
      icon: '⚔️',
      lucideIcon: <Users className="w-5 h-5 text-orange-600" />,
      color: 'border-orange-200 hover:border-orange-400 bg-orange-50/30',
      points: 150,
      difficulty: 'Grupo',
    },
    {
      id: 'treasureHunt',
      title: 'Caça ao Tesouro',
      description: 'Explora o mapa da Ilha dos Pronomes, encontra as pistas no texto e coleciona as 5 gemas mágicas!',
      icon: '🗺️',
      lucideIcon: <Compass className="w-5 h-5 text-yellow-600" />,
      color: 'border-yellow-200 hover:border-yellow-400 bg-yellow-50/30',
      points: 200,
      difficulty: 'Aventura',
    },
  ];

  const handleOpenGame = (gameId: GameId) => {
    sounds.playClick();
    setActiveGame(gameId);
  };

  const handleBackToHub = () => {
    sounds.playClick();
    setActiveGame(null);
  };

  if (activeGame) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={handleBackToHub}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Escolha de Jogos</span>
          </button>

          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            Modo de Jogo Ativo
          </span>
        </div>

        {activeGame === 'matching' && (
          <MatchingGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'escapeRoom' && (
          <EscapeRoomGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'threeTruths' && (
          <ThreeTruthsOneLieGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'impostor' && (
          <ImpostorGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'trueFalse' && (
          <TrueFalseGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'multipleChoice' && (
          <MultipleChoiceGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'teamBattle' && (
          <TeamBattleGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
        {activeGame === 'treasureHunt' && (
          <TreasureHuntGame onAddPoints={onAddPoints} onCompleteGame={onCompleteGame} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          A Sala de Jogos dos Pronomes
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Escolhe um dos 8 jogos abaixo para treinar o que aprendeste. Cada jogo dá pontos e desbloqueia medalhas para o teu diploma oficial!
        </p>
      </div>

      {/* Grid of 8 Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gamesList.map((g) => {
          const isDone = Boolean(completedGames[g.id]);

          return (
            <div
              key={g.id}
              className={`bg-white rounded-2xl border p-5 transition-all shadow-xs flex flex-col justify-between ${g.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-xl shadow-2xs">
                    {g.icon}
                  </div>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Concluído</span>
                    </span>
                  ) : (
                    <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {g.difficulty}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">{g.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {g.description}
                </p>
              </div>

              <div>
                <div className="text-2xs font-semibold text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>Recompensa:</span>
                  <span className="font-bold text-amber-700">+{g.points} pts</span>
                </div>

                <button
                  onClick={() => handleOpenGame(g.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-amber-400" />
                  <span>{isDone ? 'Jogar de Novo' : 'Jogar Agora'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
