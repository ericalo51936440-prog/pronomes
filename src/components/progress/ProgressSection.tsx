import React, { useState } from 'react';
import { Badge, StudentProgress } from '../../types';
import { sounds } from '../../utils/sound';
import { speakText } from '../../utils/speech';
import {
  Trophy,
  Award,
  Printer,
  Sparkles,
  CheckCircle2,
  Lock,
  UserCheck,
  Star,
  Edit2,
  BookOpen,
} from 'lucide-react';

interface ProgressSectionProps {
  progress: StudentProgress;
  onUpdateName: (name: string) => void;
  onGoToLearn: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  progress,
  onUpdateName,
  onGoToLearn,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.studentName);

  const completedCount = Object.values(progress.completedGames).filter(Boolean).length;
  const totalGames = Object.keys(progress.completedGames).length;
  const completionPercentage = Math.round((completedCount / totalGames) * 100);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setEditingName(false);
      sounds.playClick();
    }
  };

  const handlePrintCertificate = () => {
    sounds.playClick();
    window.print();
  };

  // Constructive pedagogical feedback based on student's achievements
  const getPedagogicalFeedback = () => {
    if (completedCount === 0) {
      return {
        title: 'Bem-vindo ao início da tua jornada!',
        message:
          'Ainda estás a dar os primeiros passos. Explora as lições na aba "Aprender" e joga o teu primeiro desafio na aba "Jogos" para desbloqueares as tuas primeiras estrelas!',
        level: 'Aprendiz Curioso 🌱',
      };
    } else if (completedCount <= 3) {
      return {
        title: 'Excelente começo!',
        message:
          'Já estás a começar a distinguir muito bem os pronomes pessoais e possessivos. Continua a praticar com os jogos de Escolha Múltipla e o Escape Room para consolidares a matéria!',
        level: 'Detetive das Palavras 🔍',
      };
    } else if (completedCount <= 6) {
      return {
        title: 'Quase no topo!',
        message:
          'Muito bom trabalho! Tens demonstrado uma compreensão sólida sobre o que é um pronome e como ele substitui palavras na frase. Estás muito perto de completar todos os desafios!',
        level: 'Mestre da Gramática ⭐',
      };
    } else {
      return {
        title: 'Espetacular! Domínio Completo!',
        message:
          'Parabéns! Completaste todos os desafios do 5.º ano! Já dominas com distinção os pronomes pessoais (sujeito e complemento), possessivos (um e vários possuidores) e demonstrativos (variáveis e invariáveis)!',
        level: 'Super Campeão dos Pronomes 👑',
      };
    }
  };

  const feedbackInfo = getPedagogicalFeedback();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Student Overview Card */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                {editingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Nome do Aluno"
                      className="px-3 py-1 text-base font-bold rounded-lg border border-amber-400 bg-amber-50/50"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs"
                    >
                      Guardar
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {progress.studentName}
                    </h2>
                    <button
                      onClick={() => setEditingName(true)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Editar nome do aluno"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-xs font-semibold text-amber-700 mt-0.5">
                {feedbackInfo.level} · Português 5.º Ano
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider block">
                Pontuação Total
              </span>
              <span className="text-2xl font-black text-amber-600 font-mono tabular-nums">
                {progress.totalPoints} <span className="text-xs font-sans text-amber-800">pts</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider block">
                Jogos Feitos
              </span>
              <span className="text-2xl font-black text-emerald-600 font-mono tabular-nums">
                {completedCount} / {totalGames}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Banner for Student */}
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 my-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                {feedbackInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {feedbackInfo.message}
              </p>
            </div>
            <button
              onClick={() => speakText(`${feedbackInfo.title}. ${feedbackInfo.message}`)}
              className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs shrink-0 cursor-pointer"
              title="Ouvir o meu feedback"
            >
              Ouvir Feedback
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>Progresso Global do 5.º Ano:</span>
            <span className="font-mono tabular-nums text-amber-800 font-bold">
              {completionPercentage}% Concluído
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900">Caderneta de Medalhas</h3>
          </div>
          <span className="text-xs text-slate-500">
            {progress.badges.filter((b) => b.unlocked).length} de {progress.badges.length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {progress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border text-center transition-all ${
                badge.unlocked
                  ? 'bg-amber-50/40 border-amber-300 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 ${
                  badge.unlocked ? 'bg-amber-100' : 'bg-slate-200 grayscale'
                }`}
              >
                {badge.icon}
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1 line-clamp-1">{badge.title}</h4>
              <p className="text-2xs text-slate-500 leading-tight line-clamp-2">
                {badge.description}
              </p>
              <div className="mt-2">
                {badge.unlocked ? (
                  <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Conquistada
                  </span>
                ) : (
                  <span className="text-3xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center gap-1 w-fit mx-auto">
                    <Lock className="w-2.5 h-2.5" /> Bloqueada
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Certificate for Printing */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-10 shadow-sm relative overflow-hidden text-center print:border-4 print:border-amber-400">
        <div className="max-w-2xl mx-auto">
          {/* Certificate Header */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-3xl mx-auto mb-3 shadow-md">
            🏅
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block mb-1">
            Diploma de Mérito Oficial · Português 5.º Ano
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Certificado de Especialista em Pronomes
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Certifica-se com louvor que o(a) aluno(a)
          </p>

          <div className="py-2 border-b-2 border-amber-400 inline-block px-8 mb-4">
            <span className="text-xl sm:text-3xl font-black text-amber-900 tracking-wide">
              {progress.studentName}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed mb-6">
            completou com sucesso as lições e os desafios pedagógicos da classe de palavras <strong>O Pronome</strong>, dominando as subclasses de <strong>Pronomes Pessoais</strong> (sujeito e complemento), <strong>Pronomes Possessivos</strong> e <strong>Pronomes Demonstrativos</strong> (variáveis e invariáveis), com um total de <strong>{progress.totalPoints} pontos</strong>!
          </p>

          {/* Certificate Footer with seal */}
          <div className="flex flex-wrap items-center justify-around gap-6 pt-6 border-t border-slate-200 text-xs text-slate-600">
            <div>
              <span className="block font-bold text-slate-800">Disciplina de Português</span>
              <span>5.º Ano de Escolaridade</span>
            </div>

            <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400 flex flex-col items-center justify-center text-amber-700 font-bold text-2xs p-1">
              <span>SELO DE</span>
              <span>MÉRITO</span>
            </div>

            <div>
              <span className="block font-bold text-slate-800">
                {new Date().toLocaleDateString('pt-PT')}
              </span>
              <span>Data de Emissão</span>
            </div>
          </div>

          {/* Print button (hidden during print) */}
          <div className="mt-8 no-print flex justify-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir / Guardar Diploma em PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
