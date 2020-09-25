interface Quizz {
  id?: string;
  title: string;
  data: {
    questions: Question[];
    levels: Level[];
    config: QuizzConfig;
  };
}

interface Level {
  title: string;
  range: { minRange: number; maxRange: number };
  imageUrl: string;
  description: string;
}

interface Question {
  questionTitle: string;
  answers: Answer[];
}

interface Answer {
  answer: string;
  answerUrl: string;
  correct: boolean;
}

interface QuizzConfig {
  fontColor: string;
  themeColor: string;
}
