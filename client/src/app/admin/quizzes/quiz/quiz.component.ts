// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Styles.
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Models and services.
import { Quiz } from '../../../../models/quiz.model';
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  /**
   * The quiz to display.
   */
  @Input()
  public quiz: Quiz;

  /**
   * Whether the theme is editable or not.
   */
  @Input()
  public editable: boolean;

  /**
   * The image of the quiz.
   */
  public image: Image;

  /**
   * The event emitter to select the quiz.
   */
  @Output()
  public selectQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  /**
   * The event emitter to edit the quiz.
   */
  @Output()
  public editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  /**
   * The event emitter to delete the quiz.
   */
  @Output()
  public deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  /**
   * The button icons.
   */
  public editIcon = faPen;
  public deleteIcon = faTrash;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    // Set the default image.
    this.image = {
      id: 0,
      name: this.quiz.name,
      path: 'https://via.placeholder.com/640x360?text=' + this.quiz.name
    };

    // Get the image of the theme.
    this.imageService
      .getImage(this.quiz.imageId)
      .subscribe((image) => {
        // If image exists.
        if (image) {
          this.image = image;
        }
      });
  }

  /**
   * Selects the quiz.
   */
  select(event) {
    this.selectQuiz.emit(this.quiz);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Edits the quiz.
   */
  edit(event) {
    this.editQuiz.emit(this.quiz);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Deletes the quiz.
   */
  delete(event) {
    this.deleteQuiz.emit(this.quiz);

    // Prevent other button to trigger.
    event.preventDefault();
    event.stopPropagation();
  }
}
