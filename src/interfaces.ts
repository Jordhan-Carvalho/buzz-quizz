export interface Quizz {
  id?: string;
  title: string;
  data: {
    questions: Question[];
    levels: Level[];
    config: QuizzConfig;
  };
}

export interface Level {
  title: string;
  range: { minRange: number; maxRange: number };
  imageUrl: string;
  description: string;
}

export interface Question {
  questionTitle: string;
  answers: Answer[];
}

export interface Answer {
  answer: string;
  answerUrl: string;
  correct: boolean;
}

export interface QuizzConfig {
  fontColor: string;
  themeColor: string;
}
