export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  accessibility: string;
  quizzes?: number[];
  createdAt?: string;
  updatedAt?: string;
}
