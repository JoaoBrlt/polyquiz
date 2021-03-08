// App.
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

// Styles.
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionModalComponent } from '../question-modal/question-modal.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Models and services.
import { Quiz } from '../../../../../models/quiz.model';
import { Question } from '../../../../../models/question.model';
import { QuizService } from '../../../../../services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  /**
   * The quiz to be displayed.
   */
  public quiz: Quiz;

  /**
   * The button icons.
   */
  public createIcon = faPlus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the quiz id from the route.
        const quizId = parseInt(paramMap.get('quizId'), 10);

        // Get the questions of the quiz.
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
   * Creates a question.
   */
  createQuestion() {
    this.router.navigate(['/admin/quizzes', this.quiz.id, 'questions', 'new']);
  }

  /**
   * Edits a question.
   */
  editQuestion(question: Question) {
    this.router.navigate(['/admin/quizzes', this.quiz.id, 'questions', question.id]);
  }

  /**
   * Deletes a question.
   * @param question The question to be deleted.
   */
  deleteQuestion(question: Question) {
    // Confirm the deletion.
    const modal = this.modalService.open(
      QuestionModalComponent,
      { centered: true }
    );
    modal.componentInstance.question = question;
    modal.result.then(
      (result) => this.quizService.deleteQuestion(this.quiz.id, question.id),
      () => {}
    );
  }
}
