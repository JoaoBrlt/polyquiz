// App.
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Models.
import { QuestionResult } from '../../../models/question-result.model';
import { Question } from '../../../models/question.model';
import { Answer } from '../../../models/answer.model';
import { Guest } from '../../../models/guest.model';
import { Image } from '../../../models/image.model';

// Services.
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-question-to-answer',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [
    trigger('isAnswerCorrect', [
      state('correct', style({
        backgroundColor: '#00FF00'
      })),
      state('incorrect', style({
        opacity: 0,
        visibility: 'hidden',
        display: 'none',
      })),
      transition('* => correct', [
        animate('0.25s')
      ]),
      transition('* => incorrect', [
        animate('0.5s')
      ]),
    ])
  ]
})

export class QuestionsComponent implements OnInit {
  /**
   * The question to display.
   */
  @Input()
  public question: Question;

  /**
   * The event emitter to go to the next question.
   */
  @Output()
  public goToNextQuestion: EventEmitter<QuestionResultPlusAnswer> = new EventEmitter<QuestionResultPlusAnswer>();

  /**
   * The list of clicked answers.
   */
  public answersClicked: number[];

  /**
   * Whether the question has been skipped, or not.
   */
  public skipped: boolean;

  /**
   * Whether the skip button is enabled, or not.
   */
  public enableSkip: boolean;

  /**
   * The accessibility profile of the guest.
   */
  public profile: string;

  /**
   * The animations states.
   */
  public forAnimation: string[];
  public forAnimation2: boolean[];

  /**
   * The list of images.
   */
  public images: Image[];

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    // Get the accessibility profile of the guest.
    const guest: Guest = JSON.parse(sessionStorage.getItem('selectedGuest'));
    this.profile = guest.accessibility;

    // Get the images.
    this.imageService
      .getImages()
      .subscribe((images) => {
        this.images = images;
      });

    // Initializes the question.
    this.enableSkip = false;
    this.answersClicked = [];
    this.forAnimation = [];
    for (let i = 0; i < this.question.answers.length; i++) {
      this.forAnimation[i] = null;
    }
    this.forAnimation2 = [];
    for (let i = 0; i < this.question.answers.length; i++) {
      this.forAnimation2[i] = false;
    }

    // Wait for 10 seconds before showing the skip button.
    setTimeout(() => {
      this.enableSkip = true;
    }, 10000);
  }

  /**
   * Returns an image by id.
   * @param imageId The id of the image.
   */
  getImage(imageId: number): Image {
    return this.images.find((image) => image.id === imageId);
  }

  /**
   * Checks if the answer is correct and triggers the animations.
   * @param answer The answer to be checked.
   */
  checkAnswer(answer: Answer) {
    // Save the selected answer.
    this.answersClicked.push(answer.id);

    // Correct answer.
    if (answer.isCorrect) {
      // Set the animation for the correct answer.
      this.forAnimation[this.question.answers.indexOf(answer)] = 'correct';
    } else {
      // Set the animation for the incorrect answer.
      this.forAnimation[this.question.answers.indexOf(answer)] = 'incorrect';
    }
  }

  /**
   * Validates the current question after the animations.
   * @param i The index of the answer.
   * @param event The animation event.
   */
  validateAnswer(i: number, event: AnimationEvent) {
    // Correct answer.
    if (this.forAnimation[i] === 'correct') {
      // Create the question result.
      const result: QuestionResultPlusAnswer = {
        answer: this.question.answers[i],
        questionResult: {
          questionId: this.question.id,
          skipped: false,
          answers: this.answersClicked
        }
      };

      // Redirect the user to the next question.
      this.finishQuestion(result);
    }

    // Incorrect answer.
    if (this.forAnimation[i] === 'incorrect') {
      // Set the animation for the incorrect answer.
      this.forAnimation2[i] = true;
    }
  }

  /**
   * Skips the current question.
   */
  skipQuestion(): void {
    // Get the correct answer.
    let correctAnswer: Answer;
    for (const answer of this.question.answers) {
      if (answer.isCorrect) {
        correctAnswer = answer;
      }
    }

    // Create the question result.
    const result: QuestionResultPlusAnswer = {
      answer: correctAnswer,
      questionResult: {
        questionId: this.question.id,
        skipped: true,
        answers: this.answersClicked
      }
    };

    // Redirect the user to the next question.
    this.finishQuestion(result);
  }

  /**
   * Redirects the user to the next question by sending the result.
   * @param result The question result (includes selected answers).
   */
  finishQuestion(result: QuestionResultPlusAnswer) {
    this.goToNextQuestion.emit(result);
  }

  /**
   * Adapts the size and contrast, according to the guest accessibility profile.
   */
  getProfileClasses() {
    return {
      // Increase the size.
      size: this.profile === 'agrandissement' || this.profile === 'contraste eleve',

      // Increase the contrast.
      contrast: this.profile === 'contraste eleve'
    };
  }

  /**
   * Increases the size of the answers, if they have images.
   */
  getAnswersClasses() {
    return {
      // Increases the size of the answers.
      'answers-with-images': this.answersHaveImages(),
    };
  }

  /**
   * Checks if answers have images.
   */
  answersHaveImages(): boolean {
    let result = false;
    this.question.answers.forEach((answer) => {
      if (answer.imageId != null) {
        result = true;
      }
    });
    return result;
  }
}

export interface QuestionResultPlusAnswer {
  answer: Answer;
  questionResult: QuestionResult;
}

