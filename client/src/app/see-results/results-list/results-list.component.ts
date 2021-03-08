import {Component, OnInit} from '@angular/core';
import {Result} from '../../../models/result.model';
import {ResultService} from '../../../services/result.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Guest} from '../../../models/guest.model';
import {faObjectGroup, faObjectUngroup} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resultsList',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})

export class ResultsListComponent implements OnInit {
  guest: Guest;
  results: Result[] = [];

  grouped: boolean = false;
  iconGroup = faObjectGroup;
  iconUngroup = faObjectUngroup;

  constructor(private resultsService: ResultService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  // TODO vérifier avec du lag que ça fonctionne bien
  ngOnInit(): void {
    const session = sessionStorage.getItem('selectedGuest');
    if (session === null || session === undefined) {
      this.router.navigate(['../guest-selection'], {relativeTo: this.route});
    } else {
      this.grouped = false;
      this.results = [];
      this.guest = JSON.parse(sessionStorage.getItem('selectedGuest'));
      this.resultsService.getResults().subscribe((results) => {
        for (const r of results) {
          if (r.guestId === this.guest.id) {
            this.results.push(r);
          }
        }
      });
    }
  }

  groupByQuiz() {
    this.grouped = true;
  }

  unGroup() {
    this.grouped = false;
  }
}
