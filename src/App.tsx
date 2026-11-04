/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LearnSection } from './components/learn/LearnSection';
import { GamesHub } from './components/games/GamesHub';
import { ProgressSection } from './components/progress/ProgressSection';
import { StudentProgress, Badge } from './types';
import { INITIAL_BADGES } from './data/gamesData';
import { sounds } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'games' | 'progress'>('learn');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readingFocus, setReadingFocus] = useState(false);

  // Student progress state
  const [progress, setProgress] = useState<StudentProgress>(() => {
    const saved = localStorage.getItem('aventura_pronomes_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      studentName: 'Aluno(a) do 5.º Ano',
      totalPoints: 0,
      gamesPlayed: 0,
      completedGames: {
        matching: false,
        escapeRoom: false,
        threeTruths: false,
        impostor: false,
        trueFalse: false,
        multipleChoice: false,
        teamBattle: false,
        treasureHunt: false,
      },
      badges: INITIAL_BADGES,
    };
  });

  // Persist progress to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aventura_pronomes_progress', JSON.stringify(progress));
    } catch {
      // storage unavailable
    }
  }, [progress]);

  // Points handler
  const handleAddPoints = (pts: number) => {
    setProgress((prev) => {
      const nextPoints = prev.totalPoints + pts;
      let updatedBadges = [...prev.badges];

      // Unlock first step badge if not yet unlocked
      if (nextPoints > 0) {
        updatedBadges = updatedBadges.map((b) =>
          b.id === 'first_step' ? { ...b, unlocked: true } : b
        );
      }

      return {
        ...prev,
        totalPoints: nextPoints,
        gamesPlayed: prev.gamesPlayed + 1,
        badges: updatedBadges,
      };
    });
  };

  // Game completion handler
  const handleCompleteGame = (gameKey: keyof StudentProgress['completedGames']) => {
    setProgress((prev) => {
      const updatedCompleted = {
        ...prev.completedGames,
        [gameKey]: true,
      };

      // Match gameKey to badge ID
      const badgeIdMap: Record<string, string> = {
        matching: 'matching_master',
        escapeRoom: 'escape_champion',
        threeTruths: 'truth_seeker',
        impostor: 'impostor_hunter',
        trueFalse: 'quiz_ace',
        multipleChoice: 'quiz_ace',
        teamBattle: 'team_hero',
        treasureHunt: 'treasure_legend',
      };

      const targetBadgeId = badgeIdMap[gameKey];
      const updatedBadges = prev.badges.map((b) => {
        if (b.id === targetBadgeId || b.id === 'first_step') {
          return { ...b, unlocked: true };
        }
        return b;
      });

      return {
        ...prev,
        completedGames: updatedCompleted,
        badges: updatedBadges,
      };
    });
  };

  const handleUpdateName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name,
    }));
  };

  // Font size class mapping
  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg [&_p]:text-base [&_span]:text-base'
      : fontSize === 'large'
      ? 'text-base [&_p]:text-sm sm:[&_p]:text-base'
      : 'text-sm sm:text-base';

  return (
    <div
      className={`min-h-screen flex flex-col bg-amber-50/40 text-slate-800 ${
        readingFocus ? 'reading-focus' : ''
      } ${fontSizeClass}`}
    >
      {/* Header with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentName={progress.studentName}
        totalPoints={progress.totalPoints}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        fontSize={fontSize}
        setFontSize={setFontSize}
        readingFocus={readingFocus}
        setReadingFocus={setReadingFocus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'learn' && (
          <LearnSection onGoToGames={() => setActiveTab('games')} />
        )}

        {activeTab === 'games' && (
          <GamesHub
            onAddPoints={handleAddPoints}
            onCompleteGame={handleCompleteGame}
            completedGames={progress.completedGames}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressSection
            progress={progress}
            onUpdateName={handleUpdateName}
            onGoToLearn={() => setActiveTab('learn')}
          />
        )}
      </main>

      {/* Footer conforming to anti-slop rules (quiet copyright, real site info, zero fake telemetry) */}
      <footer className="no-print mt-auto border-t border-amber-200/60 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Aventura dos Pronomes</span>
            <span>·</span>
            <span>Português 5.º Ano</span>
            <span>·</span>
            <span>Baseado no manual «Palavras fora da Caixa» (Raiz Editora)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Acessibilidade integrada (Voz pt-PT & Leitura Fácil)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
