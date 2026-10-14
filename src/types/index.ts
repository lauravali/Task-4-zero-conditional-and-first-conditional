export type ConditionalType = 'zero' | 'first';

export type KuromiMood = 
  | 'idle' 
  | 'happy' 
  | 'sassy' 
  | 'thinking' 
  | 'proud' 
  | 'shocked' 
  | 'celebrating' 
  | 'explaining' 
  | 'cheering';

export interface MultipleChoiceQuestion {
  id: number;
  sentence: string; // "If students listen carefully, they ______ the instructions."
  options: {
    key: 'a' | 'b' | 'c';
    text: string;
    isCorrect: boolean;
    explanation: string; // Grammar explanation why it's right/wrong
  }[];
  conditionalType: ConditionalType;
  topic: string; // "Classroom Rules"
  ruleExplanation: string; // Zero conditional: If + present simple, present simple (routine/fact)
  spanishTip: string;
}

export interface MatchPair {
  id: number;
  beginningId: number;
  beginning: string; // "If students arrive late,"
  endingId: string; // "D"
  ending: string; // "the teacher cannot explain the lesson on time."
  conditionalType: ConditionalType;
  explanation: string;
  habitsAdvice: string;
}

export interface UserProgress {
  score: number;
  xp: number;
  level: number;
  streak: number;
  highestStreak: number;
  completedClassroom: boolean;
  completedStudyHabits: boolean;
  unlockedStickers: string[];
}

export interface Sticker {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
