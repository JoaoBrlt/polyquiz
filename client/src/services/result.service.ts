import { Injectable } from '@angular/core';

// Models and services.
import { Result } from '../models/result.model';
import { QuestionResult } from '../models/question-result.model';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultService extends DataService {
  /**
   * The list of results.
   */
  private results: Result[];

  /**
   * The observable list of results.
   */
  private results$: BehaviorSubject<Result[]>;

  /**
   * Constructs the result service.
   * @param http The HTTP client.
   */
  constructor(private http: HttpClient) {
    super();
    this.results = [];
    this.results$ = new BehaviorSubject<Result[]>(this.results);
    this.findAllResults();
  }

  /**
   * Returns the observable list of results.
   */
  getResults(): Observable<Result[]> {
    return this.results$.asObservable();
  }

  /**
   * Returns an observable result by id.
   * @param id The id of the result.
   */
  getResult(id: number): Observable<Result> {
    return this.getResults()
      .pipe(
        map((results) => results.find((result) => result.id === id))
      );
  }

  /**
   * Finds all the results.
   */
  findAllResults() {
    this.http
      .get<Result[]>(`${this.serverURL}/results`)
      .subscribe((results: Result[]) => {
        this.results = results;
        this.results$.next(this.results);
      });
  }

  /**
   * Creates a result.
   * @param guestId The id of the guest.
   * @param quizId The id of the quiz.
   * @param timedOut Whether the quiz has timed out, or not.
   */
  createResult(guestId: number, quizId: number, timedOut: boolean): Observable<Result> {
    return this.http
      .post<Result>(
        `${this.serverURL}/results`,
        {
          guestId,
          quizId,
          timedOut
        },
        this.serverOptions
      )
      .pipe(
        map((result: Result) => {
          this.findAllResults();
          return result;
        })
      );
  }

  /**
   * Updates a result.
   * @param resultId The id of the result.
   * @param guestId The id of the guest.
   * @param quizId The id of the quiz.
   * @param timedOut Whether the quiz has timed out, or not.
   */
  updateResult(
    resultId: number,
    guestId: number,
    quizId: number,
    timedOut: boolean
  ) {
    this.http
      .post<Result>(
        `${this.serverURL}/results/${resultId}`,
        {
          guestId,
          quizId,
          timedOut
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllResults();
      });
  }

  /**
   * Deletes a result.
   * @param resultId The id of the result.
   */
  deleteResult(resultId: number) {
    this.http
      .delete<Result>(`${this.serverURL}/results/${resultId}`)
      .subscribe(() => {
        this.findAllResults();
      });
  }

  /**
   * Creates a question result.
   * @param resultId The id of the result.
   * @param questionId The id of the question.
   * @param skipped Whether the question has been skipped, or not.
   */
  createQuestionResult(resultId: number, questionId: number, skipped: boolean) {
    this.http
      .post<QuestionResult>(
        `${this.serverURL}/results/${resultId}/questions/${questionId}`,
        {
          skipped
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllResults();
      });
  }

  createQuestionResultAndAnswers(resultId: number, questionId: number, skipped: boolean, answers: number[]) {
    this.http
      .post<QuestionResult>(
        `${this.serverURL}/results/${resultId}/questions/${questionId}`,
        {
          skipped
        },
        this.serverOptions
      )
      .subscribe(() => {
        for (const answerId of answers) {
          this.createAnswerResult(resultId, questionId, answerId);
        }
      });
  }

  /**
   * Updates a question result.
   * @param resultId The id of the result.
   * @param questionId The id of the question.
   * @param skipped Whether the question has been skipped, or not.
   */
  updateQuestionResult(resultId: number, questionId: number, skipped: boolean) {
    this.http
      .put<QuestionResult>(
        `${this.serverURL}/results/${resultId}/questions/${questionId}`,
        {
          skipped
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllResults();
      });
  }

  /**
   * Deletes a question result.
   * @param resultId The id of the result.
   * @param questionId The id of the question.
   */
  deleteQuestionResult(resultId: number, questionId: number) {
    this.http
      .delete<QuestionResult>(`${this.serverURL}/results/${resultId}/questions/${questionId}` )
      .subscribe(() => {
        this.findAllResults();
      });
  }

  /**
   * Creates an answer result.
   * @param resultId The id of the result.
   * @param questionId The id of the question.
   * @param answerId The id of the answer.
   */
  createAnswerResult(resultId: number, questionId: number, answerId: number) {
    this.http
      .post<QuestionResult>(
        `${this.serverURL}/results/${resultId}/questions/${questionId}/answers/${answerId}`, {}
      )
      .subscribe(() => {
        this.findAllResults();
      });
  }

  /**
   * Deletes an answer result.
   * @param resultId The id of the result.
   * @param questionId The id of the question.
   * @param answerId The id of the answer.
   */
  deleteAnswerResult(resultId: number, questionId: number, answerId: number) {
    this.http
      .delete<QuestionResult>(
        `${this.serverURL}/results/${resultId}/questions/${questionId}/answers/${answerId}`
      )
      .subscribe(() => {
        this.findAllResults();
      });
  }

}
