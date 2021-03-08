// App.
import { Component, Input, OnInit} from '@angular/core';

// Styles.
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Models.
import { Question } from '../../../../../models/question.model';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnInit {
  /**
   * The question to be deleted.
   */
  @Input()
  public question: Question;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
