import { Answer } from './answer.model';

export interface Question {
  id: number;
  imageId: number;
  label: string;
  answers?: Answer[];
  createdAt?: string;
  updatedAt?: string;
}
