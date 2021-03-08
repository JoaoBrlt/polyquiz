import { Component, OnInit } from '@angular/core';
import { Guest } from '../../../../models/guest.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GuestService } from '../../../../services/guest.service';

@Component({
  selector: 'app-guest-edit',
  templateUrl: './guest-edit.component.html',
  styleUrls: ['./guest-edit.component.scss']
})
export class GuestEditComponent implements OnInit {
  /**
   * The guest to be edited.
   */
  public guest: Guest;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guestService: GuestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap) => {
        // Get the guest id from the route.
        const guestId = parseInt(paramMap.get('guestId'), 10);

        // Get the guest.
        this.guestService
          .getGuest(guestId)
          .subscribe((guest) => {
            this.guest = guest;
          });
      });
  }

  /**
   * Edits a guest.
   * @param guest The guest to be edited.
   */
  editGuest(guest: Guest) {
    this.guestService.updateGuest(
      guest.id,
      guest.firstName,
      guest.lastName,
      guest.accessibility
    );
    this.router.navigate(['/admin/guests']);
  }
}
