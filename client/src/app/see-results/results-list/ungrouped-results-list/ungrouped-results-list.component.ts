import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../../../models/result.model';
import {ResultService} from '../../../../services/result.service';
import {QuizService} from '../../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ungrouped-results-list',
  templateUrl: './ungrouped-results-list.component.html',
  styleUrls: ['./ungrouped-results-list.component.scss']
})
export class UngroupedResultsListComponent implements OnInit {

  @Input() results: Result[];
  quizNames: String[];
  iconYes = faCheckCircle;
  iconNo = faTimesCircle;

  constructor(
    private resultsService: ResultService,
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizNames = [];
    this.quizService.getQuizzes().subscribe((quizzes) => {
      for (const r of this.results) {
        for (const q of quizzes) {
          if (q.id === r.quizId) {
            this.quizNames[this.results.indexOf(r)] = q.name;
          }
        }
      }
    });
  }

  //TODO get the question and see its number of answers to estimate the correctness of a result
  getSuccessPercent(result: Result) {
    let res: number = 0;
    for (let questionResult of result.questions) {
      if (questionResult.answers !== undefined && !questionResult.skipped && questionResult.answers.length < 3) {
        res++;
      }
    }
    res = (res / result.questions.length) * 100;
    return res.toFixed(2);
  }

  goToQuestionResults(resultId: number) {
    this.router.navigate(['/see-results/', resultId, 'questions-results-list']);
  }

}
