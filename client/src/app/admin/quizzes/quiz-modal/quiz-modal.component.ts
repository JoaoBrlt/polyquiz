// App.
import { Component, Input, OnInit} from '@angular/core';

// Styles.
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Models.
import { Quiz } from '../../../../models/quiz.model';

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss']
})
export class QuizModalComponent implements OnInit {
  /**
   * The quiz to be deleted.
   */
  @Input()
  public quiz: Quiz;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
