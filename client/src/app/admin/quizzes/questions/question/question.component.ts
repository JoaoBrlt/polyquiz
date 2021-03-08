// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models.
import { Question } from '../../../../../models/question.model';
import { Image } from '../../../../../models/image.model';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  /**
   * The question to display.
   */
  @Input()
  public question: Question;

  /**
   * The index of the question.
   */
  @Input()
  public index: number;

  /**
   * The image of the question.
   */
  public image: Image;

  /**
   * The event emitter to edit the question.
   */
  @Output()
  public editQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  /**
   * The event emitter to delete the question.
   */
  @Output()
  public deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  /**
   * The button icons.
   */
  public editIcon = faPen;
  public deleteIcon = faTrash;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Edits the question.
   */
  edit(event: MouseEvent) {
    this.editQuestion.emit(this.question);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Deletes the question.
   */
  delete(event: MouseEvent) {
    this.deleteQuestion.emit(this.question);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }
}
