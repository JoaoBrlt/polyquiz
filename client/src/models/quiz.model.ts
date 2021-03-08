import { Question } from './question.model';

export interface Quiz {
  id: number;
  themeId?: number;
  imageId?: number;
  name: string;
  questions?: Question[];
  createdAt?: string;
  updatedAt?: string;
}
