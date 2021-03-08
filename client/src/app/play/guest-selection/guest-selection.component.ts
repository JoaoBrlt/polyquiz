import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GuestService} from '../../../services/guest.service';
import {Guest} from '../../../models/guest.model';

@Component({
    selector: 'app-guest-selection',
    templateUrl: './guest-selection.component.html',
    styleUrls: ['./guest-selection.component.scss'],
})

export class GuestSelectionComponent implements OnInit {
  /**
   * The list of guests.
   */
  public guests: Guest[];

  /**
   * The variables of the pagination.
   */
  public page ;
  public pageSize;
  public collectionSize;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guestService: GuestService
  ) {
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;
  }

  ngOnInit(): void {
    // Get the guests.
    this.guestService
      .getGuests()
      .subscribe((guests: Guest[]) => {
        this.guests = guests;
        this.collectionSize = guests.length;
      });
  }

  /**
   * Returns a slice of the guests.
   */
  getGuests(): Guest[] {
    return this.guests
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  /**
   * Selects a guest.
   * @param guest The selected guest.
   */
  selectGuest(guest: Guest) {
    // Store the guest in session storage.
    sessionStorage.setItem('selectedGuest', JSON.stringify(guest));

    // Redirect the user.
    if (this.router.url === '/guest-selection') {
      this.router.navigate(['../themes-selection']);
    } else if (this.router.url === '/see-results/guest-selection') {
      this.router.navigate(['../results-list'], {relativeTo: this.route});
    } else {
      this.router.navigate(['/']);
    }
  }
}
