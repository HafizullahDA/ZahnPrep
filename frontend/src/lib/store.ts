import { create } from 'zustand';

// Shape of one AI-generated question (matches backend schema exactly)
export interface Question {
  question_text: string;
  options: string[];
  correct_answer_index: number;
  explanation: string;
  difficulty: string;
  format_type: string;
}

// What the user selected before generating
export interface ExamConfig {
  examType: string;    // e.g. 'UPSC_GS_PAPER_1'
  examLabel: string;  // e.g. 'UPSC Civil Services'
  mcqCount: number;   // 5, 10, or 15
}

interface ExamState {
  config: ExamConfig | null;
  questions: Question[];
  userAnswers: (number | null)[]; // index of selected option per question (-1 = timed out)
  timeTaken: number[];            // seconds spent on each question

  setConfig: (config: ExamConfig) => void;
  setQuestions: (questions: Question[]) => void;
  recordAnswer: (questionIndex: number, answerIndex: number, seconds: number) => void;
  reset: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  config: null,
  questions: [],
  userAnswers: [],
  timeTaken: [],

  setConfig: (config) => set({ config }),

  setQuestions: (questions) =>
    set({
      questions,
      userAnswers: new Array(questions.length).fill(null),
      timeTaken: new Array(questions.length).fill(0),
    }),

  recordAnswer: (questionIndex, answerIndex, seconds) =>
    set((state) => {
      const newAnswers = [...state.userAnswers];
      const newTimes = [...state.timeTaken];
      newAnswers[questionIndex] = answerIndex;
      newTimes[questionIndex] = seconds;
      return { userAnswers: newAnswers, timeTaken: newTimes };
    }),

  reset: () =>
    set({ config: null, questions: [], userAnswers: [], timeTaken: [] }),
}));
