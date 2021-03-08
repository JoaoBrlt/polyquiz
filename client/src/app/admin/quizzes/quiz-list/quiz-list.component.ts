// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Styles.
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizModalComponent } from '../quiz-modal/quiz-modal.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Models and services.
import { Theme } from '../../../../models/theme.model';
import { ThemeService } from '../../../../services/theme.service';
import { Quiz } from '../../../../models/quiz.model';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  /**
   * The list of quizzes.
   */
  private quizzes: Quiz[];

  /**
   * The id of the current theme.
   */
  public theme: Theme;

  /**
   * The variables of the pagination.
   */
  public page ;
  public pageSize;
  public collectionSize;

  /**
   * The button icons.
   */
  public createIcon = faPlus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private quizService: QuizService,
    private themeService: ThemeService
  ) {
    this.page = 1;
    this.pageSize = 6;
    this.collectionSize = 0;
    this.quizzes = [];
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the theme id from the route.
        const themeId = parseInt(paramMap.get('themeId'), 10);

        // Get the theme.
        this.themeService
          .getTheme(themeId)
          .subscribe((theme) => {
            this.theme = theme;
          });

        // Get the quizzes of the theme.
        this.quizService
          .getQuizzesByTheme(themeId)
          .subscribe((quizzes) => {
            this.quizzes = quizzes;
            this.collectionSize = quizzes.length;
          });
      });
  }

  /**
   * Returns a slice of the quizzes.
   */
  getQuizzes(): Quiz[] {
    return this.quizzes
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  /**
   * Selects a quiz.
   * @param quiz The selected quiz.
   */
  selectQuiz(quiz: Quiz) {
    this.router.navigate(['/admin/quizzes', quiz.id, 'questions']);
  }

  /**
   * Creates a quiz.
   */
  createQuiz() {
    this.router.navigate(['/admin/themes/', this.theme.id, 'quizzes', 'new']);
  }

  /**
   * Edits a quiz.
   */
  editQuiz(quiz: Quiz) {
    this.router.navigate(['/admin/themes', this.theme.id, 'quizzes', quiz.id]);
  }

  /**
   * Deletes a quiz.
   * @param quiz The quiz to be deleted.
   */
  deleteQuiz(quiz: Quiz) {
    // Confirm the deletion.
    const modal = this.modalService.open(
      QuizModalComponent,
      { centered: true }
    );
    modal.componentInstance.quiz = quiz;
    modal.result.then(
      (result) => this.quizService.deleteQuiz(quiz.id),
      () => {}
    );
  }
}
