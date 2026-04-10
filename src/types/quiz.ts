export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  name: string;
  score: number;
  timeTaken: number;
  date: string;
}