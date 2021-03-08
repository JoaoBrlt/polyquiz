import {Guest} from '../models/guest.model';
import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';
import {Theme} from '../models/theme.model';
import {Image} from '../models/image.model';
import {Injectable} from '@angular/core';
import {QuestionResult} from '../models/question-result.model';

@Injectable({
  providedIn: 'root'
})

export class TransitionService {
  private _guestToModify: Guest;
  private _quizToModify: Quiz;
  private _questionToModify: Question;
  private _answerIndexToModify: number;
  private _themeToModify: Theme;
  private _imageToModify: Image;

  // PLAY
  private _themeToPlay: Theme;
  private _quizToPlay: Quiz;

  // RESULTS
  private _questionResults: QuestionResult[];
  private _quizIdForResults: number;

  constructor() {
    this._guestToModify = undefined;
    this._quizToModify = undefined;
    this._questionToModify = undefined;
    this._answerIndexToModify = undefined;
    this._themeToModify = undefined;
    this._imageToModify = undefined;
    this._themeToPlay = undefined;
    this._quizToPlay = undefined;
    this._questionResults = undefined;
    this._quizIdForResults = undefined;
  }

  get guestToModify(): Guest {
    if (this._guestToModify === undefined) {
      return undefined;
    }
    if (this._guestToModify === null) {
      return null;
    }
    let g = {...this._guestToModify};
    this._guestToModify = undefined;
    return g;
  }

  set guestToModify(value: Guest) {
    this._guestToModify = value;
  }

  get quizToModify(): Quiz {
    if (this._quizToModify === undefined) {
      return undefined;
    }
    if (this._quizToModify === null) {
      return null;
    }
    let q = {...this._quizToModify};
    this._quizToModify = undefined;
    return q;
  }

  set quizToModify(value: Quiz) {
    this._quizToModify = value;
  }

  get questionToModify(): Question {
    if (this._questionToModify === undefined) {
      return undefined;
    }
    if (this._questionToModify === null) {
      return null;
    }
    let qq = {...this._questionToModify};
    this._questionToModify = undefined;
    return qq;
  }

  set questionToModify(value: Question) {
    this._questionToModify = value;
  }

  get answerIndexToModify(): number {
    if (this._answerIndexToModify === undefined) {
      return undefined;
    }
    let ai = this._answerIndexToModify;
    this._answerIndexToModify = undefined;
    return ai;
  }

  set answerIndexToModify(value: number) {
    this._answerIndexToModify = value;
  }

  get themeToModify(): Theme {
    if (this._themeToModify === undefined) {
      return undefined;
    }
    if (this._themeToModify === null) {
      return null;
    }
    let t = {...this._themeToModify};
    this._themeToModify = undefined;
    return t;
  }

  set themeToModify(value: Theme) {
    this._themeToModify = value;
  }

  get imageToModify(): Image {
    if (this._imageToModify === undefined) {
      return undefined;
    }
    if (this._imageToModify === null) {
      return null;
    }
    let i = {...this._imageToModify};
    this._imageToModify = undefined;
    return i;
  }

  set imageToModify(value: Image) {
    this._imageToModify = value;
  }

  get themeToPlay(): Theme {
    if (this._themeToPlay === undefined) {
      return undefined;
    }
    if (this._themeToPlay === null) {
      return null;
    }
    let tp = {...this._themeToPlay};
    this._themeToPlay = undefined;
    return tp;
  }

  set themeToPlay(value: Theme) {
    this._themeToPlay = value;
  }

  get quizToPlay(): Quiz {
    if (this._quizToPlay === undefined) {
      return undefined;
    }
    if (this._quizToPlay === null) {
      return null;
    }
    let qp = {...this._quizToPlay};
    this._quizToPlay = undefined;
    return qp;
  }

  set quizToPlay(value: Quiz) {
    this._quizToPlay = value;
  }

  get questionResults(): QuestionResult[] {
    if (this._questionResults === undefined) {
      return undefined;
    }
    if (this._questionResults === null) {
      return null;
    }
    const qr = {...this._questionResults};
    this._questionResults = undefined;
    return qr;
  }

  set questionResults(value: QuestionResult[]) {
    this._questionResults = value;
  }

  get quizIdForResults(): number {
    if (this._quizIdForResults === undefined) {
      return undefined;
    }
    const qfr = this._quizIdForResults;
    this._quizIdForResults = undefined;
    return qfr;
  }

  set quizForResults(value: number) {
    this._quizIdForResults = value;
  }
}
