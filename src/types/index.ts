export type SubclassType = 'pessoal' | 'possessivo' | 'demonstrativo';

export interface PronounInfo {
  word: string;
  subclass: SubclassType;
  details: string;
  example: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface StudentProgress {
  studentName: string;
  totalPoints: number;
  gamesPlayed: number;
  completedGames: {
    matching: boolean;
    escapeRoom: boolean;
    threeTruths: boolean;
    impostor: boolean;
    trueFalse: boolean;
    multipleChoice: boolean;
    teamBattle: boolean;
    treasureHunt: boolean;
  };
  badges: Badge[];
}

export interface MatchingItem {
  id: string;
  text: string;
  type: 'word' | 'category';
  matchKey: string;
}

export interface EscapeRoomStep {
  id: number;
  roomName: string;
  description: string;
  riddle: string;
  hint: string;
  options: { text: string; isCorrect: boolean; feedback: string; digit: string }[];
}

export interface ThreeTruthsRound {
  id: number;
  title: string;
  statements: {
    id: string;
    text: string;
    isLie: boolean;
    explanation: string;
  }[];
}

export interface ImpostorRound {
  id: number;
  categoryTitle: string;
  hint: string;
  words: {
    text: string;
    isImpostor: boolean;
    explanation: string;
  }[];
}

export interface TrueFalseQuestion {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  tip: string;
}

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface TeamBattleQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  explanation: string;
}

export interface TreasureClue {
  id: number;
  spotName: string;
  riddle: string;
  passageText: string;
  targetPronoun: string;
  gemName: string;
  gemColor: string;
  explanation: string;
}
