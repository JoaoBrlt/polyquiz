import { Image } from './image.model';

export interface Answer {
  id: number;
  imageId?: number;
  selectedImage?: Image;
  value: string;
  isCorrect: boolean;
  createdAt?: string;
  updatedAt?: string;
}
