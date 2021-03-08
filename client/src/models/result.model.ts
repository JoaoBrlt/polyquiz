import { QuestionResult } from './question-result.model';

export interface Result {
  id: number;
  guestId: number;
  quizId: number;
  timedOut: boolean;
  questions?: QuestionResult[];
  createdAt?: string;
  updatedAt?: string;
}
