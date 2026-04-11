export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer: number;
}

export interface QuizResult {
  id: string;
  name: string;
  house_name: string;
  house_id: string;
  score: number;
  time_taken: number;
  created_at: string;
}