// App.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models.
import { Image } from '../../../../models/image.model';
import { Quiz } from '../../../../models/quiz.model';
import { ImageService } from '../../../../services/image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  /**
   * The form of the quiz.
   */
  public quizForm: FormGroup;

  /**
   * The list of images.
   */
  public images: Image[];

  /**
   * The quiz to be displayed.
   */
  @Input()
  public quiz: Quiz;

  /**
   * The event emitter to submit the quiz.
   */
  @Output()
  public submitQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private imageService: ImageService
  ) {
    // Initialize the images.
    this.images = [];

    // Create the form group.
    this.quizForm = this.formBuilder
      .group({
        id: [{ value: 0, disabled: true }],
        name: ['', [Validators.required, Validators.min(1)]],
        imageId: [null],
        themeId: [{ value: 0, disabled: true }],
        questions: [{ value: [], disabled: true }],
        createdAt: [{ value: '', disabled: true }],
        updatedAt: [{ value: '', disabled: true }]
      });
  }

  ngOnInit() {
    // Get the images.
    this.imageService
      .getImages()
      .subscribe((images) => {
        this.images = images;
      });

    // The input quiz is set.
    if (this.quiz) {
      this.quizForm.setValue(this.quiz);
    }
  }

  /**
   * Returns the selected image of a form group.
   * @param formGroup The form group to be checked.
   */
  getSelectedImage(formGroup: FormGroup): Image {
    const imageId = formGroup.getRawValue().imageId;
    return this.images.find((image) => image.id === imageId);
  }

  /**
   * Submits the quiz.
   */
  submit() {
    const quiz: Quiz = this.quizForm.getRawValue() as Quiz;
    this.submitQuiz.emit(quiz);
  }
}
