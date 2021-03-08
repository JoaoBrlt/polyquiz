// App.
import { Injectable } from '@angular/core';

// Communication.
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// Models and services.
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends DataService {
  /**
   * The list of quizzes.
   */
  private quizzes: Quiz[];

  /**
   * The observable list of quizzes.
   */
  private quizzes$: BehaviorSubject<Quiz[]>;

  /**
   * Constructs the image service.
   * @param http The HTTP client.
   */
  constructor(private http: HttpClient) {
    super();
    this.quizzes = [];
    this.quizzes$ = new BehaviorSubject<Quiz[]>(this.quizzes);
    this.findAllQuizzes();
  }

  /**
   * Returns the observable list of quizzes.
   */
  getQuizzes(): Observable<Quiz[]> {
    return this.quizzes$.asObservable();
  }

  /**
   * Returns the observable list of quizzes.
   */
  getQuizzesByTheme(themeId: number): Observable<Quiz[]> {
    return this.getQuizzes()
      .pipe(
        map((quizzes) => quizzes.filter((quiz) => quiz.themeId === themeId))
      );
  }

  /**
   * Returns an observable quiz by id.
   * @param id The id of the quiz.
   */
  getQuiz(id: number): Observable<Quiz> {
    return this.getQuizzes()
      .pipe(
        map((quizzes) => quizzes.find((quiz) => quiz.id === id))
      );
  }

  /**
   * Finds all the quizzes.
   */
  findAllQuizzes() {
    this.http
      .get<Quiz[]>(`${this.serverURL}/quizzes`)
      .subscribe((quizzes: Quiz[]) => {
        this.quizzes = quizzes;
        this.quizzes$.next(this.quizzes);
      });
  }

  /**
   * Creates a quiz.
   * @param name The name of the quiz.
   * @param themeId The theme id of the quiz.
   * @param imageId The image id of the quiz.
   */
  createQuiz(name: string, themeId: number, imageId: number) {
    this.http
      .post<Quiz>(
        `${this.serverURL}/quizzes`,
        {
          name,
          themeId,
          imageId
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }

  /**
   * Updates a quiz.
   * @param id The id of the quiz.
   * @param name The name of the quiz.
   * @param themeId The theme id of the quiz.
   * @param imageId The image id of the quiz.
   */
  updateQuiz(id: number, name: string, themeId: number, imageId: number) {
    this.http
      .put<Quiz>(
        `${this.serverURL}/quizzes/${id}`,
        {
          name,
          themeId,
          imageId
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }

  /**
   * Deletes a quiz.
   * @param id The id of the quiz.
   */
  deleteQuiz(id: number) {
    this.http
      .delete<Quiz>(`${this.serverURL}/quizzes/${id}`)
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }

  /**
   * Creates a question.
   * @param quizId The id of the quiz.
   * @param label The label of the question.
   * @param imageId The imageId of the question.
   */
  createQuestion(quizId: number, label: string, imageId: number): Observable<Question> {
    return this.http
      .post<Question>(
        `${this.serverURL}/quizzes/${quizId}/questions`,
        {
          label,
          imageId
        },
        this.serverOptions
      )
      .pipe(
        map((question: Question) => {
          this.findAllQuizzes();
          return question;
        })
      );
  }

  /**
   * Updates a question.
   * @param quizId The id of the quiz.
   * @param questionId The id of the question.
   * @param label The label of the question.
   * @param imageId The imageId of the question.
   */
  updateQuestion(quizId: number, questionId: number, label: string, imageId: number): Observable<Question> {
    return this.http
      .put<Question>(
        `${this.serverURL}/quizzes/${quizId}/questions/${questionId}`,
        {
          label,
          imageId
        },
        this.serverOptions
      )
      .pipe(
        map((question: Question) => {
          this.findAllQuizzes();
          return question;
        })
      );
  }

  /**
   * Deletes a question.
   * @param quizId The id of the quiz.
   * @param questionId The id of the question.
   */
  deleteQuestion(quizId: number, questionId: number) {
    this.http
      .delete<Question>(
        `${this.serverURL}/quizzes/${quizId}/questions/${questionId}`
      )
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }

  /**
   * Creates an answer.
   * @param quizId The id of the quiz.
   * @param questionId The id of the question.
   * @param value The value of the answer.
   * @param isCorrect Whether the answer is correct, or not.
   * @param imageId The image id of the answer.
   */
  createAnswer(
    quizId: number,
    questionId: number,
    value: string,
    isCorrect: boolean,
    imageId: number
  ) {
    this.http
      .post<Answer>(
        `${this.serverURL}/quizzes/${quizId}/questions/${questionId}/answers`,
        {
          value,
          isCorrect,
          imageId
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }

  /**
   * Creates an answer.
   * @param quizId The id of the quiz.
   * @param questionId The id of the question.
   * @param answerId The id of the answer.
   * @param value The value of the answer.
   * @param isCorrect Whether the answer is correct, or not.
   * @param imageId The image id of the answer.
   */
  updateAnswer(
    quizId: number,
    questionId: number,
    answerId: number,
    value: string,
    isCorrect: boolean,
    imageId: number
  ) {
    this.http
      .put<Answer>(
        `${this.serverURL}/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`,
        {
          value,
          isCorrect,
          imageId
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }

  /**
   * Deletes an answer.
   * @param quizId The id of the quiz.
   * @param questionId The id of the question.
   * @param answerId The id of the answer.
   */
  deleteAnswer(quizId: number, questionId: number, answerId: number) {
    this.http
      .delete<Answer>(
        `${this.serverURL}/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`,
      )
      .subscribe(() => {
        this.findAllQuizzes();
      });
  }
}
