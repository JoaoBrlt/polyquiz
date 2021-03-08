import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionResultPlusAnswer } from '../questions/questions.component';
import { Quiz } from '../../../models/quiz.model';
import { TransitionService } from '../../../services/transition.service';
import { Guest } from '../../../models/guest.model';
import { ResultService } from '../../../services/result.service';
import { Result } from '../../../models/result.model';
import { Answer } from '../../../models/answer.model';
import { Image } from '../../../models/image.model';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-quiz-to-answer',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss'],
  animations: [
    trigger('inAndOut', [
      state('true', style({
        opacity: '1'
      })),
      state('false', style({
        opacity: '0'
      })),
      transition(':leave', [
        animate('0s')
      ]),
      transition(':enter', [
        animate('2s')
      ]),
    ]),
  ]
})

export class PlayQuizComponent implements OnInit {
  // Needed to function
  questionIndex: number;
  actualQuiz: Quiz;
  ongoingQuestion: Question;
  guest: Guest;

  // For the animations and a good flow
  isAnswerVisible = false;
  isQuestionVisible = true;
  hasEnded = false;

  // Yes
  correctAnswer: Answer;
  profile: string;
  guestName: string;
  progressPercent: number;
  result: Result;

  /**
   * The list of images.
   */
  public images: Image[];

  constructor(
    private quizService: QuizService,
    private imageService: ImageService,
    private resultService: ResultService,
    private transitionService: TransitionService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    sessionStorage.setItem('changeContainer', 'true');

    // Get the guest information.
    this.guest = JSON.parse(sessionStorage.getItem('selectedGuest'));
    this.guestName = this.guest.firstName + ' ' + this.guest.lastName;
    this.profile = this.guest.accessibility;

    // Get the quiz from the route.
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the quiz id from the route.
        const quizId = parseInt(paramMap.get('quizId'), 10);

        // Get the quiz from the server.
        this.quizService
          .getQuiz(quizId)
          .subscribe((quiz) => {
            if (quiz) {
              this.actualQuiz = quiz;
            }
          });
      });

    // The guest or the quiz is undefined.
    if (this.guest === undefined || this.guest == null || this.actualQuiz === undefined) {
      // Redirect the user to the home page.
      this.router.navigate(['/']);
    } else {
      // Initialize the question.
      this.questionIndex = 0;
      this.progressPercent = 0;
      this.ongoingQuestion = this.actualQuiz.questions[this.questionIndex];

      // Get the images.
      this.imageService
        .getImages()
        .subscribe((images) => {
          this.images = images;
        });

      // Create a question result.
      this.resultService
        .createResult(this.guest.id, this.actualQuiz.id, false)
        .subscribe((result: Result) => {
          this.result = result;

          // Add a timeout for the result.
          this.delay(1800000).then(() => {
              this.resultService.updateResult(this.result.id, this.guest.id, this.actualQuiz.id, true);
            }
          );
        });
    }
  }

  /**
   * Returns an image by id.
   * @param imageId The id of the image.
   */
  getImage(imageId: number): Image {
    return this.images.find((image) => image.id === imageId);
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
   * Requests the next question to be displayed.
   * @param result The question result (includes selected answers).
   */
  goToNextQuestion(result: QuestionResultPlusAnswer) {
    // Keep the right answer.
    this.correctAnswer = result.answer;

    // Send the question result.
    this.resultService.createQuestionResultAndAnswers(
      this.result.id,
      result.questionResult.questionId,
      result.questionResult.skipped,
      result.questionResult.answers
    );

    // Wait for the question animation to end.
    setTimeout(() => {
      // Hide the previous question.
      this.isQuestionVisible = false;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }

  /**
   * Requests the right answer to be displayed.
   */
  makeAnswerAppear() {
    // When no question or answer is visible.
    if (!this.isQuestionVisible && !this.isAnswerVisible) {
      // Show the correct answer.
      this.isAnswerVisible = true;
      this.changeDetectorRef.detectChanges();

      // Increase the question index.
      this.questionIndex++;

      // Compute the progress.
      this.progressPercent = Math.round((this.questionIndex / this.actualQuiz.questions.length) * 100);



      // Wait for the answer to be read.
      setTimeout(() => {
        // Hide the correct answer.
        this.isAnswerVisible = false;

        // Check if the quiz has ended.
        if (this.questionIndex === this.actualQuiz.questions.length) {
          this.hasEnded = true;
        } else {
          this.ongoingQuestion = this.actualQuiz.questions[this.questionIndex];
        }

        this.changeDetectorRef.detectChanges();
      }, 2000);
    }
  }

  /**
   * Requests the question to be displayed.
   */
  makeQuestionAppear() {
    // If no question or answer is visible and the quiz has not ended.
    if (!this.isQuestionVisible && !this.isAnswerVisible && !this.hasEnded) {
      // Show the next question.
      this.isQuestionVisible = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Redirects the guest to the theme selection.
   */
  backToTheme() {
    this.router.navigate(['/themes-selection']);
  }
}

