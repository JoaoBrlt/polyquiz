// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models.
import { Quiz } from '../../../../../models/quiz.model';
import { QuizService } from '../../../../../services/quiz.service';
import { Question } from '../../../../../models/question.model';
import { Answer } from '../../../../../models/answer.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
})
export class QuestionEditComponent implements OnInit {
  /**
   * The question to be edited.
   */
  public question: Question;

  /**
   * The id of the current quiz.
   */
  public quizId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the quiz id from the route.
        this.quizId = parseInt(paramMap.get('quizId'), 10);

        // Get the quiz id from the route.
        const questionId = parseInt(paramMap.get('questionId'), 10);

        // Get the question.
        this.quizService
          .getQuiz(this.quizId)
          .subscribe((quiz: Quiz) => {
            if (quiz) {
              this.question = quiz.questions.find((question) => question.id === questionId);
            }
          });
      });
  }

  /**
   * Edits the question.
   * @param question The question to be edited.
   */
  editQuestion(question: Question) {
    // Update the question.
    this.quizService
      .updateQuestion(
        this.quizId,
        question.id,
        question.label,
        question.imageId
      )
      .subscribe((updatedQuestion: Question) => {
        // For each answer.
        question.answers.forEach((answer: Answer, index: number) => {
          // Answer does not exist.
          if (answer.id === 0 && answer.value) {
            // Create the answer.
            this.quizService
              .createAnswer(
                this.quizId,
                question.id,
                answer.value,
                answer.isCorrect,
                answer.imageId
              );
          }

          // Answer exists.
          if (answer.id !== 0 && answer.value) {
            // Update the answer.
            this.quizService
              .updateAnswer(
                this.quizId,
                question.id,
                answer.id,
                answer.value,
                answer.isCorrect,
                answer.imageId
              );
          }

          if (answer.id !== 0 && !answer.value) {
            // Delete the answer.
            this.quizService
              .deleteAnswer(
                this.quizId,
                question.id,
                answer.id,
              );
          }
        });
      });


    // Redirect to the quizzes.
    this.router.navigate(['/admin/quizzes', this.quizId, 'questions']);
  }
}
