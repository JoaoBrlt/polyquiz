import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../../../models/result.model';
import {QuizService} from '../../../../services/quiz.service';

@Component({
  selector: 'app-grouped-results-list',
  templateUrl: './grouped-results-list.component.html',
  styleUrls: ['./grouped-results-list.component.scss']
})
export class GroupedResultsListComponent implements OnInit {

  @Input() results: Result[];
  groupedResults: groupedResults[];

  constructor(
    private quizService: QuizService,
  ) {
  }

  ngOnInit(): void {
    this.groupedResults = [];
    for (const result of this.results) {
      let found: boolean = false;
      subloop:
        for (const groupedResult of this.groupedResults) {
          if (groupedResult.quizId === result.quizId) {
            groupedResult.results.push(result);
            found = true;
            break subloop;
          }
        }
      if (!found) {
        let newGroup: groupedResults = {
          quizId: result.quizId,
          quizName: '',
          results: []
        };
        newGroup.results.push(result);
        this.groupedResults.push(newGroup);
      }
    }
    this.quizService.getQuizzes().subscribe((quizzes) => {
      for (const groupedResult of this.groupedResults) {
        subloop:
          for (const q of quizzes) {
            if (q.id === groupedResult.quizId) {
              groupedResult.quizName = q.name;
              break subloop;
            }
          }
      }
    });
  }

  //TODO get the question and see its number of answers to estimate the correctness of a result
  getAverageSuccessPercent(results: Result[]) {
    let res: number = 0;
    let totalNumber: number = 0;
    for (let result of results) {
      for (let questionResult of result.questions) {
        if (questionResult.answers !== undefined && !questionResult.skipped && questionResult.answers.length < 3) {
          res++;
        }
      }
      totalNumber += result.questions.length;
    }
    res = (res / totalNumber) * 100;
    return res.toFixed(2);
  }

  getAverageTimeOuts(results: Result[]) {
    let res: number = 0;
    for (let result of results) {
      if (result.timedOut) {
        res++;
      }
    }
    res = (res / results.length) * 100;
    return (100 - res).toFixed(2);
  }

}

export interface groupedResults {
  quizId: number;
  quizName: String;
  results: Result[];
}
