import React from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, ZoomIn, ZoomOut, Eye, BookOpen, Gamepad2, Award } from 'lucide-react';
import { stopSpeaking } from '../utils/speech';
import { sounds } from '../utils/sound';

interface HeaderProps {
  activeTab: 'learn' | 'games' | 'progress';
  setActiveTab: (tab: 'learn' | 'games' | 'progress') => void;
  studentName: string;
  totalPoints: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  readingFocus: boolean;
  setReadingFocus: (focus: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  studentName,
  totalPoints,
  soundEnabled,
  setSoundEnabled,
  fontSize,
  setFontSize,
  readingFocus,
  setReadingFocus,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setMuted(!next);
    if (!next) {
      stopSpeaking();
    }
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
    sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Primary action / Profile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => {
              setActiveTab('learn');
              sounds.playClick();
            }}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              P
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 block">
                Aventura dos Pronomes
              </span>
              <span className="text-xs text-amber-700 font-medium block -mt-0.5">
                Português · 5.º Ano
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => {
                setActiveTab('learn');
                sounds.playClick();
              }}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'learn'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Aprender Teoria</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('games');
                sounds.playClick();
              }}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'games'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Jogos & Desafios</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('progress');
                sounds.playClick();
              }}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'progress'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Meu Progresso & Diploma</span>
            </button>
          </nav>

          {/* Zone 3: Accessibility tools & Score summary */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick point indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs font-bold">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span className="font-mono tabular-nums">{totalPoints}</span>
              <span className="hidden sm:inline font-normal text-amber-700">pts</span>
            </div>

            {/* Accessibility: Reading mode */}
            <button
              onClick={() => {
                setReadingFocus(!readingFocus);
                sounds.playClick();
              }}
              title={readingFocus ? 'Desativar modo foco de leitura' : 'Ativar modo foco de leitura (espaçamento adaptado)'}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 ${
                readingFocus
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden lg:inline text-xs">Foco</span>
            </button>

            {/* Accessibility: Font size toggle */}
            <button
              onClick={cycleFontSize}
              title="Mudar tamanho da letra"
              className="p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <span className="font-mono text-xs">
                {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
              </span>
            </button>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Silenciar sons' : 'Ativar sons'}
              className="p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-amber-100 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('learn');
              sounds.playClick();
            }}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg ${
              activeTab === 'learn' ? 'bg-amber-100 text-amber-900' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Aprender</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('games');
              sounds.playClick();
            }}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg ${
              activeTab === 'games' ? 'bg-amber-100 text-amber-900' : 'text-slate-600'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Jogos</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('progress');
              sounds.playClick();
            }}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg ${
              activeTab === 'progress' ? 'bg-amber-100 text-amber-900' : 'text-slate-600'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Diploma</span>
          </button>
        </div>
      </div>
    </header>
  );
};
