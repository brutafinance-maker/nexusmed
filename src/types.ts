
export type Progress = {
  overall: number;
  byCategory: Record<string, number>;
  questionsAnswered: number;
  successRate: number;
  streak: number;
  completedModules: string[];
  watchedLessons: string[];
};

export type User = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  progress: Progress;
};

export type ClinicalCase = {
  id: string;
  title: string;
  discipline: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  problem: string;
  hypotheses: string[];
  learningGoals: string[];
  theoryContent: string;
  status: 'locked' | 'unlocked' | 'completed';
};

export type Question = {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  comment: string;
  discipline: string;
  subject: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
};

export type Simulation = {
  id: string;
  title: string;
  durationMinutes: number;
  questionCount: number;
  questions: Question[];
};

export type Lesson = {
  id: string;
  title: string;
  videoUrl?: string;
  content?: string;
  duration?: string;
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description?: string;
  instructor?: string;
  thumbnail: string;
  category: string;
  modules: CourseModule[];
};

export type TheoryTopic = {
  id: string;
  title: string;
  summary: string;
  mindMapUrl?: string;
  category: string;
};
