import {Component, OnInit} from '@angular/core';
import {TransitionService} from '../../../services/transition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Result} from '../../../models/result.model';
import {ResultService} from '../../../services/result.service';
import {GuestService} from '../../../services/guest.service';

@Component({
  selector: 'app-questionResultsList',
  templateUrl: './question-results-list.component.html',
  styleUrls: ['./question-results-list.component.scss'],
})
export class QuestionResultsListComponent implements OnInit {
  selectedResult: Result;
  selectedQuiz: Quiz;
  guestName: string;

  constructor(
    private resultService: ResultService,
    private quizService: QuizService,
    private guestService: GuestService,
    private transitionService: TransitionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the quiz id from the route.
        const resultId = parseInt(paramMap.get('resultId'), 10);

        // Get the questions of the quiz.
        this.resultService
          .getResult(resultId)
          .subscribe((result) => {
            if (result) {
              this.selectedResult = result;
              this.quizService.getQuiz(this.selectedResult.quizId).subscribe((quiz) => {
                this.selectedQuiz = quiz;
              });
              this.guestService.getGuest(result.guestId).subscribe((guest) => {
                this.guestName = guest.firstName + " " + guest.lastName;
              });
            }
          });
      });


  }

  getQuestionNameById(questionId: number): string {
    for (const question of this.selectedQuiz.questions) {
      if (question.id === questionId) {
        return question.label;
      }
    }
  }

  getAnswerValueById(questionId: number, res: number): string {
    for (const question of this.selectedQuiz.questions) {
      if (question.id === questionId) {
        for (const answer of question.answers) {
          if (answer.id === res) {
            return answer.value;
          }
        }
      }
    }
  }
}
