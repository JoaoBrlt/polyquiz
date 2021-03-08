// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models.
import { Quiz } from '../../../../models/quiz.model';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss'],
})
export class QuizEditComponent implements OnInit {
  /**
   * The quiz to be edited.
   */
  public quiz: Quiz;

  /**
   * The id of the current theme.
   */
  public themeId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the theme id from the route.
        this.themeId = parseInt(paramMap.get('themeId'), 10);

        // Get the quiz id from the route.
        const quizId = parseInt(paramMap.get('quizId'), 10);

        // Get the quiz.
        this.quizService
          .getQuiz(quizId)
          .subscribe((quiz) => {
            if (quiz) {
              this.quiz = quiz;
            }
          });
      });
  }

  /**
   * Edits the quiz.
   * @param quiz The quiz to be edited.
   */
  editQuiz(quiz: Quiz) {
    // Update the quiz.
    this.quizService.updateQuiz(
      quiz.id,
      quiz.name,
      this.themeId,
      quiz.imageId
    );

    // Redirect to the quizzes.
    this.router.navigate(['/admin/themes', this.themeId, 'quizzes']);
  }
}
