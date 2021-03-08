// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models and services.
import { Quiz } from '../../../../models/quiz.model';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-quiz-new',
  templateUrl: './quiz-new.component.html',
  styleUrls: ['./quiz-new.component.scss'],
})
export class QuizNewComponent implements OnInit {
  /**
   * The id of the current theme.
   */
  private themeId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    // Get the theme id from the route.
    this.route.paramMap
      .subscribe((paramMap) => {
        this.themeId = parseInt(paramMap.get('themeId'), 10);
      });
  }

  /**
   * Creates the quiz.
   * @param quiz The quiz to be created.
   */
  createQuiz(quiz: Quiz) {
    // Create the quiz.
    this.quizService.createQuiz(
      quiz.name,
      this.themeId,
      quiz.imageId
    );

    // Redirect to the quizzes.
    this.router.navigate(['/admin/themes', this.themeId, 'quizzes']);
  }
}
