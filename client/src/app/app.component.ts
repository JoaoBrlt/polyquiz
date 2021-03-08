import { Component, DoCheck } from '@angular/core';
import { Guest } from '../models/guest.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'PolyQuiz';

  public guest: Guest;
  public profile: string;

  ngDoCheck() {
      this.guest = JSON.parse(sessionStorage.getItem('selectedGuest'));
      const changeContainer = sessionStorage.getItem('changeContainer');

      if (this.guest == null) {
        this.profile = 'none';
      }
      if (this.guest != null && changeContainer === 'true') {
        this.profile = this.guest.accessibility;
      }
  }

  setSize() {
    return {
      size: this.profile === 'agrandissement' || this.profile === 'contraste eleve'
    };
  }
}

